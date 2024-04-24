import React, { useState, useEffect } from "react";
import { Button, Grid, Chip, InputAdornment, RadioGroup, Stack, Switch, Typography } from "@mui/material";
import AlertBox from "src/layouts/full/shared/AlertBox/AlertBox";
import CustomFormLabel from "src/utils/theme-elements/CustomFormLabel";
import CustomOutlinedInput from "src/utils/theme-elements/CustomOutlinedInput";
import { IconCalendar } from "@tabler/icons-react";
import DataTable from "src/components/table/TableComponent";
import RemoveRedEyeTwoToneIcon from "@mui/icons-material/RemoveRedEyeTwoTone";
import { GridColDef } from "@mui/x-data-grid";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import { pushSlideThreeToContract, setSlideThreeFormData } from "src/store/reducers/TenentSlice";
import { RequiredStar } from "src/components/required-star";
import { useDispatch } from "react-redux";
import FileUpload from "src/components/upload-file/UploadFile";

interface DataRow {
  id: number;
  contract_image: string;
  documentName: string;
  contract_status?: any;
  contract_start_date: string;
  contract_end_date: string;
}

interface ContractInfoProps {
  disabled: boolean;
  params : any;
  // createFieldHandlersSlideTwo: (fieldName: keyof SlideTwoInterface) => { onBlur: () => void };
  // errors: any;
  // wholeError:any
}

