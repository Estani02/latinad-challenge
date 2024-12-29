'use client';

import {SearchIcon} from 'lucide-react';
import {Controller, useForm} from 'react-hook-form';

import {SearchArea} from '../auto-complete/SearchArea';
import {StartEndCampaign} from '../data-picker/StartEndCampaign';

interface LaunchCampaign {
  search: string;
  startEnd: [Date | null, Date | null];
}

export function LaunchCampaign() {
  const {control, handleSubmit} = useForm<LaunchCampaign>({
    defaultValues: {
      search: '',
      startEnd: [null, null],
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <form
      className="text-weak mt-10 flex items-center rounded-full bg-white px-4 py-2"
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
        className="bg-primary hover:bg-primary-dark ml-4 rounded-full px-5 py-2 text-white transition-colors duration-200"
        type="submit"
      >
        <SearchIcon size={20} />
      </button>
    </form>
  );
}
