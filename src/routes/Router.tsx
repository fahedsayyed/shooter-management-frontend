import { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full/shared/loadable/Loadable";
import APP_ROUTES from "./routePaths";
import AthleteRegesterForm from "src/views/only-athlete-regester/athlete-regester-form";

const TenantProfile = Loadable(lazy(() => import("src/views/admin/admin-dashboard/tenentsCreation/formInfos/TenantProfile")));
const EditISSFdetail = Loadable(lazy(() => import("src/views/issfDetails/EditISSFdetail")));
const CreateDetails = Loadable(lazy(() => import("src/views/Details/createDetailsForm")));
const EditDetails = Loadable(lazy(() => import("src/views/Details/editDetailsForm")));
const ProtectedRoute = Loadable(lazy(() => import("src/components/private")));
const ResetPassword = Loadable(lazy(() => import("src/views/authentication/authForms/ResetPassword")));
const ConfirmForgotPassword = Loadable(lazy(() => import("src/views/authentication/auth1/ConfirmForgotPassword")));
const SearchTenant = Loadable(lazy(() => import("src/views/superAdminaccessControl")));
const ViewMatchParticipation = Loadable(lazy(() => import("src/views/all-match-participation/show-listing/viewMatchParticipation")));
const MatchParticipationStatus = Loadable(lazy(() => import("src/views/all-match-participation/show-listing/matchParticipationStatus")));
const ViewUpcomingMatchParticipation = Loadable(lazy(() => import("src/views/state-competition/show-listing/viewUpcomingMatchParticipation")));
const AthleteUpcomingCompetitionDashboards = Loadable(lazy(() => import("src/views/state-competition/show-listing")));
const UpcomingMatchParticipationStatus = Loadable(lazy(() => import("src/views/state-competition/show-listing/UpcomingMatchParticipationStatus")));
const UpcomingCompetitionListing = Loadable(lazy(() => import("src/views/state-competition/show-listing/UpcomingCompetitionListing")));
const ClubAthelete = Loadable(lazy(() => import("src/views/club-athelete-register")));
const ClubLogin = Loadable(lazy(() => import("src/views/authentication/auth1/ClubLogin")));
const ClubView = Loadable(lazy(() => import("src/views/club-athelete-register/clubRegisterForm/viewClubAthelte")));
const ClubProfileView = Loadable(lazy(() => import("src/views/club-athelete-register/clubRegisterForm/viewClubAthelte/ProfileView")));

const PaymentSyccess = Loadable(lazy(() => import("src/views/payment-responses/PaymentSyccess")));
const PaymentFailure = Loadable(lazy(() => import("src/views/payment-responses/PaymentFailure")));
const EmailInvite = Loadable(lazy(() => import("src/views/superadminEmailInvite")));

const Users = Loadable(lazy(() => import("src/views/users")));
const EditUser = Loadable(lazy(() => import("src/views/users/EditUser")));
const AddUser = Loadable(lazy(() => import("src/views/users/AddUser")));
const CoachingCamp = Loadable(lazy(() => import("../views/CoachingCamp")));
const AddCoachingCamp = Loadable(lazy(() => import("src/views/CoachingCamp/AddCoachingCamp")));
const EditCoachingCamp = Loadable(lazy(() => import("src/views/CoachingCamp/EditCoachingCamp")));
const Awardees = Loadable(lazy(() => import("src/views/Awardees")));
const AddAwardee = Loadable(lazy(() => import("src/views/Awardees/AddAwardee")));
const EditAwardee = Loadable(lazy(() => import("src/views/Awardees/EditAwardee")));
const Athletes = Loadable(lazy(() => import("src/views/athletes")));
const ViewDetail = Loadable(lazy(() => import("src/views/Details/ViewDetail")));
// const EditDetail = Loadable(lazy(() => import("src/views/Details/EditDetail")));
// const CreateDetail = Loadable(lazy(() => import("src/views/Details/CreateDetail")));

const Login = Loadable(lazy(() => import("src/views/authentication/auth1/Login")));
const Login2 = Loadable(lazy(() => import("src/views/authentication/auth2/Login2")));
const Register = Loadable(lazy(() => import("src/views/authentication/auth1/Register")));
const Register2 = Loadable(lazy(() => import("src/views/authentication/auth2/Register2")));
const ForgotPassword = Loadable(lazy(() => import("src/views/authentication/auth1/ForgotPassword")));
const ForgotPassword2 = Loadable(lazy(() => import("src/views/authentication/auth2/ForgotPassword2")));
const TwoSteps = Loadable(lazy(() => import("src/views/authentication/auth1/TwoSteps")));
const TwoSteps2 = Loadable(lazy(() => import("src/views/authentication/auth2/TwoSteps2")));
const Maintenance = Loadable(lazy(() => import("src/views/authentication/Maintenance")));
const TenentsSliderForm = Loadable(lazy(() => import("src/views/admin/admin-dashboard/tenentsCreation/TenentsSliderForm")));
const SuperAdminAccessControl = Loadable(lazy(() => import("src/views/superAdminaccessControl/SuperAdminAccessControl")));
const NationalMedalist = Loadable(lazy(() => import("src/views/National-Medalist")));
const DRA_Club_RU = Loadable(lazy(() => import("src/views/DRA_Club_RU")));
const CreateAssociation = Loadable(lazy(() => import("src/views/DRA_Club_RU/createAssociation")));
const Paymentmaster = Loadable(lazy(() => import("src/views/masters/paymentmaster/paymentmaster")));
const CreatePayment = Loadable(lazy(() => import("src/views/masters/paymentmaster/CreatePayment")));
const EditAssociation = Loadable(lazy(() => import("src/views/DRA_Club_RU/editAssociation")));
const ViewMedalist = Loadable(lazy(() => import("src/views/National-Medalist/viewMedalist")));
const ViewAssociation = Loadable(lazy(() => import("src/views/DRA_Club_RU/viewAssociation")));
const RailwayConcession = Loadable(lazy(() => import("src/views/Railway-Concession")));
const CreateRailwayConcession = Loadable(lazy(() => import("src/views/Railway-Concession/createRailwayConcession")));
const ViewRailwayConcession = Loadable(lazy(() => import("src/views/Railway-Concession/viewRailwayConcession")));

const PaymentLogs = Loadable(lazy(() => import("src/views/Payment-Logs")));
const DetailPage = Loadable(lazy(() => import("src/views/Details")));

const ShooterHistory = Loadable(lazy(() => import("src/views/Shooter-History")));
const ViewShooterHistory = Loadable(lazy(() => import("src/views/Shooter-History/viewShooterHistory")));
const Renewal = Loadable(lazy(() => import("src/views/renewel")));
const ViewRenewal = Loadable(lazy(() => import("src/views/renewel/viewRenewal")));
const ActivityLog = Loadable(lazy(() => import("src/views/activityLog")));
const ShooterIdCard = Loadable(lazy(() => import("src/views/shooterIdCard")));
const RequestShooterCertificateList = Loadable(lazy(() => import("src/views/RequestShooterCertificateList")));
const IssfDetail = Loadable(lazy(() => import("src/views/issfDetails")));
// const Actions = Loadable(lazy(() => import("src/views/issfDetails/AddISSfDetail")));
const TeamManagement = Loadable(lazy(() => import("src/views/teamManagement")));
const CoahingCampWeaponCarry = Loadable(lazy(() => import("src/views/coachingcampweaponlist/CoahingCampWeaponCarryingLetterList")));
const AddRecord = Loadable(lazy(() => import("src/views/records/AddRecord")));
const ShowRecords = Loadable(lazy(() => import("src/views/records/Records")));
const ShooterCertificate = Loadable(lazy(() => import("src/views/shooterCertificate")));
const AddCompetition = Loadable(lazy(() => import("src/views/Championship/competition/AddCompetition")));
const AddEvent = Loadable(lazy(() => import("src/views/Championship/events/AddEvent")));
const AddCategory = Loadable(lazy(() => import("src/views/Championship/category/AddCategory")));
// const EditDetailTwo = Loadable(lazy(() => import("src/views/Details/EditDetail2")));
// const EditDetailThree = Loadable(lazy(() => import("src/views/Details/EditDetail3")));
const ScoreEntry = Loadable(lazy(() => import("src/views/Score-Entry")));
const AddScore = Loadable(lazy(() => import("src/views/Score-Entry/AddScore")));
const PreviewRange = Loadable(lazy(() => import("src/views/range-availability/preview-range")));
const AddEventGroup = Loadable(lazy(() => import("src/views/Championship/eventsgroup/AddEventGroup")));
const StsPaymentReport = Loadable(lazy(() => import("src/views/Stspaymentreport")));

const StateCompetition = Loadable(lazy(() => import("src/views/state-competition")));
const StateCompetitionDashboards = Loadable(lazy(() => import("src/views/state-competition/dashboard-liks")));
const StateEntryForm = Loadable(lazy(() => import("src/views/state-competition/dashboard-liks/enrty-form")));

const AthleteCompetition = Loadable(lazy(() => import("src/views/athlete-competition")));
const AthleteCompetitionDashboards = Loadable(lazy(() => import("src/views/athlete-competition/dashboard-liks")));
const AthleteEntryForm = Loadable(lazy(() => import("src/views/athlete-competition/dashboard-liks/enrty-form/index")));

const Championship = Loadable(lazy(() => import("src/views/Championship")));
const EventGroups = Loadable(lazy(() => import("src/views/eventgroups")));
const FullLayout = Loadable(lazy(() => import("../layouts/full/FullLayout")));
const BlankLayout = Loadable(lazy(() => import("../layouts/blank/BlankLayout")));
const AdminDashboard = Loadable(lazy(() => import("src/views/admin/admin-dashboard")));
const Dashboard = Loadable(lazy(() => import("../views/dashboard-page/Dashboard")));
const ViewAthlete = Loadable(lazy(() => import("../views/athletes/ViewAthlete")));
const EditAthlete = Loadable(lazy(() => import("../views/athletes/EditAthlete")));
const Error = Loadable(lazy(() => import("../views/authentication/Error")));
const AllMatchParticipationReport = Loadable(lazy(() => import("src/views/all-match-participation")));
const ShowListing = Loadable(lazy(() => import("src/views/all-match-participation/show-listing/ShowListing")));
const SafetyCourseEnrollementList = Loadable(lazy(() => import("src/views/saftey-course/saftey-course-enrollement-list")));
const SafetyCourseList = Loadable(lazy(() => import("src/views/saftey-course/saftey-course-list")));
const SafetyCourseEdit = Loadable(lazy(() => import("src/views/saftey-course/saftey-course-list/safety-course-creation/EditSafetyCourse")));
const CreateSafetyCourse = Loadable(lazy(() => import("src/views/saftey-course/saftey-course-list/safety-course-creation/CreateSafetyCourse")));
const MasterReport = Loadable(lazy(() => import("src/views/reports/master-reports")));
const EventwiseReport = Loadable(lazy(() => import("src/views/reports/eventwise-reports")));
const ResultReport = Loadable(lazy(() => import("src/views/reports/result-reports")));
const ShooterReport = Loadable(lazy(() => import("src/views/reports/shooter-reports")));
const GroupwiseReport = Loadable(lazy(() => import("src/views/reports/groupwise-reports")));
const MeritReport = Loadable(lazy(() => import("src/views/reports/merit-reports")));
const EquipmentControlSheet = Loadable(lazy(() => import("src/views/equipment-control-sheet")));
const EditEquipment = Loadable(lazy(() => import("src/views/equipment-control-sheet/edit-equipment")));
const ViewEquipment = Loadable(lazy(() => import("src/views/equipment-control-sheet/view-equipment")));
const RangeAvailability = Loadable(lazy(() => import("src/views/range-availability")));

// ONLY Athlete ---
const OnlyAthlete = Loadable(lazy(() => import("src/views/only-athlete-regester")));
const ViewOnlyAthlete = Loadable(lazy(() => import("src/views/only-athlete-regester/view-athlete")));
const EditOnlyAthlete = Loadable(lazy(() => import("src/views/only-athlete-regester/edit-athlete")));

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to={APP_ROUTES.ADMIN_DASHBOARD} replace={true} /> },
      { path: `${APP_ROUTES.ADMIN_DASHBOARD}`, exact: true, element: <ProtectedRoute component={Dashboard} requiredRoles={["superadmin"]} /> },
      { path: `${APP_ROUTES.TENANT}`, exact: true, element: <ProtectedRoute component={AdminDashboard} requiredRoles={["superadmin"]} /> },
      // { path: `${APP_ROUTES.ADMIN_DASHBOARD}`, exact: true, element:<Dashboard /> },
      { path: `${APP_ROUTES.STATE_ADMIN_DASHBOARD}`, exact: true, element: <ProtectedRoute component={Dashboard} requiredRoles={["admin"]} /> },
      { path: `${APP_ROUTES.SUPER_ADMIN}/view-profile/:id`, exact: true, element: <ProtectedRoute component={TenantProfile} requiredRoles={["superadmin"]} /> },
      { path: `${APP_ROUTES.ATHLETE_DASHBOARD}`, exact: true, element: <Dashboard /> },
      { path: `${APP_ROUTES.SUPER_ADMIN}/:AssociatedWith`, exact: true, element: <ProtectedRoute component={TenentsSliderForm} requiredRoles={["superadmin"]} /> },
      { path: `${APP_ROUTES.SUPER_ADMIN_EDIT}/:AssociatedWith/:id`, exact: true, element: <ProtectedRoute component={TenentsSliderForm} requiredRoles={["superadmin"]} /> },
      { path: `${APP_ROUTES.SUPER_ADMIN_ACCESS_CONTROL}/:id`, exact: true, element: <ProtectedRoute component={SuperAdminAccessControl} requiredRoles={["superadmin"]} /> },
      { path: `${APP_ROUTES.SUPER_ADMIN_ACCESS_CONTROL}`, exact: true, element: <ProtectedRoute component={SearchTenant} requiredRoles={["superadmin"]} /> },
      { path: `${APP_ROUTES.SUPER_ADMIN_EMAIL_INVITES}`, exact: true, element: <ProtectedRoute component={EmailInvite} requiredRoles={["superadmin"]} /> },
      { path: `${APP_ROUTES.MASTERS}/payment-master`, exact: true, element: <Paymentmaster /> },
      {
        path: `${APP_ROUTES.MASTERS}/create-master-payment`,
        exact: true,
        element: <CreatePayment />,
      },
      {
        path: `${APP_ROUTES.COACHING_CAMPS_WEAPON_CARRY_LETTER}`,
        exact: true,
        element: <CoahingCampWeaponCarry />,
      },
      { path: `${APP_ROUTES.USERS}`, exact: true, element: <Users /> },
      { path: `${APP_ROUTES.USERS}/edit-user/:id`, exact: true, element: <EditUser /> },
      { path: `${APP_ROUTES.USERS}/add-user/`, exact: true, element: <AddUser /> },

      { path: `${APP_ROUTES.COACHING_CAMP}`, exact: true, element: <CoachingCamp /> },
      { path: `${APP_ROUTES.RECORDS}/show-records`, exact: true, element: <ShowRecords /> },
      { path: `${APP_ROUTES.RECORDS}`, exact: true, element: <AddRecord /> },
      { path: `${APP_ROUTES.SCORE_ENTRY}`, exact: true, element: <ScoreEntry /> },
      { path: `${APP_ROUTES.SCORE_ENTRY}/add-score/:competitionId`, exact: true, element: <AddScore /> },
      { path: `${APP_ROUTES.SHOOTERS_CERTIFICATE}`, exact: true, element: <ShooterCertificate /> },
      { path: `${APP_ROUTES.RENEWAL}`, exact: true, element: <Renewal /> },
      { path: `${APP_ROUTES.RENEWAL}/view/:id/`, exact: true, element: <ViewRenewal /> },
      { path: `${APP_ROUTES.ACTIVITY_LOG}`, exact: true, element: <ActivityLog /> },
      { path: `${APP_ROUTES.SHOOTER_ID_CARD}`, exact: true, element: <ShooterIdCard /> },
      { path: `${APP_ROUTES.REQUEST_SHOOTER_CERTIFICATE_LIST}`, exact: true, element: <RequestShooterCertificateList /> },
      { path: `${APP_ROUTES.ISSF_DETAILS}`, exact: true, element: <IssfDetail /> },
      { path: `${APP_ROUTES.ISSF_DETAILS}/edit-view/:id`, exact: true, element: <EditISSFdetail /> },
      { path: `${APP_ROUTES.TEAM_MANAGEMENT}`, exact: true, element: <TeamManagement /> },

      {
        path: `${APP_ROUTES.COACHING_CAMP}/add-coaching-camp/`,
        exact: true,
        element: <AddCoachingCamp />,
      },
      {
        path: `${APP_ROUTES.COACHING_CAMP}/edit`,
        exact: true,
        element: <EditCoachingCamp />,
      },
      { path: `${APP_ROUTES.AWARDEES}`, exact: true, element: <Awardees /> },
      { path: `${APP_ROUTES.AWARDEES}/add-awardee`, exact: true, element: <AddAwardee /> },
      { path: `${APP_ROUTES.AWARDEES}/edit-awardee/:id`, exact: true, element: <EditAwardee /> },
      { path: `${APP_ROUTES.ATHLETES}`, exact: true, element: <Athletes /> },
      {
        path: `${APP_ROUTES.ATHLETES}/view/info/:athleteId`,
        exact: true,
        element: <ViewAthlete />,
      },
      {
        path: `${APP_ROUTES.ATHLETES}/edit/info/:athleteId`,
        exact: true,
        element: <EditAthlete />,
      },

      { path: `${APP_ROUTES.STS_PAYMENT_REPORT}`, exact: true, element: <StsPaymentReport /> },
      { path: `${APP_ROUTES.DETAILS}`, exact: true, element: <DetailPage /> },
      { path: `${APP_ROUTES.DETAILS}/view`, exact: true, element: <ViewDetail /> },
      { path: `${APP_ROUTES.DETAILS}/edit`, exact: true, element: <EditDetails /> },
      // { path: `${APP_ROUTES.DETAILS}/edit/page2`, exact: true, element: <EditDetailTwo /> },
      // { path: `${APP_ROUTES.DETAILS}/edit/page3`, exact: true, element: <EditDetailThree /> },
      // { path: `${APP_ROUTES.DETAILS}/create`, exact: true, element: <CreateDetail /> },
      { path: `${APP_ROUTES.DETAILS}/create/:comp_id`, exact: true, element: <CreateDetails /> },

      //champ
      { path: `${APP_ROUTES.CHAMPIONS}`, exact: true, element: <Championship /> },
      { path: `${APP_ROUTES.CHAMPIONS}/add-compitition`, exact: true, element: <AddCompetition /> },
      { path: `${APP_ROUTES.CHAMPIONS}/edit-competition/:id`, exact: true, element: <AddCompetition /> },
      { path: `${APP_ROUTES.CHAMPIONS}/edit-event/:id`, exact: true, element: <AddEvent /> },
      { path: `${APP_ROUTES.CHAMPIONS}/add-event`, exact: true, element: <AddEvent /> },
      { path: `${APP_ROUTES.CHAMPIONS}/add-category`, exact: true, element: <AddCategory /> },
      { path: `${APP_ROUTES.CHAMPIONS}/edit-category/:id`, exact: true, element: <AddCategory /> },
      { path: `${APP_ROUTES.CHAMPIONS}/add-eventgroup`, exact: true, element: <AddEventGroup /> },
      { path: `${APP_ROUTES.CHAMPIONS}/edit-eventgroup/:id`, exact: true, element: <AddEventGroup /> },

      { path: `${APP_ROUTES.EVENT_GROUP}`, exact: true, element: <EventGroups /> },
      { path: `${APP_ROUTES.EVENT_GROUP}/add-eventgroup`, exact: true, element: <AddEventGroup /> },
      { path: `${APP_ROUTES.EVENT_GROUP}/edit-eventgroup/:id`, exact: true, element: <AddEventGroup /> },

      { path: `${APP_ROUTES.SHOOTERS_HISTORY}`, exact: true, element: <ShooterHistory /> },
      { path: `${APP_ROUTES.SHOOTERS_HISTORY}/view`, exact: true, element: <ViewShooterHistory /> },
      {
        path: `${APP_ROUTES.ALL_MATCH_PARTICIPATION_REPORT}`,
        exact: true,
        element: <AllMatchParticipationReport />,
      },
      {
        path: `${APP_ROUTES.ALL_MATCH_PARTICIPATION_REPORT}/show-listing/:id`,
        exact: true,
        element: <ShowListing />,
      },
      {
        path: `${APP_ROUTES.ALL_MATCH_PARTICIPATION_REPORT}/view-shooter-match-participation/:id`,
        exact: true,
        element: <ViewMatchParticipation />,
      },
      {
        path: `${APP_ROUTES.ALL_MATCH_PARTICIPATION_REPORT}/edit-shooter-match-participation-status/:id`,
        exact: true,
        element: <MatchParticipationStatus />,
      },

      {
        path: `${APP_ROUTES.SAFETY_COURSE}/safety-course-enrollement-list`,
        exact: true,
        element: <SafetyCourseEnrollementList />,
      },
      {
        path: `${APP_ROUTES.SAFETY_COURSE}/safety-course-list`,
        exact: true,
        element: <SafetyCourseList />,
      },
      {
        path: `${APP_ROUTES.SAFETY_COURSE}/safety-course-list/:formID`,
        exact: true,
        element: <SafetyCourseEdit />,
      },
      {
        path: `${APP_ROUTES.SAFETY_COURSE}/safety-course-list/create`,
        exact: true,
        element: <CreateSafetyCourse />,
      },
      {
        path: `${APP_ROUTES.COACHING_CAMPS_WEAPON_CARRY_LETTER}`,
        exact: true,
        element: <CoahingCampWeaponCarry />,
      },

      /* **  ROUTES FOR STATE COMPETITION */
      { path: `${APP_ROUTES.STATE_COMPETITION}`, exact: true, element: <ProtectedRoute component={StateCompetition} requiredRoles={["admin"]} /> },
      {
        path: `${APP_ROUTES.STATE_COMPETITION}/dashboard-links/:routeName`, exact: true, element: <ProtectedRoute component={StateCompetitionDashboards} requiredRoles={["admin"]} />,
      },
      { path: `${APP_ROUTES.STATE_COMPETITION}/entry-form/:id`, exact: true, element: <ProtectedRoute component={StateEntryForm} requiredRoles={["admin"]} /> },
      {
        path: `${APP_ROUTES.ALL_UPCOMING_MATCH_PARTICIPATION}`, exact: true, element: <ViewUpcomingMatchParticipation />,
      },
      {
        path: `${APP_ROUTES.ALL_UPCOMING_MATCH_PARTICIPATION}/dashboard/:code/:comp_id`, exact: true, element: <AthleteUpcomingCompetitionDashboards />,
      },
      {
        path: `${APP_ROUTES.ALL_UPCOMING_MATCH_PARTICIPATION}/upcoming-match-participation/:id`, exact: true, element: <UpcomingCompetitionListing />,
      },
      {
        path: `${APP_ROUTES.ALL_UPCOMING_MATCH_PARTICIPATION}/view-shooter-match-participation/:id`, exact: true, element: <ViewUpcomingMatchParticipation />,
      },
      {
        path: `${APP_ROUTES.ALL_UPCOMING_MATCH_PARTICIPATION}/edit-shooter-match-participation-status/:id/:status`, exact: true, element: <UpcomingMatchParticipationStatus />,
      },

      /* **  ROUTES FOR ATHLETE COMPETITION */
      { path: `${APP_ROUTES.ATHLETE_COMPETITION}`, exact: true, element: <ProtectedRoute component={AthleteCompetition} requiredRoles={["athlete"]} /> },
      {
        path: `${APP_ROUTES.ATHLETE_COMPETITION}/dashboard-links/:routeName/:id`, exact: true, element: <ProtectedRoute component={AthleteCompetitionDashboards} requiredRoles={["athlete"]} />,
      },
      {
        path: `${APP_ROUTES.ATHLETE_COMPETITION}/dashboard-links/:routeName/entry-form/:id`, exact: true, element: <ProtectedRoute component={AthleteEntryForm} requiredRoles={["athlete"]} />,
      },

      { path: `${APP_ROUTES.NATIONAL_MEDALISTS}`, exact: true, element: <NationalMedalist /> },
      { path: `${APP_ROUTES.NATIONAL_MEDALISTS}/view`, exact: true, element: <ViewMedalist /> },

      { path: `${APP_ROUTES.DRA_CLUB_RU_REGISTER}`, exact: true, element: <DRA_Club_RU /> },
      { path: `${APP_ROUTES.CREATE_ASSOCIATION}`, exact: true, element: <CreateAssociation /> },
      { path: `${APP_ROUTES.EDIT_ASSOCIATION}`, exact: true, element: <EditAssociation /> },
      { path: `${APP_ROUTES.VIEW_ASSOCIATION}`, exact: true, element: <ViewAssociation /> },

      {
        path: `${APP_ROUTES.RAILWAY_CONCESSION_CERTIFICATE}`,
        exact: true,
        element: <RailwayConcession />,
      },
      {
        path: `${APP_ROUTES.CREATE_RAILWAY_CONCESSION}`,
        exact: true,
        element: <CreateRailwayConcession />,
      },
      {
        path: `${APP_ROUTES.VIEW_RAILWAY_CONCESSION}`,
        exact: true,
        element: <ViewRailwayConcession />,
      },

      { path: `${APP_ROUTES.PAYMENT_LOG}`, exact: true, element: <PaymentLogs /> },
      { path: `${APP_ROUTES.REPORTS}/master-reports`, exact: true, element: <MasterReport /> },
      {
        path: `${APP_ROUTES.REPORTS}/eventwise-reports`,
        exact: true,
        element: <EventwiseReport />,
      },
      { path: `${APP_ROUTES.REPORTS}/result-reports`, exact: true, element: <ResultReport /> },
      { path: `${APP_ROUTES.REPORTS}/shooter-reports`, exact: true, element: <ShooterReport /> },
      { path: `${APP_ROUTES.REPORTS}/groupwise-reports`, exact: true, element: <GroupwiseReport /> },
      { path: `${APP_ROUTES.REPORTS}/merit-reports`, exact: true, element: <MeritReport /> },

      {
        path: `${APP_ROUTES.EQUIPMENT_CONTROL_SHEET}`,
        exact: true,
        element: <EquipmentControlSheet />,
      },
      {
        path: `${APP_ROUTES.EQUIPMENT_CONTROL_SHEET}/edit/info/:id`,
        exact: true,
        element: <EditEquipment />,
      },
      {
        path: `${APP_ROUTES.EQUIPMENT_CONTROL_SHEET}/view/info/:id`,
        exact: true,
        element: <ViewEquipment />,
      },

      //-- ONLY Athlete --
      // { path: `${APP_ROUTES.ATHLETE_ONLY}`, exact: true, element: <OnlyAthlete />},
      { path: `${APP_ROUTES.ATHLETE_ONLY}`, exact: true, element: <ProtectedRoute component={OnlyAthlete} requiredRoles={["athlete"]} /> },
      {
        path: `${APP_ROUTES.ATHLETE_ONLY}/view/athlete/:athleteId`,
        exact: true,
        element: <ViewOnlyAthlete />,
      },
      {
        path: `${APP_ROUTES.ATHLETE_ONLY}/edit/athlete/:athleteId`,
        exact: true,
        element: <EditOnlyAthlete />,
      },

      //CLUB ATHLETES
      { path: `${APP_ROUTES.ATHLETE_CLUB_ONLY}`, exact: true, element: <ProtectedRoute component={ClubView} requiredRoles={["club_athlete"]} /> },
      { path: `${APP_ROUTES.ATHLETE_CLUB_VIEW}/:athleteId`, exact: true, element: <ProtectedRoute component={ClubProfileView} requiredRoles={["club_athlete"]} /> },
      { path: `${APP_ROUTES.ATHLETE_CLUB_EDIT}/:athleteId`, exact: true, element: <ProtectedRoute component={ClubAthelete} requiredRoles={["club_athlete"]} /> },

      { path: `${APP_ROUTES.EQUIPMENT_CONTROL_SHEET}`, exact: true, element: <EquipmentControlSheet /> },
      { path: `${APP_ROUTES.EQUIPMENT_CONTROL_SHEET}/edit/info/:id`, exact: true, element: <EditEquipment /> },
      { path: `${APP_ROUTES.REPORTS}/merit-reports`, exact: true, element: <MeritReport /> },
      { path: `${APP_ROUTES.RANGE_AVAILABILTY}`, exact: true, element: <RangeAvailability /> },
      { path: `${APP_ROUTES.RANGE_AVAILABILTY}/preview/info/:id`, exact: true, element: <PreviewRange /> },

      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/",
    element: <BlankLayout />,
    children: [
      { path: "/auth/404", element: <Error /> },

      { path: "/auth/login", element: <Login /> },
      { path: "/auth/update-password", element: <ResetPassword /> },
      { path: "/auth/forgot-password", element: <ForgotPassword /> },
      { path: "/auth/confirm-forgot-password", element: <ConfirmForgotPassword /> },
      { path: `${APP_ROUTES.ATHLETE_REGESTER}`, element: <AthleteRegesterForm /> },
      { path: "/create/:AssociatedWith", exact: true, element: <TenentsSliderForm /> },

      // { path: `${APP_ROUTES.PAYMENT_SUCCESS}`, exact: true, element: <ProtectedRoute component={PaymentSyccess} requiredRoles={["athlete"]} /> },
      // { path: `${APP_ROUTES.PAYMENT_FAILURE}`, exact: true, element: <ProtectedRoute component={PaymentFailure} requiredRoles={["athlete"]} /> },
      { path: `${APP_ROUTES.PAYMENT_RESPONSE}`, exact: true, element: <PaymentSyccess /> },
      { path: `${APP_ROUTES.PAYMENT_FAILURE}`, exact: true, element: <PaymentFailure /> },

      { path: "/auth/login2", element: <Login2 /> },
      { path: "/auth/register", element: <Register /> },
      { path: "/auth/register2", element: <Register2 /> },
      { path: "/auth/forgot-password2", element: <ForgotPassword2 /> },
      { path: "/auth/two-steps", element: <TwoSteps /> },
      { path: "/auth/two-steps2", element: <TwoSteps2 /> },
      { path: "/auth/maintenance", element: <Maintenance /> },
      { path: "*", element: <Navigate to="/auth/404" /> },

      //clubLogin
      { path: "/club/login", element: <ClubLogin /> },
      { path: `${APP_ROUTES.ATHLETE_CLUB_REGISTER}`, exact: true, element: <ClubAthelete /> },
    ],
  },
];
export default Router;
