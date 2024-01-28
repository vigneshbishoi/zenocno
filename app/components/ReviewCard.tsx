import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  FlatList,
} from 'react-native';
import RatingHeart from '../assets/images/ratingHeart.svg';
import RigthArrow from '../assets/images/RigthArrow.svg';
import {FONTFAMILY} from '../config/font-config';
import {withTheme, _changeTranslations} from '../utils/ThemeProvider';
import { useNavigation } from '@react-navigation/native';
import translate from '../utils/Text';
import RatingCard from './RatingCard';
import { useSelector } from 'react-redux';
const width = Dimensions.get('window').width;

const ReviewCard = (props: any) => {
  const {item, theme, isMore = false} = props;
  const styles = modalStyles(theme);
  const navigation = useNavigation();
  // console.log("=== item === ", item);
  const doctorReview =
  useSelector((state) => state?.appointmentReducer?.docotorReview?.length > 0 ?
      state?.appointmentReducer?.docotorReview[0] : []) || [];      

  return (
    <>
      <Text style={[styles.titleText, {marginLeft: 16, marginTop: 24}]}>
        {translate('DRAWER')['REVIEWS']}
      </Text>
      <Text style={styles.reviewNoteText}>
        {translate('COMMONTEXT')['REVIEW_NOTE']}
      </Text>
      <View style={[styles.bottomLine, {marginTop: 7}]} />
      <View style={styles.allRatingSummaryWrapper}>
        <View style={styles.allRatingSummaryContainer}>
          <RatingHeart height={19} width={22} />
          <Text style={styles.allOverRatingText}>{`${(doctorReview?.review_avg * 100 / 5).toFixed(0)}`}%</Text>
        </View>
        <View style={styles.verticalSeparator} />
        <View style={styles.reviewSummaryIconContainer}>
          <Text style={styles.reviewSummaryText}>
           {` Out of ${item?.appt_reviews.length} patient who were surveyed, ${(doctorReview?.review_avg * 100 / 5).toFixed(0)}% of them recommend visitng the doctor`}
          </Text>
          <Pressable style={styles.rigthArrowContainer}
             onPress={() => navigation.navigate('Zen.PatientReviews', { item: item })}
          >
            <RigthArrow />
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomLine} />
      {/* <RatingCard item={item.appt_reviews} /> */}
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={item?.appt_reviews}
        renderItem={({item}) => <RatingCard item={item} />}
      />
    </>
  );
};

const modalStyles = (theme: any) => {
  return StyleSheet.create({
    container: {
      paddingVertical: 18,
      paddingHorizontal: 16,
    },
    titleText: {
      fontSize: 18,
      lineHeight: 30,
      color: theme.BLACK,
      fontFamily: FONTFAMILY.POPPINS_SEMIBOLD,
    },
    reviewNoteText: {
      paddingHorizontal: 16,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 11,
      color: theme.BLACK,
      lineHeight: 18,
    },
    bottomLine: {
      height: 1,
      backgroundColor: theme.BORDER_GREAY,
      width: width - 32,
      alignSelf: 'center',
    },
    allRatingSummaryWrapper: {
      flexDirection: 'row',
      paddingVertical: 5,
      paddingHorizontal: 16,
    },
    allRatingSummaryContainer: {
      paddingHorizontal: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      alignItems: 'center',
    },
    allOverRatingText: {
      marginLeft: 4,
      fontSize: 20,
      fontFamily: FONTFAMILY.POPPINS_SEMIBOLD,
      lineHeight: 30,
    },
    verticalSeparator: {
      height: '100%',
      width: 1,
      backgroundColor: theme.LIGHT_BORDER,
      marginHorizontal: 10,
    },
    reviewSummaryIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    reviewSummaryText: {
      width: '70%',
      fontSize: 11,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      lineHeight: 16,
      color: theme.SUB_TITLE,
    },
    rigthArrowContainer: {
      position: 'absolute',
      right: 12,
    },
  });
};
export default withTheme(ReviewCard);
