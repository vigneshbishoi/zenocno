import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  Pressable,
  Text,
  Image,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import actionTypes from '../../store/actions/types';
import CustomText from '../CustomText';
import { FONTFAMILY } from '../../config/font-config';
import { useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Search from '../../assets/images/search.svg'
import AntDesign from 'react-native-vector-icons/AntDesign'
import TikBlue from '../../assets/images/tik_blue.svg';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

import translate from '../../utils/Text';

export default function CitySearch(props) {
  const {searchText} = props
  // const [searchText, setSearchText] = useState('');
  const [addText, setAddText] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(props.selectedId);
  const [city, setCity] = useState('');
  const { modalDisplay, setModalDisplay } = props;

  const theme = props.theme;
  const styles = CardStyles(theme);

  // dummy data for testing purpose ONLY!
  const locationsData = [
    { locationName: 'Chennai', image: '', id: 1 },
    { locationName: 'Bangalore', image: '', id: 2 },
    { locationName: 'Pune', image: '', id: 3 },
    { locationName: 'Chennai', image: '', id: 4 },
    { locationName: 'Bangalore', image: '', id: 5 },
    { locationName: 'Pune', image: '', id: 6 },
    { locationName: 'Chennai', image: '', id: 7 },
    { locationName: 'Bangalore', image: '', id: 8 },
    { locationName: 'Pune', image: '', id: 9 },
    { locationName: 'Chennai', image: '', id: 10 },
    { locationName: 'Bangalore', image: '', id: 11 },
    { locationName: 'Pune', image: '', id: 12 },
  ];
  //resposne
  //   {
  //     "id": 3,
  //     "name": "",
  //     "sub_district": "New Delhi",
  //     "district": "New Delhi",
  //     "state_name": "DELHI",
  //     "stateId": 25,
  //     "population": 16787941,
  //     "status": "1",
  //     "city_lat": "28.6139391",
  //     "city_long": "77.2090212",
  //     "city_pin": null,
  //     "city_address": null,
  //     "popular": 1,
  //     "createdAt": "2021-10-21T14:06:58.000Z",
  //     "updatedAt": "2021-10-21T14:06:58.000Z"
  // },

  useEffect(() => {
    // initial api to fetch location data
    var inputRequest = {
      module: 'city',
      action: 'getAll',
    };

    props.actions.callSearchCitiesAll(
      actionTypes.CITY_SEARCH_ALL,
      inputRequest,
    );
  }, []);

  function onChangeText(inputText) {
    // setSearchText(inputText);
    if (searchText.length < 2) {
      props.actions.callSearchCitiesData(
        'cityData',
        {},
        actionTypes.CITY_SEARCH_DATA,
      );
    }
    // api call if searchtext is greater than 3 to fetch data
    if (searchText.length >= 2) {
      // props.actions.loader('loader', true, actionTypes.LOADER);
      var inputRequest = {
        module: 'city',
        action: 'search',
        formData: {
          sub_district: searchText,
        },
      };
      props.actions.callSearchCities(actionTypes.CITY_SEARCH, inputRequest);
    }
  }
  const citiesAll = useSelector(state => state.onboardingReducer.cityAllData);
  const cities = useSelector(state => state.onboardingReducer.cityData);
  function renderCard({ item }) {
    const { id, sub_district, image } = item;
    return (
      <Card
        key={id}
        id={id}
        selectedCardId={selectedCardId}
        theme={theme}
        name={sub_district}
        image={image}
        onPress={onPressCard}
      />
    );
  }

  const onPressCard = (selectedId, selectedName) => {
    console.log("jghjkhjkh121212121212");
    setSelectedCardId(selectedId);
    setCity(selectedName);
    props.updateCity(selectedName, selectedId);
    setModalDisplay(false);
  };

  function Card(props) {
    // Individual Location card with Image and Text
    const theme = props.theme;
    const styles = CardStyles(theme);
  
    return (
      <Pressable
        onPress={() => props.onPress(props.id, props.name)}
        style={[
          styles.searchCard,
          { backgroundColor: props.selectedCardId === props.id ? (theme.GHOST_WHITE) : (theme.PRIMARY) }
        ]}>
        {/* dummy icon for testing purpose ONLY */}
        {/* <Image source={require('../../assets/images/city.png')} /> */}
        <Text numberOfLines={1} style={styles.cardText}>{props.name}</Text>
        {props.selectedCardId === props.id &&
          <TikBlue />
        }
      </Pressable>
    );
  }

  const closeModal = () => {
    setModalDisplay(false);
  };
  const data = cities && searchText != '' ? cities?.data : citiesAll?.data;
  return (
    // <Modal
    //   style={[
    //     {
    //       justifyContent: 'center',
    //       width: '100%',
    //       height: '100%',
    //       alignSelf: 'center',
    //       backgroundColor: theme.PRIMARY,
    //     },
    //   ]}
    //   isVisible={modalDisplay}
    //   // animationIn="slideInUp"
    //   // animationOut="slideOutDown"
    //   // coverScreen={modal}
    //   onBackButtonPress={() => {
    //     setModalDisplay(false);
    //   }}
    //   onBackdropPress={() => {
    //     setModalDisplay(false);
    //   }}>
    <View style={styles.container}>
      {/* Header */}
      {/* <Pressable onPress={() => closeModal()}>
        <Text style={styles.closeBtn}>X</Text>
      </Pressable>
      <CustomText style={{ ...styles.titleText, color: theme.DARK_GRAY }}>
        {translate('ONBOARDING')['CITY_BEFORE']}
      </CustomText> */}

      {/* Search Bar */}
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={{ ...styles.searchInput, borderColor: theme.lIGHT_GRAY }}
          onChangeText={inputText => onChangeText(inputText)}
          value={searchText}
          placeholder={translate("COMMONTEXT")["SEARCH"]}
        />
        <Search style={{ marginHorizontal: 15 }} height={17} width={17} />
      </View> */}
      {/* <Pressable style={[styles.searchContainer, { marginTop: 0, borderWidth: 0, marginBottom: 0, }]}
        onPress={() => {
          searchText.length > 0 && props.updateCity(searchText, 5904)
          searchText.length > 0 && closeModal()
        }}>
        <Image source={require('../../assets/images/pencil.png')} style={{ marginHorizontal: 15, width: 20, height: 20 }} />
        <Text style={{ ...styles.searchInput, borderColor: theme.lIGHT_GRAY, marginHorizontal: 0 }}>
          {'Add ' + searchText}
        </Text> */}
        {/* <TextInput
          style={{ ...styles.searchInput, borderColor: theme.lIGHT_GRAY,marginHorizontal:0 }}
          onChangeText={inputText => setAddText(inputText)}
          value={ 'Add ' + searchText}
          editable={false}
          placeholder="Add xxxxxx"
          returnKeyLabel='Done'
          onSubmitEditing={() => {
            addText.length > 0 && props.updateCity(addText, 0)
            closeModal()
          }}
        /> */}
        {/* <Search style={{ marginHorizontal: 15 }} height={17} width={17} /> */}
      {/* </Pressable> */}
      {props?.data?.length == 0 && (
        <View style={styles.notFound}>
          <Text style={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }} >{translate("COMMONTEXT")["NO_CITIES_FOUND"]}</Text>
        </View>
      )}

      {/* List of locations */}
      {/* <View style={styles.cardsContainer}>
        <FlatList
          contentContainerStyle={styles.cardContentContainer}
          data={cities && searchText != '' ? cities?.data : citiesAll?.data}
          renderItem={renderCard}
          keyExtractor={item => item.id}
        />
      </View> */}

      {props?.data?.map((item, index) => {
        const { id, name, image } = item;
        return (
          <Card
            key={id}
            id={id}
            selectedCardId={selectedCardId}
            theme={theme}
            name={name}
            image={image}
            onPress={onPressCard}
          />
        );
      })}
    </View>
    // </Modal>
  );
}

