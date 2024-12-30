'use client';

import {SearchIcon} from 'lucide-react';
import {Controller, useForm} from 'react-hook-form';

import {SearchArea} from '../auto-complete/SearchArea';
import {StartEndCampaign} from '../data-picker/StartEndCampaign';

interface Coords {
  lat_sw: string;
  lng_sw: string;
  lat_ne: string;
  lng_ne: string;
}

interface LaunchCampaign {
  coordinates: Coords;
  startEnd: [Date | null, Date | null];
}

export function LaunchCampaign() {
  const {control, handleSubmit} = useForm<LaunchCampaign>({
    defaultValues: {
      coordinates: {lat_sw: '', lng_sw: '', lat_ne: '', lng_ne: ''},
      startEnd: [null, null],
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    return data;
  });

  return (
    <form
      className="mt-10 flex flex-col items-center gap-4 rounded-full px-4 py-2 text-weak lg:flex-row lg:gap-0 lg:bg-white"
      onSubmit={onSubmit}
    >
      <Controller
        control={control}
        name="coordinates"
        render={({field}) => <SearchArea<LaunchCampaign> field={field} />}
      />
      <div className="flex w-full items-center justify-between gap-4 rounded-full bg-white px-4 py-2 lg:w-auto lg:bg-none lg:p-0">
        <Controller
          control={control}
          name="startEnd"
          render={({field}) => <StartEndCampaign<LaunchCampaign> field={field} />}
        />
        <button
          className="ml-4 rounded-full bg-primary px-5 py-2 text-white transition-colors duration-200 hover:bg-primary-dark"
          type="submit"
        >
          <SearchIcon size={20} />
        </button>
      </div>
    </form>
  );
}
