'use client';

import {SearchIcon} from 'lucide-react';
import {Controller, useForm} from 'react-hook-form';

import {SearchArea, SearchAreaOption} from '../auto-complete/SearchArea';
import {StartEndCampaign} from '../data-picker/StartEndCampaign';

interface LaunchCampaign {
  search: SearchAreaOption;
  startEnd: [Date | null, Date | null];
}

export function LaunchCampaign() {
  const {control, handleSubmit} = useForm<LaunchCampaign>({
    defaultValues: {
      search: {value: '', label: '', boundingbox: []},
      startEnd: [null, null],
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <form
      className="mt-10 flex items-center rounded-full bg-white px-4 py-2 text-weak"
      onSubmit={onSubmit}
    >
      <Controller
        control={control}
        name="search"
        render={({field}) => <SearchArea<LaunchCampaign> field={field} />}
      />
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
    </form>
  );
}
