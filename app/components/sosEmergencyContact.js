import React,{useState} from 'react';
import { StyleSheet, View, Image, Text, Pressable, Platform ,Dimensions,TextInput} from 'react-native';
import { FONTFAMILY } from '../config/font-config';
import Modal from "react-native-modal"
const width = Dimensions.get('window').width;
import Toast from 'react-native-toast-message';
import translate from "../utils/Text"

const SosEmergencyContact = ((props) => {
    const {theme,isSosModalShow,setSosModalShow, onSave} = props
    const styles = modalStyles(theme);
    const [sosName, setSosName] = useState('')
    const [sosNumber, setSosNumber] = useState('')

    return (
        <Modal
        isVisible={isSosModalShow}
        animationIn={'fadeInUp'}
        animationOut={'fadeInDown'}
        backdropOpacity={0.3}
        backdropColor={theme.BLACK}
        onBackButtonPress={() => setSosModalShow(false)}
        onBackdropPress={() => setSosModalShow(false)}>
        <View style={styles.modalContainerView} >
            <View style={styles.sosEmergencyModalVw} >
                <Pressable style={styles.closeVw} onPress={() => setSosModalShow(false)} >
                    <Image source={require('../assets/images/close.png')} style={styles.closeImage} />
                </Pressable>
                <Text style={[styles.commonText, { fontSize: 17, marginTop: Platform.OS === 'ios' ? 8 : 5 }]} numberOfLines={1} >{translate("VITALS_MONITORING")["ADD_SOS_NUMBER"]}</Text>
                <Text style={[styles.seeAllText, { color: theme.SUB_TITLE, marginTop: Platform.OS === 'ios' ? -1 : -5 }]} numberOfLines={1} >{translate("VITALS_MONITORING")["CRITICAL_UPDATE"]}</Text>
                <TextInput value={sosName} onChangeText={value => setSosName(value)} placeholder={translate("CHECKOUT")["NAME"]} placeholderTextColor={theme.SEARCH_TITLE} style={[styles.sosInputView, { marginTop: Platform.OS === 'ios' ? 15 : 10 }]} />
                <TextInput value={sosNumber} maxLength={10} onChangeText={value => setSosNumber(value)} placeholder={translate("VITALS_MONITORING")["EMERGENCY_NUMBER"]} placeholderTextColor={theme.SEARCH_TITLE} style={styles.sosInputView} keyboardType='numeric' />
                <Pressable style={styles.saveButtonView} onPress={() => {
                  if(sosName.length > 0 && sosNumber.length > 0){
                    onSave(sosName, sosNumber), setSosModalShow(false)
                  } else {
                    Toast.show({
                      type: 'error',
                      text1: 'Please fill up all details.',
                    })
                  }
                  }}>
                    <Text style={[styles.commonText, { color: theme.PRIMARY, fontSize: 18 }]} >Save</Text>
                </Pressable>
            </View>
        </View>
    </Modal>
    );
})
const modalStyles = (theme: any) => {
    return StyleSheet.create({
        modalContainerView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
           
          },
          sosEmergencyModalVw:{
            width: width -30,
            // height: 170,
            borderRadius: 10,
            backgroundColor: theme.PRIMARY,
            padding:30
          },

    sosInputView:{
        borderRadius:10,
        borderWidth:1,
        borderColor:theme.BORDER_COLOR,
        backgroundColor:theme.PRIMARY,
        padding: Platform.OS === 'ios' ? 15 : 11,
        fontFamily:FONTFAMILY.POPPINS_MEDIUM,
        fontSize:14,
        color:theme.GRAY_BLACK,
        marginVertical:8
      },
      saveButtonView:{
        borderRadius:10,
        backgroundColor:theme.SECONDARY,
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:Platform.OS === 'ios' ? 13 : 10,
        marginVertical:8
      },
      closeVw:{
        position:'absolute',
        padding:10,
        right:0
      },
      closeImage:{
        width:15,
        height:15
      },
      commonText:{
        fontSize:24,
        fontFamily:FONTFAMILY.POPPINS_MEDIUM,
        color:theme.GRAY_BLACK
      },
      seeAllText:{
        color:'#2a9be8',
        fontSize:14,
        fontFamily:FONTFAMILY.POPPINS_REGULAR
      },  
    });
};
export default SosEmergencyContact;  