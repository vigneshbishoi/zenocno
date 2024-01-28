/**
 * Checkout Component
 * @Author: Astha
 * @Date: Wed April 19 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Checkout List 
 */
import React, { useEffect, useState } from 'react';
import style from './Style';
import {
  View,
  Image,
  SafeAreaView,
  TextInput,
  StatusBar,
  Pressable,
  Dimensions,
  ScrollView,
  Text,
  Platform,
  FlatList
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Back from '../../../assets/images/Back.svg'
import { useSelector } from "react-redux";
import Toast from 'react-native-toast-message';
import actionTypes from '../../../store/actions/types';
import { TextField } from '../../../components/Plugins/Textfield/index';
import { FONTFAMILY } from "../../../config/font-config";
import CountrySearch from "../../../components/Onboarding/CountrySearch"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome'
import AppLoader from '../../../components/Plugins/AppLoader';
import translate from '../../../utils/Text'

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const userData = useSelector((state) => state?.onboardingReducer?.userDetails);
  const getAddressData = useSelector((state) => state?.ecommerceReducer?.addressData?.length > 0 ?
                         state?.ecommerceReducer?.addressData[0]?.data : []) || [];
  const customerData = useSelector((state) => state?.ecommerceReducer?.customerData?.length > 0 ? state.ecommerceReducer.customerData[0] : {});
  const editCustomer = useSelector((state) => state?.ecommerceReducer?.editCustomer);
  const isFromEdit = props.route.params.isFromEdit
  const [firstnameValue, setFirstName] = useState(customerData?.first_name != undefined ? customerData?.first_name : '');
  const [lastnameValue, setLastName] = useState(customerData?.last_name != undefined ? customerData?.last_name : '');
  const [phoneNumber, setPhoneNumber] = useState(customerData?.billing != undefined ? customerData?.billing?.phone : '');
  const [email, setEmail] = useState(customerData?.billing != undefined ?
    customerData?.billing?.email.includes("zenonco.in") ? "" : customerData?.billing?.email.includes("zenonco.io") ? "" : customerData?.billing?.email : '');
  const [state, setState] = useState(customerData?.billing != undefined ? customerData?.billing?.state : '');
  const [city, setCity] = useState(customerData?.billing != undefined ? customerData?.billing?.city : '');
  const [pincode, setPinCode] = useState(customerData?.billing != undefined ? customerData?.billing?.postcode : '');
  const [address, setAddress] = useState(customerData?.billing != undefined ? customerData?.billing?.address_1 : '');
  const [notes, setNotes] = useState('');
  const [country, setCountry] = useState('India')
  const [countryDisplay, setCountryDisplay] = useState(false)
  const [countryId, setCountryId] = useState(0)
  const [isAddAddress, setIsAddAddress] = useState(false)
  const [isApiCall, setIsApiCall] = useState(true)
  const [selectedAddress,setSelectedAddress] = useState({})
  const [landmark,setLandmark] = useState('')
  const [shippingName,setShippingName] = useState('')
  const [isLoader, setIsLoader] = useState(false);

  console.log("getAddressData",getAddressData)

  useEffect(() => {
    // if(customerData != undefined && customerData.id && !isFromEdit){
    //   saveOnServer(customerData.id)
    //   userData.woocommerce_data = {customer_id: customerData.id}
    //   props.actions.callUserDetailsData("userDetails", userData, actionTypes.ADD_USER_DETAILS_DATA)
    // }
    if (isApiCall) {
      getUserAddress()
      setIsApiCall(false)
    }
  }, [userData?.data])

  // useEffect(() => {
  //    if(editCustomer != undefined && editCustomer.length > 0 && editCustomer[0].id != undefined){
  //     props.route.params.callApi()
  //     props.navigation.goBack()
  //     props.actions.editCustomerData("editCustomer", {}, actionTypes.EDIT_CUSTOMER_DATA)
  //    }
  // }, [editCustomer])

  const checkValidation = () => {
    if(firstnameValue.length > 0 && lastnameValue.length > 0 && phoneNumber.length > 0 && email.length > 0 
      && country.length > 0 && city.length > 0 && pincode.length > 0 && address.length > 0) {
        createCustomer()
      } else {
        Toast.show({
          type: 'error',
          text1: 'Oops',
          text2: 'Please fill up all data'
        });
      }
  }

  const checkIfAddressSelect = () => {
    if(selectedAddress && selectedAddress?.id){
        props.navigation.navigate('Zen.ReviewOrder', {
          customer_id: userData?.data?.userId,
          selectAddress:selectedAddress
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Oops',
          text2: 'Please select address'
        });
      }
  }

  const checkAddressValidation = () => {
    // if(firstnameValue.length > 0 && lastnameValue.length > 0 && phoneNumber.length > 0 && email.length > 0 
    //   && country.length > 0 && city.length > 0 && pincode.length > 0 && address.length > 0){
    //     createAddress()
    //   } else {
    //     Toast.show({
    //       type: 'error',
    //       text1: 'Oops',
    //       text2: 'Please fill up all data'
    //     });
    //   }
    if (shippingName.length > 0 && country.length > 0 && city.length > 0 && pincode.length > 0 && address.length > 0 && phoneNumber.length > 0) {
      if (phoneNumber.length > 1) {
        createAddress()
      } else {
        Toast.show({
          type: 'error',
          text1: 'Oops',
          text2: 'Please check your mobile number'
        });
      }
    } else {
      Toast.show({
        type: 'error',
        text1: 'Oops',
        text2: 'Please fill up all data'
      });
    }
  }

  const getUserAddress = () => {
    // props.actions.getAddress(actionTypes.GET_ADDRESS, {
    //   module: 'woocommerce_user_detail',
    //   action: 'getByCustomerId',
    //   formData: {
    //     customer_id:userData?.data.userId
    //   }
    // })
    props.actions.getAddress(actionTypes.GET_ADDRESS, {
      module: 'product_address',
      action: 'get-address',
      formData: {
        customer_id:userData?.data.userId
      }
    })
    setIsLoader(false)
  }

  const createAddress = () => {
    // const obj = {
    //   customer_id: userData?.data.userId,
    //   firstname: firstnameValue,
    //   lastname: lastnameValue,
    //   phone_no: phoneNumber,
    //   email: email,
    //   address: address,
    //   city: city,
    //   state: state,
    //   pincode: pincode,
    //   country: country,
    //   landmark: landmark
    // }
    const obj = {
      userId: userData?.data.userId,
      nameShipTo: shippingName,
      address: address,
      city: city,
      pin_code: pincode,
      country: country,
      numberShipTo: phoneNumber,
    }
    setIsLoader(true)
    // props.actions.createAddress(actionTypes.CREATE_ADDRESS, {
    //   module: 'woocommerce_user_detail',
    //   action: 'create',
    //   formData: obj
    // })
    props.actions.createAddress(actionTypes.CREATE_ADDRESS, {
      module: 'product_address',
      action: 'create-address',
      formData: obj
    })
    setTimeout(() => {
      getUserAddress()
    }, 2000);     
    setIsAddAddress(false)
  }

  const saveOnServer = (id) => {
    props.actions.createCustomerServer(actionTypes.CREATE_CUSTOMER_SERVER, {
      module: 'wordpress_user',
      action: 'create',
      formData: {
        userId: userData.data.userId,
        customer_id: id 
      }
    })
    props.navigation.navigate('Zen.ReviewOrder', {
      customer_id: id
    })
  }

  const createCustomer = () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    const obj = {
        first_name: firstnameValue,
        last_name: lastnameValue,
        email: email,
        billing: {
          first_name: firstnameValue,
          last_name: lastnameValue,
          address_1: address,
          city: city,
          state: state,
          postcode: pincode,
          email: email,
          country: country,
          phone: phoneNumber
        },
        shipping: {
          first_name: firstnameValue,
          last_name: lastnameValue,
          address_1: address,
          city: city,
          state: state,
          postcode: pincode,
          country: country,
        }
    }
    if(!isFromEdit){
      obj.username = firstnameValue + r,
      props.actions.createCustomer(actionTypes.CREATE_CUSTOMER, {
        module: 'customers',
        action: '',
        formData: obj
      })
    } else {
      props.actions.editCustomer(actionTypes.EDIT_CUSTOMER, {
        module: 'customers',
        action: customerData.id,
        formData: obj
      })
    }
  }
  
  const updateCountry = (cityVal: string, cityId: any) => {
    setCountryId(cityId)
    setCountry(cityVal)
  }

  const addressRender = ({ item, index }) => {
    //console.log("items------------" ,item.regular_price, '------' ,item.price,"------" ,item.sale_price)
    return (
      <Pressable onPress={() => {
        setSelectedAddress(item)
      }}>
        <View style={styles.addressContainer}>
          {item.id == selectedAddress?.id ? <Icon name="dot-circle-o" size={22} color='#108FE5' />: <Icon name="circle-o" size={22} color='grey' />}
          <View style={{marginStart:8}}>
            <Text style={styles.addressUserName} numberOfLines={1}>{item.nameShipTo} {item.lastname}</Text>
            <Text style={styles.allDescText}>{item.address} {item.city} {item.state} {item.country}</Text>
            <Text style={styles.allDescText}>{`${translate("CHECKOUT")["PIN_CODE"]} - ${item.pin_code}`}</Text>
            <Text style={styles.allDescText}>{`${translate("CHECKOUT")["MOBILE"]} - ${item.numberShipTo}`}</Text>
          </View>
        </View>
      </Pressable>
    );
  }
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.SELECTED }}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
      <View style={styles.headerVw}>
        <Pressable onPress={() => { isFromEdit ? props.navigation.goBack() : (isAddAddress ?  setIsAddAddress(false) : props.navigation.pop()) }} style={{ position: "absolute", left: 20 }}>
          <Back width={8} height={15} />
          {/* <Back width={15} height={20} /> */}
        </Pressable>
        <Text style={styles.headerTxt}>{getAddressData?.length > 0 ? "Address" : "Add address"}</Text>
        {/* {!isAddAddress && <Pressable style={{ position: "absolute", right: 20 }} onPress={() => setIsAddAddress(true)} >
          <Image source={require('../../../assets/images/add.png')} style={{ height: 30, width: 30, }} />
        </Pressable>} */}
      </View>
      <View style={{flex:1}}>
    
        {getAddressData?.length > 0 && !isAddAddress ?
          <View style={{flex:1,marginHorizontal:20}}>
            <Pressable style={styles.commonAddView} onPress={() => setIsAddAddress(true)}>
              <Text style={styles.addressUserName}>{translate("CHECKOUT")["ADD_ADDRESS"]}</Text>
              <AntDesign name="right" size={18} color='grey' />
            </Pressable>

            <Text style={styles.defaultAdd}>{translate("CHECKOUT")["DEFAULT_ADDRESS"]}</Text>
        <FlatList
          data={getAddressData}
          keyExtractor={(item, index) => item.id}
          renderItem={addressRender}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ alignItems: 'center', paddingBottom: 10 }}
              nestedScrollEnabled={false} />
             <Pressable style={styles.btnView} onPress={() => { checkIfAddressSelect() }}>
              <Text style={styles.btnTxt}>{translate("COMMONTEXT")["CONFIRM"]}</Text>
            </Pressable>
            </View>
        :
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
          <ScrollView showsVerticalScrollIndicator={false} style={{ paddingHorizontal: 25 }} >
            {/* <Text style={styles.mainHeaderText}>{translate("CHECKOUT")["CONTACT_INFO"]}</Text> */}
            {/* <View style={styles.inputContainer}>
              <TextInput style={styles.commonInput} placeholderTextColor="#A2A2A2" placeholder={translate("CHECKOUT")["FIRST_NAME"]} onChangeText={(value) => setFirstName(value)} value={firstnameValue} >
          
              </TextInput>
              <TextInput style={[styles.commonInput, { marginLeft: '2%' }]} placeholderTextColor="#A2A2A2" placeholder={translate("CHECKOUT")["LAST_NAME"]} onChangeText={(value) => setLastName(value)} value={lastnameValue} />
            </View> */}
            {/* <TextInput style={styles.commonBigInput} placeholderTextColor="#A2A2A2" placeholder={translate("CHECKOUT")["MOBILE_NUMBER"]} maxLength={10} keyboardType='phone-pad' onChangeText={(value) => setPhoneNumber(value)} value={phoneNumber} /> */}
            {/* <TextInput style={styles.commonBigInput} placeholderTextColor="#A2A2A2" placeholder={translate("CHECKOUT")["EMAIL_ID"]} onChangeText={(value) => setEmail(value)} value={email} /> */}

            <Text style={styles.mainHeaderText}>{translate("CHECKOUT")["SHIPPING_ADDRESS"]}</Text>
            <TextInput style={styles.commonBigInput} placeholderTextColor="#A2A2A2" placeholder={translate("CHECKOUT")["NAME"]} onChangeText={(value) => setShippingName(value)} value={shippingName} />
            <TextInput style={styles.commonBigInput} placeholderTextColor="#A2A2A2" placeholder={translate("CHECKOUT")["MOBILE_NUMBER"]} keyboardType='phone-pad' onChangeText={(value) => setPhoneNumber(value)} value={phoneNumber} />
            <View style={styles.inputContainer}>
              {/* <View style={styles.commonDropVw}> */}
              {/* <TextInput style={styles.commonDropInput} placeholder={translate("CHECKOUT")["COUNTRY"]} value={'India'} /> */}
              <Pressable style={styles.commonDropVw} onPress={() => { setCountryDisplay(true) }}>
                <TextField
                  placeholder={translate("CHECKOUT")["COUNTRY"]}
                  labelHeight={0}
                  disabled={false}
                  lineWidth={1}
                  fontSize={14}
                  value={country}
                  titleTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                  affixTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
                  iconName={"keyboard-arrow-down"}
                  iconType={"MaterialIcons"}
                  iconStyle={[{ position: "absolute", top: 13, right: 0, color: theme.GRAY_BLACK }]}
                  textColor={theme.WHITE}
                  baseColor={theme.GRAY_BLACK}
                  tintColor={theme.SILVER}
                  returnKeyType="next"
                  blurOnSubmit={false}
                  editable={false}
                  containerStyle={[styles.commonDropInput,
                    //  formData.cancerType.length > 0 ? {shadowColor: theme.SECONDARY,
                    // shadowOffset: { width: 1, height: 3 },
                    // shadowOpacity:  1.0,
                    // shadowRadius: 0.2,
                    // elevation: 2,} : {}
                  ]}
                />
              </Pressable>
              {/* <Back width={7} height={12} style={{ right: 15, transform: [{ rotate: '270deg' }], position: 'absolute' }} /> */}
              {/* </View> */}
              {/* <View style={[styles.commonDropVw,{marginLeft:'2%'}]}>
            <TextInput style={styles.commonDropInput} placeholderTextColor="#A2A2A2" placeholder={translate("CHECKOUT")["STATE"]} onChangeText={(value) => setState(value)} value={state}/>
            <Back width={7} height={12} style={{ right: 15, transform: [{ rotate: '270deg' }], position: 'absolute' }} />
          </View> */}
            </View>
            <View style={styles.inputContainer}>
              <TextInput style={styles.commonInput} placeholderTextColor="#A2A2A2" placeholder={translate("CHECKOUT")["CITY"]} onChangeText={(value) => setCity(value)} value={city} />
              <TextInput style={[styles.commonInput, { marginLeft: '2%' }]} placeholderTextColor="#A2A2A2" placeholder={translate("CHECKOUT")["PIN_CODE"]} keyboardType='phone-pad' maxLength={6} onChangeText={(value) => setPinCode(value)} value={pincode} />
              </View>
              <TextInput style={styles.commonBigInput} placeholderTextColor="#A2A2A2" placeholder={translate("CHECKOUT")["LANDMARK"]} onChangeText={(value) => setLandmark(value)} value={landmark} />
            <TextInput style={[styles.commonBigInput, { height: 100, paddingTop: 15, paddingLeft: 15, textAlignVertical: Platform.OS === 'android' ? 'top' : 'auto' }]} placeholderTextColor="#A2A2A2" multiline={true} placeholder={translate("CHECKOUT")["ADDRESS"]} onChangeText={(value) => setAddress(value)} value={address} />


            {/* <Text style={styles.mainHeaderText}>{translate("CHECKOUT")["ADDITIONAL_INFO"]}</Text>
            <TextInput style={[styles.commonBigInput, { height: 100, paddingTop: 15, paddingLeft: 15, textAlignVertical: Platform.OS === 'android' ? 'top' : 'auto' }]} placeholderTextColor="#A2A2A2" multiline={true} placeholder={translate("CHECKOUT")["ORDER_NOTES"]} onChangeText={(value) => setNotes(value)} value={notes} /> */}
            <Pressable style={styles.btnView} onPress={() => { checkAddressValidation() }}>
              <Text style={styles.btnTxt}>{translate("COMMONTEXT")["SAVE_CONTINUE"]}</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAwareScrollView>
        }
        </View>
      {countryDisplay &&
        <CountrySearch selectedId={countryId} actions={props.actions} updateCity={updateCountry} modalDisplay={countryDisplay} setModalDisplay={setCountryDisplay} theme={theme} />
      }
      <AppLoader visible={isLoader} textContent={translate("COMMONTEXT")["LOADING"]} />
    </SafeAreaView>
  );
};
export default withTheme(Layout);
