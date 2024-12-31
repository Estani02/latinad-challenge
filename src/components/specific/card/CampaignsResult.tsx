'use client';

import Image from 'next/image';
import {Spin} from 'antd';

import {Map} from '../Map';

import {useAppSelector} from '@/hooks';
import {Specific} from '@/components';

export function CampaignsResult() {
  const {data, loading} = useAppSelector((state) => state.campaign);

  return (
    <div className="flex h-full w-full flex-col gap-6 lg:flex-row">
      <div className="h-full w-full rounded-2xl bg-white p-6 lg:max-w-[400px]">
        {data && <Specific.List.CampaignsResult />}
      </div>
      {loading ? (
        <div className="flex h-[400px] w-full items-center justify-center rounded-2xl bg-white p-6">
          <Spin size="large" />
        </div>
      ) : data ? (
        <Map />
      ) : (
        <div className="flex h-[400px] w-full flex-col items-center justify-center gap-4 rounded-2xl bg-white p-6">
          <h5 className="flex flex-col items-center text-3xl font-medium">
            Busca la campaña en el<span> lugar y fecha que deseas</span>
          </h5>
          <Image alt="Cliente de LatinAd" height={170} src="/man-pc.png" width={170} />
        </div>
      )}
    </div>
  );
}
