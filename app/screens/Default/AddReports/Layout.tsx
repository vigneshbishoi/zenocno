/**
 * Community Component
 * @Author: Astha
 * @Date: Wed April 14 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
import React, { useState, useEffect } from 'react';
import style from './Style';
import {
  View,
  SafeAreaView,
  StatusBar,
  Pressable,
  Text,
  Dimensions,
  ScrollView,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import translate from "../../../utils/Text"
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/AntDesign'
import moment from 'moment';
import { CommonTextInput } from '../../../components/Plugins/CommonTextInput'
import PDF from '../../../assets/images/pdf.svg'
import JPG from '../../../assets/images/jpg.svg'
import DOC from '../../../assets/images/doc.svg'
import XLS from '../../../assets/images/xls.svg'
import DocumentPicker, {
  isInProgress,
} from 'react-native-document-picker'
import request from '../../../services/client';
import Alert from "../../../components/AlertScreen/Index"
import AppLoader from '../../../components/Plugins/AppLoader';
import { Dropdown, MultiSelect } from 'react-native-element-dropdown';
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import Feather from 'react-native-vector-icons/Feather'
import FastImage from 'react-native-fast-image';
import { scale } from 'react-native-size-matters';
import AppHeader from '../../../components/CommonInput/appHeader';

interface IProps {
  theme: any;
  navigation: any;
  actions: any
  data: any
}

const Layout = (props: IProps) => {
  const styles = style(props.theme);
  const theme = props.theme
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [showCalender, setShowCalender] = useState(false)
  const [date, setDate] = useState('Date')  
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const userName = useSelector(state => state.loginReducer.userData)
  const userData = useSelector((state) => state.onboardingReducer.userDetails);
  const MyCategory = useSelector(state => state.myReportsReducer?.category)
  var defaultData = new Date()
  const [result, setResult] = useState([])
  const [showErrorMsg, setShowErrorMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [category, setCategory] = useState('')
  const [categoryArr, setCategoryArr] = useState([])
  const [loader, setLoader] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const EditItem = props?.route?.params?.EditItem
  const [deleteAlert, setDeleteAlert] = useState(false)

  useEffect(() => {
    MyCategory?.map((data) => {
      categoryArr.push({ label: data?.category, value: data?.id })
    })
    if (EditItem != undefined) {
      let categoryUpdate = ''
      MyCategory?.filter((data) => {
        if (data?.id == EditItem?.category) {
          categoryUpdate = data?.category
        }
      })
      setTitle(EditItem.title)
      setDescription(EditItem.description)
      setDate(EditItem?.reportDate)
      setCategoryId(EditItem?.category)
      setCategory(categoryUpdate)
      if (EditItem?.document_files?.length > 0) {
        let resultUpdate = []
        EditItem?.document_files.map((data) => {
          resultUpdate.push({
            'uri': data?.url, 'type': data?.url, 'name': data?.fileName, id: data?.id,
            documentUserId: data?.documentUserId
          })
        })
        setResult(resultUpdate)
      }
    }
  }, [])

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.log('cancelled')
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.log('multiple pickers were opened, only the last will be considered')
    } else {
      throw err
    }
  }

  const fileIcons = (data) => {
    let updateName = data?.type?.toLowerCase();
    return (
      updateName?.includes('pdf') ?
        <PDF width="100%" height="100%" /> :
        (updateName?.includes('jpg') || updateName?.includes('png') || updateName?.includes('heic') ||
          updateName?.includes('heif') || updateName?.includes('heif') || updateName?.includes('gif')) ?
          <FastImage
            style={[styles.renderIconImage, {}]}
            source={{
              uri: data?.uri,
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
          /> :
          (updateName?.includes('msword') || updateName?.includes('doc'))
            ? <DOC width="100%" height="100%" /> :
            (updateName?.includes('ms-excel') || updateName?.includes('xls')) ?
              <XLS width="100%" height="100%" /> :
              <DOC width="100%" height="100%" />
    )
  }

  const documentUpdate = (data) => {
    let validFiles = true
    let updateArr: any[] = []
    data?.map((item: any) => {
      let verifyPdf = item?.type?.includes('pdf')
      let verifyImage = item?.type?.includes('image')
      let verifyXls = item?.type?.includes('ms-excel')
      let verifyDoc = item?.type?.includes('msword')
      let verifyDocc = item?.type?.includes('application/vnd.openxmlformats-officedocument.wordprocessingml.document')
      if (verifyPdf || verifyImage || verifyXls || verifyDoc || verifyDocc) {
        updateArr.push(item)
        validFiles = true
      } else {
        validFiles = false
      }
    })
    if (!validFiles) {
      setShowAlert(true)
      setShowErrorMsg('InvalidFile')
    }
    if (result?.length >= 1 && data.length >= 1) {
      setResult(updateArr?.concat(result))
    } else {
      setResult(updateArr)
    }
  }

  const openFileView = (data) => {
    setLoader(true)
    const url = data?.uri

    function getUrlExtension(url) {
      return url.split(/[#?]/)[0].split(".").pop().trim();
    }
    const extension = getUrlExtension(url);
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };
    if (data?.id != undefined) {
      RNFS.downloadFile(options)
        .promise.then(() => FileViewer.open(localFile, {
          onDismiss: () => setLoader(false)
        }))
        .then(() => {
          // success
          // setLoader(false)
        })
        .catch((error) => {
          setLoader(false)
          // error
        });
    } else {
      RNFS.readDir(RNFS.DocumentDirectoryPath)
        .then(() => FileViewer.open(url, {
          onDismiss: () => setLoader(false)
        }))
        .then(() => {
        })
        .catch((error) => {
          setLoader(false)
        });
    }
  }

  const removeData = async (data) => {
    if (title == '') {
      alertFun('Enter your title')
    } else if (description == '') {
      alertFun('Enter your description')
    } else if (date == 'Date') {
      alertFun('Enter your date')
    } else {
      try {
        const apiCall = await request({
          method: 'delete', data: {
            module: 'document_user',
            action: `remove_indivisual_doc?file_id=${data?.id}&doc_id=${data?.documentUserId}`,
          },
        });
        setLoader(false)
      } catch (error) {
        console.log(error, 'Error');
        setLoader(false)
      }
    }
  }

  const submitData = async () => {
    if (title == '') {
      alertFun('Enter your title')
    } else if (date == 'Date') {
      alertFun('Enter your date')
    } else if (categoryId == '') {
      alertFun('Enter your category')
    } else if (result?.length > 20) {
      alertFun('Please select up to 20 files only')
    } else {
      try {
        setLoader(true)
        const formdata = new FormData();
        formdata.append("userId", userId)
        formdata.append("reportDate", date)
        formdata.append("title", title)
        formdata.append("description", description)
        formdata.append("category", categoryId)
        // formdata.append('image', { uri: result?.uri, name: result?.name, type: result?.type })
        result.map((data) => {
          if (data?.id == undefined) {
            formdata.append('image', { uri: data?.uri, name: data?.name, type: data?.type })
          }
        })
        if (EditItem != undefined) {
          formdata.append('id', EditItem.id)
        }
        const apiCall = await request({
          method: 'post', data: {
            module: 'document_user',
            action: EditItem != undefined ? 'update' : 'create',
            formData: formdata,
          },
          isFormData: true
        });
        console.log('PPPP', apiCall);

        if (apiCall?.status == 200) {
          setShowAlert(true)
          setShowErrorMsg('Success')
          props?.route?.params?.GoBack && props?.route?.params?.GoBack(apiCall.data.data[0])
        }
        setLoader(false)
      } catch (error) {
        console.log(error, 'Error');
        setLoader(false)
      }
    }
  }

  const renderPhaseItem = (item: any) => {
    let selectItem = category == item?.label
    return (
      <View style={[styles.item, { backgroundColor: selectItem ? theme.GHOST_WHITE : theme.PRIMARY }]}>
        <Text style={styles.textItem}>{item.label}</Text>
        {selectItem ? (
          <AntDesign
            style={styles.icon}
            color="#108FE5"
            name="checkcircle"
            size={20}
          />
        ) : null}
      </View>
    );
  };

  const DeleteItem = async () => {
    try {
      setLoader(true)
      const deleteApiCall = await request({
        method: 'delete', data: {
          module: 'document_user',
          action: `delete?doc_id=${EditItem?.id}`,
          formData: {},
        },
        isFormData: true
      });
      setLoader(false)
      props?.route?.params?.GoBack && props?.route?.params?.GoBack('delete')
      props.navigation.goBack()
    } catch (error) {
      console.log(error, 'Error');
      setLoader(false)
    }
  }

  const alertFun = (msg) => {
    setShowAlert(true)
    setShowErrorMsg(msg)
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
        <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
        <AppHeader
          theme={theme}
          onBackPress={() => props.navigation.goBack()}
          headerTitle={translate("MEMORY")["MEDICAL_REPORTS"]}
          isRightComponent={true}
          isSecondIcon={EditItem != undefined ? true : false}
          rightSecondIcon={<Icon name='delete' size={16} style={{ color: theme.DARK_GRAY }} />}
          rightSecondPress={() => {
            setDeleteAlert(true)
            setShowAlert(true)
          }} />
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollStyle}
            showsVerticalScrollIndicator={false}>
            <CommonTextInput
              value={title}
              placeholder={translate("MEMORY")["REPORT_NAME"]}
              placeholderTextColor={theme.BLACK}
              onChangeText={(text: any) => { setTitle(text) }}
              extraStyle={[styles.titleInput, styles.commonText, styles.commonShadow]}
            />
            <Dropdown
              style={[styles.categoryInput, styles.commonShadow]}
              selectedTextStyle={{ color: theme.BLACK }}
              placeholderStyle={[styles.commonText, { color: theme.BLACK }]}
              inputSearchStyle={{ borderRadius: 10 }}
              containerStyle={{ borderRadius: 20, marginTop: 6 }}
              iconStyle={styles.iconStyle}
              data={categoryArr}
              search
              renderItem={renderPhaseItem}
              maxHeight={300}
              labelField="label"
              valueField={category}
              placeholder={category != '' ? category : "Category"}
              searchPlaceholder={translate("COMMONTEXT")["SEARCH_DOT"]}
              value={'cancerType'}
              onChange={item => {
                setCategory(item.label)
                setCategoryId(item?.value)
              }}
            />
            <Pressable onPress={() => { setShowCalender(true) }} style={[styles.dateInput,
            styles.commonShadow]}>
              <Text style={[{ color: theme.BLACK },
              styles.commonText]}>{date == 'Date' ? "Date" :
                moment(date)?.format('DD-MMM-YYYY')}</Text>
              <Icon name='calendar' size={15} style={{ color: theme.DARK_GRAY }} />
            </Pressable>
            <CommonTextInput
              value={description}
              placeholder={translate("COMMONTEXT")["DESCRIPTION"]}
              placeholderTextColor={theme.BLACK}
              multiline={true}
              onChangeText={(text: any) => { setDescription(text) }}
              extraStyle={[styles.descInput, styles.commonText, styles.commonShadow]}
            />
            <Pressable onPress={() => {
              DocumentPicker.pickMultiple().then((data) => documentUpdate(data)).catch(handleError)
            }} style={[styles.uploadImgButton, styles.commonShadow]}>
              <Feather name='upload' size={18} color={theme.PAGINATION_SELECCT} />
              <Text style={styles.uploadImage}>{translate("MEMORY")["UPLOAD_FILES"]}</Text>
              <Text style={[styles.uploadImage, { color: theme.SEARCH_TITLE }]}>{translate("MEMORY")["FILE_TYPE"]}</Text>
              <Text style={styles.uploadImageDesc}>{translate("COMMONTEXT")["BROWSE"]}</Text>
            </Pressable>
            {result?.length > 0 && <Text style={styles.uploadFile}>{EditItem != undefined ? "Attachments" :
              'Uploading'}</Text>}
            <View style={styles.extraPadding}>
              {result.map((data, index) => {
                return (
                  <View style={[, styles.renderMainView, {
                    marginTop: 12
                  }]}>
                    <Pressable style={styles.renderIconImage}
                      onPress={() => { openFileView(data) }}>
                      {fileIcons(data)}
                      <Pressable style={styles.fileNameView} onPress={() => { openFileView(data) }}>
                        <Text numberOfLines={1}
                          style={styles.renderText}>{data?.name}</Text>
                      </Pressable>
                    </Pressable>
                    {/* <Pressable style={{ flex: 1 }} onPress={() => { openFileView(data) }}>
                      <Text numberOfLines={2}
                        style={styles.renderText}>{data?.name}</Text>
                    </Pressable> */}
                    <Pressable style={styles.deleteView} onPress={() => {
                      let updateResult = [...result]
                      updateResult.splice(index, 1)
                      setResult(updateResult)
                      if (data?.id != undefined && data?.id != null) { removeData(data) }
                    }}>
                      <Icon name='delete' size={16} style={{ color: theme.PRIMARY }} />
                    </Pressable>
                  </View>
                )
              })}
            </View>
          </ScrollView>
        </View>
        <DatePicker
          modal
          minimumDate={new Date("1910-01-01")}
          // maximumDate={new Date("2100-01-01")}
          maximumDate={defaultData}
          open={showCalender}
          date={defaultData}
          mode={'date'}
          onConfirm={(date) => {
            setShowCalender(false)
            let dateVal = moment(date, 'YYYY-MM-DD').format();
            setDate(dateVal.substring(0, 10))
          }}
          onCancel={() => {
            setShowCalender(false)
          }}
          theme={'light'}
        />
        <View style={styles.buttonView}>
          <Pressable onPress={() => { submitData() }}
            style={styles.saveButton}>
            <Text style={[styles.headerText, { color: theme.PRIMARY }]}>
              {EditItem != undefined ? 'Save' : 'Add report'}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
      <Alert
        show={showAlert}
        title={deleteAlert ? 'Delete' : showErrorMsg == 'Success' ? "Success" : "Sorry !"}
        message={deleteAlert ? 'Are you sure you want to Delete' :
          showErrorMsg == 'Success' ? 'Your report has been successfully uploaded'
            : showErrorMsg == 'InvalidFile' ? 'Please upload valid files only' : showErrorMsg}
        closeOnTouchOutside={{ val: true, setShowAlert: setShowAlert }}
        closeOnHardwareBackPress={true}
        showConfirmButton={true}
        confirmText={"Ok"}
        cancelText={"Cancel"}
        showCancelButton={deleteAlert}
        onConfirmPressed={() => {
          setShowAlert(false)
          showErrorMsg == 'Success' ? props.navigation.goBack() : null
          setTimeout(() => {
            setShowErrorMsg('')
          }, 500);
          if (deleteAlert) {
            DeleteItem()
            setDeleteAlert(false)
          }
        }}
        cancelButtonStyle={{ marginRight: scale(5) }}
        confirmButtonStyle={{ marginLeft: scale(5) }}
        onCancelPressed={() => {
          setShowAlert(false)
          setTimeout(() => {
            setShowErrorMsg('')
          }, 500);
          setDeleteAlert(false)
        }}
      />
    </>
  );
};
export default withTheme(Layout);