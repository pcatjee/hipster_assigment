export type Location = {
  ADDRESS: string;
  SEARCHVAL: string;
  LATITUDE?: string;
  LONGITUDE?: string;
  LAT?: string;
  LON?: string;
  [key: string]: any;
};

// Define stack param list
export type Test2StackParamList = {
  RouteInputScreen: {
    selectedLocation?: Location;
    field?: 'start' | 'end';
    start?: Location;
    end?: Location;
  };
  LocationSearchScreen: {
    field: 'start' | 'end';
    prev: {
      start?: Location;
      end?: Location;
    };
  };
  RouteMapScreen: {
    start: Location;
    end: Location;
  };
};
