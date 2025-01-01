import {takeEvery, call, put} from 'redux-saga/effects';
import axios from 'axios';
import {PayloadAction} from '@reduxjs/toolkit';

import {
  fetchCampaignRequest,
  fetchCampaignSuccess,
  fetchCampaignFailure,
} from '@/features/campaignSlice';
import {CampaignResponse, LaunchCampaignType} from '@/types';

function* fetchCampaignSaga(
  action: PayloadAction<LaunchCampaignType & {page: number; per_page: number}>,
): Generator<unknown, void, unknown> {
  try {
    const {coordinates, startEnd, page, per_page} = action.payload;

    if (!startEnd) throw new Error('No Dates provided');

    const strQuery = `?lat_sw=${coordinates.lat_sw}&lng_sw=${coordinates.lng_sw}&lat_ne=${coordinates.lat_ne}&lng_ne=${coordinates.lng_ne}&date_from=${startEnd[0]}&date_to=${startEnd[1]}&page=${page ? page : 1}&per_page=${per_page ? per_page : 5}`;
    const response = yield call(
      axios.get,
      `https://api.dev.publinet.io/displays/searchTest${strQuery}`,
    );
    const data = (response as {data: CampaignResponse}).data;

    yield put(fetchCampaignSuccess(data));
  } catch (error) {
    if (error instanceof Error) {
      yield put(fetchCampaignFailure(error.message));
    } else {
      yield put(fetchCampaignFailure('Unknown error'));
    }
  }
}

export function* mySaga() {
  yield takeEvery(fetchCampaignRequest.type, fetchCampaignSaga);
}
