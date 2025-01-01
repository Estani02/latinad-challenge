import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CampaignResponse, Coords, FormatDate, LaunchCampaignType} from '@/types';
import {RootState} from '@/app/store';

interface CampaignState {
  data?: CampaignResponse;
  loading: boolean;
  error: string | null;
  startEnd?: FormatDate;
  coordinates: Coords;
  currentPage: number;
  perPage: number;
}

const initialState: CampaignState = {
  data: undefined,
  loading: false,
  error: null,
  coordinates: {
    lat: '',
    lon: '',
    lat_sw: '',
    lng_sw: '',
    lat_ne: '',
    lng_ne: '',
  },
  startEnd: undefined,
  currentPage: 1,
  perPage: 5,
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    fetchCampaignRequest(
      state,
      action: PayloadAction<LaunchCampaignType & {page?: number; per_page?: number}>,
    ) {
      state.loading = true;
      state.error = null;
      state.coordinates = action.payload.coordinates;
      state.startEnd = action.payload.startEnd;
      state.currentPage = action.payload.page ? action.payload.page : 1;
      state.perPage = action.payload.per_page ? action.payload.per_page : 5;
    },
    fetchCampaignSuccess(state, action: PayloadAction<CampaignResponse>) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchCampaignFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const selectCampaignById = (state: RootState, id: number) =>
  state.campaign.data?.data.find((item) => item.id === id);

export const {fetchCampaignRequest, fetchCampaignSuccess, fetchCampaignFailure} =
  campaignSlice.actions;

export default campaignSlice.reducer;
