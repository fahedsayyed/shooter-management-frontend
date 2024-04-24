import React from "react";
import ProfileBanner from "./profile/ProfileBanner";
import { useParams } from "react-router";

const ViewAthlete = () => {
  const athleteId: any = useParams();

  return <ProfileBanner athleteId={athleteId} />;
};

export default ViewAthlete;
