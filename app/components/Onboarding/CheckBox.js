import React from 'react';
import { StyleSheet, Pressable, Text, Dimensions } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import Selected from '../../assets/images/squareSelect.svg';
import Unselected from '../../assets/images/squareunselect.svg';
const width = Dimensions.get('window').width;

export default function CheckBox({ id, textContent, theme, selected, onPress }) {
  const styles = StyleSheet.create({
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      borderRadius: 15,
      width: "80%",
      marginHorizontal: width * 0.08,
      marginVertical: width * 0.008
    },
    selectedCheckBox: {
      backgroundColor: theme.GHOST_WHITE,
      borderRadius: 10
    },
    checkBoxText: {
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 14,
      marginHorizontal: width * 0.01
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      flex: 1,
      paddingHorizontal: 10,
      borderRadius: 10,
      paddingVertical: Platform.OS === 'ios' ? 15 : 13,
      marginVertical: 2
    },
    unselected_text: {
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK
    },
  })

  return (
    <Pressable onPress={() => onPress(id)} style={[styles.item, { backgroundColor: selected ? (theme.GHOST_WHITE) : (theme.PRIMARY) }]}>
      <Text style={styles.unselected_text} >{textContent}</Text>
      {selected ?
        <Selected /> :  <Unselected />
      }
    </Pressable>
  );
}