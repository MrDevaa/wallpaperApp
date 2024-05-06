import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, ActivityIndicator  } from 'react-native'
import React, {useCallback, useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Feather, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { theme } from '../../constants/theme';
import { hp, wp } from '../../helpers/common';
import Categories from '../../components/categories';
import { apiCall } from '../../api';
import ImageGrid from '../../components/imageGrid';
import { debounce, map } from 'lodash';
import FilterModal from '../../components/filtersModal';

var page = 1;

const HomeScreen = () => {


  const {top} = useSafeAreaInsets();
  const paddingTop = top>0? top+10: 30;
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [filters, setFilters] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const searchInputRef = useRef(null);
  const modalRef = useRef(null);
  const scrollRef = useRef(null);
  const [isEndReached, setIsEndReached] = useState(false);

  //use effect
  useEffect(()=> {
    fetchImages();
  }, [])

  const fetchImages = async (params={page: 1}, append=true)=> {
     console.log('params: ', params, append);

    let res = await apiCall(params);
    // console.log('got results : ', res.data?.hits[0]);
    if (res.success && res?.data?.hits) {
      if (append)
          setImages([...images, ...res.data.hits])
      else
          setImages([...res.data.hits])
    }
  }

  const openFiltersModal = () =>{
        modalRef?.current?.present();
  }

  const closeFiltersModal = () =>{
      modalRef?.current?.close();
}

  const applyFilters = () =>{
    if (filters){
      page = 1;
      setImages([]);
      let params = {
            page,
            ...filters
      }
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, false);

    }
    closeFiltersModal();
  }

  const resetFilters = () =>{
    if (filters) {
      page = 1;
      setFilters(null);
      setImages([]);
      let params = {
            page,
      }
      if (activeCategory) params.category = activeCategory;
      if (search) params.q = search;
      fetchImages(params, false);
    }
    closeFiltersModal();
    // console.log('resetting Filters');
  }

  const clearThisFilter = (filterName) => {
    let filterz = {...filters};
    delete filterz[filterName];
    setFilters({...filterz});
    page = 1;
    setImages([]);
    let params = {
        page,
        ...filterz
    }

    if (activeCategory) params.category = activeCategory;
    if (search) params.q = search;
    fetchImages(params, false);

  }

  const handleChangeCategory = (cat)=> {
            setActiveCategory(cat);
            clearSearch();   
            setImages([]); 
            page = 1;
            let params = {
              page,
              ...filters
            }
            if (cat) params.category = cat;
            fetchImages(params, false);
  }

  const handleSearch = (text)=> {
    // console.log('searching for: ', text);
    setSearch(text);
    if (text.length>2) {
      //search for the text
      page= 1;
      setImages([]);
      setActiveCategory(null); // clear the search when the user search 
      fetchImages({page, q: text, ...filters}, false);
    }
    if (text=="") {
      // reset results
      page= 1;
      searchInputRef?.current?.clear();
      setImages([]);
      setActiveCategory(null); // clear the search when the user search 
      fetchImages({page, ...filters}, false);
    }
  }

  const clearSearch = ()=> {
    setSearch("");
    searchInputRef?.current?.clear();
  }

  const handleScroll = (event) => {
    // console.log('scroll event fired');
    const contentHeight = event.nativeEvent.contentSize.height;
    const scrollViewHeight = event.nativeEvent.layoutMeasurement.height;
    const scorllOffset = event.nativeEvent.contentOffset.y;
    const bottomPosition = contentHeight - scrollViewHeight;

    if (scorllOffset>=bottomPosition-1) {
      if (!isEndReached){
          setIsEndReached(true);
          console.log('reached the bottom of scrollView');
          // fetch more images
          ++page;
          let params = {
            page,
            ...filters
          }
            if (activeCategory) params.category = activeCategory;
            if (search) params.q = search;
            fetchImages(params);
      }
    }else if(isEndReached){
      setIsEndReached(false);
    }
  } 

  const handleScrollUp = () => {
    scrollRef?.current?.scrollTo({
      y: 0,
      animated: true
    })
  } 

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);
  // console.log('filters: ', filters);
  // console.log('active category: ', activeCategory);

  return (
    <View style={[styles.container, {paddingTop}]}>
      {/*Header */}
        <View style={styles.header}>
            <Pressable onPress={handleScrollUp}>
                <Text style={styles.title}>
                  Wallpaper
                </Text>
            </Pressable>
              <Pressable onPress={openFiltersModal}>
                <FontAwesome6 name="bars-staggered" size={22} color={theme.colors.neutral(0.7)} />
              </Pressable>
        </View>

    <ScrollView
      onScroll={handleScroll}
      scrollEventThrottle={5} // how ofter scroll event will fire while scrolling (in ms)
      ref={scrollRef}
      contentContainerStyle={{gap: 15}}
    
    >
      {/*Search Bar */}
      <View style={styles.searchBar}>
        <View style={styles.searchIcon}>
          <Feather name='search' size={24} color={theme.colors.neutral(0.4)} />
        </View>
        <TextInput
            placeholder='Search for wallpapers...'
            // value={search}
            ref={searchInputRef}
            onChangeText={handleTextDebounce}
            style={styles.searchInput}
          />
          {
            search && (
              <Pressable onPress={()=> handleSearch("")} style={styles.closeIcon}>
                    <Ionicons name='close' size={24} color={theme.colors.neutral(0.6)} />
              </Pressable>
            )
          }
      </View>
      {/* Categories */}
      <View style={styles.categories}>
        <Categories activeCategory={activeCategory} handleChangeCategory={handleChangeCategory}/>
        </View>

        {/* filters */}
        {
          filters && (
            <View >
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
                {
                  Object.keys(filters).map((key, index)=> {
                    return (
                      <View key={key} style={styles.filterItem}>
                        {
                          key=='colors'?(
                               <View style={{
                                    height: 20,
                                    width: 30,
                                    borderRadius: 7,
                                    backgroundColor: filters[key]
                               }} />
                          ):(
                               <Text style={styles.filterItemText}> {filters[key]} </Text>
                          )
                        }

                        <Pressable style={styles.filterCloseIcon} onPress={()=> clearThisFilter(key)}>
                          <Ionicons name='close' size={14} color={theme.colors.neutral(0.9)} />
                        </Pressable>
                      </View>
                    )
                  })
                }
              </ScrollView>
            </View>
          )
        }

        {/*images architecture grid */}
        <View>
          {
            images.length>0 && <ImageGrid images={images}/>
          }
        </View>
          {/*Loading ... */}
          <View style={{marginBottom: 70, marginTop: images.length>0? 10: 70}}>
            <ActivityIndicator size="large" />
          </View>
    </ScrollView>

        {/*filters Modal */}
        <FilterModal 
          modalRef={modalRef}
          filters={filters}
          setFilters={setFilters}
          onClose={closeFiltersModal}
          onApply={applyFilters}
          onReset={resetFilters}
        />
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
  },
  filters: {
    paddingHorizontal: wp(4),
    gap: 10
  },
  filterItem: {
    backgroundColor: theme.colors.grayBG,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: theme.radius.xs,
    padding: 8,
    gap: 10,
    paddingHorizontal: 10,
  },
  filterItemText: {
    fontSize: hp(1.9)
  },
  filterCloseIcon: {
    backgroundColor: theme.colors.neutral(0.2),
    padding: 4,
    borderRadius: 5
  }
})

export default HomeScreen