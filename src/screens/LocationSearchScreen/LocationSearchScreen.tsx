// modules
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';

// styles
import { styles } from './LocationSearchScreen.styles';

// components
import { Header } from '@components';

// constants
import { SEARCH_API } from '@constants';

// typings
import { Location } from '@navigators/typings';
import { Props } from './typings';

/**
 * Screen for searching and selecting locations
 */
const LocationSearchScreen = ({ navigation, route }: Props) => {
  const { field, prev } = route.params;
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Location[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(SEARCH_API + encodeURIComponent(text));
      const json = await res.json();
      setResults(json.results || []);
    } catch (e) {
      setResults([]);
    }
    setLoading(false);
  };

  const handleSelect = (item: Location) => {
    navigation.navigate('RouteInputScreen', {
      ...prev,
      [`${field}`]: item,
      selectedLocation: item,
      field,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Search Location" showBackButton />
      <TextInput
        style={styles.input}
        placeholder="Type a location..."
        value={query}
        onChangeText={handleSearch}
        autoFocus
      />
      {loading && <ActivityIndicator style={{ marginTop: 16 }} />}
      <FlatList
        data={results}
        keyExtractor={(item, idx) => item.SEARCHVAL + idx}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.resultItem}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.resultText}>{item.SEARCHVAL}</Text>
            <Text style={styles.resultSub}>{item.ADDRESS}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !loading && query.length > 1 ? (
            <Text style={styles.empty}>No results found.</Text>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

export default LocationSearchScreen;
