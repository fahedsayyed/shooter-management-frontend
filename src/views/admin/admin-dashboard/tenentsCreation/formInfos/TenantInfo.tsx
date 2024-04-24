import { CardContent, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RequiredStar } from "src/components/required-star";
import { AppState } from "src/store/Store";
import { fetchTenantByIdStart, setSlideTwoFormData } from "src/store/reducers/TenentSlice";
import { generateErrorInitialState } from "src/utils/FormValidate";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomTextField from "src/utils/theme-elements/CustomTextField";

interface SlideOne {
  contactPerson: string;
  alternateContactPerson: string;
  email: string;
  alternateEmail: string;
  phoneNo: string;
  alternatePhoneNo: string;
}
interface tenantInfoProps {
  params: any;
  createFieldHandlersSlideTwo: (fieldName: any) => { onBlur: () => void };
  errors: any;
  // wholeError:any
}
const ContractInfo: React.FC<tenantInfoProps> = ({ params, createFieldHandlersSlideTwo, errors }) => {
  const slideTwo = useSelector((state: AppState) => state.tenent.formData.slideTwo);
  const tenant = useSelector((state: AppState) => state.tenent.tenant);
  const errorInitialState = generateErrorInitialState(slideTwo);
  const [error, setError] = React.useState(errorInitialState);
  // const inputData = useSelector((state: AppState) => state.tenent.formData)
  // const errors = useSelector((state:AppState) => state.tenent.errors);
  // console.log(inputData,"inputData")
  const dispatch = useDispatch();
  const { contactPerson, alternateContactPerson, email, alternateEmail, phoneNo, alternatePhoneNo } = slideTwo;

  // useEffect(() => {
  //   if (params && params.id ) {
  //   dispatch(fetchTenantByIdStart(params.id));
  // }
  // }, [dispatch, params.id]);

  useEffect(() => {
    if (params && params.id && !tenant) {
      dispatch(fetchTenantByIdStart(params.id));
    }
  }, [params.id, tenant]);

  useEffect(() => {
    if (params.id && tenant) {
      const { tenantType } = tenant;
      dispatch(
        setSlideTwoFormData({
          contactPerson: tenant.contactPerson || "",
          alternateContactPerson: tenant.alternateContactPerson || "",
          email: tenant.email || "",
          alternateEmail: tenant.alternateEmail || "",
          phoneNo: tenant.contactNumber || "",
          alternatePhoneNo: tenant.alternateContactNumber || "",
          city: tenant.city || "",
          pincode: tenant.pincode || "",
        }),
      );
    }
  }, [params.id, tenant, dispatch]);


  const handleChange = (e: any) => {
    e.preventDefault();
    const { name, value } = e.target;
    dispatch(setSlideTwoFormData({ [name]: value }));
  };


  // const handleDraft = () => {
  //   const formData = {
  //     slideOne: {
  //       contactPerson,
  //       email,
  //       phoneNo,
  //     },
  //   };
  //   if (contactPerson && email && phoneNo) {
  //     localStorage.setItem("formDataSecondSlide", JSON.stringify(formData));
  //     notifyMessage.success("Saved Draft Successfully");
  //   } else {
  //     notifyMessage.error("Mandatory Fields Are Required");
  //   }
  // };

  const loadDraft = () => {
    const storedFormData = localStorage.getItem("formDataSecondSlide");

    if (storedFormData) {
      const formData = JSON.parse(storedFormData);

      dispatch(setSlideTwoFormData(formData.slideOne));
    }
  };

  useEffect(() => {
    loadDraft();
  }, []);

  return (
    <Grid item xs={12}>
      <CardContent>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-email"
              >
                Contact Person <RequiredStar />
              </CustomFormLabel>
              <CustomTextField
                id="text-email"
                variant="outlined"
                name="contactPerson"
                error={!!errors.contactPerson}
                {...createFieldHandlersSlideTwo("contactPerson")}
                helperText={errors.contactPerson}
                // onFocus={handleFocusError}
                // onBlur={handleBlurError}
                value={contactPerson}
                fullWidth
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-email"
              >
                Alternate Contact Person
              </CustomFormLabel>
              <CustomTextField id="text-email" variant="outlined" name="alternateContactPerson" value={alternateContactPerson} fullWidth onChange={handleChange} />
            </Grid>

            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                {/* <Grid item lg={6} xs={12}> */}
                <Grid item xs={12} lg={6}>
                  <CustomFormLabel sx={{ mt: 0 }}>
                    Email <RequiredStar />
                  </CustomFormLabel>
                  <Grid sx={{ display: "flex", alignItems: "center", width: "100%", gap: "10px" }}>
                    <CustomTextField
                      sx={{ width: "100%" }}
                      name="email"
                      value={email}
                      error={!!errors.email}
                      helperText={errors.email}
                      {...createFieldHandlersSlideTwo("email")}
                      onChange={handleChange}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <CustomFormLabel sx={{ mt: 0 }}>Alternate Email </CustomFormLabel>
                  <Grid sx={{ display: "flex", alignItems: "center", width: "100%", gap: "10px" }}>
                    <CustomTextField sx={{ width: "100%" }} name="alternateEmail" value={alternateEmail} variant="outlined" onChange={handleChange} fullWidth />
                  </Grid>
                </Grid>
                {/* </Grid> */}
              </Grid>
            </Grid>
            <Grid item xs={12} lg={12}>
              <Grid container spacing={2}>
                {/* <Grid item lg={6} xs={12}> */}

                <Grid item xs={12} lg={6}>
                  <CustomFormLabel sx={{ mt: 0 }}>
                    Phone No.
                    <RequiredStar />
                  </CustomFormLabel>
                  <Grid sx={{ display: "flex", alignItems: "center", width: "100%", gap: "10px" }}>
                    <CustomTextField
                      sx={{ width: "100%" }}
                      name="phoneNo"
                      value={phoneNo}
                      type="number"
                      error={!!errors.phoneNo}
                      helperText={errors.phoneNo}
                      {...createFieldHandlersSlideTwo("phoneNo")}
                      variant="outlined"
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                </Grid>
                <Grid item xs={12} lg={6}>
                  <CustomFormLabel sx={{ mt: 0 }}>Alternate Phone No.</CustomFormLabel>
                  <Grid sx={{ display: "flex", alignItems: "center", width: "100%", gap: "10px" }}>
                    <CustomTextField sx={{ width: "100%" }} name="alternatePhoneNo" value={alternatePhoneNo} variant="outlined" type="number" onChange={handleChange} fullWidth />
                  </Grid>
                </Grid>
                {/* </Grid> */}
              </Grid>
            </Grid>
          </Grid>
        </form>
      </CardContent>
      {/* <Stack direction="row" spacing={2} sx={{ justifyContent: "center", position: "relative", top: "60px" }} mt={3}>
        <Button onClick={handleDraft} variant="contained" color={"secondary"}>
          Draft
        </Button>
      </Stack> */}
    </Grid>
  );
};

export default ContractInfo;
