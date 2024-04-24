import React, { useEffect } from "react";
import { Paper, TableContainer, Checkbox, Typography, Button } from "@mui/material";
import PageContainer from "src/components/page-container/PageContainer";
import { GridColDef } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import TableHead from "src/components/table-head";
import DataTable from "src/components/table/TableComponent";
import BlankCard from "src/components/shared/BlankCard";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getRoleAndPermissionRequest, updateTenantRoleAndPermissionRequest } from "src/store/reducers/TenentSlice";
import { useSelector } from "react-redux";
import { AppState } from "src/store/Store";

interface ConvertedPermission {
  id: number;
  resources: string;
  permissions: {
    [key: string]: boolean;
  };
}

const assignRoleAndPermission: ConvertedPermission[] = [
  {
    "id": 1,
    "resources": "Users",
    "permissions": {
      "Read": false,
      "Create": false,
      "Edit": false,
      "Delete": false
    }
  },
  {
    "id": 2,
    "resources": "Shooter Certificate",
    "permissions": {
      "View": false
    }
  },
  {
    "id": 3,
    "resources": "Awardees",
    "permissions": {
      "View": false
    }
  },
  {
    "id": 4,
    "resources": "Access Control",
    "permissions": {
      "Read": false,
      "Create": false,
      "Edit": false,
      "Delete": false
    }
  },
  {
    "id": 5,
    "resources": "Match Participation",
    "permissions": {
      "Read": false,
      "Create": false,
      "Edit": false,
      "Delete": false
    }
  },
  {
    "id": 6,
    "resources": "Competition",
    "permissions": {
      "Read": false,
      "Create": false,
      "Edit": false,
      "Delete": false
    }
  },
  {
    "id": 7,
    "resources": "Championships",
    "permissions": {
      "Read": false,
      "Create": false,
      "Edit": false,
      "Delete": false
    }
  },
  {
    "id": 8,
    "resources": "Event Group",
    "permissions": {
      "Read": false,
      "Edit": false,
      "Delete": false
    }
  },
  {
    "id": 9,
    "resources": "Athlete",
    "permissions": {
      "Read": false,
      "Download ID Card": false,
      "Create": false,
      "Edit": false,
      "Delete": false
    }
  },
  {
    "id": 10,
    "resources": "Renewal",
    "permissions": {
      "Read": false
    }
  },
  {
    "id": 11,
    "resources": "STS Payment Report",
    "permissions": {
      "Read": false
    }
  },
  {
    "id": 12,
    "resources": "Payment Log",
    "permissions": {
      "Read": false
    }
  },
  {
    "id": 13,
    "resources": "Activity Log",
    "permissions": {
      "Read": false
    }
  },
  {
    "id": 14,
    "resources": "Shooter Certificate inside Competition",
    "permissions": {
      "Shooter Certificate in competition": false
    }
  },
  {
    "id": 15,
    "resources": "Renewal/Change Membership",
    "permissions": {
      "Edit": false
    }
  },
  {
    "id": 16,
    "resources": "Weapon Carry",
    "permissions": {
      "View": false,
      "Add": false
    }
  },
  {
    "id": 17,
    "resources": "Renewal View Profile",
    "permissions": {
      "View": false
    }
  },
  {
    "id": 18,
    "resources": "Reports",
    "permissions": {
      "View": false,
      "Master Reports": false,
      "EventWise Reports": false,
      "Result Reports": false,
      "Shooter Reports": false,
      "GroupWise Reports": false,
      "Merit Reports ": false
    }
  },
  {
    "id": 19,
    "resources": "Coaching Camps",
    "permissions": {
      "Read": false,
      "Create": false,
      "Edit": false,
      "Delete": false
    }
  },
  {
    "id": 20,
    "resources": "Railway Concession",
    "permissions": {
      "Read": false
    }
  },
  {
    "id": 21,
    "resources": "National/State Medalist",
    "permissions": {
      "Read": false,
      "Create": false,
      "Delete": false
    }
  },
  {
    "id": 22,
    "resources": "Records",
    "permissions": {
      "Create": false
    }
  },
  {
    "id": 23,
    "resources": "Details ",
    "permissions": {
      "Details": false
    }
  },
  {
    "id": 24,
    "resources": "Score Entry",
    "permissions": {
      "Score Entry": false
    }
  },
  {
    "id": 25,
    "resources": "Shooter Certificate",
    "permissions": {
      "Shooter Certificate": false
    }
  },
  {
    "id": 26,
    "resources": "All Match Participation Report",
    "permissions": {
      "List": false
    }
  },
  {
    "id": 27,
    "resources": "Coaching Camp Weapon Carry",
    "permissions": {
      "Create": false,
      "View": false
    }
  },
  {
    "id": 28,
    "resources": "Safety Course Enrollment list",
    "permissions": {
      "Read": false
    }
  },
  {
    "id": 29,
    "resources": "Shooters Payment Report",
    "permissions": {
      "Read": false
    }
  },
  {
    "id": 30,
    "resources": "Safety Course list",
    "permissions": {
      "Read": false
    }
  },
  {
    "id": 31,
    "resources": "Safety Course",
    "permissions": {
      "Read": false
    }
  },
  {
    "id": 32,
    "resources": "RC/DRA/RU",
    "permissions": {
      "List": false
    }
  },
  {
    "id": 33,
    "resources": "Equipment Control Sheet",
    "permissions": {
      "Read": false
    }
  },
  {
    "id": 34,
    "resources": "Shooter Id Card",
    "permissions": {
      "Read": false
    }
  },
  {
    "id": 35,
    "resources": "Request Shooter Certificate",
    "permissions": {
      "View": false
    }
  },
  {
    "id": 36,
    "resources": "Issf Details",
    "permissions": {
      "Read": false,
      "Create": false,
      "Edit": false,
      "Delete": false
    }
  },
  {
    "id": 37,
    "resources": "Manage Team",
    "permissions": {
      "Create": false
    }
  },
  {
    "id": 38,
    "resources": "STS details ",
    "permissions": {
      "Create": false
    }
  },
  {
    "id": 39,
    "resources": "Equipment Control Sheet",
    "permissions": {
      "Read": false
    }
  },
  {
    "id": 40,
    "resources": "Range Usage",
    "permissions": {
      "Create": false
    }
  },
  {
    "id": 41,
    "resources": "Range Usage Listing",
    "permissions": {
      "Read": false
    }
  }
 
];

