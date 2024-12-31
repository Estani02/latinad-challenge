'use client';

import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Icon} from 'leaflet';

import {CampaignItem} from '@/types';
import {useAppSelector} from '@/hooks';

export function Map() {
  const {data, coordinates} = useAppSelector((state) => state.campaign);

  const customIcon = new Icon({
    iconUrl:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Google_Maps_pin.svg/274px-Google_Maps_pin.svg.png',
    iconSize: [24, 36],
  });

  const parsedLat = data?.data[0].latitude ? data?.data[0].latitude : parseFloat(coordinates?.lat);
  const parsedLon = data?.data[0].longitude
    ? data?.data[0].longitude
    : parseFloat(coordinates?.lon);

  return (
    <div className="z-[10] flex h-[460px] w-full rounded-2xl bg-white">
      <MapContainer
        center={[parsedLat, parsedLon]}
        className="h-full w-full rounded-2xl"
        scrollWheelZoom={false}
        zoom={13}
      >
        <TileLayer
          attribution="Google Maps"
          url="https://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}"
        />
        {data?.data.map((item: CampaignItem) => (
          <Marker key={item.id} icon={customIcon} position={[item.latitude, item.longitude]}>
            <Popup>{item.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
