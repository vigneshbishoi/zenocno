/**
 * Coupons layout page
 * @Author: Anand R
 * @Date: Tue Sep 20 2022 18:28:03 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React from 'react';
import style from './Style';
import { View, SafeAreaView, Text, StatusBar, TextInput } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import AppHeader from '../../../components/CommonInput/appHeader';
import { useNavigation } from '@react-navigation/native';
import translate from "../../../utils/Text"
import Verified from '../../../assets/images/verified.svg'
import LogoText from '../../../assets/images/logoText.svg'


interface IProps {
  theme: any;
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const navigation = useNavigation();
  const [couponsCode, onChangeCouponsCode] = React.useState(null);
  return (
    <SafeAreaView>
      <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />

      <View style={styles.container}>
        <AppHeader
          theme={theme}
          onBackPress={() => navigation.goBack()}
          headerTitle={translate("COMMONTEXT")["COUPONS"]}
          isRightComponent={false}
          isSecondIcon={false}
          extraHeaderTxt={{ fontSize: 24 }}
          extraHeaderTxtView={{ flex: 1 }}
        />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeCouponsCode}
            value={couponsCode}
            placeholder="Enter Coupon Code"
            keyboardType="numeric"
          />
          <View>
            <Text style={styles.applyText}>
              {
                translate("COMMONTEXT")["APPLY"]
              }
            </Text>
          </View>
        </View>
        <View style={styles.couponAvailContainer}>
          <Verified />
          <Text style={styles.couponAvailableText}>
            {
              translate("COMMONTEXT")["AVAILABLE_COUPONS"]
            }
          </Text>
        </View>
        <View style={[styles.cardContainer, { marginBottom: 20 }]}>
          <LogoText />
          <Text style={styles.getOffText}>
            Get 20% OFF up to `50
          </Text>
          <Text style={styles.validText}>
            Valid on total value of items worth `150 or more
          </Text>
          <View style={styles.couponCodeContainer}>
            <View style={styles.couponCode}>
              <Text style={styles.codeText}>
                ZEN0123
              </Text>
            </View>
            <Text style={styles.applyText}>
              {
                translate("COMMONTEXT")["APPLY"]
              }
            </Text>
          </View>
          <Text style={styles.moreText}>
            You will save `150 more to apply this offer
          </Text>
        </View>

        <View style={styles.dividerLine} />

        <View style={styles.cardContainer}>
          <LogoText />
          <Text style={styles.getOffText}>
            Get 20% OFF up to `50
          </Text>
          <Text style={styles.validText}>
            Valid on total value of items worth `150 or more
          </Text>
          <View style={styles.couponCodeContainer}>
            <View style={styles.couponCode}>
              <Text style={styles.codeText}>
                ZEN0123
              </Text>
            </View>
            <Text style={styles.applyText}>
              {
                translate("COMMONTEXT")["APPLY"]
              }
            </Text>
          </View>
          <Text style={styles.moreText}>
            You will save `150 more to apply this offer
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default withTheme(Layout);