const SuperAdminAccessControl = () => {
  const navigate = useNavigate();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up("lg"));
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const [selectedPermissions, setSelectedPermissions] = React.useState<ConvertedPermission[]>([]);
  const tenantRoleAndPermission = useSelector((state: AppState) => state.tenent.tenantRoleAndPermission);
  console.log(selectedPermissions, "selectedPermissions");

  useEffect(() => {
    dispatch(getRoleAndPermissionRequest(id));
  }, [dispatch, id]);

  useEffect(() => {
    const initialPermissions =
      tenantRoleAndPermission.length > 0
        ? tenantRoleAndPermission.map((item: any) => ({
            id: item.id,
            resources: item.resources,
            permissions: { ...item.permissions },
          }))
        : assignRoleAndPermission; 
    setSelectedPermissions(initialPermissions);
  }, [tenantRoleAndPermission]);

  const permissionColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 40 },
    { field: "resources", headerName: "Resources", width: 300 },
    {
      field: "permission",
      headerName: "Permission",
      flex: 1,
      renderCell: (params) => (
        <>
          {Object.keys(params.row.permissions).map((p: string, index: number) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <Checkbox
                checked={selectedPermissions.find((item) => item.resources === params.row.resources)?.permissions[p] || false}
                onChange={(e) => {
                  handleCheckboxClick(params.row.resources, p, e.target.checked);
                }}
              />
              <Typography>{p}</Typography>
            </div>
          ))}
        </>
      ),
    },
  ];

  const handleCheckboxClick = (resource: string, permission: string, checked: boolean) => {
    setSelectedPermissions((prevPermissions) => {
      const updatedPermissions = [...prevPermissions];
      const resourceIndex = updatedPermissions.findIndex((item) => item.resources === resource);

      if (resourceIndex === -1) {
        const newPermission = {
          id: updatedPermissions.length + 1,
          resources: resource,
          permissions: { [permission]: checked },
        };
        updatedPermissions.push(newPermission);
      } else {
        const permissions = updatedPermissions[resourceIndex].permissions;
        permissions[permission] = checked;
      }

      return updatedPermissions;
    });
  };

  const postPermissionAndRole = async() => {
    if(!tenantRoleAndPermission){
      const data = {
        roleAndPermissions: tenantRoleAndPermission,
  
      };
  
      console.log(data,"user_active")
  
      await dispatch(updateTenantRoleAndPermissionRequest({ data: data, id: id }));
    }
    else {
      const data = {
        roleAndPermissions: selectedPermissions,
  
      };
  
      console.log(data,"user_active")
  
      await dispatch(updateTenantRoleAndPermissionRequest({ data: data, id: id }));
    }

  };

  return (
    <PageContainer title="user page" description="this is user page">
      <Paper
        sx={{
          flexShrink: 0,
          border: "0",
          borderLeft: "1px",
          borderStyle: "solid",
          right: "0",
          background: (theme) => theme.palette.background.paper,
          boxShadow: "3",
          position: lgUp ? "relative" : "absolute",
          borderColor: (theme) => theme.palette.divider,
          marginTop: "35px",
        }}
      >
        <BlankCard>
          <TableHead title="List Of Permissions" />
          <TableContainer>
            {!tenantRoleAndPermission ? (
              <DataTable rows={tenantRoleAndPermission} columns={permissionColumns} />
            ) : (
              <DataTable rows={selectedPermissions} columns={permissionColumns} />
            )}
          </TableContainer>
          <Button
            sx={{ float: "right", marginBottom: "10px", position: "relative", right: "10px", bottom: "30px" }}
            onClick={postPermissionAndRole}
          >
            Submit
          </Button>
        </BlankCard>
      </Paper>
    </PageContainer>
  );
};

export default SuperAdminAccessControl;
