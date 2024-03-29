import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, Pressable, Text } from 'react-native';
import Modal from 'react-native-modal'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FONTFAMILY } from '../../config/font-config';
import { useSelector } from 'react-redux';
import actionTypes from '../../store/actions/types';
import AntDesign from 'react-native-vector-icons/AntDesign'
import translate from '../../utils/Text'

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

export default function Medications(props) {
  const theme = props.theme;
  const styles = customStyles(theme);
  // const [selected, setSelected] = useState([])
  // const [checkBoxMedData, setCheckBoxData] = useState([]);
  const { modalDisplay, setModalDisplay,onCheckBoxPressed,noneCheckboxPressed ,noneSelectedMedication,checkBoxMedData} = props;
  // const [noneSelectedMedication, setNoneSelected] = useState(props.selectedId == "None" ? true : false);


  // useEffect(() => {
  //   // initial api to fetch location data
  //   var inputRequest = {
  //     module: "condition",
  //     action: "getAllMedication"
  //   }

  //   props.actions.callMedication(actionTypes.GET_MEDICATIONS, inputRequest)

  // }, []);

  // let medications = useSelector(state => state.onboardingReducer.medicationData);

  // useEffect(() => {
  //   // adding a field "selected" to the api response for handling checkbox selection/deselection
  //   setSelected(props.selectedId?.split(","))
  //   const medicationsWithSelected = medications && medications[0]?.data.map(item => { selected?.includes(item.id.toString()) ? item.selected = true : item.selected = false; return item });
  //   setCheckBoxData(medicationsWithSelected);
  // }, [medications]);


  // const onCheckBoxPressed = (id) => {
  //   setNoneSelected(false);
  //   // let updatedData = isCheckedAlready(checkBoxMedData)
  //   let updatedData = [...checkBoxMedData];
  //   updatedData = updatedData.map(item => item.id === id ? { ...item, selected: !item.selected } : item)
  //   setCheckBoxData(updatedData);
  // }
  // const renderItem = ({ item }) => {
  //   return <CheckBox key={item.id} id={item.id} theme={theme} textContent={item.condition} selected={item.selected} onPress={onCheckBoxPressed} />
  // }

  const getSelectedData = () => {
    if (noneSelectedMedication) return "None"
    // Getting the names of all selected checkboxes
    let selectedData = checkBoxMedData?.filter(data => data.selected).map(data => data.condition);

    // returning array seperated values as a string
    return selectedData?.join(", ")
  }

  const getSelectedId = () => {
    if (noneSelectedMedication) return "None"
    let selectedId = checkBoxMedData?.filter(data => data.selected).map(data => data.id);
    return selectedId?.join(",")
  }

  const closeModal = () => {
    const selectedData = getSelectedData();
    const selectedId = getSelectedId();
    console.log(selectedId, "selected")
    props.updateFormData(selectedData, selectedId);
    setModalDisplay(false);
  }
  
  // if a item is already checked, it will be unchecked here
  const isCheckedAlready = (prevData) => {
    let updatedData = prevData;
    if (updatedData?.some(data => data.selected)) {
      updatedData = updatedData.map(item => { return { ...item, selected: false } });
    }
    return updatedData
  }

  // const noneCheckboxPressed = () => {
  //   setCheckBoxData(isCheckedAlready(checkBoxMedData));
  //   setNoneSelected(!noneSelectedMedication);
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
        </Pressable> */}
      {/* <CustomText style={styles.titleText}>{translate("ONBOARDING")["MEDICATIONS_BEFORE"]}</CustomText> */}

      <CheckBox theme={theme} textContent={"None"} selected={noneSelectedMedication} onPress={() => noneCheckboxPressed()} />
      {/* List of checkboxes */}
      {/* <FlatList
          data={checkBoxMedData}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item.id}
        /> */}
      {checkBoxMedData?.map((item, index) => {
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
      borderRadius: 10
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
      alignItems:'center',
      flex: 1,
      paddingHorizontal: 20,
      borderRadius: 10,
      paddingVertical: Platform.OS === 'ios' ? 15 : 13,
      marginVertical:3
  },
  unselected_text: {
      fontSize: 14,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
      color: theme.GRAY_BLACK
  },
  })

  return (
    // <Pressable onPress={() => onPress(id)} >
    //   <View style={[styles.checkboxContainer, selected && styles.selectedCheckBox]}>
    //     <MaterialCommunityIcons
    //       name={selected ? 'checkbox-marked' : 'checkbox-blank-outline'}
    //       size={26}
    //       color={"#108FE5"}
    //     />
    //     <Text style={styles.checkBoxText}>{textContent}</Text>
    //   </View>
    // </Pressable>
    <Pressable onPress={() => onPress(id)} style={[styles.item, { backgroundColor: selected ? (theme.GHOST_WHITE) : (theme.PRIMARY) }]}>
                        <Text style={styles.unselected_text} >{textContent}</Text>
                        {selected &&
                            <Text style={[styles.unselected_text, { color: theme.SECONDARY }]} >
                                <AntDesign name="check" backgroundColor={theme.GHOST_WHITE} size={20} />
                            </Text>
                        }
                    </Pressable>
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
    marginHorizontal: 20,
    marginVertical: 50,
    borderRadius: 20,
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
    fontFamily: FONTFAMILY.POPPINS_BOLD,
    color: theme.DARK_GRAY,
    marginBottom: width * 0.02
  },
  btnContainer: {
    marginTop: height * 0.02,
    marginBottom: height * 0.02,
    justifyContent: "center",
    alignItems: "center"
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
  btn: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.95,
    height: height * 0.1
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
    ccolor: theme.PRIMARY,
    fontFamily: FONTFAMILY.POPPINS_BOLD,
    fontSize: 20
  }
});