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
  Keyboard,
  Modal
} from 'react-native';
import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
import translate from "../../../utils/Text"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import { useSelector } from 'react-redux';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/AntDesign'
import moment from 'moment';
import { CommonTextInput } from '../../../components/Plugins/CommonTextInput'
import PDF from '../../../assets/images/pdf.svg'
import JPG from '../../../assets/images/jpg.svg'
import DOC from '../../../assets/images/doc.svg'
import XLS from '../../../assets/images/xls.svg'
import Upload from '../../../assets/images/Upload.svg'
import DocumentPicker, {
  isInProgress,
} from 'react-native-document-picker'
import request from '../../../services/client';
import Alert from "../../../components/AlertScreen/Index"
import AppLoader from '../../../components/Plugins/AppLoader';
import RNFS from "react-native-fs";
import FileViewer from "react-native-file-viewer";
import FastImage from 'react-native-fast-image';
import { scale } from 'react-native-size-matters';
import AppHeader from '../../../components/CommonInput/appHeader';
import CommonDropDown from '../../../components/CommonInput/commonDropDown';
import ImagePicker from 'react-native-image-crop-picker';
import Toast from 'react-native-toast-message';
import actionTypes from '../../../store/actions/types';
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
  const [defaultData, setDefaultData] = useState(new Date())
  const [result, setResult] = useState([])
  const [showErrorMsg, setShowErrorMsg] = useState('')
  const [showAlert, setShowAlert] = useState(false)
  const [loader, setLoader] = useState(false)
  const EditItem = props?.route?.params?.EditItem
  const [deleteAlert, setDeleteAlert] = useState(false)
  const [category, setCategory] = useState('')
  const [categoryId, setCategoryId] = useState(null)
  const [cateDisplay, setCateDisplay] = useState(false)
  const [isSelect, setIsSelect] = useState(0);
  const [update, setUpdate] = useState(true);
  const [isAddPhotoModal, setisAddPhotoModal] = useState(false)
  const journalCateList = useSelector((state) => state.journalReducer?.journalCate);

  const handleError = (err: unknown) => {
    if (DocumentPicker.isCancel(err)) {
      console.log('cancelled')
      setisAddPhotoModal(!isAddPhotoModal)
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.log('multiple pickers were opened, only the last will be considered')
    } else {
      throw err
    }
  }
  const [categoryType, setCategoryType] = useState([])

  const categoryRenderList = () => {
    return categoryType.map((element, index) => {
      return (
        renderCategoryItem(element, index)
      );
    });
  };

  useEffect(() => {
    let catType = []
    if(journalCateList?.length > 0){
      journalCateList.map(item => {
          catType.push({value: item.id, label: item.category})
      })
      setCategoryType(catType)
    }
    
  }, [journalCateList]);

  useEffect(() => {
    apiCategoryCall()
  }, []);

  //api call
  const apiCategoryCall = () => {
    props.actions.getJournalCategoryList(actionTypes.GET_JOURNAL_CATEGORY_LIST, {
      module: 'journal_user',
      action: `get_jounal_category`,
      formData: {}
    });
  }

  const renderCategoryItem = (item: any) => {
    return (
      <Pressable style={{marginHorizontal: 15}} onPress={() => { setCategoryId(item.value)
        setCategory(item.label), setCateDisplay(false), setIsSelect(0), Keyboard.dismiss() }}>
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === category && (
            <AntDesign
              style={styles.icon}
              color="#108FE5"
              name="checkcircle"
              size={20}
            />
          )}
        </View>
      </Pressable>
    );
  };
  useEffect(() => {
    let dateVal = moment(new Date(), 'YYYY-MM-DD').format();
    setDate(dateVal)
    if (EditItem != undefined) {
      setTitle(EditItem.title)
      setDescription(EditItem.description)
      setDate(EditItem?.date)
      setDefaultData(new Date(EditItem?.date))
      if (EditItem?.journal_images?.length > 0) {
        let resultUpdate = []
        EditItem?.journal_images.map((data) => {
          resultUpdate.push({ 'uri': data?.image, 'type': data?.image, 'name': data?.fileName, id: data?.id })
        })
        setResult(resultUpdate)
      }
    }
  }, [])

  const fileIcons = (data) => {
    let updateName = data?.type?.toLowerCase();
    return (
      updateName?.includes('pdf') ?
        <PDF width="100%" height="100%" /> :
        (updateName?.includes('jpg') || updateName?.includes('png') || updateName?.includes('heic') ||
          updateName?.includes('heif') || updateName?.includes('jpeg') || updateName?.includes('gif')) ?
          <FastImage
            style={[styles.iconStyle, {}]}
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
  const openCamera = () => {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
    }).then(image => {
      addImageFromCamera(image)
    });
  }
  const addImageFromCamera = (image: any) => {
   console.log("==>",image)
   console.log("==>111",result)
    setisAddPhotoModal(false)
    if ((result.length + 1) > 20) {
     Toast.show({
       type: 'error',
       text1: 'Oops',
       text2: "Please select only up to 20 images",
     })
   } else {
     result.push({
      fileCopyUri: null, 
      name: "camera image", 
      size: image.size, 
      type: image.mime, 
      uri: image.path
     })
     setUpdate(!update)
     setisAddPhotoModal(!isAddPhotoModal)
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

  const documentUpdate = (data) => {
    let validFiles = true
    let updateArr: any[] = []
    console.log("Update==>",updateArr);
    
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
    console.log("data===>",data);
    
    if (!validFiles) {
      setShowAlert(true)
      setShowErrorMsg('InvalidFile')
    }
    if (result?.length >= 1 && data.length >= 1) {
      setResult(updateArr?.concat(result))
       setisAddPhotoModal(!isAddPhotoModal)
    } else {
      setResult(updateArr)
       setisAddPhotoModal(!isAddPhotoModal)
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
        // setLoader(true)
        const apiCall = await request({
          method: 'delete', data: {
            module: 'journal_user',
            action: `remove?id=${data.id}`,
          },
        });
        // if (apiCall?.status == 200) {
        //   setShowAlert(true)
        //   setShowErrorMsg('Success')
        // }
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
    } else if (description == '') {
      alertFun('Enter your description')
    } else if (date == 'Date') {
      alertFun('Enter your date')
    } else if (result?.length > 20) {
      alertFun('Please select up to 20 files only')
    } else if (categoryId == null) {
      alertFun('Enter your category')
    } else {
      try {
        setLoader(true)
        const formdata = new FormData();
        formdata.append("userId", userId)
        formdata.append("date", date)
        formdata.append("title", title)
        formdata.append("description", description)
        formdata.append("journalCategoryId", categoryId)
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
            module: 'journal_user',
            action: EditItem != undefined ? 'update' : 'create',
            formData: formdata,
          },
          isFormData: true
        });
        if (apiCall?.status == 200) {
          setShowAlert(true)
          setShowErrorMsg('Success')
          // if (apiCall?.data?.data.length == 1) {
          //   props?.route?.params?.GoBack && props?.route?.params?.GoBack(apiCall?.data?.data[0])
          // }
        }
        setLoader(false)
      } catch (error) {
        console.log(error, 'Error');
        setLoader(false)
      }
    }
  }

  const alertFun = (msg) => {
    setShowAlert(true)
    setShowErrorMsg(msg)
  }

  const DeleteItem = async () => {
    try {
      setLoader(true)
      const deleteApiCall = await request({
        method: 'delete', data: {
          module: 'journal_user',
          action: `remove_all_usr_journal_details?id=${EditItem?.id}`,
          formData: {},
        },
        isFormData: true
      });
      setLoader(false)
      props.navigation.goBack()
    } catch (error) {
      console.log(error, 'Error');
      setLoader(false)
    }
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
        <AppLoader visible={loader} textContent={translate("COMMONTEXT")["PLEASE_WAIT"]} />
        <AppHeader
          theme={theme}
          onBackPress={() => props.navigation.goBack()}
          headerTitle={translate("MEMORY")["ADD_MEMORY"]}
          isRightComponent={true}
          isSecondIcon={true}
          rightSecondIcon={
            <View style={{flexDirection:"row", alignItems:'center'}}>
              {EditItem != undefined ? 
                <Icon name='delete' size={16} style={{ color: theme.DARK_GRAY }} />: 
                null}
                <Pressable onPress={() => {submitData()}} style={styles.headerSaveBtn}>
                  <Text style={styles.saveText}>Save{result.length}</Text>
                </Pressable>
            </View>}
          extraHeaderTxt={{fontSize: 16}}
          extraHeaderTxtView={{ flex:1 }}
          rightSecondPress={() => {
            if(EditItem != undefined){
              setShowAlert(true)
              setDeleteAlert(true)
            } 
          }} />
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollStyle}
            keyboardShouldPersistTaps={'handled'}
            showsVerticalScrollIndicator={false}>
            <CommonDropDown
              theme={theme}
              value={title}
              placeHolder={translate("COMMONTEXT")["TITLE"]}
              multiLine={false}
              editable={true}
              isIcon={false}
              placeholderTextColor={theme.SUB_TITLE}
              extraInputStyle={styles.extraInputStyle}
              onChangeText={(text: any) => { setTitle(text) }}
            />
            {/* <CommonTextInput
              value={title}
              placeholder={translate("COMMONTEXT")["TITLE"]}
              multiline={false}
              placeholderTextColor={theme.BLACK}
              onChangeText={(text: any) => { setTitle(text) }}
              extraStyle={[styles.titleInput, styles.commonText, styles.commonShadow]}
            /> */}
            <View style={{marginTop: 10}} />
            <CommonDropDown
              theme={theme}
              // value={formData.DOB}
              value={date == 'Date' ? "Date" : moment(date).format('MMM DD, YYYY')}
              placeHolder={translate("COMMONTEXT")["DATE"]}
              multiLine={false}
              iconName="calendar-today"
              editable={false}
              placeholderTextColor={theme.SUB_TITLE}
              extraInputStyle={styles.extraInputStyle}
              onComponentPress={() => {
                setShowCalender(true)
              }} style={[styles.dateInput,
              styles.commonShadow]
              }
            />
            <View style={{marginTop: 10}} />
            <CommonDropDown
              theme={theme}
              value={category}
              placeHolder={translate("COMMONTEXT")["CATEGORY"]}
              multiLine={false}
              editable={false}
              onChangeText={(value) => { setCateDisplay(!cateDisplay), setIsSelect(1) }}
              placeholderTextColor={theme.SUB_TITLE}
              extraInputStyle={styles.extraInputStyle}
              onComponentPress={() => { setCateDisplay(!cateDisplay) }}
            />
            {cateDisplay && <View style={{ maxHeight: 350, marginTop: 10, width: "100%", backgroundColor: theme.PRIMARY, }}>
              <ScrollView style={{ backgroundColor: "white", maxHeight: 150 }} showsVerticalScrollIndicator={false}>{categoryRenderList()}</ScrollView>
            </View>
            }
            <View style={{marginTop: 10}} />
            <CommonDropDown
              theme={theme}
              value={description}
              placeHolder={translate("MEMORY")["WRITE_MEMORY"]}
              multiLine={false}
              editable={true}
              isIcon={false}
              placeholderTextColor={theme.SUB_TITLE}
              onChangeText={(text: any) => { setDescription(text) }}
              extraInputStyle={styles.extraInputStyle}
            />
            {/* <CommonTextInput
              value={description}
              placeholder={translate("COMMONTEXT")["DESCRIPTION"]}
              placeholderTextColor={theme.BLACK}
              multiline={true}
              onChangeText={(text: any) => { setDescription(text) }}
              extraStyle={[styles.descInput, styles.commonText, styles.commonShadow]}
              onEndEditing={() => { Keyboard.dismiss() }}
            /> */}
            {/* <Pressable onPress={() => { setShowCalender(true) }} style={[styles.dateInput,
            styles.commonShadow]}>
              <Text style={[{ color: theme.BLACK },
              styles.commonText]}>{date == 'Date' ? "Date" :
                moment(date).format('DD-MMM-YYYY')}</Text>
              <Icon name='calendar' size={15} style={{ color: theme.DARK_GRAY }} />
            </Pressable> */}
            <Pressable onPress={() => {
              setisAddPhotoModal(!isAddPhotoModal)
            }} style={[styles.uploadImgButton, styles.commonShadow]}>
              <Upload />
              <Text style={styles.uploadImage}>{translate("MEMORY")["CHOOSE_FILE"]}</Text>
              <Text style={styles.uploadImageDesc}>{translate("MEMORY")["FILE_TYPE2"]}</Text>
            </Pressable>
            {result?.length > 0 && <Text style={styles.uploadFile}>{EditItem != undefined ? "Attachments" :
              'Uploading'}</Text>}
            <View style={styles.extraPadding}>
              {result.map((data, index) => {
                return (
                  <View style={[, styles.renderMainView, {
                    marginTop: 12
                  }]}>
                    <Pressable style={styles.iconStyle}
                      onPress={() => { openFileView(data) }}>{fileIcons(data)}
                      <Pressable style={styles.fileNameView} onPress={() => { openFileView(data) }}>
                        <Text numberOfLines={1}
                          style={styles.renderText}>{data?.name}</Text>
                      </Pressable>
                    </Pressable>
                    <Pressable style={styles.deleteView} onPress={() => {
                      let updateResult = [...result]
                      updateResult.splice(index, 1)
                      setResult(updateResult)
                      if (data?.id != undefined && data?.id != null) { removeData(data) }
                    }}>
                      <Icon name='delete' size={12} style={{ color: theme.PRIMARY }} />
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
          maximumDate={new Date("2100-01-01")}
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
        {/* <View style={styles.buttonView}>
          <Pressable onPress={() => {
            if (date == 'Date') {
              alertFun('Enter your date')
            }
            if (date != 'Date' && date != '') {
              props.navigation.navigate('Zen.Symptoms', { SelectDate: date })
            }
          }} style={[styles.symptomsButton, { marginRight: 5 }]}>
            <Text style={[styles.saveBtn, { color: theme.PAGINATION_SELECCT }]}>{translate("COMMONTEXT")["SYMPTOMS"]}</Text>
          </Pressable>
          <Pressable onPress={() => { submitData() }}
            style={[styles.saveButton, { marginLeft: 5 }]}>
            <Text style={styles.saveBtn}>{translate("COMMONTEXT")["SAVE"]}</Text>
          </Pressable>
        </View> */}
        {isAddPhotoModal &&
          <Modal
            transparent={true}
            onBackdropPress={() => setisAddPhotoModal(false)}
            onBackButtonPress={() => setisAddPhotoModal(false)}
            isVisible={isAddPhotoModal}
            style={styles.addPhotoModalContainer}>
            <View onStartShouldSetResponder={() => { setisAddPhotoModal(false) }} style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.5)',
              justifyContent:'flex-end'
            }}>
              <Pressable style={{
                backgroundColor: theme.PRIMARY, paddingBottom: 30, 
                paddingTop: 40, borderTopLeftRadius: 25,
                borderTopRightRadius: 25,
              }}>
                <Text style={styles.addPhototext} >Add Photos</Text>
                <View style={styles.divederstyle}></View>
                <Pressable style={styles.itemView} onPress={() => openCamera()} >
                  <Text style={styles.cameraGalleryText} >{translate("COMMONTEXT")["CAMERA"]}</Text>
                </Pressable>
                <View style={styles.divederstyle}></View>
                <Pressable style={styles.itemView} onPress={() => {
                //  setisAddPhotoModal(!isAddPhotoModal)
                  //  openGallery()
                  DocumentPicker.pickMultiple().then((data) => documentUpdate(data)).catch(handleError)
                  
                }} >
                  <Text style={styles.cameraGalleryText} >{translate("COMMONTEXT")["GALLERY"]}</Text>
                </Pressable>
                <View style={styles.divederstyle}></View>
                <Pressable style={styles.itemView} onPress={() => {
                  setisAddPhotoModal(!isAddPhotoModal)
                }} >
                  <Text style={styles.cameraGalleryText} >Cancle</Text>
                </Pressable>
              </Pressable>
            </View>
          </Modal>
        }
       </SafeAreaView>
      <Alert
        show={showAlert}
        title={deleteAlert ? 'Delete' : showErrorMsg == 'Success' ? "Success" : "Sorry !"}
        message={deleteAlert ? 'Are you sure you want to Delete' :
          showErrorMsg == 'Success' ? `Your memory has been ${EditItem != undefined ? 'updated' : 'added'} successfully`
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