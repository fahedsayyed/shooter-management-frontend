import React from 'react'
import { useParams } from 'react-router';
import APP_ROUTES from 'src/routes/routePaths'
// import AthleteEditForm from './athleteform/AthleteEditForm';
import BackLink from 'src/components/back-link';
import AthleteEditForm from './athleteEditForm';

const EditAthlete = () => {
  const athleteId = useParams();
  console.log(athleteId);

  return (
    <>
    <BackLink title='Back to the Athletes' route={APP_ROUTES.ATHLETES} />
    <AthleteEditForm athleteId={athleteId} />
    </>
  )
}

export default EditAthlete