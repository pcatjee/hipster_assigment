// modules
import React, { useEffect, useState, useRef } from 'react';
import { Text, ActivityIndicator, SafeAreaView } from 'react-native';
import MapView, { Polyline, Marker } from 'react-native-maps';

// styles
import { styles } from './RouteMapScreen.styles';

// components
import { Header } from '@components';

// typings
import { Props } from './typings';

/**
 * Screen for displaying route map between two locations
 */
const RouteMapScreen = ({ route }: Props) => {
  const { start, end } = route.params;
  const [routeCoords, setRouteCoords] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    const fetchRoute = async () => {
      if (!start || !end) return;
      const startLng = start.LONGITUDE || start.LON;
      const startLat = start.LATITUDE || start.LAT;
      const endLng = end.LONGITUDE || end.LON;
      const endLat = end.LATITUDE || end.LAT;
      const url = `http://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson`;
      try {
        const res = await fetch(url);
        const json = await res.json();
        const coords = json.routes[0].geometry.coordinates.map(
          ([lng, lat]: [number, number]) => ({ latitude: lat, longitude: lng }),
        );
        setRouteCoords(coords);
        setLoading(false);
        // Fit map to route
        setTimeout(() => {
          if (mapRef.current && coords.length > 1) {
            mapRef.current.fitToCoordinates(coords, {
              edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
              animated: true,
            });
          }
        }, 500);
      } catch (e) {
        setRouteCoords([]);
        setLoading(false);
      }
    };
    fetchRoute();
  }, [start, end]);

  if (!start || !end) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Route Map" showBackButton />
        <Text style={styles.error}>Missing start or end location.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Route Map" showBackButton />
      {loading ? (
        <ActivityIndicator style={{ marginTop: 32 }} />
      ) : (
        <MapView
          ref={mapRef}
          style={styles.map}
          provider="google"
          initialRegion={{
            latitude:
              (parseFloat(start.LATITUDE || start.LAT || '0') +
                parseFloat(end.LATITUDE || end.LAT || '0')) /
              2,
            longitude:
              (parseFloat(start.LONGITUDE || start.LON || '0') +
                parseFloat(end.LONGITUDE || end.LON || '0')) /
              2,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{
              latitude: parseFloat(start.LATITUDE || start.LAT || '0'),
              longitude: parseFloat(start.LONGITUDE || start.LON || '0'),
            }}
            title="Start"
            description={start.ADDRESS || start.SEARCHVAL}
          />
          <Marker
            coordinate={{
              latitude: parseFloat(end.LATITUDE || end.LAT || '0'),
              longitude: parseFloat(end.LONGITUDE || end.LON || '0'),
            }}
            title="End"
            description={end.ADDRESS || end.SEARCHVAL}
          />
          {routeCoords.length > 1 && (
            <Polyline
              coordinates={routeCoords}
              strokeColor="#007AFF"
              strokeWidth={5}
            />
          )}
        </MapView>
      )}
    </SafeAreaView>
  );
};

export default RouteMapScreen;
