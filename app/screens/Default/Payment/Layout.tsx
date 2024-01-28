/**
 * Payment layout page
 * @Author: Giri Madhan
 * @Date: Tue Nov 30 2021 11:13:29 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, {useState, useEffect} from 'react';
import style from './Style';
import {
  View,
  Image,
  Pressable,
  ScrollView,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PaymentDisplay from '../../../components/RazorPay';
import translate from '../../../utils/Text';
import {withTheme} from '../../../utils/ThemeProvider';
import Text from '../../../components/CustomText';
import styles from '../../../components/AlertScreen/Style';
import Back from '../../../assets/images/Back.svg';
import actionType from '../../../store/actions/types';
import {useSelector} from 'react-redux';
import {onboardingReducer} from '../../../store/reducers/onboardingReducer';
import AppLoader from '../../../components/Plugins/AppLoader';
import {payment} from '../../../services/onboarding';
import request from '../../../services/client';
import Alert from '../../../components/AlertScreen/Index';
import actionTypes from '../../../store/actions/types';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Animatable from 'react-native-animatable';
import {RootState} from '../../../store';
import { numberWithCommas } from '../../../utils/commonFunction';
// import 'animate.css';

interface IProps {
  theme: any;
  navigation: any;
  actions: any;
}

interface pictureText {
  theme: any;
  subTitle: string;
  image: any;
}

const PictureText = ({theme, subTitle, image, delay}: pictureText) => {
  const styles = style(theme);
  const [fadeAnim] = useState(new Animated.Value(0));

  const fadeIn = {
    0: {
      opacity: 0,
    },
    0.2: {
      opacity: 0.2,
    },
    0.3: {
      opacity: 0.3,
    },
    0.4: {
      opacity: 0.4,
    },
    0.5: {
      opacity: 0.5,
    },
    0.6: {
      opacity: 0.6,
    },
    0.7: {
      opacity: 0.7,
    },
    0.8: {
      opacity: 0.8,
    },
    1: {
      opacity: 1,
    },
  };

  return (
    <Animatable.View
      animation={{from: {translateY: 80}, to: {translateY: 10}}}
      duration={1500}
      delay={delay}
      easing={t => Math.pow(t, 1.7)}
      // iterationCount="infinite"
      useNativeDriver>
      <Animatable.View delay={delay} animation={fadeIn}>
        <View style={styles.whiteCircle}>
          <Image source={image} />
        </View>
        <Text style={styles.pictureText}>{subTitle}</Text>
      </Animatable.View>
    </Animatable.View>
  );
};

const IconText = ({theme, subTitle, image}: pictureText) => {
  const styles = style(theme);

  return (
    <View style={styles.iconTextContainer}>
      <Image source={image} />
      <Text style={styles.iconText}>{subTitle}</Text>
    </View>
  );
};

const BackButtonPlans = ({navigation}: any) => {
  return (
    <Pressable
      onPress={() => {
        navigation(false);
      }}>
      <Back width={15} height={20} style={{margin: 15}} />
    </Pressable>
  );
};

const BackButton = ({navigation}: any) => {
  return (
    <Pressable
      onPress={() => {
        navigation.pop();
      }}>
      <Back width={15} height={20} style={{margin: 15}} />
    </Pressable>
  );
};

const SettingUpPayment = ({props, setShowPaymentPlans}: any) => {
  const theme = props.theme;
  const styles = style(theme);
  const [fadeOut, updateFadeOut] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      updateFadeOut(false);
    }, 3000);
  }, []);

  const onClick = () => {
    setShowPaymentPlans(true);
    props.actions.callPaymentPlans(actionType.GET_PAYMENT_PLANS, {
      module: 'subscriptionPlan',
      action: 'getAll',
    });
    // props.actions.loader('loader', true, actionType.LOADER);
  };
  const onboardDetails = useSelector(
    (state: RootState) => state.onboardingReducer.userDetails,
  );
  if (
    typeof onboardDetails == 'object' &&
    onboardDetails.data.name != undefined
  )
    var name = onboardDetails.data.name;
  else if (onboardDetails?.data?.user_details[0]?.name != undefined)
    var name = onboardDetails?.data?.user_details[0]?.name;
  else var name = 'User';

  const fadeIn = {
    0: {
      opacity: 0.2,
    },
    0.3: {
      opacity: 0.3,
    },
    0.5: {
      opacity: 0.5,
    },
    0.7: {
      opacity: 0.7,
    },
    1: {
      opacity: 1,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View>
        <View
          style={[
            styles.backgroundGradient,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          {/* <BackButton navigation={props.navigation} /> */}
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>
              {translate('PAYMENT').SETTING_UP}
            </Text>
            <Text style={styles.titleText}> {name}</Text>
          </View>
          {/* Picture + Text white circles */}

          <View style={styles.pictureTextContainer}>
            <PictureText
              theme={theme}
              delay={0}
              subTitle={translate('PAYMENT').CANCER_COACH}
              image={require('../../../assets/images/coach.png')}
            />
            <PictureText
              theme={theme}
              delay={1000}
              subTitle={translate('PAYMENT').LIFE_STYLE}
              image={require('../../../assets/images/Group_502.png')}
            />
            <PictureText
              theme={theme}
              delay={2000}
              subTitle={translate('PAYMENT').PERSONALIZED}
              image={require('../../../assets/images/app.png')}
            />
          </View>
        </View>
      </View>
      {/* Bottom Container */}
      <Animatable.View
        animation={fadeIn}
        delay={3000}
        style={[styles.bottomContainer, {opacity: fadeOut ? 0.5 : 1}]}>
        <Image
          style={styles.backgroundImage}
          source={require('../../../assets/images/Group_504.png')}
        />
        <Text style={styles.bottomTitleText}>{translate('PAYMENT').TITLE}</Text>
        <IconText
          theme={theme}
          subTitle={translate('PAYMENT').POINT_1}
          image={require('../../../assets/images/Shape.png')}
        />
        <IconText
          theme={theme}
          subTitle={translate('PAYMENT').POINT_2}
          image={require('../../../assets/images/Union_1.png')}
        />
        <IconText
          theme={theme}
          subTitle={translate('PAYMENT').POINT_3}
          image={require('../../../assets/images/1_Stomach.png')}
        />
        <IconText
          theme={theme}
          subTitle={translate('PAYMENT').POINT_4}
          image={require('../../../assets/images/1_Leukemia.png')}
        />
        <IconText
          theme={theme}
          subTitle={translate('PAYMENT').POINT_5}
          image={require('../../../assets/images/1_Ovarian.png')}
        />
      </Animatable.View>
      {/* Done Button */}
      <Animatable.View
        animation={fadeIn}
        delay={3000}
        style={styles.btnContainer}>
        <Pressable onPress={() => onClick()} style={styles.btn}>
          <View
            style={styles.btnLgradient}>
            <Text style={{...styles.btnText, color: theme.PRIMARY}}>
              {translate('PAYMENT').START}
            </Text>
          </View>
        </Pressable>
      </Animatable.View>
    </SafeAreaView>
  );
};

