import { Button, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import BackLink from "src/components/back-link";
import TableHead from "src/components/table-head";
import APP_ROUTES from "src/routes/routePaths";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import { useParams } from "react-router";
import { RequiredStar } from "src/components/required-star";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import { notifyMessage } from "src/utils/toastNotify";
import { updateCompetionCategoryById, createCompetionCategory, getCategoryById } from "../ChampionshipUtils/functionUtils";
import axiosServices from "src/utils/axios";

const AddCategory = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({
    category_name: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDetail({ ...detail, [name]: value });
    const errorMessage = validateCategoryName(value);
    setError(errorMessage);
  };

  console.log(detail.category_name);

  const validateCategoryName = (categoryName: string) => {
    if (categoryName.trim().length === 0) {
      return "Category name is required";
    }

    return "";
  };

  // const getCategoryById = async (id: number) => {
  //   try {
  //     const response = await axiosServices.get(`/api/tenants/championship/competition-categories/${id}`);
  //     if (response.status === 200) {
  //       const categoryData = response.data;
  //       setDetail({
  //         category_name: categoryData.category_name,
  //       });
  //     } else {
  //       console.error("Failed to fetch category:", response);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch category:", error);
  //   }
  // };

  const getCategorysById = async (id: number) => {
    try {
      if (id) {
        const response = await getCategoryById(id);
        setDetail((prevDetail: any) => ({
          ...prevDetail,
          category_name: response.category_name,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch category:", error);
    }
  };

  useEffect(() => {
    if (id) {
      const cid = parseInt(id, 10);
      getCategorysById(cid);
    }
  }, [id]);

  const createCategory = async (data: any, id?: number) => {
    try {
      let response;
      if (id) {
        response = await updateCompetionCategoryById(id, data);
      } else {
        response = await createCompetionCategory(data);
      }
      if (response.status === 200 || response.status === 201) {
        console.log("Competition category saved successfully");
        notifyMessage.success("Competition category saved successfully");
      } else {
        console.error("Unexpected response:", response);
        notifyMessage.error("Failed to save competition category");
      }
    } catch (error) {
      console.error("Failed to save category", error);
      notifyMessage.error("Failed to save competition category");
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await createCategory(detail);
      const categoryId = id ? parseInt(id, 10) : undefined;
      if (categoryId !== undefined) {
        await createCategory(detail, categoryId);
      } else {
        await createCategory(detail);
      }
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;

        switch (statusCode) {
          case 401:
            notifyMessage.error("Unauthorized access. Please log in again.");
            break;
          case 422:
            //const errors = error.response.data.errors;
            notifyMessage.error("Validation errors");
            break;
          default:
            notifyMessage.error("Failed to create category. Please try again later.");
        }
      } else {
        notifyMessage.error("Network error. Please check your internet connection.");
      }
    }
  };

  return (
    <>
      <BackLink title="Back to the championship" route={`${APP_ROUTES.CHAMPIONS}`} />
      {/* <TableHead title="Add Category" /> */}
      <TableHead title={id ? "Edit Category" : "Add Category"} />

      <Grid container spacing={3} marginTop={2}>
        <Grid item xs={12}>
          {/* <Grid container></Grid> */}
          <Grid item xs={12} lg={6}>
            <CustomFormLabel htmlFor="bi-categoryname">
              {" "}
              Category Name
              <RequiredStar />
            </CustomFormLabel>

            <CustomTextField
              id="bi-categoryname"
              placeholder="Category Name"
              name="category_name"
              fullWidth
              onChange={handleInputChange}
              value={detail.category_name}
              // value={id ? editformData.competitionCategory : detail.competitionCategory}
              error={!!error}
              helperText={error}
            />
          </Grid>

          <Button variant="contained" color="primary" onClick={onSubmit} sx={{ marginTop: 4 }}>
            Submit
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddCategory;
