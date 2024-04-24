export interface Permission {
    [key: string]: boolean;
  }
  
  export  interface ResourcePermission {
    id: number;
    resources: string;
    permissions: Permission;
  }
  
  export const convertedPermissions: ResourcePermission[] = [
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
  ]
  

  