const PriceCard = ({
  theme,
  data,
  setSelectedAmount,
  setSelectedId,
  selectedId,
  setDisableBtn,
  disableBtn,
}: any) => {
  const styles = style(theme);

  const discount = 50;

  const onClick = (amt, id) => {
    setSelectedId(id);
    setSelectedAmount(amt);
    setDisableBtn(false);
  };
  return (
    <Pressable
      key={data.id}
      onPress={() => {
        onClick(data.total_price, data.id);
      }}
      style={[
        styles.cardContainer,
        {borderColor: selectedId == data.id ? theme.GOLD : theme.LIGHT_GRAY},
      ]}>
      <Text style={styles.month}>
        {data.service}{' '}
        {data.service == 1
          ? translate('PAYMENT').MONTH
          : translate('PAYMENT').MONTHS}{' '}
      </Text>
      <View style={styles.flexRow}>
        <Text
          style={[styles.newPrice, styles.boldText, {color: theme.DARK_GRAY}]}>
          {'\u20B9'} {numberWithCommas(data.monthly_price)}/
        </Text>
        <View>
          <Text style={[styles.boldText, {color: theme.DARK_GRAY}]}>
            {translate('PAYMENT').PER}
          </Text>
          <Text style={[styles.boldText, {color: theme.DARK_GRAY}]}>
            {translate('PAYMENT').MONTH}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.lineThrough,
          styles.mediumGray,
          styles.oldPrice,
          {color: theme.DARK_GRAY},
        ]}>
        {'\u20B9'} {data.cross_price}/{translate('PAYMENT').PER}{' '}
        {translate('PAYMENT').MONTH}
      </Text>
      <Text
        style={[
          styles.redText,
          styles.mediumText,
          styles.offerText,
          {color: theme.RED},
        ]}>
        {discount}
        {translate('PAYMENT').OFFER}
      </Text>
    </Pressable>
  );
};

