import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RouteProps, Navigate } from "react-router-dom";
import { routeConfig } from "src/layouts/full/vertical/sidebar/RouteConfigues";
import { AppState } from "src/store/Store";

interface ProtectedRouteProps extends RouteProps {
  component: React.ComponentType<any>;
  requiredRoles?: string[];
}
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, requiredRoles, ...rest }) => {
  const tokenRedux = useSelector((state: AppState) => state.authToken);
  const [userId, setUserId] = useState();
  const [userRole, setUserRole] = useState(null);
  const jwtToken = Cookies.get("accessToken");
  // const storedRole = Cookies.get('userRole');

  const storedRole = userRole;

  useEffect(() => {
    if (jwtToken) {
      const decodedToken: any = jwtDecode(jwtToken);

      if (decodedToken) {
        const { role, userId } = decodedToken;
        
        setUserId(userId)
        setUserRole(role);
      }
    }
  }, [jwtToken]);

  const { role,token } = tokenRedux;
  const isAuthenticated = !!token;
  const hasRequiredRole = requiredRoles ? requiredRoles.includes(storedRole || role) : true;

  const shouldCheckRoute = hasRequiredRole && requiredRoles?.includes("athlete");

  const routeKey = window.location.pathname.split("/")[1];
  const routeCheck = shouldCheckRoute ? routeConfig[`${"/" + routeKey}`] : { check: () => true };

  const isApproved = typeof routeCheck.check === "function" ? routeCheck.check(`${userId}`) : true;
  const shouldRender = isAuthenticated && isApproved;

  return shouldRender ? <Component {...rest} /> : <Navigate to={{ pathname: "/auth/login" }} replace />;
};

export default ProtectedRoute;
