import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Pressable, Text } from 'react-native';
import Modal from 'react-native-modal'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import actionTypes from '../../store/actions/types';
import { useSelector } from 'react-redux';
import { FONTFAMILY } from '../../config/font-config';
import translate from '../../utils/Text'
import AntDesign from 'react-native-vector-icons/AntDesign'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Symptoms(props) {
  const theme = props.theme;
  const styles = customStyles(theme);
  const { modalDisplay, setModalDisplay,onCheckBoxPressed,noneCheckboxPressed ,checkBoxSymtomsData,noneSelectedSymtom} = props;

  // const [checkBoxSymtomsData, setCheckBoxData] = useState([]);
  // const [noneSelectedSymtom, setNoneSelected] = useState(props.selectedId == 'None' ? true : false);
  // const [selectedIds, setSelectedIds] = useState(props.selectedId);

  // useEffect(() => {
  //   // initial api to fetch location data
  //   var inputRequest = {
  //     module: "condition",
  //     action: "getAllSymptom"
  //   }

  //   props.actions.callSymptoms(actionTypes.GET_SYMPTOMS, inputRequest)
  //   setSelectedIds(props.selectedId?.split(","));
  // }, []);

  // let symptomsData = useSelector(state => state.onboardingReducer.symptomsData);

  // useEffect(() => {
  //   // adding a field "selected" to the api response for handling checkbox selection/deselection
  //   const symptomsDataWithSelected = symptomsData && symptomsData[0]?.data.map(item => { selectedIds?.includes(item.id.toString()) ? item.selected = true : item.selected = false; return item; });
  //   setCheckBoxData(symptomsDataWithSelected);
  // }, [symptomsData])

  // symptomsData = symptomsData && symptomsData[0]?.data.map(item => { selectedIds?.includes(item.id.toString()) ? item.selected = true : item.selected = false; return item; })
  //reponse data
  //   {
  //     "id": 177,
  //     "conditionsCategoryId": 2,
  //     "condition": "Anemia",
  //     "image": null,
  //     "createdAt": "2021-11-09T17:12:58.000Z",
  //     "updatedAt": "2021-11-09T17:12:58.000Z"
  // },





  // const onCheckBoxPressed = (id) => {
  //   if (noneSelectedSymtom) {
  //     setNoneSelected(false);
  //   }
  //   if (selectedIds && selectedIds.includes(id)) {
  //     // unchecking a checkbox by removing the unchecked id from selectedIds state
  //     const newSelectedIds = selectedIds.filter((oldId) => oldId !== id);
  //     setSelectedIds(newSelectedIds);
  //   } else {
  //     // storing the selected ids in a state
  //     const newSelectedIds = [...selectedIds, id];
  //     setSelectedIds(newSelectedIds);
  //     console.log(updatedData, "data")
  //     let updatedData = [...checkBoxSymtomsData];
  //     updatedData = updatedData.map(item => item.id === id ? { ...item, selected: !item.selected } : item)
  //     setCheckBoxData(updatedData);
  //   }
  // }

  // const onCheckBoxPressed = (id) => {
  //   if (noneSelectedSymtom) {
  //     setNoneSelected(false);
  //   }
  //   let updatedData = [...checkBoxSymtomsData];
  //   updatedData = updatedData?.map(item => item.id === id ? { ...item, selected: !item.selected } : item)
  //   setCheckBoxData(updatedData);
  // }

  const renderItem = ({ item }) => {
    return <CheckBox key={item.id} id={item.id} theme={theme} textContent={item.condition} selected={item.selected} onPress={onCheckBoxPressed} />
  }
  const isCheckedAlready = (prevData) => {
    let updatedData = prevData;
    if (updatedData?.some(data => data.selected)) {
      updatedData = updatedData.map(item => { return { ...item, selected: false } });
    }
    return updatedData
  }
  const getSelectedData = () => {
    if (noneSelectedSymtom) return "None"
    // Getting the names of all selected checkboxes
    let selectedData = checkBoxSymtomsData?.filter(data => data.selected).map(data => data.condition);
    // returning array seperated values as a string
    return selectedData?.join(", ")
  }
  
  const getSelectedIds = () => {
    if (noneSelectedSymtom) return "None"
    // Getting the id of all selected checkboxes
    let selectedId = checkBoxSymtomsData?.filter(data => data.selected).map(data => data.id);
    return selectedId?.join(",")

  }
  const closeModal = () => {
    const selectedData = getSelectedData();
    const selectedId = getSelectedIds();
    props.updateFormData(selectedData, selectedId);
    setModalDisplay(false);
  }


  // const noneCheckboxPressed = () => {
  //   setCheckBoxData(isCheckedAlready(checkBoxSymtomsData));
  //   setNoneSelected(true);
  //   console.log(noneSelectedSymtom, "none")
  // }

  return (
    // <Modal
    //   style={[styles.modal, { backgroundColor: theme.PRIMARY }]}
    //   isVisible={modalDisplay}
    //   onBackButtonPress={() => { setModalDisplay(false) }}
    //   onBackdropPress={() => { setModalDisplay(false) }}
    // >
      <View style={styles.container}>
        {/* Header */}
        {/* <Pressable onPress={() => closeModal()}>
          <Text style={styles.closeBtn}>X</Text>
        </Pressable>
        <CustomText style={styles.titleText}>{translate("ONBOARDING")["SYMPTOM_BEFORE"]}</CustomText> */}

        <CheckBox key={1} id={1} theme={theme} textContent={"None"} selected={noneSelectedSymtom} onPress={() => noneCheckboxPressed()} />
        {/* List of checkboxes */}
        {/* <FlatList
          data={checkBoxSymtomsData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        /> */}
        {checkBoxSymtomsData?.map((item,index) => {
          return (<CheckBox key={item.id} id={item.id} theme={theme} textContent={item.condition} selected={item.selected} onPress={onCheckBoxPressed} />)
        })}

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

const CheckBox = ({ id, textContent, theme, selected, onPress }) => {
  const styles = StyleSheet.create({
    checkboxContainer: {
      flexDirection: "row",
      alignItems: "center",
      padding: width * .02,
      borderRadius: 15,
      width: "80%",
      marginHorizontal: width * 0.08,
      marginVertical: width * 0.008
    },
    selectedCheckBox: {
      backgroundColor: theme.GHOST_WHITE,
      borderRadius: 15
    },
    checkBoxText: {
      color: theme.SUB_TITLE,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      fontSize: 14,
      marginHorizontal: width * 0.01
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flex: 1,
      paddingHorizontal: 20,
      borderRadius: 10,
      paddingVertical: Platform.OS === 'ios' ? 15 : 13,
      marginVertical:3,
      alignItems:'center',
  },
  unselected_text: {
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK
  },
  })

  return (
    <Pressable onPress={() => onPress(id)} style={[styles.item, { backgroundColor: selected ? theme.GHOST_WHITE : theme.PRIMARY}]}>
    <Text style={styles.unselected_text} >{textContent}</Text>
    {selected &&
        <Text style={[styles.unselected_text, { color: theme.SECONDARY }]} >
            <AntDesign name="check" backgroundColor={theme.GHOST_WHITE} size={20} />
        </Text>
    }
</Pressable>
    // <Pressable onPress={() => onPress(id)} >
    //   <View style={[styles.checkboxContainer, selected && styles.selectedCheckBox]}>
    //     <MaterialCommunityIcons
    //       name={selected ? 'checkbox-marked' : 'checkbox-blank-outline'}
    //       size={20}
    //       color={"#108FE5"}
    //     />
    //     <Text style={styles.checkBoxText}>{textContent}</Text>
    //   </View>
    // </Pressable>
  );
}

const customStyles = (theme) => StyleSheet.create({
  container: {
    // flex: 1,
    // marginHorizontal: 23,
    // backgroundColor: theme.PRIMARY,
    // borderRadius: 20,
    // paddingVertical: 30
    flex: 1,
    marginHorizontal: 23,
    padding: 30,
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
    fontSize: 22,
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
    // paddingRight: height * 0.02,
    paddingTop: height * 0.02,
    paddingBottom: height * 0.02,
    // backgroundColor:theme.PRIMARY,
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
  },

});