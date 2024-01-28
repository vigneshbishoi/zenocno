/**
 * Benifits Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
 import React, { useEffect } from 'react';
 import style from './Style';
 import {
   View,
   SafeAreaView,
   StatusBar,
   Image
 } from 'react-native';
 import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
 import Text from '../../../components/CustomText';
 import translate from '../../../utils/Text'
import { AnyKindOfDictionary } from 'lodash';
import actionTypes from '../../../store/actions/types';
 
 interface IProps {
   theme: any;
   navigation: any;
   actions: AnyKindOfDictionary;
   data: any;
   route: object;
 }
 const SuccessMessage = (props: IProps) => {
   const styles = style(props.theme);
   const theme = props.theme
   
   useEffect(() => {     
    setTimeout(() => {
      if(props.route.params.isSignup){
        props.navigation.navigate('Zen.UserOnBoarding') 
      } else {
        props.actions.loggedIn('loginStatus', true, actionTypes.LOGIN_STATUS)
      } 
    }, 3000)
  })
   

   return (
    <SafeAreaView style={{ flex: 1, justifyContent:'center',backgroundColor: theme.PRIMARY }}>
      <StatusBar barStyle='dark-content' translucent  backgroundColor={theme.PRIMARY}/>
       <View style={styles.container}>
         <Image style={styles.checkImg} source={require('../../../assets/images/checkmark.png')}/>
         <Text style={styles.textSignup}>{props.route.params.isSignup ? translate('SUCCESSMESSAGE').TITLE : translate('SUCCESSMESSAGE').TITLE1}</Text>
         <Text style={styles.desText} numberOfLines={2} >{props.route.params.isSignup ? translate('SUCCESSMESSAGE').SUB_TITLE : translate('SUCCESSMESSAGE').SUB_TITLE1}</Text>
       </View>
     </SafeAreaView>
   );
 };
 export default withTheme(SuccessMessage);
 