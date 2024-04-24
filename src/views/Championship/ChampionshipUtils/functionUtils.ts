import axiosServices from "src/utils/axios";
import { format, parseISO } from "date-fns";

//for competion-category

export const getCategoryById = async (id: number) => {
  try {
    const response = await axiosServices.get(`/api/tenants/championship/competition-categories/${id}`);
    if (response.status === 200) {
      const category = response.data;

      return category;
    } else {
      console.error("Failed to fetch Category:", response);
      throw new Error("Failed to fetch Category");
    }
  } catch (error) {
    console.error("Failed to fetch Category:", error);
    throw new Error("Failed to fetch Category");
  }
};

export const deleteCompetionCategoryById = async (selectedId: any) => {
  try {
    const response = await await axiosServices.delete(`/api/tenants/championship/competition-categories/${selectedId}`);

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

export const createCompetionCategory = async (data: any) => {
  try {
    const response = await axiosServices.post("/api/tenants/championship/create_compitition_category", data);
    console.log(response, "CompetionCategory");

    if (response.status === 200) {
      const result = response.data;

      return result;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to create CompetionCategory");
    }
  } catch (error) {
    console.error("Failed to create CompetionCategory", error);
    throw new Error("Failed to create CompetionCategory");
  }
};

export const updateCompetionCategoryById = async (id: any, data: any) => {
  try {
    const response = await axiosServices.put(`/api/tenants/championship/competition-categories/${id}`, data);
    console.log(response, "update CompetionCategory");

    if (response.status === 200) {
      const result = response.data;

      return result;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to update CompetionCategory");
    }
  } catch (error) {
    console.error("Failed to update CompetionCategory", error);
    throw new Error("Failed to update CompetionCategory");
  }
};

//for competition

export const createCompetition = async (competitionData: any) => {
  try {
    console.log(competitionData, "compit");

    const formData = new FormData();

    Object.keys(competitionData).forEach((key) => {
      if (key === "organisers") {
        competitionData[key].forEach((organiser: any, index: number) => {
          formData.append(`organisers[${index}][secretary_name]`, organiser.secretary_name);
          formData.append(`organisers[${index}][post]`, organiser.post);
        });
      } else if (key === "preferred_loc") {
        competitionData[key].forEach((loc: any, index: number) => {
          formData.append(`preferred_loc[${index}][id]`, loc.id);
          formData.append(`preferred_loc[${index}][name]`, loc.name);
        });
      } else if (key === "circular") {
        formData.append("circular", competitionData.circular);
      } else {
        formData.append(key, competitionData[key]);
      }
    });

    const jsonData = { ...competitionData };
    delete jsonData.circular;

    console.log(formData, "form");

    const response = await axiosServices.post("/api/tenants/championship/create_compitition", formData);
    console.log(response, "Competition");

    if (response.status === 200) {
      const result = response.data;

      return result;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to create Competition");
    }
  } catch (error) {
    console.error("Failed to create Competition", error);
    throw new Error("Failed to create Competition");
  }
};

export const updateMatch = async (selectedMatches: any) => {
  try {
    console.log(selectedMatches, "for back");
    const response = await axiosServices.post(`/api/tenants/championship/update-match`, {
      selectedMatches: selectedMatches,
    });

    if (response.status === 200) {
      const result = response.data;

      return result;
    } else {
      console.error("Failed to update matches:", response);
      throw new Error("Failed to update matches");
    }
  } catch (error) {
    console.error("Failed to update matches:", error);
    throw new Error("Failed to update matches");
  }
};

export const updateCompetitionById = async (id: any, competitionData: any) => {
  console.log(competitionData, "fn util ");
  try {
    const formData = new FormData();
    Object.keys(competitionData).forEach((key) => {
      if (key === "organisers") {
        competitionData[key].forEach((organiser: any, index: number) => {
          formData.append(`organisers[${index}][secretary_name]`, organiser.secretary_name);
          formData.append(`organisers[${index}][post]`, organiser.post);
        });
      } else if (key === "preferred_loc") {
        competitionData[key].forEach((loc: any, index: number) => {
          formData.append(`preferred_loc[${index}][id]`, loc.id);
          formData.append(`preferred_loc[${index}][name]`, loc.name);
        });
      } else if (key === "circular") {
        formData.append("circular", competitionData.circular);
      } else {
        formData.append(key, competitionData[key]);
      }
    });

    const jsonData = { ...competitionData };
    delete jsonData.circular;

    console.log(formData, "form");

    const response = await axiosServices.put(`/api/tenants/championship/competition/${id}`, formData);
    console.log(response, "update event");

    if (response.status === 200) {
      const result = response.data;

      return result;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to update Competition");
    }
  } catch (error) {
    console.error("Failed to update Competition", error);
    throw new Error("Failed to update Competition");
  }
};

export const getAllCompetitionCategories = async () => {
  try {
    const response = await axiosServices.get("/api/tenants/championship/competition-categories");

    if (response.status === 200) {
      const categories = response.data;

      return categories;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to fetch competition categories");
    }
  } catch (error) {
    console.error("Failed to fetch competition categories", error);
    throw new Error("Failed to fetch competition categories");
  }
};

export const getAllDistricts = async () => {
  try {
    const response = await axiosServices.get("/util/district");

    if (response.status === 200) {
      const district = response.data;

      return district;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to fetch district");
    }
  } catch (error) {
    console.error("Failed to fetch district", error);
    throw new Error("Failed to fetch district");
  }
};

export const getAllPreferredLocations = async () => {
  try {
    const response = await axiosServices.get("/util/preferred");

    if (response.status === 200) {
      const preffered = response.data;

      return preffered;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to fetch preffered location");
    }
  } catch (error) {
    console.error("Failed to fetch preffered location", error);
    throw new Error("Failed to fetch preffered location");
  }
};

export const getCompetitionById = async (id: number) => {
  try {
    const response = await axiosServices.get(`/api/tenants/championship/competition/${id}`);
    if (response.status === 200) {
      const eventData = response.data;

      eventData.from_date = format(parseISO(eventData.from_date), "dd-MM-yyyy");
      eventData.to_date = format(parseISO(eventData.to_date), "dd-MM-yyyy");
      eventData.reg_start_date = format(parseISO(eventData.reg_start_date), "dd-MM-yyyy");
      eventData.reg_end_date = format(parseISO(eventData.reg_end_date), "dd-MM-yyyy");
      eventData.cut_off_date = format(parseISO(eventData.cut_off_date), "dd-MM-yyyy");
      eventData.late_fee_end_date = format(parseISO(eventData.late_fee_end_date), "dd-MM-yyyy");

      return eventData;
    } else {
      console.error("Failed to fetch Competition:", response);
      throw new Error("Failed to fetch Competition");
    }
  } catch (error) {
    console.error("Failed to fetch Competition:", error);
    throw new Error("Failed to fetch Competition");
  }
};

export const getAllCompetition = async () => {
  try {
    const response = await axiosServices.get("/api/tenants/championship/competition");

    if (response.status === 200) {
      const competition = response.data;

      return competition;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to fetch preffered location");
    }
  } catch (error) {
    console.error("Failed to fetch preffered location", error);
    throw new Error("Failed to fetch preffered location");
  }
};

export const deleteCompetionById = async (selectedId: any) => {
  try {
    const response = await await axiosServices.delete(`/api/tenants/championship/competition/${selectedId}`);

    if (response.status === 200) {
      return { success: true, message: "Competiton deleted successfully" };
    } else {
      console.error("Failed to delete competetion:", response);

      return { success: false, message: "Failed to delete competetion" };
    }
  } catch (error) {
    console.error("Failed to delete competetion:", error);

    return { success: false, message: "Failed to delete competetion" };
  }
};

//for events

// Rename the function
export const getAllAgeGroups = async () => {
  try {
    const response = await axiosServices.get("/api/tenants/championship/agegroup");
    if (response.status === 200) {
      const ageGroups = response.data;

      return ageGroups;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to fetch age groups");
    }
  } catch (error) {
    console.error("Failed to fetch age groups", error);
    throw new Error("Failed to fetch age groups");
  }
};

export const getEventType = async () => {
  try {
    const response = await axiosServices.get("/api/tenants/championship/event-type");
    console.log(response, "evenyt");
    if (response.status === 200) {
      const eventTypes = response.data;

      return eventTypes;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to eventType");
    }
  } catch (error) {
    console.error("Failed to fetch eventType", error);
    throw new Error("Failed to fetch eventType");
  }
};

export const createEvent = async (eventData: any) => {
  try {
    const response = await axiosServices.post("/api/tenants/championship/create-event", eventData);
    console.log(response, "create event");

    if (response.status === 200) {
      const result = response.data;

      return result;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to create event");
    }
  } catch (error) {
    console.error("Failed to create event", error);
    throw new Error("Failed to create event");
  }
};

export const updateEventById = async (eventId: any, eventData: any) => {
  try {
    const response = await axiosServices.put(`/api/tenants/championship/event/${eventId}`, eventData);
    console.log(response, "update event");

    if (response.status === 200) {
      const result = response.data;

      return result;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to update event");
    }
  } catch (error) {
    console.error("Failed to update event", error);
    throw new Error("Failed to update event");
  }
};

export const getEventsBySelectedEventType = async (selectedEventType: any) => {
  try {
    const response = await axiosServices.post("/api/tenants/championship/eventname", {
      selectedEventType: selectedEventType,
    });
    console.log(response, "response");
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to fetch events by selected event type");
    }
  } catch (error) {
    console.error("Failed to fetch events by selected event type", error);
    throw new Error("Failed to fetch events by selected event type");
  }
};

export const getEventName = async (competitionCategory: any) => {
  try {
    const response = await axiosServices.get(`/api/tenants/championship/mqs/${competitionCategory}`);

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to fetch event names");
    }
  } catch (error) {
    console.error("Failed to fetch event names", error);
    throw new Error("Failed to fetch event names");
  }
};

