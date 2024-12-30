'use client';

import {Map} from '../Map';

import {useAppSelector} from '@/hooks';

export function CampaignsResult() {
  const {data, loading} = useAppSelector((state) => state.campaign);

  return (
    <div className="flex h-full w-full gap-6">
      <div className="h-full w-[400px] rounded-2xl bg-white p-6">
        <p>Results</p>
      </div>
      {data ? <Map /> : null}
    </div>
  );
}
