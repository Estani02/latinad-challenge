import {LocationType, SizeType} from './types';

export const translateSizeType = (sizeType: SizeType): string => {
  switch (sizeType) {
    case 'small':
      return 'Pequeña';
    case 'medium':
      return 'Mediana';
    case 'large':
      return 'Grande';
    case 'giant':
      return 'Gigante';
    default:
      return sizeType;
  }
};

export const translateLocationType = (locationType: LocationType): string => {
  switch (locationType) {
    case 'indoor':
      return 'Interior';
    case 'outdoor':
      return 'Exterior';
    case 'point of sale':
      return 'Punto de venta';
    case 'buses':
      return 'Autobuses';
    default:
      return locationType;
  }
};

export const formatMillisecondsToMinutesAndSeconds = (ms: number) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);

  return `${minutes}:${parseInt(seconds) < 10 ? '0' : ''}${seconds}`;
};
