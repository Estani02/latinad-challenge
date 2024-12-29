'use client';
import React, {useState} from 'react';
import {AutoComplete, Input} from 'antd';
import {MapPin} from 'lucide-react';
import {ControllerRenderProps, FieldValues, Path} from 'react-hook-form';

const mockVal = (str: string, repeat: number = 1) => ({
  value: str.repeat(repeat),
});

interface SearchAreaProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>;
}

export function SearchArea<T extends FieldValues>({field}: SearchAreaProps<T>) {
  const [options, setOptions] = useState<{value: string}[]>([]);

  const handleSearch = (value: string) => {
    setOptions(!value ? [] : [mockVal(value), mockVal(value, 2), mockVal(value, 3)]);
  };

  const onSelect = (value: string) => {
    console.log('onSelect', value);
  };

  return (
    <div className="flex h-fit items-center">
      <MapPin className="text-weak" size={20} />
      <div className="flex flex-col px-3">
        <span className="text-weak pl-1 text-xs">Zona de campaña</span>
        <AutoComplete
          allowClear
          className="h-fit"
          options={options}
          onSearch={handleSearch}
          onSelect={onSelect}
        >
          <Input className="border-none p-0 pl-1 outline-none" placeholder="¿A dónde la apuntas?" />
        </AutoComplete>
      </div>
    </div>
  );
}
