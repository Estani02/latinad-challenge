import {FormatDate, LocationType, SizeType} from './types';

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

export function calculateDaysBetweenDates(dates?: FormatDate): number {
  if (!dates) {
    return 0;
  }

  const [startDateString, endDateString] = dates;

  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    throw new Error('Date is invalid');
  }

  const differenceInMilliseconds = endDate.getTime() - startDate.getTime();

  return differenceInMilliseconds / (1000 * 60 * 60 * 24); // Convertir a días
}
