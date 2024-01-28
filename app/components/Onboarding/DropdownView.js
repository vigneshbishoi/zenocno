import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable, Text, ScrollView } from 'react-native';
import { FONTFAMILY } from '../../config/font-config';
import CheckBox from './CheckBox';
import Search from '../../assets/images/search.svg'
import translate from '../../utils/Text';
import TikBlue from '../../assets/images/tik_blue.svg';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function DropdownView(props) {
  const theme = props.theme;
  const styles = customStyles(theme);
  const { onCheckBoxPressed, data, closeModal } = props;


  return (
    <View style={[styles.container, {height: data.length > 3 ? 180 : data.length > 0 ? 60 * data.length : 50}]}>
      {/* <View style={styles.buttonContainer} >
        <Pressable onPress={() => closeModal()} >
          <Text style={styles.buttonText} >Save</Text>
        </Pressable>
    </View> */}
    {data.length >  0 ? 
    <ScrollView nestedScrollEnabled={true}>
    {data?.map(item => {
     return  (
      <Pressable
      onPress={() => onCheckBoxPressed(item.id)}
      style={[
        styles.searchCard,
        { backgroundColor: item.selected ? (theme.GHOST_WHITE) : (theme.PRIMARY) }
      ]}>
      <Text numberOfLines={1} style={styles.cardText}>{item.condition}</Text>
      {item.selected &&
         <TikBlue />
       }
     </Pressable>
    )})}
    </ScrollView> : 
    <Text numberOfLines={1} style={styles.cardText}>No data found</Text>
    }
    </View>
  );
}


const customStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    padding: 10,
    backgroundColor: theme.PRIMARY,
    borderRadius: 5,
    shadowColor: 'grey',
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.3,
    elevation: 5,
    height: 180, 
    width: '90%'
  },
  searchCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 12,
    borderRadius: 10,
    paddingVertical: Platform.OS === 'ios' ? 13 : 11,
    marginVertical: 1
  },
  cardText: {
    fontFamily: FONTFAMILY.POPPINS_REGULAR,
    color: theme.GRAY_BLACK,
    fontSize: 14,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: height * 0.02,
    paddingBottom: height * 0.02,
    width: '90%'
  },
  buttonText: {
    color: theme.SECONDARY,
    fontSize: 14,
    fontFamily: FONTFAMILY.POPPINS_REGULAR
  },
});