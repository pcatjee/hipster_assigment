// modules
import React, { useState } from 'react';
import { Text, TouchableOpacity, SafeAreaView } from 'react-native';

// styles
import { styles } from './Test2Screen.styles';

// components
import { Header } from '@components';
import { Location } from '@navigators/typings';

// typings
import { Props } from './typings';

/**
 * Screen for route input with start and end location selection
 */
const Test2Screen = ({ navigation, route }: Props) => {
  const [start, setStart] = useState<Location | undefined>(
    route?.params?.start || undefined,
  );
  const [end, setEnd] = useState<Location | undefined>(
    route?.params?.end || undefined,
  );

  // Handle result from LocationSearchScreen
  React.useEffect(() => {
    if (route.params?.selectedLocation && route.params?.field) {
      if (route.params.field === 'start') {
        setStart(route.params.selectedLocation);
      } else {
        setEnd(route.params.selectedLocation);
      }
      // Clean up params after use
      navigation.setParams({ selectedLocation: undefined, field: undefined });
    }
  }, [route.params, navigation]);

  const handleFieldPress = (field: 'start' | 'end') => {
    navigation.navigate('LocationSearchScreen', {
      field,
      prev: { start, end },
    });
  };

  const handleConfirm = () => {
    if (start && end) {
      navigation.navigate('RouteMapScreen', { start, end });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Route Finder" />
      <TouchableOpacity
        style={styles.inputField}
        onPress={() => handleFieldPress('start')}
      >
        <Text style={styles.inputLabel}>Start Point</Text>
        <Text style={styles.inputValue}>
          {start ? start.ADDRESS || start.SEARCHVAL : 'Select start location'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.inputField}
        onPress={() => handleFieldPress('end')}
      >
        <Text style={styles.inputLabel}>End Point</Text>
        <Text style={styles.inputValue}>
          {end ? end.ADDRESS || end.SEARCHVAL : 'Select end location'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.confirmButton,
          !(start && end) && { backgroundColor: '#ccc' },
        ]}
        onPress={handleConfirm}
        disabled={!(start && end)}
      >
        <Text style={styles.confirmText}>Show Route</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Test2Screen;
