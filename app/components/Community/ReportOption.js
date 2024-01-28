import React, {useState} from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { _changeTranslations } from '../../utils/ThemeProvider';
import Text from '../../components/CustomText';
import Modal from 'react-native-modal'
import translate from "../../utils/Text"
import { FONTFAMILY } from '../../config/font-config';
import { useSelector } from 'react-redux';
import SelectItem from '../../assets/images/selectitem.svg';
import UnselectItem from '../../assets/images/unselectitem.svg';
import actionTypes from '../../store/actions/types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const ReportOption = ((props) => {
  const { theme, isVisible, reasonArray, setVisible, handleReport, item, actions } = props
  const styles = modalStyles(theme);
  const [reasonValue, setReasonValue] = useState('')
  const [reasonId, setReasonId] = useState(1)
  const [selectReason, setSelectedReason] = useState(-1)
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const reportOption =
    useSelector((state: RootState) => state.storiesReducer?.reportOptions?.length > 0 ?
      state.storiesReducer.reportOptions[0]?.data : []) || [];

  const apiCallReportList = () => {
    handleReport(item);
    actions.reportList(actionTypes.POST_REPORT_LIST_STORY, {
      module: 'cancer_healing_story_report',
      action: 'create',
      formData: {
        "userId": userId,
        "author": item.author_detail.id,
        "cancerHealingStoryId": item.id,
        "reportOptionId": reasonId,
        "remarks": reasonValue
      }
    });
    setSelectedReason(-1)
    setReasonValue('')
  }

  return (
    <Modal
          isVisible={isVisible}
          animationIn={'fadeInUp'}
          animationOut={'fadeInDown'}
          onBackdropPress={() => setVisible(false)}
          onBackButtonPress={() => setVisible(false)}
          backdropOpacity={0.3}
        >
          <KeyboardAwareScrollView contentContainerStyle={styles.reasonModalContainer} >
            <View style={styles.reasonModalVw}>
              <Text style={[styles.modalTitleText, { marginTop: 5 }]} numberOfLines={1} >Why are you reporting this post?</Text>
              {reportOption?.map((item, index) => {
                return (
                  <View style={{ marginTop: 15, flexDirection: 'row', alignItems: 'center' }} >
                    <Pressable onPress={() => {
                      setSelectedReason(index)
                      setReasonId(item?.id)
                    }} >
                      {selectReason == index ?
                        <SelectItem width={23} height={23} /> :
                        <UnselectItem width={23} height={23} />}
                    </Pressable>
                    <Text style={styles.deactivateText} numberOfLines={1} onPress={() => {
                      setReasonId(item?.id)
                      setSelectedReason(index)
                    }}>{item?.name}</Text>
                  </View>
                );
              })}
              {selectReason > 0 &&
                <View style={styles.deletionInputVw}>
                  <TextInput
                    value={reasonValue}
                    placeholder={translate("CHECKOUT")["REASON_FOR_REPORT"]}
                    placeholderTextColor={styles.placeholderText}
                    style={styles.postText}
                    multiline={true}
                    onChangeText={(value) => setReasonValue(value)} />
                </View>
              }
              <Pressable onPress={() => {
                if (selectReason != -1) {
                   apiCallReportList()
                }
                setVisible(false)
              }} style={styles.okView} >
                <Text style={[styles.okText]} numberOfLines={1} >{translate("COMMONTEXT")["OK"]}</Text>
              </Pressable>
            </View>
          </KeyboardAwareScrollView>
    </Modal>
  );
})
const modalStyles = (theme: any) => {
  return StyleSheet.create({
    reasonModalContainer: {
        justifyContent: 'center',
        alignItems: 'center'
      },
      reasonModalVw: {
        width: 335,
        borderRadius: 10,
        backgroundColor: theme.PRIMARY,
        padding: 15
      },
      modalTitleText: {
        color: theme.GRAY_BLACK,
        fontSize: 16,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        textAlign: 'center',
        marginTop: 15
      },
      deactivateText: {
        fontSize: 14,
        color: theme.GRAY_BLACK,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        marginLeft: 5,
        paddingRight: 15
      },
      deletionInputVw: {
        height: 69,
        borderRadius: 4,
        backgroundColor: theme.PRIMARY,
        borderWidth: 1,
        borderColor: '#ebebeb',
        paddingHorizontal: 10,
        marginVertical: 15
      },
      placeholderText: {
        color: theme.SEARCH_TITLE
      },
      postText: {
        color: theme.GRAY_BLACK,
        fontSize: 12,
        textAlignVertical: 'top',
        fontFamily: FONTFAMILY.POPPINS_REGULAR,
      },
      okText: {
        color: theme.SECONDARY,
        fontSize: 14,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
      },
      okView: {
        fontSize: 14,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
        marginTop: 10,
        alignSelf: 'flex-end',
        paddingVertical: 10,
        paddingHorizontal: 10
      },
  });
};
export default ReportOption;