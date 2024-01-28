import React, { useEffect, useState } from 'react';
import { View, LogBox, Text, Pressable, FlatList, StyleSheet, Dimensions, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Modal from 'react-native-modal'
import Icon from 'react-native-vector-icons/AntDesign'
import actionTypes from '../../store/actions/types';
import { useSelector } from 'react-redux';
import CustomText from '../CustomText';
import { FONTFAMILY } from '../../config/font-config';
import { SafeAreaView } from 'react-native-safe-area-context';
import translate from "../../utils/Text"

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Treatment(props) {
  const theme = props.theme;
  // open or close states
  const { modalDisplay, setModalDisplay } = props;
  const [displaySurgery, setDisplaySurgery] = useState(true);
  const [dispalyChemo, setDisplayChemo] = useState(false);
  const [displayRadiation, setRadiationDisplay] = useState(false);

  // data states
  const [surgeryData, setSurgeryData] = useState([]);
  const [chemoData, setChemoData] = useState([]);
  const [radiationData, setRadiationData] = useState([]);
  const [noneSelected, setNoneSelected] = useState(false);



  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead']);
    const inputRequest = {
      module: "treatment",
      action: "getAll"
    }
    props.actions.callTreatment(actionTypes.GET_TREATMENT, inputRequest)
  }, []);

  let treatmentData = useSelector(state => state.onboardingReducer.treatmentData);

  useEffect(() => {
    // adding a field "selected" to the api response for handling checkbox selection/deselection
    const surgeryWithSelected = treatmentData && treatmentData[0]?.data?.map(data => props.surgeryId == data.id ? { ...data, selected: true } : { ...data, selected: false })
    const chemoWithSelected = treatmentData && treatmentData[0]?.data?.map(data => props.chemoId == data.id ? { ...data, selected: true } : { ...data, selected: false })
    const radiationWithSelected = treatmentData && treatmentData[0]?.data?.map(data => props.radiationId == data.id ? { ...data, selected: true } : { ...data, selected: false })

    // setting data seperately to handle checkbox selection/deselection once data is got from api/redux
    setSurgeryData(surgeryWithSelected);
    setChemoData(chemoWithSelected);
    setRadiationData(radiationWithSelected);
  }, [treatmentData])


  //sample response
  //   {
  //     "id": 1,
  //     "treatment": "Done > 2 wks ago",
  //     "createdAt": "2021-11-09T06:02:31.000Z",
  //     "updatedAt": "2021-11-09T06:02:31.000Z"
  // },



  // if a item is already checked, it will be unchecked here
  const isCheckedAlready = (prevData) => {
    let updatedData = prevData;
    if (updatedData?.some(data => data.selected)) {
      updatedData = updatedData.map(item => { return { ...item, selected: false } });
    }
    return updatedData
  }
  // checking the pressed item
  const performCheck = (updatedData, id) => {
    return updatedData.map(item => item.id == id ? { ...item, selected: !item.selected } : item)
  }
  //on selecting none unchek all other data
  const onCheckBoxPress = (id) => {
    if (id === "None") {
      setSurgeryData(isCheckedAlready(surgeryData));
      setChemoData(isCheckedAlready(chemoData));
      setRadiationData(isCheckedAlready(radiationData));
      setNoneSelected(!noneSelected);
    }
  }

  // changing the state of checkbox (checked/unchecked)
  const onChekSurgery = (id) => {
    var updatedData = isCheckedAlready(surgeryData);
    updatedData = performCheck(updatedData, id)
    setNoneSelected(false);
    setSurgeryData(updatedData);
  }
  const onChekChemo = (id) => {
    var updatedData = isCheckedAlready(chemoData);
    updatedData = performCheck(updatedData, id);
    setNoneSelected(false);
    setChemoData(updatedData);
  }
  const onChekRadiation = (id) => {
    var updatedData = isCheckedAlready(radiationData);
    updatedData = performCheck(updatedData, id);
    setNoneSelected(false);
    setRadiationData(updatedData);
  }

  // rendering different checkboxes
  const renderSurgery = ({ item }) => {
    return <CheckBox key={item.id} id={item.id} theme={theme} textContent={item.treatment} selected={item.selected} onPress={onChekSurgery} />
  }
  const renderChemo = ({ item }) => {

    return <CheckBox key={item.id} id={item.id} theme={theme} textContent={item.treatment} selected={item.selected} onPress={onChekChemo} />
  }
  const renderRadiation = ({ item }) => {

    return <CheckBox key={item.id} id={item.id} theme={theme} textContent={item.treatment} selected={item.selected} onPress={onChekRadiation} />
  }

  // to open close nested lists
  const changeSurgeryDisplay = () => {
    setDisplaySurgery(!displaySurgery);
  }
  const changeChemoDisplay = () => {
    setDisplayChemo(!dispalyChemo);
  }
  const changeRadiationDisplay = () => {
    setRadiationDisplay(!displayRadiation);
  }
  const getSelectedTreatments = () => {
    const selectedTreatments = [];
    // Getting the names of all selected treatments
    // selectedTreatments.push(...surgeryData.filter(data => data.selected).map(data => data.treatment));
    // selectedTreatments.push(...chemoData.filter(data => data.selected).map(data => data.treatment));
    // selectedTreatments.push(...radiationData.filter(data => data.selected).map(data => data.treatment));
    // selectedTreatments.push(surgeryData?.some(data => data.selected) ? ("Surgery") : "")
    // selectedTreatments.push(chemoData?.some(data => data.selected) ? ("Chemo") : "")
    // selectedTreatments.push(radiationData?.some(data => data.selected) ? ("Radiation") : "")
    selectedTreatments.push({ "None": noneSelected ? (true) : (false) })
    selectedTreatments.push({ "treatmentSurgeryId": surgeryData?.some(data => data.selected) ? (surgeryData.filter(data => data.selected).map(data => data.id)) : [] })
    selectedTreatments.push({ "treatmentChemoId": chemoData?.some(data => data.selected) ? (chemoData.filter(data => data.selected).map(data => data.id)) : [] })
    selectedTreatments.push({ "treatmentRadiationId": radiationData?.some(data => data.selected) ? (radiationData.filter(data => data.selected).map(data => data.id)) : [] })
    // removes empty values from the array and returns all other values seperated by commas
    return selectedTreatments
  }
  const getCheckedId = (data) => {
    const checkedId = data?.filter(data => data.selected).map(data => data.id);
    if (checkedId) {
      return checkedId[0];
    } else {
      return -1
    }
  }

  const closeModal = () => {
    const selectedTreatmentsNames = getSelectedTreatments();
    props.updateTreatment(selectedTreatmentsNames);
    setModalDisplay(false);
  }

  const styles  = StyleSheet.create({
    treatmentContainer: {
      marginHorizontal: width * 0.12,
    },
    myContainer: {
      flex: 1,
      marginHorizontal: 23,
      paddingVertical: 15,
      backgroundColor: theme.PRIMARY,
      borderRadius: 20,
    },
    modal: {
      justifyContent: "center",
      width: '100%',
      height: "100%",
      alignSelf: 'center'
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
    btnContainer: {
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
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      paddingRight: height * 0.02,
      paddingTop: height * 0.02,
      width: '90%'
    },
    buttonText: {
      color: theme.SECONDARY,
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR
    },
    btnLgradient: {
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      width: "80%",
      paddingHorizontal: 50,
      paddingVertical: height * 0.02
    },
    btnText: {
      color: theme.PRIMARY,
      fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      fontSize: 20
    }
  })
  return (
    // <Modal
    //   style={[styles.modal, { backgroundColor: theme.PRIMARY }]}
    //   isVisible={modalDisplay}
    //   // animationIn="slideInUp"
    //   // animationOut="slideOutDown"
    //   // coverScreen={modal}
    //   onBackButtonPress={() => { setModalDisplay(false) }}
    //   onBackdropPress={() => { setModalDisplay(false) }}
    // >
    <View style={styles.myContainer}>
      {/* Header */}
      {/* <Pressable onPress={() => closeModal()}>
          <Text style={styles.closeBtn}>X</Text>
        </Pressable>
        <CustomText style={{ ...styles.titleText, color: theme.DARK_GRAY }}>{translate("ONBOARDING")["TREATMENT_BEFORE"]}</CustomText> */}

      {/* Nest Lists of Different Treatments */}
      <View style={styles.treatmentContainer}>
        <CheckBox id={"None"} theme={theme} textContent={"None"} selected={noneSelected} onPress={onCheckBoxPress} />
        <PressableText textContent={"SURGERY"} display={displaySurgery} onPress={() => changeSurgeryDisplay()} theme={theme} />
        {/* <CustomFlatList data={surgeryData} renderItem={renderSurgery} display={displaySurgery} /> */}
        <View style={displaySurgery ? {} : { display: "none" }}>
          {surgeryData?.map((item, index) => {
            return (
              <CheckBox key={item.id} id={item.id} theme={theme} textContent={item.treatment} selected={item.selected} onPress={onChekSurgery} />
            );
          })}
        </View>

        <PressableText textContent={"CHEMO / IMUNO/ HARMONE THERAPY"} display={dispalyChemo} onPress={() => changeChemoDisplay()} theme={theme} />
        {/* <CustomFlatList data={chemoData} renderItem={renderChemo} display={dispalyChemo} /> */}
        <View style={dispalyChemo ? {} : { display: "none" }}>
          {chemoData?.map((item, index) => {
            return (
              <CheckBox key={item.id} id={item.id} theme={theme} textContent={item.treatment} selected={item.selected} onPress={onChekChemo} />
            );
          })}
        </View>

        <PressableText textContent={"RADIATION THERAPY"} display={displayRadiation} onPress={() => changeRadiationDisplay()} theme={theme} />
        {/* <CustomFlatList data={radiationData} renderItem={renderRadiation} display={displayRadiation} /> */}
        <View style={displayRadiation ? {} : { display: "none" }}>
          {radiationData?.map((item, index) => {
            return (
              <CheckBox key={item.id} id={item.id} theme={theme} textContent={item.treatment} selected={item.selected} onPress={onChekRadiation} />
            );
          })}
        </View>
      </View>

      {/* Done Button */}
      {/* <View style={styles.btnContainer}>
          <Pressable onPress={() => closeModal()} style={styles.btn}>
            <LinearGradient start={{ x: 0, y: 0 }} colors={[theme.SECONDARY, theme.SECONDARY]} style={styles.btnLgradient}>
              <Text style={{ ...styles.btnText, color: theme.PRIMARY }} >{translate("ONBOARDING")["DONE"]}</Text>
            </LinearGradient>
          </Pressable>
        </View> */}
      <View style={styles.buttonContainer} >
        <Pressable onPress={() => closeModal()} >
          <Text style={styles.buttonText} >{translate("COMMONTEXT")["CLOSE"]}</Text>
        </Pressable>
      </View>
    </View>
    // </Modal>
  );
}

