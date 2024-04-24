import { all } from 'redux-saga/effects';
import { watchFetchClubAndDraList, watchFetchTenantById, watchFetchTenantList, watchGetRoleAndPermissionById, watchGetSubscriptionAndPlan, watchPostTenant, watchSendEmailToTenant, watchUpdateRoleAndPermissionById, watcheditTenant, watcheupdateUserStatusTenant } from './superAdminSaga';
import  { watchFetchAthleteList, watchUpdateAthleteStatus, watchfetchSingleAthlete } from './athleteSaga';
import { watchAddMatchEntry, watchEditUpdateAthleteMatchStatus, watchFetchCompetitionById, watchFetchCompetitionList, watchFetchEventsId, watchFetchMatchParticipationList, watchFetchmatchParticipationDetailList, watchFetchtAthleteOfCompetition, watchGetMatchDetailByCompetition, watchGetPreferedLocationByCompetition, watchGetUpcomingMatchParticipationList, watchUpdateAthleteMatchStatus } from './matchParticipationSaga';
import { watchAddScoreEntry, watchFetchAthleteBymatch, watchFetchMatchGroupDetail, watchFetchMatchGroupList, watchFetchMatchGroupSeriesTitle, watchFetchMatchesByMatchgroupId } from './scoreEntrySaga';
import { watchAddDetail, watchAddDetailDateAndTime, watchFetchtAthleteOfCompetitionAndMatchGroupSaga, watchGetDetailById } from './detailSaga';

export default function* rootSaga() {
  yield all([
             watchFetchTenantList(),
             watchFetchTenantById(),
             watchPostTenant(),
             watcheditTenant(),
             watchFetchClubAndDraList(),
             watcheupdateUserStatusTenant(),
             watchFetchAthleteList(),
             watchfetchSingleAthlete(),
             watchGetRoleAndPermissionById(),
             watchUpdateRoleAndPermissionById(),
             watchUpdateAthleteStatus(),
             watchFetchCompetitionList(),
             watchFetchMatchParticipationList(),
             watchFetchCompetitionById(),
             watchFetchEventsId(),
             watchAddMatchEntry(),
             watchFetchmatchParticipationDetailList(),
             watchUpdateAthleteMatchStatus(),
             watchEditUpdateAthleteMatchStatus(),
             watchGetUpcomingMatchParticipationList(),
             watchGetMatchDetailByCompetition(),
             watchFetchMatchGroupList(),
             watchFetchMatchesByMatchgroupId(),
             watchFetchAthleteBymatch(),
             watchFetchMatchGroupDetail(),
             watchFetchMatchGroupSeriesTitle(),
             watchAddScoreEntry(),
             watchGetPreferedLocationByCompetition(),
             watchFetchtAthleteOfCompetition(),
             watchAddDetail(),
             watchGetDetailById(),
             watchFetchtAthleteOfCompetitionAndMatchGroupSaga(),
             watchAddDetailDateAndTime(),
             watchSendEmailToTenant(),
             watchGetSubscriptionAndPlan()
            
            ]);
}
