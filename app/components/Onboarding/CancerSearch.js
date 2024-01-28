import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, ScrollView, FlatList, Pressable, Image, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal'
import actionTypes from '../../store/actions/types';
import { useSelector } from 'react-redux';
import CustomText from '../CustomText';
import { FONTFAMILY } from '../../config/font-config';
import { throwStatement } from '@babel/types';
import { SafeAreaView } from 'react-native-safe-area-context';
import Search from '../../assets/images/search.svg'
import translate from "../../utils/Text"
import AntDesign from 'react-native-vector-icons/AntDesign'
import TikBlue from '../../assets/images/tik_blue.svg';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function CancerSearch(props) {
  const [searchText, setSearchText] = useState("");
  const [selectedCardId, setSelectedCardId] = useState(props.selectedId);
  const [selectedPid, serSelectedPid] = useState();
  const [cancerType, setCancerType] = useState("");
  const { modalDisplay, setModalDisplay } = props;

  const theme = props.theme;
  const styles = CardStyles(theme);

  useEffect(() => {

    var inputRequest = {
      module: "cancerType",
      action: "getAll"
    }
    props.actions.callSearchCancerAll(actionTypes.CANCER_SEARCH_ALL, inputRequest);
  }, []);

  function onChangeText(inputText) {
    setSearchText(inputText);

    if (inputText.length == 0) {

      props.actions.callSearchCancerData('cancerData', {}, actionTypes.CANCER_SEARCH_DATA)
    }

    if (inputText.length > 0) {

      var inputRequest = {
        module: "cancerType",
        action: "search",
        formData: {
          "cancer_type": inputText
        }

      }
      props.actions.callSearchCancer(actionTypes.CANCER_SEARCH, inputRequest);
    }
  }
  //get all cancer
  const cancerTypesAll = useSelector(state => state.onboardingReducer.cancerAllData);
  //search cancer
  const cancerTypes = useSelector(state => state.onboardingReducer.cancerData);




  function renderCard({ item }) {
    const { id, name, category_image, parent_category, short_name } = item;
    return <Card key={id} id={id} shortName={short_name} pId={parent_category} selectedCardId={selectedCardId} theme={theme} name={name} image={category_image} onPress={onPressCard} />
  }

  const onPressCard = (selectedId, selectedName, pId) => {
    setSelectedCardId(selectedId);
    setCancerType(selectedName);

    props.updateCancerType(selectedName, selectedId, pId);
    closeModal();
  }

  const closeModal = () => {
    setModalDisplay(false);
  }

  const data = cancerTypes && searchText != "" ? (cancerTypes.data) : (cancerTypesAll?.data)
  console.log("data", props.data?.length);
  return (
    <View style={[styles.container, {height: props.data?.length > 3 ? 180 : props.data?.length > 0 ? 70 * props.data?.length : 60}]}>
      {/* Search Bar */}
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={{ ...styles.searchInput, borderColor: theme.VERY_LIGHT_GRAY }}
          onChangeText={inputText => onChangeText(inputText)}
          value={searchText}
          placeholder={translate("COMMONTEXT")["SEARCH"]}
        />
        <Search style={{ marginHorizontal: 15 }} height={17} width={17} />
      </View> */}
      {props.data?.length == 0 && <View style={styles.notFound}><Text style={{ fontFamily: FONTFAMILY.POPPINS_REGULAR, color:'black' }} >No Cancer Type Found</Text></View>}
      <ScrollView nestedScrollEnabled={true}>
        {props.data?.map((item, index) => {

          const { id, name, category_image, parent_category, short_name } = item;
          return (<Card key={id} id={id} shortName={short_name} pId={parent_category} selectedCardId={selectedCardId} theme={theme} name={name} image={category_image} onPress={onPressCard} />)
        })}
      </ScrollView>

    </View>
  );
}

function Card(props) {
  // Individual cancer card with Image and Text
  const theme = props.theme;
  const styles = CardStyles(theme);
  return (

    <Pressable onPress={() => props.onPress(props.id, props.name, props.pId)} style={[styles.searchCard, { backgroundColor: props.selectedCardId === props.id ? (theme.GHOST_WHITE) : (theme.PRIMARY), }]}>
      {/* dummy icon for testing purpose ONLY */}
      {/* <Image
        source={require('../../assets/images/cancer.png')}
      /> */}
      <Text numberOfLines={1} style={styles.cardText}>{props.shortName}</Text>
      {props.selectedCardId === props.id &&
        <TikBlue />
      }
    </Pressable>
  );
}

const CardStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
    padding: 20,
    backgroundColor: theme.PRIMARY,
    borderRadius: 5,
    shadowColor: 'grey',
    shadowOffset: {
      width: 1,
      height: 0,
    },
    shadowOpacity: 0.3,
    elevation:5,
    height: 180, 
    width: '90%'
  },
  closeBtn: {
    color: theme.DARK_GRAY,
    fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    fontSize: 24,
    alignSelf: 'flex-end',
    padding: "3%",
    fontWeight: "400"
  },
  titleText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    color: theme.DARK_GRAY
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.6,
    borderRadius: 15,
    marginTop: width * 0.05,
    marginBottom: width * 0.05,
    height: 50
  },
  searchInput: {
    flex: 1,
    marginHorizontal: width * 0.04,
    padding: width * 0.02,
    paddingBottom: width * 0.02,
    fontSize: 16,
    color: theme.DARK_GRAY,
    fontFamily: FONTFAMILY.POPPINS_REGULAR
  },
  topCardsContainer: {
    flexDirection: "row",
    marginLeft: width * 0.02
  }
  ,
  cardContentContainer: {
    justifyContent: 'center',
    width: '100%'
  },
  cardsContainer: {
    marginTop: height * 0.025,
    height: height * 0.6,
  },
  searchCard: {
    flexDirection: 'row',
    borderRadius: 10,
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    paddingVertical: Platform.OS === 'ios' ? 15 : 13
  },
  cardText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.POPPINS_REGULAR,
    color: theme.SUB_TITLE
  },

  selectedCard: {
    borderColor: theme.SECONDARY,
  },
  selectedCardText: {
    color: theme.SECONDARY
  },
  cityImage: {
    height: "50%",
    width: "60%",
    marginBottom: "4%"
  },
  btnContainer: {
    flex: 1,
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    justifyContent: "center",
    alignItems: "center"
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.95,
    height: height * 0.1
  },
  btnText: {
    fontSize: 20,
    fontWeight: "600"
  },
  notFound: {
    alignItems: "center",
    justifyContent: "center",
    fontFamily: FONTFAMILY.POPPINS_REGULAR,
  }
})