// modules
import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  ListRenderItem,
  BackHandler,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { FlatList as GestureFlatList } from 'react-native-gesture-handler';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';

// styles
import { styles } from './Test1Screen.styles';

// components
import { BottomSheetRef, DynamicBottomSheet, Header } from '@components';

// constants
import {
  VERTICAL_CARDS,
  HORIZONTAL_CARDS,
  BOTTOMSHEET_CARDS,
} from '../../constants/dummyData';

// typings
import { BottomSheetCardData, CardData } from './typings';

const CATEGORIES = [{ id: 'all', title: 'All' }, ...HORIZONTAL_CARDS];

/**
 * Screen with trending cards and bottom sheet interaction
 */
const Test1Screen = () => {
  const bottomSheetRef = useRef<BottomSheetRef>(null);
  const [selectedCard, setSelectedCard] = useState<CardData | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (selectedCard) {
          bottomSheetRef.current?.close();
          return true;
        } else {
          return false;
        }
      };

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress,
      );

      return () => subscription.remove();
    }, [selectedCard]),
  );

  useEffect(() => {
    if (selectedCard) {
      bottomSheetRef.current?.expand();
    }
  }, [selectedCard]);

  const handleCardPress = useCallback((card: CardData) => {
    setSelectedCard(card);
  }, []);

  const handleSheetClose = useCallback(() => {
    setSelectedCard(null);
  }, []);

  const filteredVerticalCards = useMemo(() => {
    if (activeCategory === 'all') {
      return VERTICAL_CARDS;
    }
    return VERTICAL_CARDS.filter(card => card.categoryId === activeCategory);
  }, [activeCategory]);

  const renderHorizontalCard: ListRenderItem<CardData> = ({ item }) => {
    const isActive = item.id === activeCategory;
    return (
      <TouchableOpacity
        style={[styles.horizontalCard, isActive && styles.activeHorizontalCard]}
        onPress={() => setActiveCategory(item.id)}
      >
        <Text style={[styles.cardTitle, isActive && styles.activeCardTitle]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderVerticalCard: ListRenderItem<CardData> = ({ item }) => (
    <TouchableOpacity
      style={styles.verticalCard}
      onPress={() => handleCardPress(item)}
    >
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  const renderBottomSheetCard: ListRenderItem<BottomSheetCardData> = ({
    item,
  }) => (
    <View style={styles.bsHorizontalCard}>
      <Text style={styles.cardTitle}>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Trending" />
      <View>
        <FlatList
          data={CATEGORIES}
          renderItem={renderHorizontalCard}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      </View>
      <FlatList
        data={filteredVerticalCards}
        renderItem={renderVerticalCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.verticalLayout}
      />
      <DynamicBottomSheet ref={bottomSheetRef} onClose={handleSheetClose}>
        {selectedCard && (
          <BottomSheetScrollView style={styles.bsContainer}>
            <Text style={styles.bsHeader}>{selectedCard.title}</Text>
            <Text style={styles.bsDescription}>{selectedCard.details}</Text>
            <GestureFlatList
              data={BOTTOMSHEET_CARDS}
              renderItem={renderBottomSheetCard}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bsHorizontalList}
            />
          </BottomSheetScrollView>
        )}
      </DynamicBottomSheet>
    </SafeAreaView>
  );
};

export default Test1Screen;