const AddressInfo: React.FC<ContractInfoProps> = ({ disabled,params }) => {
  const slideThree = useSelector((state: AppState) => state.tenent.formData.slideThree);
  const [alertOpen, setAlertOpen] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [data, setData] = useState<DataRow[]>([]);

  const [editData, setEditData] = useState<DataRow>({ id: 0, contract_image: "", contract_status: "", contract_start_date: "", contract_end_date: "", documentName: "" });
  const dispatch = useDispatch();

  const tenantList = useSelector((state: AppState) => state.tenent.tenantList);
  const tenant = useSelector((state: AppState) => state.tenent.tenant);
  const contract = useSelector((state:AppState)=>state.tenent.contract)
  const {tenant_id} = tenant
 
  const filtered = tenantList.filter((tnt: any) => tnt.id === tenant_id);

  const { contract_document, contractName, contractStatus, contract_start_date, contract_end_date } = slideThree;
 
  useEffect(() => {
    if(params && params.id ){
  
    // dispatch(fetchTenantByIdStart(params.id));
    // dispatch(fetchTenantListStart());

    }

    setData(tenant)
  }, [dispatch, params.id]);



  useEffect(() => {
    if (params.id && tenant) {
      // const { tenantType } = tenant;
  
      dispatch(
        setSlideThreeFormData({
          // contractName: filtered[0].contractName || "",
          // contract_status: filtered[0].contractStatus || "",
          // contract_start_date: filtered[0].contract_start_date || "",
          // contract_end_date: filtered[0].contract_end_date || "",
          // contract_document: filtered[0].contract_document || "", // Include this line
        }),
      );
    }
  }, [params.id, tenant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setSlideThreeFormData({ [name]: value }));
  };

  const handleChangeForEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditData((prevEditData) => ({
      ...prevEditData,
      [name]: value,
    }));
  };

  const handleOpenAlert = () => {
    setAlertOpen(true);
  };

  const showEditModal = () => {
    setEditModal(true);
  };

  const closeEditAlert = () => {
    setEditModal(false);
  };

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  const handleCloseImageModal = () => {
    setImageModal(false);
  };

  const handleConfirmAction = () => {
    const newData: any = {  
      contract_document: contract_document,
      contractStatus: contractStatus,
      contract_start_date: contract_start_date,
      contract_end_date: contract_end_date,
      contractName: contractName,
    };
     dispatch(setSlideThreeFormData(newData));
    dispatch(
      pushSlideThreeToContract({
        id: contract.length + 1,
        ...newData,
      })
    );
    // dispatch(
    //   setSlideThreeFormData({
    //     contractDocument: "",
    //     contractStatus: "",
    //     contract_start_date: "",
    //     contract_end_date: "",
    //   }),contract_document
    // );
    handleCloseAlert();
  };

  const handleCloseEditAlert = () => {
    setEditModal(false);
  };

  const handleConfirmEditAction = () => {
    const updatedData = data.map((item) => (item.id === editData.id ? { ...item, ...editData } : item));

    setData(updatedData);
    handleCloseEditAlert();
  };

  const handleConfirmActionImageModal = () => {
    setImageModal(false);
  };

  const handleStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSlideThreeFormData({ contractStatus: e.target.checked ? 'active' : 'inactive' }));
  };
  console.log(contractStatus,"contractStas")
  const handleStatusForEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditData((prevEditData) => ({
      ...prevEditData,
      contract_status: e.target.checked ? 'active' : 'inActive',
    }));
  };



  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "contractName", headerName: "Document Name", width: 200 },
    { field: "contract_start_date", headerName: "Contract Start Date", width: 200 },
    { field: "contract_end_date", headerName: "Contract End Date", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Chip label="View Doc" onClick={() => handleClick(params.row.contract_document)} onDelete={() => handleClick(params.row.contract_document)} deleteIcon={<RemoveRedEyeTwoToneIcon />} />
        </>
      ),
    },
  ];

  const handleClick = (row: any) => {
    showEditModal();
    setEditData(row);
    handleFileUpload1(row);
  };

  const handleFileUpload1 = (files: File[] | null) => {
    console.log(files,"files")

    if (files && files.length > 0) {
      // if (files[0].type.startsWith("image")) {
        const updatedData = {
          contract_document: files[0],
          contractName: files[0].name,
        };
        dispatch(setSlideThreeFormData(updatedData));
      // }
    }
  };


  const handleFileUploadForEdit = (files: File[] | null) => {
    console.log(files, "files files");

    if (files && files.length > 0) {
      if (files[0].type.startsWith("image")) {
        const updatedData = {
          contract_document: files[0],
        };

        setEditData((prev:any) => ({
          ...prev,
          ...updatedData,
        }));

        // dispatch(setSlideThreeFormData(updatedData));
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sx={{ marginTop: "35px", display: "flex", justifyContent: "flex-end" }}>
       <LoadingButton variant="outlined" onClick={handleOpenAlert}>
          Upload
        </LoadingButton>
  
        <AlertBox
          open={imageModal}
          title="Image"
          buttonText="Close"
          disabled={false}
          message={
            <div>
              {/* Your content goes here */}
            </div>
          }
          onClose={handleCloseImageModal}
          onConfirm={handleConfirmActionImageModal}
        />
        <AlertBox
          open={editModal}
          title="Edit Document"
          buttonText="Edit"
          disabled={false}
          message={
            <div>
              <Grid item xs={12} md={6}>
                <FileUpload title="Contract" required={true} onFileUpload={handleFileUploadForEdit} editFiles={tenant.contract_document} name="contract_document" />
              </Grid>
  
              <Grid item xs={12} md={6}>
                <Grid sx={{ marginTop: "25px" }}>
                  <Typography variant="subtitle2" marginBottom={0.8} sx={{}}>
                    Contract Status <RequiredStar />
                  </Typography>
                  <RadioGroup row aria-label="position" name="areYouArjunaAwardee" defaultValue="top">
                    <Switch onChange={handleStatusForEdit} value={tenant.contractStatus} name="contractStatus" checked={tenant.contractStatus} />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container sx={{ display: "flex", flexDirection: "row" }}>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="passport-issue">
                    {" "}
                    Contract start date <RequiredStar />
                  </CustomFormLabel>
                  <CustomOutlinedInput
                    startadornment={
                      <InputAdornment position="start">
                        <IconCalendar size="20" />
                      </InputAdornment>
                    }
                    id="bi-passport"
                    placeholder="Issue Date .."
                    type="Date"
                    className="custom-select"
                    fullWidth
                    name="contract_start_date"
                    value={tenant.contract_start_date}
                    onChange={handleChangeForEdit}
                    sx={{ width: "45%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="passport-issue">
                    {" "}
                    Contract end date <RequiredStar />
                  </CustomFormLabel>
                  <CustomOutlinedInput
                    startadornment={
                      <InputAdornment position="start">
                        <IconCalendar size="20" />
                      </InputAdornment>
                    }
                    id="bi-passport"
                    placeholder="Issue Date .."
                    type="Date"
                    className="custom-select"
                    fullWidth
                    name="contract_end_date"
                    value={tenant.contract_end_date}
                    onChange={handleChangeForEdit}
                    sx={{ width: "45%" }}
                  />
                </Grid>
              </Grid>
              <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }} mt={3}>
                <Button variant="contained" color={"secondary"}>
                  Draft
                </Button>
              </Stack>
            </div>
          }
          onClose={closeEditAlert}
          onConfirm={handleConfirmEditAction}
        />
        <AlertBox
          open={alertOpen}
          title="Contract"
          buttonText="confirm"
          disabled={disabled}
          message={
            <div>
              <Grid item xs={12} md={6}>
                <FileUpload title="Contract File" required={true} onFileUpload={handleFileUpload1} name="contract_document" />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid sx={{ marginTop: "25px" }}>
                  <Typography variant="subtitle2" marginBottom={0.8}>
                    Contract Status <RequiredStar />
                  </Typography>
                  <RadioGroup row aria-label="position" name="areYouArjunaAwardee" defaultValue="top">
                    <Switch onChange={handleStatus} value={contractStatus} name="contractStatus" />
                  </RadioGroup>
                </Grid>
              </Grid>
              <Grid container sx={{ display: "flex", flexDirection: "row" }}>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="passport-issue">
                    {" "}
                    Contract start date <RequiredStar />
                  </CustomFormLabel>
                  <CustomOutlinedInput
                    startadornment={
                      <InputAdornment position="start">
                        <IconCalendar size="20" />
                      </InputAdornment>
                    }
                    id="bi-passport"
                    placeholder="Issue Date .."
                    type="Date"
                    className="custom-select"
                    fullWidth
                    name="contract_start_date"
                    value={contract_start_date}
                    onChange={handleChange}
                    sx={{ width: "45%" }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <CustomFormLabel htmlFor="passport-issue">
                    {" "}
                    Contract end date <RequiredStar />
                  </CustomFormLabel>
                  <CustomOutlinedInput
                    startadornment={
                      <InputAdornment position="start">
                        <IconCalendar size="20" />
                      </InputAdornment>
                    }
                    id="bi-passport"
                    placeholder="Issue Date .."
                    type="Date"
                    className="custom-select"
                    fullWidth
                    name="contract_end_date"
                    value={contract_end_date}
                    onChange={handleChange}
                    sx={{ width: "45%" }}
                  />
                </Grid>
              </Grid>
              <Stack direction="row" spacing={2} sx={{ justifyContent: "center" }} mt={3}>
                <Button variant="contained" color={"secondary"}>
                  Draft
                </Button>
              </Stack>
            </div>
          }
          onClose={handleCloseAlert}
          onConfirm={handleConfirmAction}
        />
      </Grid>
      <Grid item md={12}>
        {params.id ? <DataTable rows={filtered} columns={columns} /> : <DataTable rows={contract} columns={columns} />}
      </Grid>
    </Grid>
  );
  
  
};

export default AddressInfo;
