import React from 'react';
import {
  View,
  ImageBackground,
  Pressable,
  StyleSheet,
  Dimensions,
  StatusBar,
  SafeAreaView
} from 'react-native';
import { _changeTranslations } from '../../utils/ThemeProvider';
import Text from '../../components/CustomText';
import Back from '../../assets/images/Back.svg'
import Modal from 'react-native-modal'
import translate from "../../utils/Text"
import { FONTFAMILY } from '../../config/font-config';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;

const RulesModal = ((props) => {
  const { theme, isRulesModalShow, setRulesModalShow, rulesData } = props
  const styles = modalStyles(theme);

  return (
    <Modal
      isVisible={isRulesModalShow}
      style={{ margin: 0 }}
      onBackButtonPress={() => { setRulesModalShow(false) }}
            onBackdropPress={() => { setRulesModalShow(false) }}
            >
      <View style={{ flex: 1, alignItems:'center', justifyContent:'center' }}>
        <View style={styles.bgImg} >
            <View style={styles.headerView}>
              <Pressable onPress={() => setRulesModalShow(false)} style={{ position: "absolute", left: 0 }}>
                <Back width={8} height={15} style={{ margin: 15 }} />
              </Pressable>
              <Text style={styles.headerTxt}>{translate("COMMONTEXT")["RULES"]}</Text>
            </View>
            {rulesData?.map(item => (
              <View style={{ marginBottom: 10, paddingHorizontal: 20, alignSelf:'center' }}>
                <Text style={styles.headerTxt}>{item.rules}</Text>
              </View>
            ))}
        </View>
      </View>
    </Modal>
  );
})
const modalStyles = (theme: any) => {
  return StyleSheet.create({
    headerTxt: {
      fontSize: 16,
      color: theme.GRAY_BLACK,
      fontFamily: FONTFAMILY.POPPINS_REGULAR,
    },
    headerView: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 10,
      height: 50,
    },
    bgImg: {
      width: widht - 30,
      height: height - 100,
      backgroundColor:theme.SELECTED,
    },
  });
};
export default RulesModal;