const IconTextBold = ({theme, normalText, boldText}: any) => {
  const styles = style(theme);

  return (
    <View style={styles.iconTextContainer}>
      <Text style={[styles.normalTxt, {color: theme.DARK_GRAY}]}>
        ✓ {normalText}
      </Text>
      <Text style={[styles.boldText, {color: theme.DARK_GRAY}]}>
        {' '}
        {boldText}
      </Text>
    </View>
  );
};

const PaymentPlans = ({props, setShow}: any) => {
  const theme = props.theme;
  const styles = style(theme);
  const [showRazorpay, setShowRazorpay] = useState(false);

  var paymentPlans = useSelector(
    state => state.onboardingReducer.paymentPlansData,
  );

  const paymentData = useSelector(state => state.onboardingReducer.paymentData);
  console.log(JSON.stringify(paymentData), 'data');
  const [selectedAmount, setSelectedAmount] = useState();
  const [status, setStatus] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState();
  var userId = useSelector(state => state.loginReducer.userData);

  const phone = userId?.data?.data?.phone;
  const onClick = () => {
    // props.actions.callPaymentData("paymentData", {}, actionTypes.GET_PAYMENT_PLANS_DATA)
    var inputRequest = {
      module: 'payment',
      action: 'initiatePay',
      formData: {
        userId: userId?.data?.data?.id,
        subscriptionPlanId: selected,
        amount: selectedAmount,
        currency: 'INR',
      },
    };

    // props.actions.callPayment(actionType.GET_PAYMENT, inputRequest)
    if (selectedAmount && selected) {
      setDisableBtn(true);
      props.actions
        .callPayment(actionType.GET_PAYMENT, inputRequest)
        .then(data => {
          setShowRazorpay(true);
        });
    }
  };
  const verifyData = useSelector(
    state => state.onboardingReducer.payVerifyData,
  );
  const [disableBtn, setDisableBtn] = useState(true);
  const userData = useSelector(state => state.onboardingReducer.userDetails);
  const name = userData?.data?.name;
  return (
    <SafeAreaView style={styles.paymentContainer}>
      {showRazorpay ? (
        <PaymentDisplay
          navigation={props.navigation}
          name={name}
          setError={setError}
          userId={userId?.data?.data?.id}
          subId={selected}
          phone={phone}
          actions={props.actions}
          payInfo={paymentData[0]?.data}
          setShowRazorpay={setShowRazorpay}
          setStatus={setStatus}
          setShowAlert={setShowAlert}
          fromProduct={false}
          onSuccess={() => {}}
        />
      ) : (
        <View></View>
      )}
      <View
        style={styles.plansBackgroundGradient}>
        <BackButtonPlans navigation={setShow} />
        <View>
          <Text style={styles.titleText}>
            {translate('PAYMENT').PLANS_TITLE}
          </Text>
          <Text style={styles.titleText}>{translate("COMMONTEXT")["ZenOncoIO"]} </Text>
        </View>
      </View>
      {/* Price Cards */}
      <ScrollView
        horizontal={true}
        style={[styles.priceScrollView]}
        showsHorizontalScrollIndicator={false}>
        {typeof paymentPlans == 'object' &&
          paymentPlans[0]?.data?.map(item => {
            return (
              <PriceCard
                theme={theme}
                data={item}
                setSelectedAmount={setSelectedAmount}
                selectedId={selected}
                setSelectedId={setSelected}
                disableBtn={disableBtn}
                setDisableBtn={setDisableBtn}
              />
            );
          })}
      </ScrollView>
      {/* Bottom List of items */}
      <View style={[styles.bottomContainer]}>
        <Image
          style={styles.paymentBackgroundImage}
          source={require('../../../assets/images/5193695.png')}
        />
        <Text style={[styles.bottomTitle, {fontWeight: 'bold'}]}>
          {translate('PAYMENT').BENIFITS}
        </Text>
        <IconTextBold
          theme={theme}
          normalText={translate('PAYMENT').BENIFIT_1}
          boldText={''}
        />
        <IconTextBold
          theme={theme}
          normalText={translate('PAYMENT').BENIFIT_2}
          boldText={''}
        />
        <IconTextBold
          theme={theme}
          normalText={translate('PAYMENT').BENIFIT_3}
          boldText={''}
        />
        <IconTextBold
          theme={theme}
          normalText={translate('PAYMENT').BENIFIT_4}
          boldText={''}
        />
        <IconTextBold
          theme={theme}
          normalText={translate('PAYMENT').BENIFIT_5}
          boldText={''}
        />
      </View>
      {/* Buy Button */}
      <View style={styles.buyBtnContainer}>
        <Pressable
          onPress={() => {
            onClick();
          }}
          style={styles.btn}>
          <View
            style={styles.btnLgradient}>
            <Text style={{...styles.btnText, color: theme.PRIMARY}}>
              {translate('PAYMENT').BUY_NOW}
            </Text>
          </View>
        </Pressable>
      </View>
      <Pressable
        style={{marginBottom: 20}}
        onPress={() => {
          props.actions.loggedIn('loginStatus', true, actionTypes.LOGIN_STATUS);
          // props.navigation.navigate('Zen.Community');
          props.navigation.navigate('Zen.Home');
        }}>
        <Text style={styles.doLaterLink}>{translate('PAYMENT').LATER}</Text>
      </Pressable>
      <Alert
        show={showAlert}
        // showProgress={false}
        title={error ? 'Sorry' : 'Success'}
        message={status}
        closeOnTouchOutside={{setShowAlert: setShowAlert}}
        closeOnHardwareBackPress={true}
        // showCancelButton={ }
        showConfirmButton={true}
        // cancelText={ }
        confirmText={'ok'}
        // customView={ }
        onConfirmPressed={() => {
          setDisableBtn(false);
          setShowAlert(false);
          if (!error) {
            props.actions.loggedIn(
              'loginStatus',
              true,
              actionTypes.LOGIN_STATUS,
            );
            // props.navigation.navigate('Zen.Home')
          }
        }}
        // onCancelPressed={() => {
        //   component.decideConfirmationFunction(component.state.cancelAcion);
        //   component.setState({showAlert: false })
        // }}
      />
    </SafeAreaView>
  );
};

const Layout = (props: IProps) => {
  const [showPaymentPlans, setShowPaymentPlans] = useState(false);
  // props.actions.loader('loader', false, actionType.LOADER);
  const loader = useSelector(state => state.onboardingReducer.loader);

  return (
    <>
      <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />

      {showPaymentPlans ? (
        <PaymentPlans props={props} setShow={setShowPaymentPlans} />
      ) : (
        <SettingUpPayment
          props={props}
          setShowPaymentPlans={setShowPaymentPlans}
        />
      )}
    </>
  );
};
export default withTheme(Layout);
