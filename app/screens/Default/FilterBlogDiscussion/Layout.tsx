/**
 * FilterBlogDiscussion Component
 * @Author: Astha
 * @Date: Wed April 7 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Display Filters
 */

import React, { useState } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  Pressable,
  StatusBar,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import Back from '../../../assets/images/Back.svg';
import translate from "../../../utils/Text"
import AppHeader from '../../../components/CommonInput/appHeader';

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}
const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const [selectArr, setSelectArr] = useState([]);
  const theme = props.theme

  const [filterArr, setFilterArr] = useState([
    { key: '1', cancerType: 'Adrenal', isSelect: false },
    { key: '2', cancerType: 'Amyloidosis', isSelect: false },
    { key: '3', cancerType: 'Anal', isSelect: false },
    { key: '4', cancerType: 'Appendix', isSelect: false },
    { key: '5', cancerType: 'Bladder', isSelect: false },
    { key: '6', cancerType: 'Blood', isSelect: false },
    { key: '7', cancerType: 'Bone', isSelect: false },
    { key: '8', cancerType: 'Brain', isSelect: false },
    { key: '9', cancerType: 'Brest', isSelect: false },
    { key: '10', cancerType: 'Beckwith-Wiedemann', isSelect: false },
    { key: '11', cancerType: 'Caregiver', isSelect: false },
    { key: '12', cancerType: 'Colon', isSelect: false },
    { key: '13', cancerType: 'Ependymoma', isSelect: false },
    { key: '14', cancerType: 'Kidney', isSelect: false },
    { key: '15', cancerType: 'Lymphoma', isSelect: false },
    { key: '16', cancerType: 'Liver', isSelect: false },
    { key: '17', cancerType: 'Lung', isSelect: false },
    { key: '18', cancerType: 'Mastocytosis', isSelect: false },
    { key: '19', cancerType: 'Neuroblastoma', isSelect: false },
    { key: '20', cancerType: 'Pancreatic', isSelect: false },
  ])

  const selectFilterItem = (item, index) => {
    item.isSelect = !item.isSelect
    if (item.isSelect) {
      selectArr.push(item)
      setSelectArr(selectArr)
    } else {
      selectArr.splice(selectArr.indexOf(item), 1)
      setSelectArr(selectArr)
    }
    // setReloadPage(!reloadPage)
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.PRIMARY }}>
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />

      <AppHeader
        theme={theme}
        onBackPress={() => props.navigation.pop()}
        headerTitle={translate("COMMONTEXT")["FILTER"]}
        isRightComponent={false} />


      <View style={styles.modalMainView}>
        <ScrollView >
          <View style={styles.mapMainView}>
            {filterArr.map((item, index) => {
              return (
                <TouchableOpacity style={{ padding: 5 }} onPress={() => selectFilterItem(item, index)}>
                  <Text style={[styles.itemName, item.isSelect ? styles.selectName : styles.unSelectName]}>{item.cancerType}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <Pressable style={styles.btnView}>
        <Text style={styles.btnTxt}>{translate("COMMONTEXT")["APPLY"]}</Text>
      </Pressable>
    </SafeAreaView>
  );
};
export default withTheme(Layout);
