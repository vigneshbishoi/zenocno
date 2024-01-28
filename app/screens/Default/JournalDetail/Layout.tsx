/**
 * Community Component
 * @Author: Astha
 * @Date: Wed April 14 2022 17:35:26 GMT+0530 (India Standard Time)
 * @Desc: Sisplay Benifits
 */
 import React, { useState, useEffect, useCallback, useReducer, useRef } from 'react';
 import style from './Style';
 import {
   View,
   Image,
   SafeAreaView,
   StatusBar,
   FlatList,
   Pressable,
   Text,
   Dimensions,
   ImageBackground,
   Modal,
   ScrollView
 } from 'react-native';
 import { withTheme, _changeTranslations } from '../../../utils/ThemeProvider';
 import translate from "../../../utils/Text"
 import AntDesign from 'react-native-vector-icons/AntDesign'
 import { FONTFAMILY } from '../../../config/font-config';
 import { useSelector } from 'react-redux';
 import actionTypes from '../../../store/actions/types';
 import moment from 'moment';
 import { useIsFocused, useNavigation } from '@react-navigation/native';
 import PDF from '../../../assets/images/pdf.svg'
 import JPG from '../../../assets/images/jpg.svg'
 import DOC from '../../../assets/images/doc.svg'
 import XLS from '../../../assets/images/xls.svg'
 import PLUS from '../../../assets/images/AddBlack.svg'
 import EDIT from '../../../assets/images/memoryEdit.svg'
 import Edit from '../../../assets/images/non-Edit.svg'
 import RNFS from "react-native-fs";
 import FileViewer from "react-native-file-viewer";
 import request from '../../../services/client';
 import FastImage from 'react-native-fast-image'
 import Alert from "../../../components/AlertScreen/Index"
 import { scale } from 'react-native-size-matters';
 import LinearGradient from 'react-native-linear-gradient';
 import Support from '../../../assets/images/support.svg';
 import Support1 from '../../../assets/images/support_unselected_white.svg';
