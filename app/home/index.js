import { View, Text, StyleSheet, Pressable, ScrollView, TextInput  } from 'react-native'
import React, { useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { hp, wp } from '../../helpers/common';
import Categories from '../../components/categories';


const HomeScreen = () => {

  const {top} = useSafeAreaInsets();
  const paddingTop = top>0? top+10: 30;
  const [search, setSearch] = useState('');
  const searchInputRef = useRef(null);

  return (
    <View style={[styles.container, {paddingTop}]}>
      {/*Header */}
        <View style={styles.header}>
            <Pressable>
                <Text style={styles.title}>
                  Wallpaper
                </Text>
            </Pressable>
              <Pressable>
                <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)} />
              </Pressable>
        </View>

    <ScrollView
      contentContainerStyle={{gap: 15}}
    
    >
      {/*Search Bar */}
      <View style={styles.searchBar}>
        <View style={styles.searchIcon}>
          <Feather name='search' size={24} color={theme.colors.neutral(0.4)} />
        </View>
        <TextInput
            placeholder='Search for wallpapers...'
            value={search}
            ref={searchInputRef}
            onChangeText={value=> setSearch(value)}
            style={styles.searchInput}
          />
          {
            search && (
              <Pressable style={styles.closeIcon}>
                    <Ionicons name='close' size={24} color={theme.colors.neutral(0.6)} />
              </Pressable>
            )
          }
      </View>
      {/* Categories */}
      <View style={styles.categories}>
        <Categories />
        </View>
    </ScrollView>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15
  },
  header: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: hp(4),
    fontWeight: theme.fontWeights.semibold,
    color: theme.colors.neutral(0.9)
  },
  searchBar: {
    marginHorizontal: wp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.grayBG,
    backgroundColor: theme.colors.white,
    padding: 6,
    paddingLeft: 10,
    borderRadius: theme.radius.lg,
  },
  searchIcon: {
    padding: 0,
  },
  searchInput: {
    flex: 1,
    borderRadius: theme.radius.sm,
    paddingVertical: 10,
    fontSize: hp(1.8),
  },
  closeIcon: {
    backgroundColor: theme.colors.neutral(0.1),
    padding: 8,
    borderRadius: theme.radius.sm,
  }
})

export default HomeScreen