const CardStyles = theme =>
  StyleSheet.create({
    container: {
      // flex: 1,
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
      elevation: 5
    },
    closeBtn: {
      color: theme.DARK_GRAY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 24,
      alignSelf: 'flex-end',
      padding: '3%',
      fontWeight: '400',
    },
    titleText: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      color: theme.DARK_GRAY,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.9,
      borderRadius: 15,
      marginTop: width * 0.05,
      marginBottom: width * 0.05,
      height: 45,
    },
    searchInput: {
      flex: 1,
      marginHorizontal: width * 0.05,
      padding: width * 0.02,
      paddingBottom: width * 0.02,
      fontSize: 14,
      color: theme.DARK_GRAY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    cardsContainer: {
      marginTop: height * 0.025,
      marginHorizontal: width * 0.09,
      height: height * 0.6,
    },
    cardContentContainer: {
      justifyContent: 'center',
      width: '100%'
    },
    searchCard: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      // flex: 1,
      paddingHorizontal: 12,
      borderRadius: 10,
      paddingVertical: Platform.OS === 'ios' ? 13 : 11,
    },
    cardText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK,
      fontSize: 14,
    },
    selectedCard: {
      borderColor: theme.SECONDARY,
    },
    selectedCardText: {
      color: theme.SECONDARY,
    },
    cityImage: {
      height: '50%',
      width: '60%',
      marginBottom: '4%',
    },
    btnContainer: {
      flex: 1,
      marginTop: height * 0.02,
      marginBottom: height * 0.02,
      justifyContent: 'center',
      alignItems: 'center',
    },
    btn: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.95,
      height: height * 0.1,
    },
    btnLgradient: {
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
      width: '80%',
      paddingHorizontal: 50,
      paddingVertical: height * 0.02,
    },
    btnText: {
      fontSize: 20,
      fontWeight: '600',
    },
    notFound: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: height * 0.2,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
  });