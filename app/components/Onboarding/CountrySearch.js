import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  FlatList,
  Pressable,
  Text,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import actionTypes from '../../store/actions/types';
import CustomText from '../CustomText';
import {FONTFAMILY} from '../../config/font-config';
import {useSelector} from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign'
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import translate from '../../utils/Text';
export default function CountrySearch(props) {
  const [searchText, setSearchText] = useState('');
  const [selectedCardId, setSelectedCardId] = useState(props.selectedId);
  const [city, setCity] = useState('');
  const {modalDisplay, setModalDisplay} = props;

  const theme = props.theme;
  const styles = CardStyles(theme);

  // dummy data for testing purpose ONLY!
  const locationsData = [
    {locationName: 'Chennai', image: '', id: 1},
    {locationName: 'Bangalore', image: '', id: 2},
    {locationName: 'Pune', image: '', id: 3},
    {locationName: 'Chennai', image: '', id: 4},
    {locationName: 'Bangalore', image: '', id: 5},
    {locationName: 'Pune', image: '', id: 6},
    {locationName: 'Chennai', image: '', id: 7},
    {locationName: 'Bangalore', image: '', id: 8},
    {locationName: 'Pune', image: '', id: 9},
    {locationName: 'Chennai', image: '', id: 10},
    {locationName: 'Bangalore', image: '', id: 11},
    {locationName: 'Pune', image: '', id: 12},
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
      module: 'clinical_trail',
      action: 'country',
    };

    props.actions.callCountry(
      actionTypes.GET_COUNTRY,
      inputRequest,
    );
  }, []);

  function onChangeText(inputText) {
    // setSearchText(inputText);
    // if (searchText.length < 2) {
    //   props.actions.callSearchCitiesData(
    //     'cityData',
    //     {},
    //     actionTypes.GET_COUNTRY_DATA,
    //   );
    // }
    // // api call if searchtext is greater than 3 to fetch data
    // if (searchText.length >= 2) {
    //   // props.actions.loader('loader', true, actionTypes.LOADER);
    //   var inputRequest = {
    //     module: 'city',
    //     action: 'search',
    //     formData: {
    //       sub_district: searchText,
    //     },
    //   };

    //   props.actions.callSearchCities(actionTypes.CITY_SEARCH, inputRequest);
    //}
  }
  //const countryAll = useSelector(state => state.onboardingReducer.countryData);
  const countryAll = useSelector(state => state.onboardingReducer?.countryData?.length > 0 ?
    state.onboardingReducer.countryData[0].data : []) || []
  
  console.log("country data ", countryAll);
 // const cities = useSelector(state => state.onboardingReducer.cityData);
  function renderCard({item}) {
    const { isoCode, name, image } = item;
    console.log("name-------",name)
    return (
      <Card
        key={isoCode}
        id={isoCode}
        selectedCardId={selectedCardId}
        theme={theme}
        name={name}
        image={image}
        onPress={onPressCard}
      />
    );
  }

  const onPressCard = (selectedId, selectedName, id) => {
    setSelectedCardId(selectedId);
    setCity(selectedName);

    props.updateCity(selectedName, selectedId);
    closeModal();
  };

  const closeModal = () => {
    setModalDisplay(false);
  };

  return (
    <Modal
      style={[
        {
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          alignSelf: 'center',
          backgroundColor: theme.PRIMARY,
        },
      ]}
      isVisible={modalDisplay}
      // animationIn="slideInUp"
      // animationOut="slideOutDown"
      // coverScreen={modal}
      onBackButtonPress={() => {
        setModalDisplay(false);
      }}
      onBackdropPress={() => {
        setModalDisplay(false);
      }}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <Pressable onPress={() => closeModal()}>
          <Text style={styles.closeBtn}>X</Text>
        </Pressable>
        <CustomText style={{...styles.titleText, color: theme.DARK_GRAY}}>
          {translate('ONBOARDING')['CITY_BEFORE']}
        </CustomText>

        {/* Search Bar */}
        {/* <View style={styles.searchContainer}>
          <TextInput
            style={{...styles.searchInput, borderColor: theme.lIGHT_GRAY}}
            onChangeText={inputText => onChangeText(inputText)}
            value={searchText}
            placeholder={translate("COMMONTEXT")["SEARCH"]}
            placeholderTextColor={'#A2A2A2'}
          />
          <Icon style={{marginHorizontal: 25,color:'#A2A2A2'}} name="search" size={22} />
        </View> */}
        {countryAll && countryAll.length === 0 && (
          <View style={styles.notFound}>
            <Text>{translate("COMMONTEXT")["NO_COUNTRIES_FOUND"]}</Text>
          </View>
        )}
        {/* List of locations */}
        <View style={styles.cardsContainer}>
          <FlatList
            contentContainerStyle={styles.cardContentContainer}
            //data={locationsData && searchText != '' ? cities?.data : citiesAll?.data}
            data={countryAll}
            renderItem={renderCard}
            keyExtractor={item => item.id}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

function Card(props) {
  // Individual Location card with Image and Text
  const theme = props.theme;
  const styles = CardStyles(theme);

  return (
    <Pressable
      onPress={() => props.onPress(props.id, props.name)}
      style={[
        styles.searchCard,
        {backgroundColor: props.selectedCardId === props.id ? (theme.GHOST_WHITE) : (theme.PRIMARY) }
      ]}>
      {/* dummy icon for testing purpose ONLY */}
      {/* <Image source={require('../../assets/images/city.png')} /> */}
      <Text
        numberOfLines={1}
        style={[
          styles.cardText,
          {color: props.selectedCardId !== props.id ? theme.DARK_GRAY : theme.SECONDARY }
        ]}>
        {props.name}
      </Text>
      {props.selectedCardId === props.id &&
                                    <Text style={[styles.selected_text, { color: theme.SECONDARY }]} >
                                        <AntDesign name="check" backgroundColor={theme.GHOST_WHITE} size={20} />
                                    </Text>
                                }
    </Pressable>
  );
}

const CardStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
    },
    closeBtn: {
      color: theme.DARK_GRAY,
      fontFamily: FONTFAMILY.MEDIUM,
      fontSize: 24,
      alignSelf: 'flex-end',
      padding: '3%',
      fontWeight: '400',
    },
    titleText: {
      textAlign: 'center',
      fontSize: 18,
      fontFamily: FONTFAMILY.BOLD,
      color: theme.DARK_GRAY,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 0.6,
      borderRadius: 15,
      marginHorizontal: width * 0.08,
      marginTop: width * 0.05,
      height: height * 0.07,
    },
    searchInput: {
      flex: 1,
      marginHorizontal: width * 0.05,
      padding: width * 0.02,
      paddingBottom: width * 0.02,
      fontSize: 16,
      color: theme.DARK_GRAY,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    cardsContainer: {
      marginTop: height * 0.025,
      marginHorizontal: width * 0.09,
      height: height * 0.8,
    },
    cardContentContainer: {
      justifyContent: 'center',
      width:'100%'
    },
    searchCard: {
      minHeight: 50,
      width: '90%' ,
      margin: '2%',
      borderRadius: 10,
      paddingHorizontal: 10,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row'
    },
    cardText: {
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.DARK_GRAY,
      fontSize: 15,
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
