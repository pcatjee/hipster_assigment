import { LatLng } from 'react-native-maps';

export type Position = LatLng | null;

export type RouteArray = LatLng[];

export type GeoPosition = {
  coords: {
    latitude: number;
    longitude: number;
    [key: string]: any;
  };
  [key: string]: any;
};
