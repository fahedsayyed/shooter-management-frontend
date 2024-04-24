import APP_ROUTES from "src/routes/routePaths";

//BASED ON PAYMENT, THIS WILL REFLECT THE OTHER ROUTES TO THE ATHLETE ---
let remark = localStorage.getItem("competition_remark");

//Right now it's showing based on registration payment --
export const routeConfig: { [key: string]: { check: (userId: string) => boolean } } = {
  [APP_ROUTES.ATHLETE_ONLY]: {
    check: (userId: any) => true,
  },
  [APP_ROUTES.ATHLETE_COMPETITION]: {
    check: (userId: any) => {
      remark = localStorage.getItem("competition_remark");
      
      return remark === "success";
    },
  },
};