import axiosServices from "src/utils/axios";
import axios from "axios";
import { format, parseISO } from "date-fns";

export const deleteCompetionCategoryById = async (selectedId: any) => {
  try {
    const response = await axiosServices.delete(`/api/tenants/championship/competition-categories/${selectedId}`);

    if (response.status === 200) {
      return { success: true, message: "CompetionCategory deleted successfully" };
    } else {
      console.error("Failed to delete CompetionCategory:", response);

      return { success: false, message: "Failed to delete CompetionCategory" };
    }
  } catch (error) {
    console.error("Failed to delete CompetionCategory:", error);

    return { success: false, message: "Failed to delete CompetionCategory" };
  }
};

// export const clubRegister = async (data: any) => {
//   try {
//     console.log(data, "to api ");
//     const response = await axiosServices.post("/club/register", data);
//     console.log(response, "clubRegister");

//     if (response.status === 200) {
//       const result = response.data;

//       return result;
//     } else {
//       console.error("Unexpected response:", response);
//       throw new Error("Failed to ClubRegister");
//     }
//   } catch (error) {
//     console.error("Failed to ClubRegister", error);
//     throw new Error("Failed to ClubRegister");
//   }
// };

export const clubRegister = async (data: any) => {
  console.log(data,"in api call")
  try {
    const formData = new FormData();

    Object.entries(data.slideOne).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        formData.append(key, value.toString());
      } else if (key === "playingEvents") {
        formData.append(key, JSON.stringify(value));
      }
    });

    Object.entries(data.slideTwo).forEach(([key, value]) => {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
        formData.append(key, value.toString());
      }
    });


    const response = await axios.post("http://localhost:5000/v1/club/register", formData);

    console.log(response, "clubRegister");

    if (response.status === 200) {
      const result = response.data;

      return result;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to ClubRegister");
    }
  } catch (error) {
    console.error("Failed to ClubRegister", error);
    throw new Error("Failed to ClubRegister");
  }
};

export const updateClubRegisterById = async (id: any, data: any) => {
  console.log(data, "for edit in the fn util");
  const formData = new FormData();

  Object.entries(data.slideOne).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      formData.append(key, value.toString());
    } else if (key === "playingEvents") {
      formData.append(key, JSON.stringify(value));
    }
  });

  Object.entries(data.slideTwo).forEach(([key, value]) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
      formData.append(key, value.toString());
    }
  });
  console.log(formData, "to api ");

  try {
    const response = await axiosServices.put(`/club/update/${id}`, formData);
    console.log(response, "update ClubRegister ");

    if (response.status === 200) {
      const result = response.data;

      return result;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to update ClubRegister ");
    }
  } catch (error) {
    console.error("Failed to update ClubRegister ", error);
    throw new Error("Failed to update ClubRegister ");
  }
};

// export const updateClubRegisterById = async (id: any, data: any) => {
//   console.log(data, "for update ");
//   try {
//     const response = await axiosServices.put(`/club/update/${id}`, data);
//     console.log(response, "update ClubRegister ");

//     if (response.status === 200) {
//       const result = response.data;

//       return result;
//     } else {
//       console.error("Unexpected response:", response);
//       throw new Error("Failed to update ClubRegister ");
//     }
//   } catch (error) {
//     console.error("Failed to update ClubRegister ", error);
//     throw new Error("Failed to update ClubRegister ");
//   }
// };

export const checkEmailAdharStatus = async (email: any, aadhar: any, contactNumber: any, clubName: any) => {
  console.log(email, aadhar, contactNumber, clubName, "hello");
  try {
    if (email || aadhar || contactNumber) {
      let apiUrl = `${process.env.REACT_APP_BASE_URL}/club/check-email`;

      apiUrl += "?";

      if (email) {
        apiUrl += `email=${email}&`;
      }

      if (aadhar) {
        apiUrl += `aadhar=${aadhar}&`;
      }

      if (contactNumber) {
        apiUrl += `contactNumber=${contactNumber}&`;
      }

      if (clubName) {
        apiUrl += `clubName=${clubName}`;
      } else {
        throw new Error("clubName is mandatory but not provided.");
      }

      const response = await axios.get(apiUrl);

      return response.data;
    } else {
      throw new Error("At least one of email, aadhar, or contact number must be provided.");
    }
  } catch (error) {
    console.error("Error checking email, aadhar, or contact number:", error);
    throw error;
  }
};
