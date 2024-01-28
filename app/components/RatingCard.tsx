import React from 'react';
import {View, Text, StyleSheet, Linking, Pressable, Image, Dimensions} from 'react-native';
import DotMenu from '../assets/images/dotMenu.svg';
import {FONTFAMILY} from '../config/font-config';
import {withTheme, _changeTranslations} from '../utils/ThemeProvider';
import translate from '../utils/Text';
import { Rating } from 'react-native-ratings';
const width = Dimensions.get('window').width;

const RatingCard = (props: any) => {
  const {item, theme, isMore = false} = props;
  const styles = modalStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        {/* <Image
          style={styles.ratingProfile}
          source={require('../assets/images/profileImage.png')}
        />
        <View style={styles.nameTypeContainer}>
          <Text style={styles.nameText}></Text>
          {/* <Text style={styles.nameText}>Dimple Pamar</Text> */}
          {/* <Text style={styles.typeText}>
            {item?.user?.user_details[0]?.cancer_category?.reviewerCancerType} - {item?.user?.user_details[0]?.cancer_stage?.reviewerCancerStage}
          </Text> */}
        </View> 
        {/* {isMore && (
          <Pressable style={styles.dotMenuIconContainer}>
            <DotMenu />
          </Pressable>
        )} */}
      {/* Rating */}
      <View style={styles.ratingTimeWrapper}>
        <Rating
          readonly
          type='heart'
          startingValue={item?.starRating}
          ratingCount={5}
          imageSize={18}
          onFinishRating={()=> null}
        />
        <Text style={styles.timeText}></Text>
        {/* <Text style={styles.timeText}>JUL 16, 2022</Text> */}
      </View>
      <View>
        <Text style={[styles.typeText, {marginTop: 6, width: width - 32}]}>
          {/* {item?.user?.user_details[0]?.cancer_category?.reviewerCancerType} - {item?.user?.user_details[0]?.cancer_stage?.reviewerCancerStage} */}
          {item?.review}
        </Text>
      </View>
    </View>
  );
};

const modalStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      paddingVertical: 18,
      paddingHorizontal: 16,
    },
    flexRow: {flexDirection: 'row'},
    ratingProfile: {height: 40, width: 40, borderRadius: 8},
    nameTypeContainer: {marginLeft: 11},
    nameText: {
      fontSize: 16,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      lineHeight: 26,
      color: theme.BLACK,
    },
    typeText: {
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.SUB_TITLE,
    },
    dotMenuIconContainer: {
      position: 'absolute',
      right: 0,
    },
    ratingTimeWrapper: {
      flexDirection: 'row',
      marginTop: 12,
      alignItems: 'center',
    },
    timeText: {
      marginLeft: 5,
      fontSize: 12,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      lineHeight: 20,
    },
  });
};
export default withTheme(RatingCard);