const PressableText = ({ textContent, onPress, display, theme }) => {
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: height * 0.02, marginBottom: height * 0.01

    },
    menuText: {
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 13,
      marginHorizontal: width * 0.01
    }
  })
  return (
    <Pressable onPress={() => onPress()} style={styles.container}>
      <Icon name={display ? "minus" : "plus"} color={theme.GRAY_BLACK} />
      <Text style={styles.menuText}>{textContent}</Text>
    </Pressable>
  );
}

const CustomFlatList = ({ data, renderItem, display }) => {
  return (
    <FlatList
      style={display ? {} : { display: "none" }}
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
  );
}




const CheckBox = ({ id, textContent, theme, selected, onPress }) => {
  const styles = StyleSheet.create({
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: width * .02,
      borderRadius: 10,
      width: "80%",
      margin: width * 0.001
    },
    selectedCheckBox: {
      backgroundColor: theme.GHOST_WHITE,
    },
    checkBoxText: {
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 14,
      marginHorizontal: width * 0.01
    }
  })

  return (
    <Pressable onPress={() => onPress(id)} >
      <View style={[styles.checkboxContainer, selected && styles.selectedCheckBox]}>
        <MaterialCommunityIcons
          name={selected ? 'checkbox-marked' : 'checkbox-blank-outline'}
          size={20}
          color={"#108FE5"}
        />
        <Text style={styles.checkBoxText}>{textContent}</Text>
      </View>
    </Pressable>
  );
}
