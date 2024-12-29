'use client';
import React from 'react';
import {DatePicker} from 'antd';
import dayjs from 'dayjs';
import {Calendar} from 'lucide-react';
import {ControllerRenderProps, FieldValues, Path} from 'react-hook-form';

interface StartEndCampaignProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
}

const {RangePicker} = DatePicker;

export function StartEndCampaign<T extends FieldValues>({field}: StartEndCampaignProps<T>) {
  const disabledDate = (current: dayjs.Dayjs) => {
    // Can not select days before today
    return current && current < dayjs().startOf('day');
  };

  return (
    <div className="flex h-fit items-center">
      <Calendar className="text-weak" size={20} />
      <div className="flex flex-col px-3">
        <span className="text-weak text-xs">Rango de campaña</span>
        <RangePicker
          className="border-none p-0 shadow-none outline-none"
          disabledDate={disabledDate}
          format="YYYY-MM-DD"
          style={{width: '100%'}}
          suffixIcon={null}
        />
      </div>
    </div>
  );
}
