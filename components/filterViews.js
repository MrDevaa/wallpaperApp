import { View, Text, StyleSheet, Pressable } from "react-native"
import { hp } from "../helpers/common"
import { theme } from "../constants/theme"
import { capitalize } from "lodash"

export const SectionView = ({title, content})=> {
    return(
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}> {title} </Text>
        <View>
            {content}
        </View>
      </View>
    )
}

export const CommonFilterRow = ({data, filterName, filters, setFilters})=> {

    return(
      <View style={styles.flexRowWrap}>
        {
            data && data.map((item, index)=> {
                return (
                    <Pressable
                             key={item}
                             style={[styles.outlinedButton]}
                    >   
                        <Text style={styles.outlinedButtonText}>{capitalize(item)}</Text>
                    </Pressable>
                )
            })
        }
      </View>
    )
  }
  

const styles = StyleSheet.create({
    sectionContainer: {
        gap: 8
    },
    sectionTitle: {
        fontSize: hp(2.4),
        fontWeight: theme.fontWeights.medium,
        color: theme.colors.neutral(0.8)
    },
    flexRowWrap: {
        gap: 10,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    outlinedButton: {
        padding: 8,
        paddingHorizontal: 14,
        borderWidth: 1,
        borderColor: theme.colors.grayBG,
        borderRadius: theme.radius.xs,
        borderCurve: 'continuous'
    },
    outlinedButtonText: {

    }
})