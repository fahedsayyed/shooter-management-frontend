import React, { useEffect, useState } from "react";
import { Checkbox, FormControlLabel, FormGroup, ListItemIcon, Tooltip } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import IconEye from "@mui/icons-material/Visibility";
import { getAllEvents } from "../ChampionshipUtils/functionUtils";
import APP_ROUTES from "src/routes/routePaths";
import { useSelector, AppState } from "../../../store/Store";
import { useDispatch } from "../../../store/Store";
import { useNavigate } from "react-router";
import { setSelectedEvent } from "src/store/championship-reducer/addCompetitionFormSlice";

type EventName = {
  id: number;
  match_name: string;
  match_no: string;
  match_id: number;
};

interface AddCompetitionSlide1Props {
  step?: any;
}

const AddCompetitionSlide2: React.FC<AddCompetitionSlide1Props> = ({ step }) => {
  const navigate = useNavigate();
  // const openModal = useSelector((state: AppState) => state.championship.eventModal);
  // console.log(openModal, "openModal openModal");
  const competitionData = useSelector((state: AppState) => state.AddCompetitionForm.competitionData);
  const [events, setEvents] = useState<EventName[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const dispatch = useDispatch();

  const fetchEventName = async () => {
    try {
      const eventNames = await getAllEvents(competitionData.category_name);
      setEvents(eventNames);
    } catch (error) {
      console.error("Failed to fetch events:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchEventName();
    };

    fetchData();
  }, [competitionData.category_name]);

  const handleCheckboxChange = (eventId: number) => {
    setSelectedEvents((prevSelectedEvents) => {
      const updatedSelectedEvents = prevSelectedEvents.includes(eventId) ? prevSelectedEvents.filter((id) => id !== eventId) : [...prevSelectedEvents, eventId];

      return updatedSelectedEvents;
    });
  };

  useEffect(() => {
    dispatch(setSelectedEvent(selectedEvents));
  }, [selectedEvents]);
  console.log(selectedEvents, "events");

  const handleView = (event: EventName) => {
    const { match_id } = event;
    console.log("Viewing event:", event);
    navigate(`${APP_ROUTES.CHAMPIONS}/edit-event/${match_id}`);
  };

  return (
    <>
      <FormGroup>
        {events.map((event) => (
          <div key={event.id}>
            <FormControlLabel
              control={<Checkbox checked={selectedEvents.includes(event.id)} onChange={() => handleCheckboxChange(event.id)} disableRipple />}
              label={`${event.match_no} - ${event.match_name}`}
              labelPlacement="end"
            />
            <ListItemIcon>
              <Tooltip title="View Event">
                <IconButton sx={{ cursor: "pointer" }} onClick={() => handleView(event)}>
                  <IconEye fontSize="small" />
                </IconButton>
              </Tooltip>
            </ListItemIcon>
          </div>
        ))}
      </FormGroup>
    </>
  );
};

export default AddCompetitionSlide2;
