/**
 * UnlockNow layout page
 * @Author: Anand R
 * @Date: Thu Dec 23 2021 14:41:36 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React from 'react';
import style from './Style';
import { View, Pressable, Image } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import { FONTFAMILY } from '../../../config/font-config';
import LockIcon from '../../../assets/images/lockIcon.svg'
import translate from '../../../utils/Text'

interface IProps {
  theme: any;
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const { navigation } = props;

  const BtnUnlock = () => (
    <Pressable onPress={() => navigation.navigate('Zen.Subscription')}>
      <View style={{
        // flex: 1,
        paddingHorizontal: 25,
        height: 52,
        borderRadius: 10,
        marginTop: 28,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'#108FE5'
      }}>
        <Text style={{
          fontSize: 16,
          fontFamily: FONTFAMILY.POPPINS_MEDIUM,
          textAlign: 'center',
          margin: 10,
          color: theme.PRIMARY,
          backgroundColor: 'transparent',
        }}>
          Unlock Now
        </Text>
      </View>
    </Pressable>
  )
  return (
    <View style={styles.container}>
      <LockIcon
        width={81}
        height={81}
      />
      <Text style={{ fontSize: 20, fontFamily: FONTFAMILY.POPPINS_MEDIUM, color: theme.BLACK, marginVertical: 10 }}>{translate("SUCCESSMESSAGE")["ALMOST_THERE"]}</Text>
      <Text style={{ fontSize: 16, fontFamily: FONTFAMILY.POPPINS_REGULAR, color: '#000', width: '70%', textAlign: 'center' }}>{'Your Personalized \nAnti-Cancer Diet Plan is ready'}</Text>
      <BtnUnlock />
    </View>
  );
};
export default withTheme(Layout);
