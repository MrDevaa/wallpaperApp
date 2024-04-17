import { View, Text, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { data } from '../constants/data'

const Categories = () => {
  return (
    <FlatList 
    horizontal
    contentContainerStyle={styles.flatlistcontainer}
    showsHorizontalScrollIndicator={false}
    data={data.categories}
    keyExtractor={item => item}
    renderItem={({item, index}) => (
        <CategoryItem
           title={item} />
  )}
    />
  )
}

const CategoryItem = ({title}) => {
    return(
        <View>
            <Text>
                {title}
            </Text>
        </View>
    )
}


const styles = StyleSheet.create({


})


export default Categories