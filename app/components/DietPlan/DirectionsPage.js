import * as React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text
} from 'react-native';
import { FONTFAMILY } from '../../config/font-config';

const DirectionsPage = (props) => {
  const { dietfoodinfo, theme } = props
  const styles = stylesActivity(theme);

  return (
      <ScrollView style={{flex:1, backgroundColor:"white"}}>
        <View style={{  }} >
        {dietfoodinfo?.food_instructions?.map((item, index) => (
           <View style={[styles.ingredientsView, {marginTop:22, flexDirection:'column'}]}>
           <Text style={styles.ingredientsName} numberOfLines={1} >Step {index + 1} </Text>
           <Text style={styles.ingredientsWeight}>{item?.instruction}</Text>
         </View>
        ))}
        </View>
      </ScrollView>
  );
}

const stylesActivity = (theme: any) => {
  return StyleSheet.create({
  ingredientsView: {
    flexDirection: 'row',
    paddingHorizontal: 30,
    marginTop: 15
  },
  ingredientsName: {
    color: '#333333',
    width: '100%',
    fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    fontSize: 14,
  },
  ingredientsWeight: {
    color: '#333333',
    fontFamily: FONTFAMILY.POPPINS_REGULAR,
    fontSize: 15,
  },
  })
};
export default DirectionsPage;