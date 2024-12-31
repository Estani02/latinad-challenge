'use client';
import {useParams} from 'next/navigation';
import Image from 'next/image';
import {Card, Descriptions} from 'antd';
import Link from 'next/link';

import {selectCampaignById} from '@/features/campaignSlice';
import {useAppSelector} from '@/hooks';
import {
  formatMillisecondsToMinutesAndSeconds,
  translateLocationType,
  translateSizeType,
} from '@/utils';

export default function ScreenDetail() {
  const {id} = useParams<{id: string}>();
  const campaign = useAppSelector((state) => selectCampaignById(state, Number(id)));

  if (!campaign) {
    return <div>Loading...</div>;
  }
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${campaign.latitude},${campaign.longitude}`;

  return (
    <div className="mt-4 flex h-full w-full items-center justify-center px-[10px] py-6">
      <main className="h-full w-full max-w-[1000px] rounded-2xl bg-white">
        <Card
          cover={
            <div className="relative h-[300px] w-full overflow-hidden rounded-t-xl">
              <Image
                alt={campaign.name}
                layout="fill"
                objectFit="cover"
                src={campaign.pictures[0].url}
              />
            </div>
          }
        >
          <div className="mb-8">
            <Card.Meta description={campaign.description} title={campaign.name} />
          </div>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="ID">{campaign.id}</Descriptions.Item>
            <Descriptions.Item label="Nombre">{campaign.name}</Descriptions.Item>
            <Descriptions.Item label="Resolución">
              {campaign.resolution_width} x {campaign.resolution_height} píxeles
            </Descriptions.Item>
            <Descriptions.Item label="Ubicación">
              <Link passHref className="text-sky-500" href={googleMapsLink} target="_blank">
                {googleMapsLink}
              </Link>
            </Descriptions.Item>
            <Descriptions.Item label="Provincia/Estado">
              {campaign.administrative_area_level_1}
            </Descriptions.Item>
            <Descriptions.Item label="Ciudad/Municipio">
              {campaign.administrative_area_level_2}
            </Descriptions.Item>
            <Descriptions.Item label="Dirección">{campaign.formatted_address}</Descriptions.Item>
            <Descriptions.Item label="Código Postal">{campaign.zip_code}</Descriptions.Item>
            <Descriptions.Item label="País">{campaign.country}</Descriptions.Item>
            <Descriptions.Item label="Espacios Publicitarios">{campaign.slots}</Descriptions.Item>
            <Descriptions.Item label="Duración del Espacio">
              {formatMillisecondsToMinutesAndSeconds(campaign.slot_length)} min
            </Descriptions.Item>
            <Descriptions.Item label="Muestras por Hora">
              {campaign.shows_per_hour}
            </Descriptions.Item>
            <Descriptions.Item label="Precio por Día">
              {campaign.price_per_day} USD
            </Descriptions.Item>
            <Descriptions.Item label="Tipo de Ubicación">
              {translateLocationType(campaign.location_type)}
            </Descriptions.Item>
            <Descriptions.Item label="Tamaño de la Pantalla">
              {translateSizeType(campaign.size_type)}
            </Descriptions.Item>
            <Descriptions.Item label="Dimensiones Físicas">
              {campaign.size_width}m x {campaign.size_height}m
            </Descriptions.Item>
            <Descriptions.Item label="Código ISO del País">
              {campaign.country_iso}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </main>
    </div>
  );
}