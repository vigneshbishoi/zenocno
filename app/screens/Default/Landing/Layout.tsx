/**
 * Landing layout page
 * @Author: Anand R
 * @Date: Wed Nov 17 2021 19:22:35 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useEffect } from 'react';
import style from './Style';
import { View, SafeAreaView, Image, FlatList, Pressable } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import translate from '../../../utils/Text'
import { useSelector } from "react-redux";
import actionTypes from '../../../store/actions/types'
import AppLoader from '../../../components/Plugins/AppLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface IProps {
  theme: any;
  navigation: any;
  store: any
  actions: any
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const benifitObject = useSelector((state: any) => state.loginReducer.benifitObject);
  const loader = useSelector((state: any) => state.loginReducer.loader);

  const [selected, setSelected] = React.useState([])
  const isSelected = (id) => selected.filter((data) => data === id).length > 0;

  useEffect(() => {

    props.actions.loader('loader', true, actionTypes.LOADER);

    let inputRequest = {
      method: "get",
      module: "benefit",
      formData: {
      },
      action: "getAll",

    }
    props.actions.getBenefit(actionTypes.UPDATE_BENIFIT, inputRequest);



  }, [])
  const setData = async () => {
    var data = selected.join(",")
    await AsyncStorage.setItem('benefits', data)
    props.navigation.navigate('Zen.UserOnBoarding')

  }
  const onClick = (id) => {
    if (isSelected(id)) {
      setSelected((selected) => selected.filter((data) => data !== id));
    }
    else {
      setSelected(selected => [...selected, id])
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <AppLoader visible={loader} textContent={translate("LANDING")["PLEASE_WAIT"]} />
      <View style={styles.linearGradient}>
        <Image
          style={styles.image}
          source={require('../../../assets/images/white_logo.png')}
        />
        {/* translate('LANDING').JOURNEY */}
        <Text style={styles.journey_text} >{translate('LANDING').JOURNEY}</Text>


      </View>
      <FlatList
        style={styles.flatlist}
        numColumns={2}
        renderItem={({ item, index }) => {
          let path;
          switch (index) {
            case 0:
              path = require('../../../assets/images/home2.png')
              break;
            case 2:
              path = require('../../../assets/images/home2.png')
              break;
            case 1:
              path = require('../../../assets/images/home1.png')
              break;
            case 4:
              path = require('../../../assets/images/home4.png')
              break;
            case 5:
              path = require('../../../assets/images/home3.png')
              break;
            default:
              path = require('../../../assets/images/home3.png')
              break;
          }
          return (
            <Pressable style={[styles.cardStyle, { borderWidth: 2, borderColor: selected.includes(item?.id) ? (theme.SECONDARY) : (theme.PRIMARY) }]} onPress={() => onClick(item.id)}>
              {

              }
              <Image
                resizeMode={'contain'}
                style={styles.item_image}
                source={path}
              />
              <Text style={styles.item_text} >{item.benefit}</Text>
            </Pressable>

          );
        }}
        data={benifitObject?.data}
      />
      <Pressable onPress={() => { setData() }}>
        <View style={[styles.btn]}>
          <Text style={styles.btnText}>{translate("LANDING")["PROCEED"]}</Text>
        </View>
      </Pressable>
    </SafeAreaView>
  );
};
export default withTheme(Layout);


