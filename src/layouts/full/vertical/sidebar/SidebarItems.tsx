import React, { useEffect, useState } from "react";
import Menuitems from "./MenuItems";
import { useLocation } from "react-router";
import { Box, List, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "src/store/Store";
import { toggleMobileSidebar } from "src/store/customizer/CustomizerSlice";
import NavItem from "./NavItem";
import NavCollapse from "./NavCollapse";
import NavGroup from "./NavGroup/NavGroup";
import { AppState } from "src/store/Store";
import Cookies from "js-cookie";
import { routeConfig } from "./RouteConfigues";
import { jwtDecode } from "jwt-decode";

const SidebarItems = () => {
  const { pathname } = useLocation();

  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const customizer = useSelector((state: AppState) => state.customizer);
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const hideMenu: any = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : "";
  const [userRole, setUserRole] = useState(null);
  const [userId, setUserId] = useState()
  const jwtToken = localStorage.getItem("accessToken");
  const dispatch = useDispatch();
  const userRolesRedux = useSelector((state: AppState) => state.authToken?.role);

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

  const userRoles = userRole || userRolesRedux;

  const filteredMenuItems = Menuitems.filter((item: any) => {
    if (item.roles && userRoles && item.roles.includes(userRoles)) {
      const routeCheck = routeConfig[item?.href];

      if (routeCheck && typeof routeCheck.check === 'function') {
        const isApproved = routeCheck.check(`${userId}`);
        
        return isApproved;
      }

      return true;
    } else {
      
      return !item.roles;
    }
  });

  return (
    <Box sx={{ px: 3 }}>
      <List sx={{ pt: 0 }} className="sidebarNav">
        {filteredMenuItems.map((item: any) => {
          if (item.subheader) {
            return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;
          } else if (item.children) {
            return (
              <NavCollapse
                menu={item}
                pathDirect={pathDirect}
                hideMenu={hideMenu}
                pathWithoutLastPart={pathWithoutLastPart}
                level={1}
                key={item.id}
                onClick={() => dispatch(toggleMobileSidebar())}
              />
            );
          } else {
            return <NavItem item={item} key={item.id} pathDirect={pathDirect} hideMenu={hideMenu} onClick={() => dispatch(toggleMobileSidebar())} />;
          }
        })}
      </List>
    </Box>
  );
};
export default SidebarItems;