export const getEventById = async (id: number) => {
  try {
    const response = await axiosServices.get(`/api/tenants/championship/events/${id}`);
    if (response.status === 200) {
      const eventData = response.data;

      return eventData;
    } else {
      console.error("Failed to fetch event:", response);
      throw new Error("Failed to fetch event");
    }
  } catch (error) {
    console.error("Failed to fetch event:", error);
    throw new Error("Failed to fetch event");
  }
};

export const deleteEventById = async (eventId: any) => {
  try {
    const response = await axiosServices.delete(`/api/tenants/championship/event/${eventId}`);

    if (response.status === 200) {
      return { success: true, message: "Event deleted successfully" };
    } else {
      console.error("Failed to delete event:", response);

      return { success: false, message: "Failed to delete event" };
    }
  } catch (error) {
    console.error("Failed to delete event:", error);

    return { success: false, message: "Failed to delete event" };
  }
};

//For EventGroup

export const fetchEventGroupData = async (competitionName: string) => {
  try {
    const response = await axiosServices.post("/api/tenants/championship/eventdata", {
      competitionName,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to fetch event names");
    }
  } catch (error) {
    console.error("Failed to fetch event names", error);
    throw new Error("Failed to fetch event names");
  }
};

export const createEventGroup = async (eventGroupData: any) => {
  try {
    console.log(eventGroupData, "for backend");
    const response = await axiosServices.post("/api/tenants/championship/create-eventgroup", eventGroupData);
    console.log(response, "create event Group");

    if (response.status === 200) {
      const result = response.data;

      return result;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to create eventGroup");
    }
  } catch (error) {
    console.error("Failed to create event", error);
    throw new Error("Failed to create eventGroup");
  }
};

export const getAllEvents = async (competitionCategory: any) => {
  try {
    const response = await axiosServices.get(`/api/tenants/championship/event/${competitionCategory}`);
    if (response.status === 200) {
      const eventData = response.data;

      return eventData;
    } else {
      console.error("Failed to fetch event:", response);
      throw new Error("Failed to fetch event");
    }
  } catch (error) {
    console.error("Failed to fetch event:", error);
    throw new Error("Failed to fetch event");
  }
};

export const getAllSelectedMatches = async (requestBody: any) => {
  try {
    console.log(requestBody, "fn util");
    const response = await axiosServices.post(`/api/tenants/championship/getSelectedMatches`, requestBody);

    if (response.status === 200) {
      const result = response.data;

      return result;
    } else {
      console.error("Failed to getAll matches:", response);
      throw new Error("Failed to getAll matches");
    }
  } catch (error) {
    console.error("Failed to getAll matches:", error);
    throw new Error("Failed to getAll matches");
  }
};

export const updateEventGroupById = async (eventGroupId: any, eventGroupData: any) => {
  try {
    console.log(eventGroupData, "hello");
    const response = await axiosServices.put(`/api/tenants/championship/eventgroup/${eventGroupId}`, eventGroupData);
    console.log(response, "update eventGroup");

    if (response.status === 200) {
      const result = response.data;

      return result;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to updateGroup event");
    }
  } catch (error) {
    console.error("Failed to update event", error);
    throw new Error("Failed to updateGroup event");
  }
};

export const getEventGroupById = async (id: number) => {
  try {
    const response = await axiosServices.get(`/api/tenants/championship/eventgroup/${id}`);
    if (response.status === 200) {
      const eventData = response.data;

      return eventData;
    } else {
      console.error("Failed to fetch eventGroup:", response);
      throw new Error("Failed to fetch eventGroup");
    }
  } catch (error) {
    console.error("Failed to fetch eventGroup:", error);
    throw new Error("Failed to fetch eventGroup");
  }
};

export const deleteEventGroupById = async (eventId: any) => {
  try {
    const response = await axiosServices.delete(`/api/tenants/championship/eventgroup/${eventId}`);

    if (response.status === 200) {
      return { success: true, message: "EventGroup deleted successfully" };
    } else {
      console.error("Failed to delete eventGroup:", response);

      return { success: false, message: "Failed to delete eventGroup" };
    }
  } catch (error) {
    console.error("Failed to delete eventGroup:", error);

    return { success: false, message: "Failed to delete eventGroup" };
  }
};

export const getTarget = async () => {
  try {
    const response = await axiosServices.get("/util/targets");
    console.log(response, "target");
    if (response.status === 200) {
      const target = response.data;

      return target;
    } else {
      console.error("Unexpected response:", response);
      throw new Error("Failed to fetch target");
    }
  } catch (error) {
    console.error("Failed to fetch target", error);
    throw new Error("Failed to fetch target");
  }
};

//
