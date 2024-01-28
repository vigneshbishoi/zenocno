import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Platform,
  Pressable,
} from 'react-native';
import { FONTFAMILY } from '../../config/font-config';

const IngredientsPage = (props) => {
  const { theme, dietfoodinfo } = props
  const styles = stylesActivity(theme);
  const [foodArr, setFoodArr] = React.useState([
    { key: '1', foodImg: require('../../assets/images/cancer_surviror_stories_1.jpg'), foodName: 'Hyderabadi Biryani', foodType: 'Semi-solid', rate: '4.2', time: '52 min', tagName: 'Anti Inflammatory' },
    { key: '2', foodImg: require('../../assets/images/cancer_surviror_stories_1.jpg'), foodName: 'Hyderabadi Biryani', foodType: 'Semi-solid', rate: '4.2', time: '52 min', tagName: 'Anti Inflammatory' },
    { key: '3', foodImg: require('../../assets/images/cancer_surviror_stories_1.jpg'), foodName: 'Hyderabadi Biryani', foodType: 'Semi-solid', rate: '4.2', time: '52 min', tagName: 'Anti Inflammatory' },
    { key: '4', foodImg: require('../../assets/images/cancer_surviror_stories_1.jpg'), foodName: 'Hyderabadi Biryani', foodType: 'Semi-solid', rate: '4.2', time: '52 min', tagName: 'Anti Inflammatory' },
    { key: '5', foodImg: require('../../assets/images/cancer_surviror_stories_1.jpg'), foodName: 'Hyderabadi Biryani', foodType: 'Semi-solid', rate: '4.2', time: '52 min', tagName: 'Anti Inflammatory' },
    { key: '6', foodImg: require('../../assets/images/cancer_surviror_stories_1.jpg'), foodName: 'Hyderabadi Biryani', foodType: 'Semi-solid', rate: '4.2', time: '52 min', tagName: 'Anti Inflammatory' }
  ])

  const [ingredientItems, setIngredientItems] = React.useState([]);
  React.useEffect(() => {
    if (typeof dietfoodinfo == "object") {
      setIngredientItems(dietfoodinfo?.food_item?.food_ingredients ? dietfoodinfo.food_item.food_ingredients : dietfoodinfo.food_ingredients ? dietfoodinfo.food_ingredients : [])
    }
  }, [dietfoodinfo])

  
  return (
    <ScrollView style={{ flex:1,backgroundColor: theme.PRIMARY }} >
      <View>
        {ingredientItems.map(item => (
           <View style={[styles.ingredientsView, {marginTop:22}]}>
           <Text style={styles.ingredientsName} numberOfLines={1} >● {item?.ingredient_item?.ingredient_item} </Text>
           <Text style={styles.ingredientsWeight}>{item?.quantity}{' '}{item?.quantity_type?.quantity_type}</Text>
         </View>
        ))}
      </View>
    </ScrollView>
  );
}

const stylesActivity = () => {
  return StyleSheet.create({
    ingredientsView: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 30,
      marginTop: 15
    },
    ingredientsName: {
      color: '#333333',
      width: '90%',
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 14,
    },
    ingredientsWeight: {
      color: '#333333',
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 13,
      position: 'absolute',
      right: 30
    },
  });

};
export default IngredientsPage;