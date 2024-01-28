/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
 import React, { useState, useEffect, useCallback } from 'react';
 import style from './Style';
 import {
     StatusBar,
     Text,
     View,
     Pressable,
     FlatList,
     Image,
     Platform
 } from 'react-native';
 import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
 import Back from '../../../assets/images/Back.svg'
 import HeaderEdit from '../../../assets/images/headerEdit.svg'
 import { SafeAreaView } from 'react-native-safe-area-context';
 import translate from '../../../utils/Text'
 import { Rating } from 'react-native-ratings';
 import actionTypes from '../../../store/actions/types';
 import { useSelector } from 'react-redux';
 import AppHeader from '../../../components/CommonInput/appHeader';
 import RatingCard from '../../../components/RatingCard';
 
 interface IProps {
     theme: any;
     navigation: any;
     actions: any
     route: object;
 }
 const Layout = (props: IProps) => {
     const styles = style(props.theme);
     const theme = props.theme
     const navigation = props.navigation
     const [textShown, setTextShown] = useState(true);
     const [showMoreButton, setShowMoreButton] = useState(true);
     const [numLines, setNumLines] = useState(undefined);
     const item = props?.route?.params?.item
     const doctorReview =
         useSelector((state) => state?.appointmentReducer?.docotorReview?.length > 0 ?
             state?.appointmentReducer?.docotorReview[0] : []) || [];
 
     useEffect(() => {
         setNumLines(textShown ? undefined : 3);
     }, [textShown]);
 
     //Lifecycle Methods
     useEffect(() => {
         getDoctoReviews()
     }, [])
 
     //Api Call
     const getDoctoReviews = () => {
         props.actions.docotorReview(actionTypes.DOCTOR_REVIEW, {
             module: 'appointment',
             action: 'get_patient_review',
             formData:{
                 doctorId:item?.id
             }
         });
     }
 
     const toggleTextShown = () => {
         setTextShown(!textShown);
     };
 
     const onTextLayout = useCallback(
         (e) => {
             if (e.nativeEvent.lines.length > 3 && !textShown) {
                 setShowMoreButton(true);
                 setNumLines(3);
             }
         },
         [textShown]
     );
 
     const renderReviewItemOld = ({ item, index }) => {
         return (
             <View style={[styles.itemContainer, index == doctorReview?.doctor_review?.length - 1 && { borderBottomWidth: 0 }]} >
                 <View style={styles.infoVw} >
                     <Image source={{uri:item?.user?.user_details[0]?.reviewerImage}} style={styles.patientImageStyle} />
                     <View style={styles.desContainer} >
                         <Text style={[styles.totalRateText, { fontSize: 14 }]} numberOfLines={1} >{item?.user?.user_details[0]?.reviewerName}</Text>
                         <Text style={[styles.cancerDesText, { marginTop: Platform.OS === 'ios' ? -2 : -5 }]} numberOfLines={1} >{item?.user?.user_details[0]?.cancer_category?.reviewerCancerType} - {item?.user?.user_details[0]?.cancer_stage?.reviewerCancerStage} (Patient)</Text>
                         <View style={styles.infoVw} >
                             <Rating
                                 type='heart'
                                 ratingCount={5}
                                 showRating={false}
                                 fractions={false}
                                 ratingColor={theme.SECONDARY}
                                 tintColor={theme.PRIMARY}
                                 startingValue={item?.starRating}
                                 imageSize={14} />
                             {/* <Text style={[styles.totalRateText, { fontSize: 14, marginLeft: 7 }]}>{item?.starRating} </Text> */}
                         </View>
                     </View>
                 </View>
                 <Text 
                 // onTextLayout={onTextLayout} numberOfLines={numLines} 
                 style={[styles.cancerDesText, { fontSize: 13, lineHeight: 19, marginTop: 5 }]} >{item?.review}</Text>
                 {/* {showMoreButton ? <Text onPress={toggleTextShown} style={{ color: theme.SECONDARY }}>{textShown ? '' : 'See More'}</Text> : null} */}
             </View>
         );
     }
     const renderReviewItem = ({ item, index }) => {
         return (
             <RatingCard item={item} />
         );
     }
 
     return (
         <SafeAreaView style={styles.container}>
             <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
             <AppHeader
                 theme={theme}
                 onBackPress={() => props.navigation.pop()}
                 headerTitle={translate("DRAWER")["REVIEWS"]}
                 extraHeaderTxt={styles.headerTitle}
                 isRightComponent={true}  
                 isFirstIcon={true}
                 rightFirstIcon={<HeaderEdit />}
                 rightFirstPress={()=>  navigation.navigate('Zen.WriteReview')} 
             />
             <View style={styles.totalReviewsVw} >
                 <Rating
                     type='heart'
                     ratingCount={5}
                     showRating={false}
                     fractions={false}
                     // ratingColor={theme.SECONDARY}
                     // tintColor={theme.SELECTED}
                     startingValue={doctorReview?.review_avg}
                     imageSize={25} />
                 <Text style={[styles.totalRateText, styles.extraText]} numberOfLines={1}>{doctorReview?.review_avg?.toFixed(2)} out of 5</Text>
             </View>
             <FlatList
                 data={doctorReview?.doctor_review}
                 showsVerticalScrollIndicator={false}
                 renderItem={renderReviewItem}
             />
         </SafeAreaView>
     );
 };
 
 export default withTheme(Layout);