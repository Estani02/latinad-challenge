'use client';

import Image from 'next/image';
import {Spin} from 'antd';

import {Map} from '../Map';

import {useAppSelector} from '@/hooks';
import {Specific} from '@/components';

export function CampaignsResult() {
  const {data, loading} = useAppSelector((state) => state.campaign);

  return (
    <div className="flex h-full w-full flex-col gap-6 py-9 lg:flex-row">
      <div className="relative h-[460px] w-full overflow-hidden rounded-2xl bg-white lg:max-w-[450px]">
        {data ? (
          <Specific.List.CampaignsResult />
        ) : (
          <div className="flex h-full w-full flex-col gap-4">
            <div className="flex flex-col gap-4 p-6">
              <h5 className="text-2xl font-medium text-primary">¿Tienes pantallas?</h5>
              <p className="text-lg text-gray-500">
                Súmate a la red más grande de América, gestiona tu negocio y aumenta las ventas.
              </p>
            </div>
            <Image
              alt="Pantallas"
              className="absolute -right-16 bottom-10"
              height={300}
              src="/screens.png"
              width={300}
            />
          </div>
        )}
      </div>
      {loading ? (
        <div className="flex h-[460px] w-full items-center justify-center rounded-2xl bg-white p-6">
          <Spin size="large" />
        </div>
      ) : data ? (
        <Map />
      ) : (
        <div className="relative flex h-[460px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-2xl bg-white p-6">
          <h5 className="flex flex-col items-center text-center text-xl font-medium text-gray-500 lg:text-3xl">
            Busca la campaña en el<span> lugar y fecha que deseas</span>
          </h5>
          <Image alt="Cliente de LatinAd" height={170} src="/man-pc.png" width={170} />
          <Image
            alt="Pantallas"
            className="absolute -left-20 bottom-10 -scale-x-[1]"
            height={300}
            src="/screens.png"
            width={300}
          />
        </div>
      )}
    </div>
  );
}
