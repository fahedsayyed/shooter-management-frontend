import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import APP_ROUTES from "src/routes/routePaths";
import { setSlideOneFormData, setSlideThreeFormData, setSlideTwoFormData } from "src/store/reducers/TenentSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";
import { resetDetailsState } from "src/store/reducers/detailsSlice";

interface PropType {
  title: string;
  handleOpenAlert?: (() => void) | undefined;
}

interface RouteConfig {
  route: string;
  addButtonText?: string;
  showBackButton?: any;
  onAddClick?: () => void;
}

const TableHead = ({ title, handleOpenAlert }: PropType) => {
  const location: any = useLocation();
  const dispatch = useDispatch();
  const pathname = location.pathname;
  const navigate = useNavigate();

  const comp_id = useSelector((state: AppState) => state.competition.competitionId);

  const onNavigateToRegisterTenanant = () => {
   
    navigate(`${APP_ROUTES.SUPER_ADMIN}`);
  };

  // const [previousRoute, setPreviousRoute] = useState<string | null>(null);

  // useEffect(() => {
  //   if (location.state && location.state.from) {
  //     setPreviousRoute(location.state.from);
  //   }
  // }, [location.state]);

  const navigateToCreateDetail = () => {
    dispatch(resetDetailsState());
    navigate(`${APP_ROUTES.DETAILS}/create/${comp_id}`);
  };

  const handleNavigateToTenant = (item:any) =>{
    dispatch(
      setSlideOneFormData({
        tenentType: "",
        name: "",
        state: "",
        address: "",
        address2: "",
        address3: "",
        city: "",
        pincode: "",
      }),
    );
    dispatch(
      setSlideTwoFormData({
        contactPerson: "",
        alternateContactPerson: "",
        email: "",
        alternateEmail: "",
        phoneNo: "",
        alternatePhoneNo: "",
      }),
    );
    dispatch(
      setSlideThreeFormData({
        subscriptionAndPlanId :"",
        transactionNumber:"",

      }),
    );
    navigate(`${APP_ROUTES.SUPER_ADMIN}/${item}`)

    
  }

  const routeConfigs: RouteConfig[] = [
    {
      route: APP_ROUTES.ADMIN_DASHBOARD,
      addButtonText: "Add",
    },
    {
      route: `${APP_ROUTES.SAFETY_COURSE}/safety-course-list`,
      addButtonText: "Create Safety Course",
      onAddClick: () => navigate(`${APP_ROUTES.SAFETY_COURSE}/safety-course-list/create`),
    },
    {
      route: APP_ROUTES.USERS,
      addButtonText: "Add",
      onAddClick: () => navigate(`${APP_ROUTES.USERS}/add-user`),
    },
    {
      route: APP_ROUTES.DRA_CLUB_RU_REGISTER,
      addButtonText: "ADD RC/DRA/RU",
      onAddClick: () => navigate(`${APP_ROUTES.DRA_CLUB_RU_REGISTER}/create`),
    },
    {
      route: APP_ROUTES.DETAILS,
      addButtonText: "CREATE DETAILS",
      onAddClick: () => navigateToCreateDetail(),
    },
    {
      route: APP_ROUTES.RAILWAY_CONCESSION_CERTIFICATE,
      addButtonText: "CREATE RAILWAY CONCESSION",
      onAddClick: () => navigate(`${APP_ROUTES.RAILWAY_CONCESSION_CERTIFICATE}/create`),
    },
    {
      route: APP_ROUTES.COACHING_CAMP,
      addButtonText: "Add",
      onAddClick: () => navigate(`${APP_ROUTES.COACHING_CAMP}/add-coaching-camp`),
    },
    {
      route: APP_ROUTES.AWARDEES,
      addButtonText: "Add",
      onAddClick: () => navigate(`${APP_ROUTES.AWARDEES}/add-Awardee`),
    },
    {
      route: `${APP_ROUTES.AWARDEES}/add-Awardee`,
      addButtonText: "Back",
      onAddClick: () => navigate(`${APP_ROUTES.AWARDEES}`),
    },
    {
      route: APP_ROUTES.STS_PAYMENT_REPORT,
      addButtonText: "Back",
      onAddClick: () => window.history.back(),
    },
    // {
    //   route: APP_ROUTES.TENANT,
    //   addButtonText: "Add",
    //   onAddClick: () => onNavigateToRegisterTenanant(),
    // },
    {
      route: `${APP_ROUTES.MASTERS}/payment-master`,
      addButtonText: "Add",
      onAddClick: () => navigate(`${APP_ROUTES.MASTERS}/create-master-payment`),
    },

    {
      route: APP_ROUTES.RECORDS,
      addButtonText: "Show Listing",
      onAddClick: () => navigate(`${APP_ROUTES.RECORDS}/show-records`),
    },
    {
      route: `${APP_ROUTES.RECORDS}/show-records`,
      addButtonText: "Add Record",
      onAddClick: () => navigate(`${APP_ROUTES.RECORDS}`),
    },
    {
      route: `${APP_ROUTES.SCORE_ENTRY}`,
      addButtonText: "Add Record",
      onAddClick: () => handleOpenAlert && handleOpenAlert(),
    },
    {
      route: ` ${APP_ROUTES.ALL_UPCOMING_MATCH_PARTICIPATION}/view-shooter-match-participation/:id`,
      addButtonText: "Back",
      onAddClick: () => window.history.back(),
    },
  ];

  const routeConfig = routeConfigs.find((config) => config.route === pathname);

  const TenantPath = window.location.pathname

  return (
    <Box
      padding={1}
      sx={{
        background: "#ECF2FF",
        paddingY: "24px",
        paddingX: "15px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      <Typography variant="h5">{title}</Typography>
      {TenantPath === APP_ROUTES.TENANT ? (
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState: any) => (
            <React.Fragment>
              <Button variant="contained" {...bindTrigger(popupState)}>
                Add
              </Button>
              <Menu {...bindMenu(popupState)} /* onClick={()=>handleNavigateToTenant()} */>
                <MenuItem onClick={() => handleNavigateToTenant('state')}> State </MenuItem>
                <MenuItem onClick={() => handleNavigateToTenant('club')}> Club </MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      ) : (
        <>
          {routeConfig && (
            <Stack direction="row" spacing={2}>
              <LoadingButton
                startIcon={
                  routeConfig.addButtonText === "Add" ? <AddIcon /> : null
                }
                variant="contained"
                onClick={routeConfig.onAddClick}
              >
                {routeConfig.addButtonText}
              </LoadingButton>
              {/* Uncomment this section if needed */}
              {/* {routeConfig.showBackButton && (
                <Button
                  variant="outlined"
                  sx={{ background: "#fff" }}
                  onClick={() => window.history.back()}
                >
                  Back
                </Button>
              )} */}
            </Stack>
          )}
        </>
      )}
    </Box>
  );
  
};

export default TableHead;
