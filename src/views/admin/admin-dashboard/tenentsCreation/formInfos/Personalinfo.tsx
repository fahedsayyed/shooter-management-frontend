import { Button, CardContent, Grid, MenuItem, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppState } from "src/store/Store";
import { addTenantRequest, fetchTenantByIdStart, setSlideOneFormData } from "src/store/reducers/TenentSlice";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomTextField from "src/utils/theme-elements/CustomTextField";
import states from "src/utils/commonData/statesData";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { RequiredStar } from "src/components/required-star";
import { notifyMessage } from "src/utils/toastNotify";
import { useNavigate, useParams } from "react-router";
import APP_ROUTES from "src/routes/routePaths";
import FileUpload from "src/components/upload-file/UploadFile";

interface SlideOne {
  tenentType: string;
  name: string;
  state: string;
  address: string;
  address2: string;
  address3: string;
  pincode: string;
  city: string;
}
interface PersonalinfoProps {
  params: any;
  createFieldHandlers: (fieldName: keyof SlideOne) => { onBlur: () => void };
  errors: any;
  wholeError: any;
}
const Personalinfo: React.FC<PersonalinfoProps> = ({ params, errors, createFieldHandlers }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slideOne = useSelector((state: AppState) => state.tenent.formData.slideOne);
  const tenant = useSelector((state: AppState) => state.tenent.tenant);

  const response = useSelector((state: AppState) => state.tenent.response);

  const { tenentType, name, state, address, address2, address3, pincode, city } = slideOne;

  const { AssociatedWith }: any = useParams();

  useEffect(() => {
    fetchCityName();
  }, [pincode]);

  useEffect(() => {
    if (params && params.id) {
      dispatch(fetchTenantByIdStart(params.id));
    }
  }, [dispatch, params.id,params]);

  useEffect(() => {
    if (params && params.id && !tenant) {
      dispatch(fetchTenantByIdStart(params.id));
    }
  }, [params.id, tenant,params,dispatch]);

  useEffect(() => {
    if (params.id && tenant) {
      const { tenantType } = tenant;
      dispatch(
        setSlideOneFormData({
          tenentType: tenantType || "",
          name: tenant.name || "",
          state: tenant.state || "",
          address: tenant.address || "",
          address2: tenant.addressTwo || "",
          address3: tenant.addressThree || "",
          city: tenant.city || "",
          pincode: tenant.pincode || "",
        }),
      );
    }
  }, [params.id, tenant, dispatch]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setSlideOneFormData({ [name]: value }));
  };

  const handleDraft: any = async () => {
    if (tenentType && name && state && address && city && pincode) {
      const draftData = {
        tenantType: tenentType,
        name: name,
        state: state,
        address: address,
        city: city,
        pincode: pincode,
        flag: "draft",
      };

      try {
        const response = await dispatch(addTenantRequest(draftData));

        if (response.type) {
          navigate(`${APP_ROUTES.TENANT}`);
        } else {
          notifyMessage.error("Failed to Save Draft");
        }
      } catch (error) {
        notifyMessage.error("Error occurred while saving draft");
        console.error("Error in handleDraft:", error);
      }
    } else {
      notifyMessage.error("Mandatory Fields Are Required");
    }
  };

  const fetchCityName = async () => {
    try {
      const response = await fetch(`https://api.worldpostallocations.com/pincode?postalcode=${pincode}&countrycode=IN`);
      if (response) {
        const data = await response.json();

        // Dispatch the updated city value to the Redux store
        dispatch(setSlideOneFormData({ city: data.result[0].district }));
      }
    } catch (error) {}
  };

  const handleFileUpload1 = (files: File[] | null) => {
    if (files && files.length > 0) {
      // if (files[0].type.startsWith("image")) {
      const updatedData = {
        memoRandomProof: files[0],
        // contractName: files[0].name,
      };
      dispatch(setSlideOneFormData(updatedData));
      // }
    }
  };

  return (
    <>
      <CardContent>
        <form>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6} lg={6}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-location"
              >
                Association Type <RequiredStar />
              </CustomFormLabel>
              <CustomSelect
                fullWidth
                className="custom-select"
                id="tenent-type"
                variant="outlined"
                name="tenentType"
                value={tenentType || ""}
                error={!!errors.tenentType}
                helpertext={errors.tenentType}
                {...createFieldHandlers("tenentType")}
                onChange={(e: any) => handleChange(e)}
                required
              >
                {tenantTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </CustomSelect>
            </Grid> */}

            {tenentType === "state" ? (
              <>
                <Grid item xs={12} md={6} lg={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                      // width: '50%'
                    }}
                    htmlFor="text-location"
                  >
                    {AssociatedWith.charAt(0).toUpperCase()}
                    {AssociatedWith.slice(1)} Name <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-name"
                    name="name"
                    value={name}
                    // error={!!error.clubName}
                    // helperText={errors.clubName}
                    error={!!errors.name}
                    helperText={errors.name}
                    {...createFieldHandlers("name")}
                    // {...createFieldHandlers("clubName")}
                    // helperText={hasUserInteracted ? errors.clubName : ''}
                    // onFocus = {handleFocusError}
                    // onBlur={handleBlurError}
                    className="custom-select"
                    variant="outlined"
                    fullWidth
                    // onBlur={validateForm}
                    onChange={handleChange}
                  />
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm={6} lg={6}>
                  <CustomFormLabel
                    sx={{
                      mt: 0,
                    }}
                    htmlFor="text-name"
                  >
                    {AssociatedWith.charAt(0).toUpperCase()}
                    {AssociatedWith.slice(1)} Name <RequiredStar />
                  </CustomFormLabel>
                  <CustomTextField
                    id="text-name"
                    className="custom-select"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={name}
                    error={!!errors.name}
                    helperText={errors.name}
                    {...createFieldHandlers("name")}
                    // {...createFieldHandlers("detailone")}
                    // helperText={errors.clubName}
                    // onFocus = {handleFocusError}
                    // onBlur={handleBlurError}
                    onChange={handleChange}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} md={6} lg={6} sx={{ height: "45px" }}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-location"
              >
                Select State <RequiredStar />
              </CustomFormLabel>
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                sx={{ height: "40px" }}
                options={states}
                getOptionLabel={(option) => option.name}
                value={states.find((s) => s.name === state) || null}
                onChange={(event, newValue) => {
                  const selectedState = newValue ? newValue.name : "";
                  dispatch(setSlideOneFormData({ state: selectedState }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    error={!!errors.state}
                    helperText={errors.state}
                    {...createFieldHandlers("state")}
                    // label="Select State"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-address"
              >
                Address <RequiredStar />
              </CustomFormLabel>
              <CustomTextField
                id="text-address"
                name="address"
                value={address}
                error={!!errors.address}
                helperText={errors.address}
                {...createFieldHandlers("address")}
                // helperText={errors.address}
                // onFocus = {handleFocusError}
                // onBlur={handleBlurError}
                variant="outlined"
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-address"
              >
                Address 2 (optional)
              </CustomFormLabel>
              <CustomTextField id="text-address2" name="address2" value={address2} variant="outlined" onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-address"
              >
                Address 3 (optional)
              </CustomFormLabel>
              <CustomTextField id="text-address3" name="address3" value={address3} onChange={handleChange} variant="outlined" fullWidth />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-address"
              >
                Pincode <RequiredStar />
              </CustomFormLabel>
              <CustomTextField
                id="text-address3"
                name="pincode"
                type="number"
                error={!!errors.pincode}
                helperText={errors.pincode}
                {...createFieldHandlers("pincode")}
                // helperText={errors.pincode}
                // onFocus = {handleFocusError}
                // onBlur={handleBlurError}
                value={pincode}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={6}>
              <CustomFormLabel
                sx={{
                  mt: 0,
                }}
                htmlFor="text-address"
              >
                City <RequiredStar />
              </CustomFormLabel>
              <CustomTextField
                id="text-address3"
                name="city"
                value={city}
                error={!!errors.city}
                helperText={errors.city}
                {...createFieldHandlers("city")}
                // helperText={errors.city}
                // onFocus = {handleFocusError}
                // onBlur={handleBlurError}
                onChange={handleChange}
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} md={6} mt={0} mb={2}>
              <FileUpload
                title="Memorandum Proof"
                required={true}
                onFileUpload={handleFileUpload1}
                /* editFiles={tenant.memoRandomProof} */ name="memoRandomProof"
                viewUploaded={tenant.memoRandomProof}
              />
            </Grid>
          </Grid>
        </form>
      </CardContent>
      <Stack direction="row" spacing={2} sx={{ justifyContent: "center", position: "relative", top: "60px" }} mt={3}>
        <Button onClick={handleDraft} variant="contained" color={"secondary"}>
          Draft
        </Button>
      </Stack>
    </>
  );
};

export default Personalinfo;
