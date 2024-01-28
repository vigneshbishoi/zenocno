/**
 * Info layout page
 * @Author: Anand R
 * @Date: Tue Sep 20 2022 14:36:46 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
import React, { useState } from 'react';
import style from './Style';
import { View, ScrollView, Text, Pressable, LayoutAnimation, Image } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import WhiteClose from '../../../assets/images/whiteClose.svg'
import NounCheck from '../../../assets/images/nounCheck.svg'
import Layer from '../../../assets/images/Layer.svg'
import Ellipse from '../../../assets/images/Ellipse.svg'
import Timeline from '../../../assets/images/timeline.svg'
import UpArrow from '../../../assets/images/UpArrow.svg'
import DownArrow from '../../../assets/images/DownArrow.svg'
import translate from "../../../utils/Text"
import { useNavigation } from '@react-navigation/native';

interface IProps {
  theme: any;
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const navigation = useNavigation();
  const [helpMeExpanded, setHelpMeExpanded] = useState(false)
  const [onLineDoctorExpanded, setOnLineDoctorExpanded] = useState(false)
  const [insuranceExpanded, setInsuranceExpanded] = useState(false)


  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.closeIconContainer}>
        <WhiteClose width={50} height={15} />
      </Pressable>
      <Image source={require('../../../assets/images/coverImage.png')}
        resizeMode={'cover'}
        style={{
          height: '15%', width: '100%'
        }} />
      <View style={styles.subContainer} >
        <View>
          <Text style={styles.careBenefitsText}>{translate("COMMONTEXT")["ZENONCO_IO"]}</Text>
          <View style={styles.rowContainer}>
            <View style={{ marginTop: 4 }}>
              <NounCheck />
            </View>
            <Text style={styles.careBenefitsSubText}>{translate("COMMONTEXT")["DEDICATED_TEAM"]}</Text>
          </View>
          <View style={styles.dividerLine} />
          <View style={[styles.rowContainer, { marginTop: 9, marginBottom: 15 }]}>
            <View style={{ marginTop: 4 }}>
              <NounCheck />
            </View>
            <Text style={styles.careBenefitsSubText}>{translate("COMMONTEXT")["END_TO_END_CARE"]}</Text>
          </View>
          <View style={styles.dividerLine} />
          <View style={[styles.rowContainer, { marginTop: 15 }]}>
            <View style={{ marginTop: 4 }}>
              <NounCheck />
            </View>
            <Text style={styles.careBenefitsSubText}>{translate("COMMONTEXT")["PERSONALIZED_DIET_PLAN"]}</Text>
          </View>
          <View style={styles.dividerLine} />
          <View style={[styles.rowContainer, { marginTop: 15 }]}>
            <View style={{ marginTop: 4 }}>
              <NounCheck />
            </View>
            <Text style={styles.careBenefitsSubText}>{translate("COMMONTEXT")["GUARANTEE_CONSULTATION"]}</Text>
          </View>
          <View style={styles.dividerLine} />
          <View style={[styles.rowContainer, { marginTop: 15 }]}>
            <View style={{ marginTop: 4 }}>
              <NounCheck />
            </View>
            <Text style={styles.careBenefitsSubText}>{translate("COMMONTEXT")["INTEGRATIVE_ONCOLOGY"]}</Text>
          </View>
          <View style={styles.dividerLine} />
          <View style={[styles.rowContainer, { marginTop: 15 }]}>
            <View style={{ marginTop: 4 }}>
              <NounCheck />
            </View>
            <Text style={styles.careBenefitsSubText}>{translate("COMMONTEXT")["CONNECT_COMMUNITY"]}</Text>
          </View>
          <View style={styles.dividerLine} />
          <View style={[styles.rowContainer, { marginTop: 15 }]}>
            <View style={{ marginTop: 4 }}>
              <NounCheck />
            </View>
            <Text style={styles.careBenefitsSubText}>{translate("COMMONTEXT")["IN"]}</Text>
          </View>
          <View style={styles.dividerLine} />
        </View>
        <View style={{ marginTop: 17 }}>
          <Text style={styles.careBenefitsText}>{translate("COMMONTEXT")["WHY_ZENONCE"]}</Text>
          <Layer />
          <Text style={styles.alongBestDr}>
            Along with the best doctors and cancer center,
            ZenOnco.io also guarantees these benefits.
          </Text>
        </View>
        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: 'row' }}>
            <Ellipse />
            <Text style={styles.alongBestSubText}>{'India’s First Integrative Oncology cancer care healthtech platform'}</Text>
            {/* <Text style={styles.alongBestSubText}>{translate("COMMONTEXT")["LOREM_IPSUM_DOLOR"]}</Text> */}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Ellipse />
            <Text style={styles.alongBestSubText}>{'Unbiased cancer care guidance throughout the cancer journey'}</Text>
            {/* <Text style={styles.alongBestSubText}>{translate("COMMONTEXT")["LOREM_IPSUM_DOLOR"]}</Text> */}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Ellipse />
            <Text style={styles.alongBestSubText}>{'Ask questions to experts and get scientific response within an hour'}</Text>
            {/* <Text style={styles.alongBestSubText}>{translate("COMMONTEXT")["LOREM_IPSUM_DOLOR"]}</Text> */}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Ellipse />
            <Text style={styles.alongBestSubText}>{'Connect with cancer experts & listen to their success stories lives'}</Text>
            {/* <Text style={styles.alongBestSubText}>{translate("COMMONTEXT")["LOREM_IPSUM_DOLOR"]}</Text> */}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Ellipse />
            <Text style={styles.alongBestSubText}>{'Cancer fighting meal planner with anti-oxidants & immunity boosting foods'}</Text>
            {/* <Text style={styles.alongBestSubText}>{translate("COMMONTEXT")["LOREM_IPSUM_DOLOR"]}</Text> */}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Ellipse />
            <Text style={styles.alongBestSubText}>{'Track your activities and get reminders for medicine & activities'}</Text>
            {/* <Text style={styles.alongBestSubText}>{translate("COMMONTEXT")["LOREM_IPSUM_DOLOR"]}</Text> */}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Ellipse />
            <Text style={styles.alongBestSubText}>{'100+ wellness activities to boost immunity & willpower'}</Text>
            {/* <Text style={styles.alongBestSubText}>{translate("COMMONTEXT")["LOREM_IPSUM_DOLOR"]}</Text> */}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Ellipse />
            <Text style={styles.alongBestSubText}>{'Buy supplements to improve treatment & reduce side effects'}</Text>
            {/* <Text style={styles.alongBestSubText}>{translate("COMMONTEXT")["LOREM_IPSUM_DOLOR"]}</Text> */}
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Ellipse />
            <Text style={styles.alongBestSubText}>{'Dedicated cancer coach to guide you throughout the journey '}</Text>
            {/* <Text style={styles.alongBestSubText}>{translate("COMMONTEXT")["LOREM_IPSUM_DOLOR"]}</Text> */}
          </View>
        </View>
        <View>
          <Text style={styles.howItWorkText}>{translate("COMMONTEXT")["HOW_IT_WORK"]}</Text>
          <View>
            <Text style={styles.howItWorkDescription}>
            ZenOnco.io dedicates a cancer coach to guide you at every step of your journey
            </Text>
          </View>
          <View style={styles.timeLineContainer}>
            <Timeline />
            <View style={{ marginLeft: 10 }}>
              <View>
                <Text style={styles.timeLineStep}>{translate("COMMONTEXT")["STEP"]} 1</Text>
                <Text style={styles.timeLineSubText}>Connect to a cancer coach</Text>
              </View>
              <View style={{ marginTop: '12%' }}>
                <Text style={styles.timeLineStep}>{translate("COMMONTEXT")["STEP"]} 2</Text>
                <Text style={styles.timeLineSubText}>Share information on cancer and treatment and current challenges faced</Text>
              </View>
              <View style={{ marginTop: '12%' }}>
                <Text style={styles.timeLineStep}>{translate("COMMONTEXT")["STEP"]} 3</Text>
                <Text style={styles.timeLineSubText}>Cancer coach will guide you with a personalized treatment plan for you.</Text>
              </View>
              <View style={{ marginTop: '12%' }}>
                <Text style={styles.timeLineStep}>{translate("COMMONTEXT")["STEP"]} 4</Text>
                <Text style={styles.timeLineSubText}>Book consultation with the best doctors and experts</Text>
              </View>
              <View style={{ marginTop: '12%' }}>
                <Text style={styles.timeLineStep}>{translate("COMMONTEXT")["STEP"]} 5</Text>
                <Text style={styles.timeLineSubText}>Get medicines dispatched to your doorsteps</Text>
              </View>
              <View style={{ marginTop: '12%' }}>
                <Text style={styles.timeLineStep}>{translate("COMMONTEXT")["STEP"]} 6</Text>
                <Text style={styles.timeLineSubText}>Weekly follow ups to monitor your health and dosage efficiency</Text>
              </View>
            </View>
          </View>
          <View style={{ marginTop: 27 }}>
            <Text style={styles.howItWorkText}>{translate("COMMONTEXT")["FREQUENTLY_ASKED_QUESTIONS"]}</Text>
            <View style={styles.dividerLine} />
            <>
              <Pressable style={styles.featureDesVw} onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setHelpMeExpanded(!helpMeExpanded);
              }} >
                <Text style={styles.featureTitleText} numberOfLines={1} >{'What is integrative oncology?'}</Text>
                {
                  helpMeExpanded ?
                    <UpArrow width={15} height={15} style={styles.rightArraw} />
                    :
                    <DownArrow width={15} height={15} style={styles.rightArraw} />
                }
              </Pressable>
              <View style={{ height: helpMeExpanded ? null : 0, overflow: 'hidden', marginVertical: 15 }}>
                <Text style={styles.expandSubText}>{'Integrative oncology is a patient-centred, evidence-informed field of cancer care that utilizes mind and body practices, natural products, and/or lifestyle modifications from different traditions alongside conventional medical treatments. It enhances the treatment efficacy, helps to reduce the side effects while increasing the chances of survival, and also improves the overall quality of life.'}</Text>
              </View>
            </>
            <View style={styles.dividerLine} />
            <>
              <Pressable style={styles.featureDesVw} onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setOnLineDoctorExpanded(!onLineDoctorExpanded);
              }} >
                <Text style={styles.featureTitleText} numberOfLines={1} >{'How can integrative oncology help me better than the conventional treatment methods?'}</Text>
                {
                  onLineDoctorExpanded ?
                    <UpArrow width={15} height={15} style={styles.rightArraw} />
                    :
                    <DownArrow width={15} height={15} style={styles.rightArraw} />
                }
              </Pressable>
              <View style={{ height: onLineDoctorExpanded ? null : 0, overflow: 'hidden', marginVertical: 15 }}>
                <Text style={styles.expandSubText}>{'Integrative oncology can help cancer patients more than the conventional treatment methods as it includes various complementary therapies such as mind-body wellness, essential supplements, anti-cancer diet along with conventional medical treatment. These factors together can contribute to a better healing outcome for a cancer patient. '}</Text>
              </View>
            </>
            <>
              <Pressable style={styles.featureDesVw} onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setOnLineDoctorExpanded(!onLineDoctorExpanded);
              }} >
                <Text style={styles.featureTitleText} numberOfLines={1} >{'How will the cancer coaches assist me through the process?'}</Text>
                {
                  onLineDoctorExpanded ?
                    <UpArrow width={15} height={15} style={styles.rightArraw} />
                    :
                    <DownArrow width={15} height={15} style={styles.rightArraw} />
                }
              </Pressable>
              <View style={{ height: onLineDoctorExpanded ? null : 0, overflow: 'hidden', marginVertical: 15 }}>
                <Text style={styles.expandSubText}>{'The cancer coach will first enquire details about the cancer type, stage, medical history and reports. Then they will help with the consultation with a specialist, after which they will guide you through the intake of supplements and any other doubts and queries you may have.'}</Text>
              </View>
            </>
            <View style={styles.dividerLine} />
            <>
              <Pressable style={styles.featureDesVw} onPress={() => {
                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                setInsuranceExpanded(!insuranceExpanded);
              }} >
                <Text style={styles.featureTitleText} numberOfLines={2} >{'I have insurance, will my surgery expense be covered?'}</Text>
                {
                  insuranceExpanded ?
                    <UpArrow width={15} height={15} style={styles.rightArraw} />
                    :
                    <DownArrow width={15} height={15} style={styles.rightArraw} />
                }
              </Pressable>
              <View style={{ height: insuranceExpanded ? null : 0, overflow: 'hidden', marginVertical: 15 }}>
                <Text style={styles.expandSubText}>{'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</Text>
              </View>
            </>
          </View>
        </View>
      </View>
      <View style={styles.adjustContainer} />
    </ScrollView>
  );
};
export default withTheme(Layout);
