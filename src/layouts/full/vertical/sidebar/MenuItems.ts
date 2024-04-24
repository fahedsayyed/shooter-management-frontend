import { uniqueId } from "lodash";
import APP_ROUTES from "src/routes/routePaths";

interface MenuitemsType {
  [x: string]: any;
  id?: string;
  navlabel?: boolean;
  subheader?: string;
  title?: string;
  icon?: any;
  href?: string;
  roles?: any[];
  children?: MenuitemsType[];
  chip?: string;
  chipColor?: string;
  variant?: string;
  external?: boolean;
}

import { IconBrandValorant, IconPoint, IconAperture, IconDashboard } from "@tabler/icons-react";
import { IconTournament } from "@tabler/icons-react";

const Menuitems: MenuitemsType[] = [
  //-- ONly for super Admin ---
  {
    navlabel: true,
    subheader: "Home",
    roles: ["superadmin"],
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconAperture,
    href: `${APP_ROUTES.ADMIN_DASHBOARD}`,
    chipColor: "secondary",
    roles: ["superadmin"],
  },
  {
    id: uniqueId(),
    title: "Association",
    icon: IconAperture,
    href: `${APP_ROUTES.TENANT}`,
    chipColor: "secondary",
    roles: ["superadmin"],
  },
  {
    id: uniqueId(),
    title: "Access Control",
    icon: IconAperture,
    href: `${APP_ROUTES.SUPER_ADMIN_ACCESS_CONTROL}`,
    chipColor: "secondary",
    roles: ["superadmin"],
  },
  {
    id: uniqueId(),
    title: "Invite",
    icon: IconAperture,
    href: `${APP_ROUTES.SUPER_ADMIN_EMAIL_INVITES}`,
    chipColor: "secondary",
    roles: ["superadmin"],
  },
  // {
  //   id: uniqueId(),
  //   title: 'Masters',
  //   icon: IconAperture,
  //   href: `${APP_ROUTES.MASTERS}`,
  //   chipColor: 'secondary',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Master',
  //       icon: IconPoint,
  //       href: `${APP_ROUTES.MASTERS}/payment-master`,
  //     },
  //   ],
  // },

  // -- Only Athlete can see
  {
    navlabel: true,
    subheader: "Home - State Athlete",
    roles: ["athlete"],
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconDashboard,
    href: `${APP_ROUTES.ATHLETE_DASHBOARD}`,
    chipColor: "secondary",
    roles: ["athlete"],
  },
  {
    id: uniqueId(),
    title: "Welcome Athlete",
    icon: IconBrandValorant,
    href: `${APP_ROUTES.ATHLETE_ONLY}`,
    chipColor: "secondary",
    roles: ["athlete"],
  },
  {
    id: uniqueId(),
    title: "Competition",
    icon: IconTournament,
    href: `${APP_ROUTES.ATHLETE_COMPETITION}`,
    chipColor: "secondary",
    roles: ["athlete"],
  },
  {
    navlabel: true,
    subheader: "Home - Club Athlete",
    roles: ["club_athlete"],
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconDashboard,
    href: `${APP_ROUTES.ATHLETE_DASHBOARD}`,
    chipColor: "secondary",
    roles: ["club_athlete"],
  },
  {
    id: uniqueId(),
    title: "Welcome Athlete",
    icon: IconBrandValorant,
    href: `${APP_ROUTES.ATHLETE_CLUB_ONLY}`,
    chipColor: "secondary",
    roles: ["club_athlete"],
  },
  {
    id: uniqueId(),
    title: "Competition",
    icon: IconTournament,
    href: `${APP_ROUTES.ATHLETE_COMPETITION}`,
    chipColor: "secondary",
    roles: ["club_athlete"],
  },
  {
    navlabel: true,
    subheader: "Home - State Admin",
    roles: ["admin"],
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconAperture,
    href: `${APP_ROUTES.STATE_ADMIN_DASHBOARD}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "User",
    icon: IconAperture,
    href: `${APP_ROUTES.USERS}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Athletes",
    icon: IconAperture,
    href: `${APP_ROUTES.ATHLETES}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Championship",
    icon: IconAperture,
    href: `${APP_ROUTES.CHAMPIONS}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Event Groups",
    icon: IconAperture,
    href: `${APP_ROUTES.EVENT_GROUP}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Coaching Camps",
    icon: IconAperture,
    href: `${APP_ROUTES.COACHING_CAMP}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Competition",
    icon: IconAperture,
    href: `${APP_ROUTES.STATE_COMPETITION}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Team Management",
    icon: IconAperture,
    href: `${APP_ROUTES.TEAM_MANAGEMENT}`,
    chipColor: "secondary",
    roles: ["admin"],
  },

  {
    id: uniqueId(),
    title: "Reports",
    icon: IconAperture,
    href: `${APP_ROUTES.REPORTS}`,
    chipColor: "secondary",
    roles: ["admin"],
    children: [
      {
        id: uniqueId(),
        title: "Master Reports",
        icon: IconPoint,
        href: `${APP_ROUTES.REPORTS}/master-reports`,
      },
      {
        id: uniqueId(),
        title: "Eventwise Reports",
        icon: IconPoint,
        href: `${APP_ROUTES.REPORTS}/eventwise-reports`,
      },
      {
        id: uniqueId(),
        title: "Result Reports",
        icon: IconPoint,
        href: `${APP_ROUTES.REPORTS}/result-reports`,
      },
      {
        id: uniqueId(),
        title: "Shooter Reports",
        icon: IconPoint,
        href: `${APP_ROUTES.REPORTS}/shooter-reports`,
      },
      {
        id: uniqueId(),
        title: "Groupwise Reports",
        icon: IconPoint,
        href: `${APP_ROUTES.REPORTS}/groupwise-reports`,
      },
      {
        id: uniqueId(),
        title: "Merit Reports",
        icon: IconPoint,
        href: `${APP_ROUTES.REPORTS}/merit-reports`,
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Equipment Control Sheet",
    icon: IconAperture,
    href: `${APP_ROUTES.EQUIPMENT_CONTROL_SHEET}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Score Entry",
    icon: IconAperture,
    href: `${APP_ROUTES.SCORE_ENTRY}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Payment Logs",
    icon: IconAperture,
    href: `${APP_ROUTES.PAYMENT_LOG}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "STS Payment",
    icon: IconAperture,
    href: `${APP_ROUTES.STS_PAYMENT_REPORT}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Details",
    icon: IconAperture,
    href: `${APP_ROUTES.DETAILS}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  // {
  //   id: uniqueId(),
  //   title: "Shooters Payment",
  //   icon: IconAperture,
  //   href: `${APP_ROUTES.SHOOTERS_PAYMENT_REPORT}`,
  //   chipColor: "secondary",
  // },
  {
    id: uniqueId(),
    title: "Records",
    icon: IconAperture,
    href: `${APP_ROUTES.RECORDS}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Awardees",
    icon: IconAperture,
    href: `${APP_ROUTES.AWARDEES}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Railway Concession Certificate",
    icon: IconAperture,
    href: `${APP_ROUTES.RAILWAY_CONCESSION_CERTIFICATE}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "National Medalist",
    icon: IconAperture,
    href: `${APP_ROUTES.NATIONAL_MEDALISTS}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "DRA/CLUB/RU Register",
    icon: IconAperture,
    href: `${APP_ROUTES.DRA_CLUB_RU_REGISTER}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Shooters History",
    icon: IconAperture,
    href: `${APP_ROUTES.SHOOTERS_HISTORY}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Range Availabilty",
    icon: IconAperture,
    href: `${APP_ROUTES.RANGE_AVAILABILTY}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Shooters Cerificate",
    icon: IconAperture,
    href: `${APP_ROUTES.SHOOTERS_CERTIFICATE}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  // {
  //   id: uniqueId(),
  //   title: "Monthly Payment Report",
  //   icon: IconAperture,
  //   href: `${APP_ROUTES.MONTHLY_PAYMENT_REPORT}`,
  //   chipColor: "secondary",
  // },
  {
    id: uniqueId(),
    title: "Renewal",
    icon: IconAperture,
    href: `${APP_ROUTES.RENEWAL}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Activity Log",
    icon: IconAperture,
    href: `${APP_ROUTES.ACTIVITY_LOG}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "All Match Participation Report",
    icon: IconAperture,
    href: `${APP_ROUTES.ALL_MATCH_PARTICIPATION_REPORT}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Shooter Id Card",
    icon: IconAperture,
    href: `${APP_ROUTES.SHOOTER_ID_CARD}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "ISSF Details",
    icon: IconAperture,
    href: `${APP_ROUTES.ISSF_DETAILS}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Camp Weapon Carry Letter",
    icon: IconAperture,
    href: `${APP_ROUTES.COACHING_CAMPS_WEAPON_CARRY_LETTER}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Request Certificate List",
    icon: IconAperture,
    href: `${APP_ROUTES.REQUEST_SHOOTER_CERTIFICATE_LIST}`,
    chipColor: "secondary",
    roles: ["admin"],
  },
  {
    id: uniqueId(),
    title: "Safety Course",
    icon: IconAperture,
    href: `${APP_ROUTES.SAFETY_COURSE}`,
    chipColor: "secondary",
    roles: ["admin"],
    children: [
      {
        id: uniqueId(),
        title: "Safety Course Enrollement List",
        icon: IconPoint,
        href: `${APP_ROUTES.SAFETY_COURSE}/safety-course-enrollement-list`,
      },
      {
        id: uniqueId(),
        title: "Safety Course List",
        icon: IconPoint,
        href: `${APP_ROUTES.SAFETY_COURSE}/safety-course-list`,
      },
    ],
  },
];

const startIndex = Menuitems.findIndex((item) => item.navlabel && item.subheader === "Home - State Admin");

const toSort = Menuitems.slice(startIndex + 2);
toSort.sort((a, b) => (a.title && b.title ? a.title.localeCompare(b.title) : 0));

Menuitems.splice(startIndex + 2);
Menuitems.splice(startIndex + 2, 0, ...toSort);

export default Menuitems;
