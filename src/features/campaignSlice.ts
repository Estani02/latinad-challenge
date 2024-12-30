import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {CampaignResponse, Coords, LaunchCampaignType} from '@/types';

interface CampaignState {
  data?: CampaignResponse;
  loading: boolean;
  error: string | null;
  coordinates: Coords;
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
};

const campaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
    fetchCampaignRequest(state, action: PayloadAction<LaunchCampaignType>) {
      state.loading = true;
      state.error = null;
      state.coordinates = action.payload.coordinates;
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

export const {fetchCampaignRequest, fetchCampaignSuccess, fetchCampaignFailure} =
  campaignSlice.actions;

export default campaignSlice.reducer;