import Back from '../../../assets/images/backWhite.svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const height = Dimensions.get('window').height;
const widht = Dimensions.get('window').width;

 interface IProps {
   theme: any;
   navigation: any;
   actions: any
   data: any
 }
 const Layout = (props: IProps) => {
   const styles = style(props.theme);
   const theme = props.theme
   const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
   const userName = useSelector(state => state.loginReducer.userData)
   const journalItem = useSelector((state) => state.journalReducer);
   const format = 'MMM YYYY'
   const [date, updateDate] = useState(moment(new Date()).format(format))
   const [loader, setLoader] = useState(false)
   const Focused = useIsFocused()
   const [optionModal, setOptionModal] = useState(false)
   const [selectOption, setSelectOption] = useState({})
   const [optionHeight, setOptionHeight] = useState(0)
   const [showAllImages, setShowAllImages] = useState(false)
   const [deleteAlert, setDeleteAlert] = useState(false)
   const [showAlert, setShowAlert] = useState(false)
   const ScrollRef = useRef()
   const navigation = useNavigation()
   const item = props?.route?.params?.EditItem
   const insets = useSafeAreaInsets();
 
   const EditItem = (renderItem: any) => {
     props.navigation.navigate('Zen.AddMemory', { EditItem: renderItem })
    //  props.navigation.navigate('Zen.JournalDetail', { EditItem: renderItem })
   }

   useEffect(() => {
    if (Focused) {
      apiCall()
    }
  }, [Focused]);

   //api call
   const apiCall = () => {
    props.actions.getJournalItem(actionTypes.GET_JOURNAL_ITEM, {
      module: 'journal_user',
      action: `getById?id=${item.id}`,
      formData: {}
    });
  }
 
   const fileIcons = (data, extraStyle = {}) => {
     let updateName = data?.image?.toLowerCase();
     return (
       <View style={[styles.itemImages,extraStyle]}>
         {updateName?.includes('pdf') ?
           <PDF width="100%" height="100%" /> :
           (updateName?.includes('jpg') || updateName?.includes('png') || updateName?.includes('heic') ||
             updateName?.includes('heif') || updateName?.includes('jpeg') || updateName?.includes('gif')) ?
             <FastImage
               style={[styles.itemImages,extraStyle]}
               source={{
                 uri: data?.image,
                 priority: FastImage.priority.normal,
               }}
               resizeMode={FastImage.resizeMode.cover}
             /> :
             (updateName?.includes('msword') || updateName?.includes('doc'))
               ? <DOC width="100%" height="100%" /> :
               (updateName?.includes('ms-excel') || updateName?.includes('xls')) ?
                 <XLS width="100%" height="100%" /> :
                 <JPG width="100%" height="100%" />}
       </View>
     )
   }
 
   const DeleteItem = async () => {
     try {
       setLoader(true)
       const deleteApiCall = await request({
         method: 'delete', data: {
           module: 'journal_user',
           action: `remove_all_usr_journal_details?id=${item?.id}`,
           formData: {},
         },
         isFormData: true
       });
       navigation.goBack()
       setLoader(false)
     } catch (error) {
       console.log(error, 'Error');
       setLoader(false)
     }
   }

   const openFileView = (data) => {
    setLoader(true)
    const url = data?.image

    function getUrlExtension(url) {
      return url.split(/[#?]/)[0].split(".").pop().trim();
    }
    const extension = getUrlExtension(url);
    const localFile = `${RNFS.DocumentDirectoryPath}/temporaryfile.${extension}`;

    const options = {
      fromUrl: url,
      toFile: localFile,
    };
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
  }

   const renderImageItem = (data: any, index: any) => (
    <Pressable style={{ backgroundColor: "white", marginRight: 6, borderRadius: 6 }}
      onPress={() => { openFileView(data) }}>
      {showAllImages == true ? fileIcons(data) :
        index < 4 ? fileIcons(data) :
          index == 4 ? <>
            {item?.journal_images?.length == 5 ? <View
              style={styles.alingCenter}>
              {fileIcons(data)}
            </View> : <Pressable onPress={() => {
              setShowAllImages(true)
            }}
              style={[styles.alingCenter]}>
              {fileIcons(data)}
              <View style={{position:'absolute', backgroundColor: 'rgba(0,0,0,0.3)' , width:'100%', height:'100%', borderRadius:10}} />
              <Text style={[styles.dayText, { position: 'absolute', }]}>
                +{item?.journal_images?.length - 5}</Text>
            </Pressable>}
          </> : null}
    </Pressable>
  );
 
   return (
    console.log('journalItemjournalItem', journalItem),
    
     <SafeAreaView style={{ flex: 1, backgroundColor: theme.PRIMARY }}>
       <StatusBar barStyle='dark-content' backgroundColor={theme.PRIMARY} />
       <Pressable onPress={() => { navigation.goBack()}} 
          style={[styles.backView,{top: insets.top + 15}]}>
            <Back width={9} height={15} color={'white'} />
        </Pressable>
        <Pressable onPress={() => { }} 
          style={[styles.heartView,{top: insets.top + 15}]}>
        <Support width={21} height={18} />
        </Pressable>
       <View style={styles.container}>
        <ScrollView style={{ backgroundColor: theme.PRIMARY }} showsVerticalScrollIndicator={false} >
          {item.journal_images != null && item.journal_images != undefined && item.journal_images?.length > 0 ?
              fileIcons(item.journal_images[0], [styles.authorImage,{borderRadius : 0}]) : 
              <LinearGradient colors={['#0087C4', '#00DFE7', '#0040C8']} start={{ x: 0.7, y: 0 }} 
                style={styles.authorImage}></LinearGradient>}
            <View style={{marginTop: 10, paddingLeft: 15}}>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                decelerationRate="fast"
                style={{ flexWrap: 'wrap' }}
                >
                  {item?.journal_images?.map((item, index) => {
                    return renderImageItem(item, index)
                  })}
              </ScrollView>
            </View>
            <View style={styles.titleView}>
              <View>
                <Text style={styles.titleText}>{item.title}</Text>
                <View style={{flexDirection:'row', alignItems:'center', marginTop: 2}}>
                  <Text style={styles.dateTextItem}>{moment(item.date).format('MMM DD, YYYY')}  </Text>
                  <View style={[styles.dots,{marginBottom: 0, backgroundColor: theme.SUB_TITLE}]} />
                  <Text style={styles.dateTextItem}>  Category</Text>
                </View>
              </View>
              <Pressable onPress={(event) => {
                let screenHeight = Dimensions.get('screen').height
                setOptionModal(true)
                setOptionHeight((screenHeight - event.nativeEvent.pageY > 180 ?
                  event.nativeEvent.pageY : event.nativeEvent.pageY - 100))
                    // setSelectOption(renderItem)
                  }} style={[styles.dotsView,{}]}>
                  <View style={styles.dots} />
                  <View style={styles.dots} />
                  <View style={styles.dots} />
              </Pressable>
            </View>
            <Text style={styles.decText}>{item.description}</Text>
        </ScrollView>
       </View>
       {/* Option Modal */}
       <Modal
         transparent={true}
         visible={optionModal}
         onRequestClose={() => {
         }}
       >
         <Pressable style={{ flex: 1 }}
           onPress={() => { setOptionModal(false) }}>
           <View style={[styles.optionView, { top: optionHeight - 5 }]}>
             <Pressable style={styles.optionButton} onPress={() => {
               setOptionModal(false)
               setTimeout(() => {
                 EditItem(item)
               }, 100);
             }}>
               <AntDesign name={"edit"} color={theme.DARK_GRAY} size={18} />
               <Text style={styles.optionText}>{translate("COMMONTEXT")["EDIT"]}</Text>
             </Pressable>
             <Pressable style={[styles.optionButton, { marginBottom: 0 }]} onPress={() => {
               setOptionModal(false)
               setShowAlert(true)
               setDeleteAlert(true)
             }}>
               <AntDesign name={"delete"} color={theme.DARK_GRAY} size={18} />
               <Text style={styles.optionText}>{translate("COMMONTEXT")["DELETE"]}</Text>
             </Pressable>
           </View>
         </Pressable>
       </Modal>
       <Alert
         show={showAlert}
         title={deleteAlert ? 'Delete' : "Sorry !"}
         message={deleteAlert ? 'Are you sure you want to Delete' : ''}
         closeOnTouchOutside={{ val: true, setShowAlert: setShowAlert }}
         closeOnHardwareBackPress={true}
         showConfirmButton={true}
         confirmText={"Ok"}
         cancelText={"Cancel"}
         showCancelButton={deleteAlert}
         onConfirmPressed={() => {
           setShowAlert(false)
           if (deleteAlert) {
             DeleteItem()
             setDeleteAlert(false)
           }
         }}
         cancelButtonStyle={{ marginRight: scale(5) }}
         confirmButtonStyle={{ marginLeft: scale(5) }}
         onCancelPressed={() => {
           setShowAlert(false)
           setDeleteAlert(false)
         }}
       />
     </SafeAreaView>
   );
 };
 export default withTheme(Layout);