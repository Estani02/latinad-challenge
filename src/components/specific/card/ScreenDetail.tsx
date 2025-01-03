'use client';
import {useParams} from 'next/navigation';
import Image from 'next/image';
import {Button, Card, Descriptions, Skeleton, notification} from 'antd';
import Link from 'next/link';
import {useState} from 'react';
import {Plus} from 'lucide-react';

import {selectCampaignById} from '@/features/campaignSlice';
import {addItem} from '@/features/cartSlice';
import {useAppDispatch, useAppSelector} from '@/hooks';
import {
  formatMillisecondsToMinutesAndSeconds,
  translateLocationType,
  translateSizeType,
} from '@/utils';
import {Specific} from '@/components';

export function ScreenDetail() {
  const {id} = useParams<{id: string}>();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const campaign = useAppSelector((state) => selectCampaignById(state, Number(id)));
  const {startEnd} = useAppSelector((state) => state.campaign);
  const dispatch = useAppDispatch();

  const [msg, contextHolder] = notification.useNotification();

  const handleAddToCart = () => {
    if (campaign) {
      dispatch(
        addItem({
          id: campaign.id,
          name: campaign.name,
          price: campaign.price_per_day,
          quantity: 1,
          campaignDuration: startEnd,
        }),
      );
      msg.success({
        message: 'Agregado al Carrito',
        description: `${campaign.name} ha sido agregado al carrito.`,
        placement: 'bottomRight',
      });
    }
  };

  if (!campaign) {
    return <Specific.Skeleton.ScreenDetail />;
  }
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${campaign?.latitude},${campaign?.longitude}`;

  return (
    <>
      {contextHolder}
      <Card
        cover={
          <div className="relative h-[300px] w-full overflow-hidden rounded-t-xl">
            {isLoading && <Skeleton.Image active className="!h-full !w-full" />}
            {campaign.pictures && campaign.pictures.length > 0 && campaign.pictures[0]?.url ? (
              isError ? (
                <Skeleton.Image className="!h-full !w-full" />
              ) : (
                <Image
                  alt={campaign.name}
                  layout="fill"
                  objectFit="cover"
                  src={campaign.pictures[0]?.url}
                  onError={() => {
                    setIsLoading(false);
                    setIsError(true);
                  }}
                  onLoadingComplete={() => setIsLoading(false)}
                />
              )
            ) : (
              <Skeleton.Image className="!h-full !w-full" />
            )}
          </div>
        }
      >
        <div className="mb-8 flex w-full flex-col items-center justify-between text-center lg:flex-row lg:text-left">
          <Card.Meta description={campaign.description} title={campaign.name} />
          <Button
            className="mt-4"
            icon={<Plus size={16} />}
            type="primary"
            onClick={handleAddToCart}
          >
            Agregar al Carrito
          </Button>
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
          <Descriptions.Item label="Muestras por Hora">{campaign.shows_per_hour}</Descriptions.Item>
          <Descriptions.Item label="Precio por Día">{campaign.price_per_day} USD</Descriptions.Item>
          <Descriptions.Item label="Tipo de Ubicación">
            {translateLocationType(campaign.location_type)}
          </Descriptions.Item>
          <Descriptions.Item label="Tamaño de la Pantalla">
            {translateSizeType(campaign.size_type)}
          </Descriptions.Item>
          <Descriptions.Item label="Dimensiones Físicas">
            {campaign.size_width}m x {campaign.size_height}m
          </Descriptions.Item>
          <Descriptions.Item label="Código ISO del País">{campaign.country_iso}</Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
}
