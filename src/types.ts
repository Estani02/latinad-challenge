export interface Coords {
  lat: string;
  lon: string;
  lat_sw: string;
  lng_sw: string;
  lat_ne: string;
  lng_ne: string;
}

export type FormatDate = [`${string}-${string}-${string}`, `${string}-${string}-${string}`];

export interface LaunchCampaignType {
  coordinates: Coords;
  startEnd?: FormatDate;
  search?: string;
  locationType?: LocationType;
  priceMin?: number;
  priceMax?: number;
  sizeType?: SizeType;
  page?: number;
  per_page?: number;
}

export interface Picture {
  id: number;
  display_id: number;
  url: string;
}

export type SizeType = 'small' | 'medium' | 'big' | 'giant';

export type LocationType = 'indoor' | 'outdoor' | 'pos' | 'buses';

export interface CampaignItem {
  id: number;
  name: string;
  resolution_width: number;
  resolution_height: number;
  latitude: number;
  longitude: number;
  administrative_area_level_1: string;
  administrative_area_level_2: string;
  formatted_address: string;
  zip_code: string;
  country: string;
  slots: number;
  slot_length: number;
  shows_per_hour: number;
  price_per_day: number;
  location_type: LocationType;
  size_type: SizeType;
  size_width: number;
  size_height: number;
  description: string | null;
  country_iso: string;
  external_programmatic_cpm: string;
  price_currency: string;
  cpmi: string;
  is_online: boolean;
  pictures: Picture[];
}

export interface CampaignResponse {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
  data: CampaignItem[];
}
