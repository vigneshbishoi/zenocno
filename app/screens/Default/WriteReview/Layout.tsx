/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
 import React, { useState } from 'react';
 import style from './Style';
 import {
     StatusBar,
     Text,
     View,
     Pressable,
     ScrollView,
     TextInput,
     Image,
     Platform
 } from 'react-native';
 import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
 import Back from '../../../assets/images/Back.svg'
 import { SafeAreaView } from 'react-native-safe-area-context';
 import ShareIcon from '../../../assets/images/shareIcon.svg'
 import { Rating } from 'react-native-ratings';
 import translate from '../../../utils/Text';
 import AppHeader from '../../../components/CommonInput/appHeader';
 
 interface IProps {
     theme: any;
     navigation: any;
     actions: any
     route: object;
 }
 const Layout = (props: IProps) => {
     const styles = style(props.theme);
     const theme = props.theme
     const [reviewValue, setReviewValue] = useState('');
     const [nameText, setNameText] = useState('');
 
     return (
         <SafeAreaView style={styles.container}>
             <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
             <AppHeader
                 theme={theme}
                 onBackPress={() => props.navigation.pop()}
                 headerTitle={translate("WRITE_REVIEW")["WRITEREVIEW"]}
                 isRightComponent={true}
                 isSecondIcon={true}
                 rightSecondIcon={null}
                 rightSecondPress={() => {}}
             />
             <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
                 <View style={[styles.commonView, { marginVertical: Platform.OS === 'ios' ? 25 : 23 }]} >
                     <Text style={styles.commonText} numberOfLines={1} >{translate("PRODUCT_DETAIL")["YOUR_RATING"]}</Text>
                     <Text style={styles.starStyle} numberOfLines={1} >*</Text>
                     <Rating
                         style={{ marginLeft: 20 }}
                         type='heart'
                         ratingCount={5}
                         showRating={false}
                         fractions={false}
                         // ratingColor={theme.SECONDARY}
                         // tintColor={theme.SELECTED}
                         startingValue={5}
                         imageSize={25}
                     />
                 </View>
                 {/* <View style={styles.commonView} >
                     <Text style={styles.commonText} numberOfLines={1} >{translate("WRITE_REVIEW")["REVIEW_5K"]}</Text>
                     <Text style={styles.starStyle} numberOfLines={1} >*</Text>
                 </View> */}
                 <TextInput style={[styles.reviewInput]} placeholder={translate("WRITE_REVIEW")["WRITE_REVIEW"]} placeholderTextColor={theme.SUB_TITLE} value={reviewValue} onChangeText={value => setReviewValue(value)} />
                 <View style={styles.borderLine}/>
                 
 
                 {/* <TextInput style={[styles.commonInputStyle, styles.extraInputStyle]} multiline={true} placeholder={translate("WRITE_REVIEW")["WRITE_REVIEW"]} value={reviewValue} onChangeText={value => setReviewValue(value)} /> */}
                 {/* <View style={styles.commonView} >
                     <Text style={styles.commonText} numberOfLines={1} >{translate("CHECKOUT")["NAME"]}</Text>
                     <Text style={styles.starStyle} numberOfLines={1} >*</Text>
                 </View>
                 <TextInput style={[styles.commonInputStyle, styles.nameExtraStyle]} placeholder={translate("CHECKOUT")["NAME"]} value={nameText} onChangeText={value => setNameText(value)} /> */}
                 <Pressable style={styles.submitButtonVw} onPress={() => props.navigation.navigate('Zen.PatientReviews') } >
                     <Text style={[styles.headerTxt, { color: theme.PRIMARY }]} numberOfLines={1} >{translate("LANGUAGE")["SUBMIT"]}</Text>
                 </Pressable>
             </ScrollView>
         </SafeAreaView>
     );
 };
 
 export default withTheme(Layout);