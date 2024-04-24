import React, { useEffect, useState } from "react";
import { Grid, InputAdornment, MenuItem, FormControl, FormHelperText } from "@mui/material";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import { IconMail, IconCalendarEvent } from "@tabler/icons";
import CustomSelect from "src/utils/theme-elements/CustomSelect";
import ChampionshipGenearative from "src/components/ChampionshipGenerative";
import { useParams } from "react-router";
import { RequiredStar } from "src/components/required-star";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import validateForm, { generateErrorInitialState } from "src/utils/FormValidate";
import { setCompetitionData } from "src/store/championship-reducer/addCompetitionFormSlice";
import { useDispatch } from "../../../store/Store";
import FileUpload from "src/components/upload-file/UploadFile";
import { getAllCompetitionCategories, getAllDistricts, getAllPreferredLocations, getCompetitionById } from "../ChampionshipUtils/functionUtils";
import { formatDate } from "src/utils/basicFormaters";

type CompetitionCategory = {
  id: number;
  category_name: string;
  is_national: boolean | null;
};

type District = {
  name: string;
};

type Preferred = {
  id: number;
  name: string;
};

interface Organiser {
  secretary_name: string;
  post: string;
}

interface AddCompetitionSlide1Props {
  step?: any;
  checkError: (fieldName: any) => void;
  wholeError: () => void;
  createFieldHandlers: any;
  error: any;
}
const AddCompetitionSlide1: React.FC<AddCompetitionSlide1Props> = ({ step, checkError, wholeError, createFieldHandlers, error }) => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [competitionCategories, setCompetitionCategories] = useState<CompetitionCategory[]>([]);
  const [districts, setDistrict] = useState<District[]>([]);
  const [preferred, setPreferred] = useState<Preferred[]>([]);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getAllCompetitionCategories();
        const district = await getAllDistricts();
        const preferrd = await getAllPreferredLocations();
        setCompetitionCategories(categories);
        setDistrict(district);
        setPreferred(preferrd);
      } catch (error) {
        console.error("Failed to fetch competition categories", error);
      }
    };

    fetchData();
  }, []);

  const [detail, setDetail] = React.useState<any>({
    comp_code: "",
    name: "",
    place: "",
    conducted_by: "",
    category_name: "",
    target_type: "",
    detail_creation: "",
    late_fee_end_date: "",
    reg_start_date: "",
    reg_end_date: "",
    cut_off_date: "",
    from_date: "",
    to_date: "",
    district: "",
    organisers: [{ secretary_name: "", post: "" }],
    in_MQS_applicable: "",
    preferred_loc: [{ id: 0, name: "" }],
    circular: "",
  });

  const errorInitialState: any = generateErrorInitialState(detail);

  const fetchCompetitionData = async () => {
    try {
      if (id) {
        //console.log(id, "for id");
        const compId = parseInt(id, 10);
        const compData: any = await getCompetitionById(compId);
        //const preferredLocArray = Object.values(compData.preferredLocations);
        console.log(compData, "id data");

        //setDetail(compData);
        setDetail((prevDetail: any) => ({
          ...prevDetail,
          comp_code: compData.comp_code,
          name: compData.name,
          place: compData.place,
          conducted_by: compData.conducted_by,
          category_name: compData.category_name,
          target_type: compData.target_type,
          detail_creation: compData.detail_creation,
          late_fee_end_date: formatDate(compData.late_fee_end_date),
          reg_start_date: formatDate(compData.reg_start_date),
          reg_end_date: formatDate(compData.reg_end_date),
          cut_off_date: formatDate(compData.cut_off_date),
          from_date: formatDate(compData.from_date),
          to_date: formatDate(compData.to_date),
          district: compData.district_name,
          organisers: compData.secretaries.map((secretary: any) => ({
            secretary_name: secretary.secratery_name,
            post: secretary.post,
          })),
          in_MQS_applicable: compData.in_MQS_applicable,
          preferred_loc: compData.preferredLocations.map((loc: any) => ({
            id: loc.id,
            name: loc.name,
          })),
          circular: compData.circular,
        }));
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  console.log(detail.organisers, "det");

  useEffect(() => {
    if (id) {
      fetchCompetitionData();
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name.includes("Date") ? new Date(value) : value;

    if (name === "preferred_loc") {
      const selectedLocationIds = Array.isArray(value) ? value.map(Number) : [Number(value)];
      const selectedLocations = preferred.filter((loc) => selectedLocationIds.includes(loc.id));
      setDetail((prevDetail: any) => ({ ...prevDetail, [name]: selectedLocations }));
      dispatch(setCompetitionData({ ...detail, [name]: selectedLocations }));
    } else {
      setDetail((prevDetail: any) => ({ ...prevDetail, [name]: parsedValue }));
      dispatch(setCompetitionData({ ...detail, [name]: parsedValue }));

      // setError({});
      // setError((prev: any) => ({ ...prev, [name]: "" }));

      const checkDateRange = (startDate: string, endDate: string, errorMessage: string) => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (new Date(value) <= start || new Date(value) >= end) {
          handleCustomError(name, errorMessage);
        } else {
          handleCustomError(name, "");
        }
      };

      if (name === "to_date" && detail.from_date) {
        checkDateRange(detail.from_date, value, "To date should be greater than from date");
      }

      if (name === "reg_end_date" && detail.from_date && detail.reg_start_date) {
        checkDateRange(detail.reg_start_date, detail.from_date, "Registration end date should be greater than registration start date and less than From Date");
      }

      if (name === "reg_start_date" && detail.from_date && detail.reg_end_date) {
        checkDateRange(detail.from_date, detail.reg_end_date, "Registration start date should be less than from date");
      }

      if (name === "late_fee_end_date" && detail.from_date && detail.reg_end_date) {
        checkDateRange(detail.reg_end_date, detail.from_date, "Late fee end date should be greater than registration end date and less than From Date.");
      }
    }
  };

  const handleCustomError = (fieldName: string, errorMessage: string) => {
    // setError((prevErrors: any) => ({ ...prevErrors, [fieldName]: errorMessage }));
    console.log(`Custom error for ${fieldName}: ${errorMessage}`);
  };

  useEffect(() => {}, [error]);

  const handleFileUpload = (files: File[] | null) => {
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("circular", files[0]);
      setFormData(formData);
      setDetail((prevDetail: any) => ({
        ...prevDetail,
        circular: files[0],
      }));
    }
  };

  console.log(detail.circular, "file");

  // useEffect(() => {
  //   if (step > 0) {
  //     wholeError();
  //   }
  //   console.log(step);
  // }, [step]);

  const handleOrganisersChange = (organisers: Organiser[]) => {
    const updatedData = {
      ...detail,
      organisers,
    };

    setDetail(updatedData);
    dispatch(setCompetitionData(updatedData));
  };

  return (
    <Grid container spacing={3} marginTop={2}>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <FormControl error={!!error.category_name} fullWidth>
              <CustomFormLabel sx={{ mt: 0 }} htmlFor="country-text">
                Competition Category
                <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                id="country-select"
                className="custom-select"
                name="category_name"
                value={detail.category_name}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                // helperText={error.category_name}
                error={!!error.category_name}
                {...createFieldHandlers("category_name")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {competitionCategories.map((category) => (
                  <MenuItem key={category.id} value={category.category_name}>
                    {category.category_name}
                  </MenuItem>
                ))}
              </CustomSelect>
              {/* {error.category_name && <FormHelperText>Select Compition Category is required</FormHelperText>} */}
              <FormHelperText>{error.category_name}</FormHelperText>
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={6}>
            <CustomFormLabel htmlFor="bi-name" sx={{ mt: 0 }}>
              Competition Name
              <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="bi-name"
              name="name"
              placeholder="Competition Name "
              onChange={handleInputChange}
              fullWidth
              value={detail.name}
              error={!!error.name}
              helperText={error.name && "Competition Name is required"}
              {...createFieldHandlers("name")}
            />
          </Grid>
          {/* 2 */}
          <Grid item xs={12} lg={6}>
            <CustomFormLabel htmlFor="bi-competitioncode">
              {" "}
              Competition Code <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="bi-name"
              name="comp_code"
              onChange={handleInputChange}
              placeholder=" Competition Code"
              fullWidth
              value={detail.comp_code}
              error={!!error.comp_code}
              helperText={error.comp_code && "Competition code is required"}
              {...createFieldHandlers("comp_code")}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <FormControl error={!!error.in_MQS_applicable} fullWidth>
              <CustomFormLabel htmlFor="mqs">
                Is MQS applicable? <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                id="mqs"
                className="custom-select"
                name="in_MQS_applicable"
                value={detail.in_MQS_applicable}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                error={!!error.in_MQS_applicable}
                // helperText={error.mqs}
                {...createFieldHandlers("in_MQS_applicable")}
              >
                <MenuItem value="No">No</MenuItem>
                <MenuItem value="Yes">Yes</MenuItem>
              </CustomSelect>
              {error.in_MQS_applicable && <FormHelperText>Select applicable mqs is required</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={6}>
            <FormControl error={!!error.target_type} fullWidth>
              <CustomFormLabel htmlFor="target">
                Target Type <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                select
                id="target"
                className="custom-select"
                name="target_type"
                value={detail.target_type}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                helperText={error.target_type}
                {...createFieldHandlers("target_type")}
              >
                <MenuItem value="EST">EST</MenuItem>
                <MenuItem value="PaperTarget">Paper Target</MenuItem>
              </CustomSelect>
              {error.target_type && <FormHelperText>Select Target Type is required</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={6}>
            <FormControl error={!!error.detail_creation} fullWidth>
              <CustomFormLabel htmlFor="creation">
                Detail Creation <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                id="creation"
                className="custom-select"
                name="detail_creation"
                value={detail.detail_creation}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                helperText={error.detail_creation}
                {...createFieldHandlers("detail_creation")}
              >
                <MenuItem value="Mannual">Mannual</MenuItem>
                <MenuItem value="Automation">Automation</MenuItem>
              </CustomSelect>
              {error.detail_creation && <FormHelperText>Select Detail is required</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={6}>
            <CustomFormLabel htmlFor="bi-dob">
              From Date <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconCalendarEvent size="20" />
                </InputAdornment>
              }
              id="bi-fromdate"
              type="Date"
              name="from_date"
              placeholder=""
              onChange={handleInputChange}
              fullWidth
              value={detail.from_date}
              error={!!error.from_date}
              helperText={error.from_date}
              {...createFieldHandlers("from_date")}
            />
          </Grid>
          <Grid item xs={12} lg={6}>
            <CustomFormLabel htmlFor="bi-dob">
              To Date <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconCalendarEvent size="20" />
                </InputAdornment>
              }
              id="bi-todate"
              type="Date"
              name="to_date"
              placeholder=""
              onChange={handleInputChange}
              fullWidth
              value={detail.to_date}
              error={!!error.to_date}
              helperText={error.to_date}
              {...createFieldHandlers("to_date")}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <CustomFormLabel htmlFor="bi-dob">
              Registration Starts From <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconCalendarEvent size="20" />
                </InputAdornment>
              }
              id="bi-registrationstart"
              type="Date"
              name="reg_start_date"
              placeholder=""
              onChange={handleInputChange}
              fullWidth
              value={detail.reg_start_date}
              error={!!error.reg_start_date}
              helperText={error.reg_start_date}
              {...createFieldHandlers("reg_start_date")}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <CustomFormLabel htmlFor="bi-dob">
              Registration Ends On <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconCalendarEvent size="20" />
                </InputAdornment>
              }
              id="bi-registrationend"
              type="Date"
              name="reg_end_date"
              placeholder=""
              onChange={handleInputChange}
              fullWidth
              value={detail.reg_end_date}
              error={!!error.reg_end_date}
              helperText={error.reg_end_date}
              {...createFieldHandlers("reg_end_date")}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <CustomFormLabel htmlFor="bi-dob">
              Age Eligibility Date <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconCalendarEvent size="20" />
                </InputAdornment>
              }
              id="bi-eligibility"
              type="Date"
              name="cut_off_date"
              placeholder=""
              onChange={handleInputChange}
              fullWidth
              value={detail.cut_off_date}
              error={!!error.cut_off_date}
              helperText={error.cut_off_date}
              {...createFieldHandlers("cut_off_date")}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <CustomFormLabel htmlFor="bi-latefee">
              Late Fee End Date <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconCalendarEvent size="20" />
                </InputAdornment>
              }
              id="bi-latefee"
              type="Date"
              name="late_fee_end_date"
              placeholder=""
              onChange={handleInputChange}
              fullWidth
              value={detail.late_fee_end_date}
              error={!!error.late_fee_end_date}
              helperText={error.late_fee_end_date}
              {...createFieldHandlers("late_fee_end_date")}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <CustomFormLabel htmlFor="bi-place">
              Place <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              id="bi-place"
              name="place"
              onChange={handleInputChange}
              placeholder=""
              fullWidth
              value={detail.place}
              error={!!error.place}
              helperText={error.place}
              {...createFieldHandlers("place")}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <CustomFormLabel htmlFor="bi-conductedby">
              Conducted By <RequiredStar />
            </CustomFormLabel>
            <CustomTextField
              startadornment={
                <InputAdornment position="start">
                  <IconMail size="20" />
                </InputAdornment>
              }
              id="bi-conductedby"
              placeholder=""
              name="conducted_by"
              fullWidth
              onChange={handleInputChange}
              value={detail.conducted_by}
              error={!!error.conducted_by}
              helperText={error.conducted_by && "Conducted By is required"}
              {...createFieldHandlers("conducted_by")}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <FormControl error={!!error.district} fullWidth>
              <CustomFormLabel htmlFor="District">
                Select District <RequiredStar />
              </CustomFormLabel>

              <CustomSelect
                id="district"
                className="custom-select"
                name="district"
                value={detail.district}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                helperText={error.district}
                {...createFieldHandlers("district")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {districts.map((district) => (
                  <MenuItem key={district.name} value={district.name}>
                    {district.name}
                  </MenuItem>
                ))}
              </CustomSelect>

              {error.district && <FormHelperText>Select District (this field is required)</FormHelperText>}
            </FormControl>
          </Grid>

          <Grid item xs={12} lg={6}>
            <FormControl error={!!error.preferred_loc} fullWidth>
              <CustomFormLabel htmlFor="Preferrd Location">
                Select Preferrd Location <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                id="preferrd"
                multiple
                className="custom-select"
                name="preferred_loc"
                value={detail.preferred_loc.map((loc: any) => loc.id)}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                helperText={error.preferred_loc}
                {...createFieldHandlers("preferred_loc")}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 300,
                    },
                  },
                }}
              >
                {preferred.map((location) => (
                  <MenuItem key={location.id} value={location.id}>
                    {location.name}
                  </MenuItem>
                ))}
              </CustomSelect>
              {console.log("Error for preferred_loc:", error.preferred_loc)}
              {error.preferred_loc && <FormHelperText>Select Preferrd Location is required</FormHelperText>}
            </FormControl>
          </Grid>

          {/* 5 upload-files */}
          <Grid item xs={12}>
            <Grid item xs={12} md={6}>
              <FileUpload title="Circular" name="circular" required={true} onFileUpload={handleFileUpload} editFiles={null} />
            </Grid>
          </Grid>

          <ChampionshipGenearative step={step} onOrganisersChange={handleOrganisersChange} initialOrganisers={detail.organisers} />
        </Grid>
      </Grid>

      {/* //second side-- */}
    </Grid>
  );
};

export default AddCompetitionSlide1;
