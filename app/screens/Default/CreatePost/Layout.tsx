import React, { useState, useEffect } from 'react';
import style from './Style';
import { StatusBar, Text, View, Pressable, Image, Keyboard, TextInput, Dimensions, Button, Platform, InputAccessoryView, KeyboardAvoidingView, ImageBackground, FlatList, ScrollView } from 'react-native';
import { withTheme } from '../../../utils/ThemeProvider';
import { shortNameFunc } from '../../../utils/commonFunction';
import { SafeAreaView } from 'react-native-safe-area-context';
import Back from '../../../assets/images/Back.svg'
import CameraSvg from '../../../assets/images/CameraSvg.svg'
import Notes from '../../../assets/images/Notes.svg'
import ImagePicker from 'react-native-image-crop-picker';
import CheckBox from 'react-native-check-box'
import Stage from '../../../components/Stage';
import CancerSearch from '../../../components/Onboarding/CancerSearch';
import GenderSelection from '../../../components/GenderSelection';
import CitySearch from '../../../components/Onboarding/CitySearch';
import CategoryModal from '../../../components/Community/CategoryModal'
import TreatmenFilterModel from '../../../components/Community/TreatmentFilterModal';
import { useSelector } from 'react-redux';
import actionTypes from '../../../store/actions/types';
import FilterModal from '../../../components/Community/FilterModal'
import RulesModal from '../../../components/Community/RulesModal'
import Toast from 'react-native-toast-message';
import Gallery from '../../../assets/images/Gallery.svg'
import ContentLoader from "react-native-easy-content-loader";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { SvgUri } from 'react-native-svg';
import AppHeader from '../../../components/CommonInput/appHeader';
import SelectionTab from '../../../components/CommonInput/selectionTab';
import CommonDropDown from '../../../components/CommonInput/commonDropDown';
import ImageSelection from '../../../components/CommonInput/imageSelection';
import translate from '../../../utils/Text';
import { isIphoneX } from '../../../lib/isIphoneX';
import { LowLightEnhanceOptions } from 'react-native-agora';

interface IProps {
  theme: any;
  actions: any;
  navigation: any;
}
const defaultWidth = Dimensions.get('window').width;

const Layout = (props: IProps) => {
  const theme = props.theme;
  const styles = style(props.theme);
  const [isRulesModalShow, setRulesModalShow] = useState(false);
  const [checked, setChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(undefined);
  const [profileDisplay, setProfileDisplay] = useState(false)
  const [cancerSearchDisplay, setCancerSearchDisplay] = useState(false)
  const [stageDisplay, setStageDisplay] = useState(false)
  const [genderDisplay, setGenderDisplay] = useState(false)
  const [datePickerDisplay, setDatePickerDisplay] = useState(false)
  const [yearDisplay, setYearDisplay] = useState(false)
  const [citySearchDisplay, setCitySearchDisplay] = useState(false)
  const [modalDisplay, setModalDisplay] = useState(false)
  const [years, setYears] = useState([])
  const [filterIndex, setFilterIndex] = useState(0)
  const [profileId, setProfileId] = useState('')
  const [cancetTypeId, setCancerTypeid] = useState('')
  const [cancerStageId, setCancerStageId] = useState('')
  const [cityId, setCityId] = useState('')
  var rulesData = useSelector(state => state.storiesReducer?.RulesData?.length > 0 ? state.storiesReducer?.RulesData[0]?.data : []);
  var postCategory = useSelector(state => state.storiesReducer?.postCategory?.length > 0 ? state.storiesReducer?.postCategory[0]?.data : []);
  var medicalTreatment = useSelector(state => state.onboardingReducer.medicalTreatment);
  var camTreatment = useSelector(state => state.onboardingReducer.camTreatment);
  var healthStatus = useSelector(state => state.onboardingReducer.healthStatuses);
  var tagsData = useSelector(state => state.storiesReducer?.tags?.length > 0 ? state.storiesReducer?.tags[0]?.data : []);
  const user_Data = useSelector((state) => state.onboardingReducer.userDetails);
  // console.log("46r783------", user_Data);
  
  const userId = useSelector((state) => state.loginReducer.userData?.data?.data?.id);
  const [catId, setCatId] = useState(2)
  const [visibleFilter, setVisibleFilter] = useState(false)
  const [category, setCategory] = useState([])
  const [tagVisible, setTagVisible] = useState(false)
  const [tag, setTag] = useState('')
  const [tags, setTags] = useState([])
  const [filterValue, setFilterValue] = useState('Discussion');
  const [catImg, setCatImg] = useState('');
  const [loader, setLoader] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [selectedImageArr, setSelectedImageArr] = useState([]);
  const [titleValue, setTitleValue] = useState('');
  const [postBtnEnable, setPostBtnEnable] = useState(false);
  const [openTabBar, setOpenTabBar] = useState(false);
  const [openTabBarOnFocus, setOpenTabBarOnFocus] = useState(false);
  const richText = React.useRef();
  const inputAccessoryViewID = 'uniqueID';
  const communityCategoryData =
    useSelector((state) => state.storiesReducer?.postCategory?.length > 0 ?
      state.storiesReducer.postCategory[0]?.data : []) || [];

  const [formData, updateFormData] = useState({
    age: '',
    gender: '',
    city: '',
    year1: '',
    year2: '',
    treatment: '',
    camTreatment: '',
    healthStatus: "",
    profile: '',
    cancerType: '',
    stage: '',
    DOB: '',
    treatmentId: '',
    camTreatmentId: '',
    healthStatusId: '',
    title: "",
  })
  const updateProfile = (profileVal: string, profileId: any) => {
    setProfileId(profileId)
    updateFormData({ ...formData, profile: profileVal.name })
  }
  const updateCancerType = (cancerVal: string, cancerId: any, parentId: any) => {
    setCancerTypeid(cancerId)
    updateFormData({ ...formData, cancerType: cancerVal })
  }
  const updateStage = (stageVal: string, stageid: any) => {
    setCancerStageId(stageid)
    updateFormData({ ...formData, stage: stageVal?.cancer_stage })
  }
  const updateGender = (genderVal: string) => {
    updateFormData({ ...formData, gender: genderVal })
  }
  const updateCity = (cityVal: string, cityId: any) => {
    setCityId(cityId)
    updateFormData({ ...formData, city: cityVal })
  }

  useEffect(() => {
    apiCallForGetCategories()
    apiCallForGetCategoriesNew()
    !props.route.params.fromCommunity && apiCallForGetTags()
    getYears()
    fetchMedTreatment()
    fetchCamTreatment()
    fetchHealthStatus()
  }, [])
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  useEffect(() => {
    if (communityCategoryData.length > 0) {
      let filterData = communityCategoryData?.filter(item => item?.name != 'All')
      setCategory(filterData)
      if (filterData?.length > 0) {
        setFilterValue(filterData[0]?.name)
        setCatId(filterData[0]?.id)
        setCatImg(filterData[0]?.image)
        apiCallForGetRules(filterData[0]?.id)
      }
    }
  }, [communityCategoryData])

  useEffect(() => {
    if (tagsData?.length > 0) {
      let arr = []
      tagsData.map(item => {
        arr.push(item.name)
      })
      setTags(arr)
      setTag(tagsData.length > 0 ? tagsData[0].name : '')
    }
  }, [tagsData])

  const apiCallForGetCategories = () => {
    props.actions.getCommunityCategoryListData(actionTypes.GET_COMMUNITY_CATEGORY_LIST_DATA, {
      module: 'post_category',
      action: 'getAll',
      formData: {
        post_subcategory_id: props.route.params.postSubcategoryId != undefined ? props.route.params.postSubcategoryId : 1
      }
    });
  }
  const apiCallForGetTags = () => {
    props.actions.getTags(actionTypes.TAG_DATA, {
      module: 'post_sub_category_tag',
      action: 'getById',
      formData: {
        postSubcategoryId: props.route.params.postSubcategoryId != undefined ? props.route.params.postSubcategoryId : 1
      }
    });
  }

  const apiCallForGetCategoriesNew = () => {
    let obj = {}
    props.actions.getPostCategory(actionTypes.POST_CATEGORY, {
      module: 'post_category',
      action: 'getAll_with_whopost',
      formData: obj
    });
  }

  const getYears = () => {
    let year = 1910
    let currentYr = new Date().getFullYear()
    let allYear = []
    for (let i = 1910; i <= currentYr; i++) {
      allYear.push(i)
    }
    allYear.sort((a, b) => b - a);
    setYears(allYear)
  }
  const fetchMedTreatment = () => {
    var inputRequest = {
      module: 'chj_medical_treatment',
      action: 'getAll',
    };
    props.actions.callSearchCitiesAll(
      actionTypes.MED_TREATMENT_ALL,
      inputRequest,
    );
  }
  const fetchCamTreatment = () => {
    var inputRequest = {
      module: 'chj_cam_treatment',
      action: 'getAll',
    };
    props.actions.callSearchCitiesAll(
      actionTypes.CAM_TREATMENT_ALL,
      inputRequest,
    );
  }
  const fetchHealthStatus = () => {
    var inputRequest = {
      module: 'chj_health_status',
      action: 'getAll',
    };
    props.actions.callSearchCitiesAll(
      actionTypes.HEALTH_STATUS_ALL,
      inputRequest,
    );
  }
  const checkValidation = () => {
    if (filterValue == 'Healing Stories') {
      if (formData.age.length > 0 && formData.gender.length > 0 && formData.city.length > 0 && formData.year1.toString().length > 0
        && formData.year2.toString().length > 0 && formData.treatment.length > 0 && formData.camTreatment.length > 0 && formData.healthStatus.length > 0) {
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }

  const InputView = () => {
    return (
      <View style={{ alignItems: "flex-end", paddingRight: 10, backgroundColor: "white" }}>
        <Button
          onPress={() => Keyboard.dismiss()}
          title="Done"
        />
      </View>
    )
  }

  const onPressPost = () => {
    if (formData.title != '') {
      if (checkValidation()) {
        let filter = tagsData?.filter(item => item.name == tag)
        const formDataNew = new FormData();
        formDataNew.append('post_category_name', filterValue);
        formDataNew.append('userId', userId);
        formDataNew.append('author', userId);
        formDataNew.append('postCategoryId', props?.route?.params?.isfromHome ? 5 : catId);
        if (!props.route.params.fromCommunity) {
          formDataNew.append('postSubcategoryId', props.route.params.postSubcategoryId != undefined ? props.route.params.postSubcategoryId : 1);
        }
        formDataNew.append('title', titleValue);
        formDataNew.append('content', formData.title.toString());
        formDataNew.append('publish_date', new Date());
        formDataNew.append('profile', '1');
        formDataNew.append('cancerStageHighest', '1');
        formDataNew.append('ageWhenWiagnosed', formData.age);
        formDataNew.append('gender', formData.gender);
        formDataNew.append("options", '1');
        formDataNew.append("yearOfDiagnosis", formData.year1);
        formDataNew.append("inRemissionSince", formData.year2);
        formDataNew.append("medicalTreatment", formData.treatment);
        formDataNew.append("camTreatmentTaken", formData.camTreatment);
        formDataNew.append("currentHealthStatus", formData.healthStatus);
        formDataNew.append("anonymous_flag", checked ? 1 : 0);

        if (selectedImageArr.length > 0) {
          selectedImageArr.map(item => {
            formDataNew.append('image', { uri: item?.path, name: 'image.jpg', type: 'image/jpeg' });
          })
        }
        setLoader(true);
        var inputRequest = {
          module: "cancerHealingStory",
          action: "create",
          formData: formDataNew
        }

        let newArr = [{
          userId: userId,
          userImage: user_Data?.data?.image == null ? require('../../../assets/images/profileImage.png') : { uri: user_Data?.data?.image },
          userName: user_Data?.data?.name,
          userCancerCategory: user_Data?.cancer_category?.name,
          userCancerStage: user_Data?.cancer_stage?.cancer_stage,
          userProfileName: user_Data?.user_profile?.name,
          content: formData.title,
          anonymous_flag: checked ? 1 : 0,
          filterValue: filterValue,
          createdAt: new Date(),
          image: { uri: selectedImage?.path, name: 'image.jpg', type: 'image/jpeg' }
        }];

        props.route.params.fromCommunity && props.route.params.setDummyDataArr(newArr)
        props.route.params.fromCommunity && props.route.params.setDummyCatId(catId)

        props.actions.createPost(actionTypes.CREATE_POST, inputRequest);

        setTimeout(() => {
          apiCallForGetCategories()
          props.route.params.fromCommunity && props.route.params?.updateData()
          props.route.params.isfromHome && props.route.params?.updateData()
          props.navigation.goBack()
          setLoader(false);
        }, 2500)
      } else {
        Toast.show({
          type: 'error',
          text1: 'Oops',
          text2: 'Please fill up all details'
        });
      }
    } else {
      setLoader(false);
      Toast.show({
        type: 'error',
        text1: 'Oops',
        text2: 'Please Add Title'
      });
    }
  }

  const handleCategorySelection = (item) => {
    setCatId(item.id)
    setFilterValue(item.name)
    setReloadPage(!reloadPage)
  }

  //Helper Methods
  const apiCallForGetRules = (id) => {
    var inputRequest = {
      module: 'post_subcategory',
      action: 'get_rules_by_ids',
      formData: {
        cat_id: id
      },
    };
    props.actions.getRules(
      actionTypes.RULES_ALL,
      inputRequest,
    );
  }
  const openGallery = () => {
    ImagePicker.openPicker({
      multiple: true,
      maxFiles: (20),
      compressImageMaxWidth: 1080,
      compressImageMaxHeight: 1080,
      cropping: false,
      mediaType: 'photo'
    }).then((image) => {
      if ((selectedImageArr.length + image.length) > 20) {
        Toast.show({
          type: 'error',
          text1: 'Oops',
          text2: "Please select only up to 20 images",
        })
      } else {
        console.log("1234", image)
        setSelectedImageArr([...selectedImageArr, ...image])        
      }
      setReloadPage(!reloadPage)
    })
    .catch(er => {
      console.log("46646-----", er, "-----", er.code);
      
      if(er.code === 'E_PICKER_CANCELLED'){
        return false;
      }
    })
  }
  const openCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 1080,
      compressImageMaxHeight: 1080,
      cropping: false,
    }).then(image => {
      if ((selectedImageArr.length + 1) > 20) {
        Toast.show({
          type: 'error',
          text1: 'Oops',
          text2: "Please select only up to 20 images",
        })
      } else {
        setSelectedImageArr([...selectedImageArr, image])
        setReloadPage(!reloadPage)
      }
    });
  }
  const mediaView = () => {
    return (
      <View style={styles.mediaView}>
        <Pressable style={{paddingHorizontal:8}} onPress={() => openCamera()}>
          <CameraSvg width={29} height={25} />
        </Pressable>
        <Pressable style={{paddingHorizontal:8}} onPress={() => openGallery()}>
          <Gallery width={28} height={25} />
        </Pressable>
        {/* <Image source={require('../../../assets/images/camera.png')} style={{ height: 32, width: 22, resizeMode: "contain" }} /> */}
        {props?.route?.params?.isfromHome == undefined &&
          <Pressable style={{paddingHorizontal:8}} onPress={() => {
            setOpenTabBar(category.length > 0 ? !openTabBar : false);
            setOpenTabBarOnFocus(category.length > 0 ? !openTabBarOnFocus : false);
          }}>
            <Notes width={22} height={24} />
          </Pressable>
        }
        <View style={{ flexDirection: 'row', alignItems: "center" }}>
          <CheckBox
            onClick={() => setChecked(!checked)}
            isChecked={checked}
            checkBoxColor={theme.GRAY_BLACK}
          />
          <Text style={styles.anonymousText}>Anonymous</Text>
        </View>
      </View>
    )
  }

  const showTabBar = () => {
    return (
      <View style={styles.selectionTabView}>
        <SelectionTab
          theme={theme}
          data={category}
          catId={catId}
          handleCategorySelection={(item) => handleCategorySelection(item)}
        />
      </View>
    )
  }  

  return (
    <SafeAreaView style={styles.container}>
      <ContentLoader
        containerStyles={{ marginTop: 50 }}
        loading={loader}
        avatar
        pRows={7}
        pHeight={[200, 50, 100, 50, 50]}
        pWidth={[defaultWidth - 100, defaultWidth - 100, defaultWidth - 100, defaultWidth - 100, defaultWidth - 100]}
      />
      <StatusBar barStyle='dark-content' backgroundColor={theme.SELECTED} />
      {!loader &&
        <>
          <AppHeader
            theme={theme}
            onBackPress={() => props.navigation.goBack()}
            headerTitle={translate("COMMONTEXT")["SHARE_YOUR_THOUGHTS"]}
            isRightComponent={true}
            isButton={true}
            postBtnEnable={postBtnEnable}
            disabled={true}
            onPressButton={() => onPressPost()}
            ButtonText={translate("CREATE_POST").Post}
          />
          <KeyboardAvoidingView style={{ flex: 1 }} >
            <View style={styles.userImgView}>
              <Image style={styles.profileImage} source={user_Data?.data?.image == null ? require('../../../assets/images/profileImage.png') : { uri: user_Data?.data?.image }} />
              <View style={{ marginHorizontal: 7, }}>
                <Text style={styles.headerText} numberOfLines={1}>{user_Data?.data?.name}</Text>
                <Text style={styles.disText} numberOfLines={1}>
                  {/* {user_Data?.cancer_category?.name} - {user_Data?.cancer_stage?.cancer_stage} */}
                  {shortNameFunc(user_Data)}
                </Text>
                <Text style={styles.disText} numberOfLines={1}>{user_Data?.user_profile?.name}</Text>
              </View>
            </View>

            <View style={{ marginHorizontal: 0 }}>
              {filterValue == 'Cancer Blogs' && (
                <View style={[styles.titleView]} >
                  <TextInput
                    value={titleValue}
                    autoFocus={true}
                    placeholder={translate("COMMONTEXT")["TITLE"]}
                    placeholderTextColor="#999999"
                    inputAccessoryViewID={inputAccessoryViewID}
                    style={[styles.postText, { textAlignVertical: 'center'}]}
                    onChangeText={(text) => {
                      setTitleValue(text);
                    }}
                  />
                  {Platform.OS == 'ios' &&
                    <InputAccessoryView nativeID={inputAccessoryViewID}>
                      <InputView />
                    </InputAccessoryView>
                  }
                </View>
              )}

              <View style={[styles.postVw]} >
                {filterValue != 'Cancer Blogs' ?
                  <>
                    <TextInput value={formData.title}
                    autoFocus
                      placeholder={(translate("COMMONTEXT")["SHARE_YOUR_THOUGHTS_HERE"])}
                      placeholderTextColor={styles.placeholderText}
                      inputAccessoryViewID={inputAccessoryViewID}
                      style={[styles.postText, { height: filterValue == 'Healing Stories' ? 150 : selectedImageArr.length > 0 ? Platform.OS == 'ios' ? isIphoneX() ? 350 : 250 : 240: '100%', paddingHorizontal: 10}]}
                      multiline={true}
                      onChangeText={(text: any) => {
                        setPostBtnEnable(true);
                        updateFormData({ ...formData, title: text })
                      }}
                    />

                    {Platform.OS == 'ios' &&
                      <InputAccessoryView nativeID={inputAccessoryViewID}>
                        {openTabBarOnFocus &&
                          <>
                            {showTabBar()}
                          </>
                        }
                        {mediaView()}
                        <InputView />
                      </InputAccessoryView>
                    }
                  </>
                  :
                  <>
                    <View style={{ borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#dbdbdb' }}>
                      <RichToolbar
                        editor={richText}
                        iconMap={{ [actions.heading]: ({ tintColor }) => (<Text style={[{ color: tintColor, fontSize: 20, fontWeight: "600" }]}>H</Text>), }}
                        actions={[actions.heading, actions.setBold, actions.setItalic, actions.setUnderline, actions.insertOrderedList, actions.insertBulletsList, actions.insertLink]}
                      />
                    </View>
                    <RichEditor
                      ref={richText}
                      value={formData.title}
                      multiline={true}
                      initialHeight={140}
                      autoFocus
                      placeholderTextColor={styles.placeholderText}
                      editorStyle={{
                        contentCSSText: 'font-size: 14px; font-family: Poppins-Regular, color:#333333'
                      }}
                      style={[styles.postText, { height: filterValue == 'Healing Stories' ? 150 : 170, marginTop: 5 }]}
                      placeholder={translate("COMMONTEXT")["SHARE_YOUR_THOUGHTS_HERE"]}
                      onChange={descriptionText => {
                        setPostBtnEnable(true);
                        updateFormData({ ...formData, title: descriptionText })
                      }}
                    />
                  </>
                }
              </View>
                               

              {!filterValue == 'Cancer Blogs' &&
                <Pressable style={[styles.photoVideoButton, { marginTop: 10 }]} onPress={() => openGallery()}>
                  <View style={styles.photoVideoView}>
                    {/* <Image style={styles.albumImg} source={require("../../../assets/images/gallery.png")} /> */}
                    <Gallery width={24} height={21} />
                    <View style={{ marginHorizontal: 15 }}>
                      <Text style={styles.albumText} numberOfLines={1}>{translate("CREATE_POST")["Photo/Video"]}</Text>
                      {/* <Text style={styles.albumDesText} numberOfLines={1}>{translate("CREATE_POST")["JPG/PNG/MP4"]} </Text> */}
                    </View>
                    <Back width={7} height={12} style={{ right: 0, transform: [{ rotateY: '180deg' }], position: 'absolute' }} />
                  </View>
                </Pressable>
              }
              {!filterValue == 'Cancer Blogs' &&
                <Pressable style={styles.photoVideoButton} onPress={() => setVisibleFilter(true)}>
                  <View style={styles.photoVideoView}>
                    <View style={{ height: 20, width: 20, alignItems: 'center', justifyContent: 'center' }}>
                      <SvgUri
                        width="80%"
                        height="80%"
                        color='#000'
                        uri={catImg}
                      />
                    </View>
                    <View style={{ marginHorizontal: 15 }}>
                      <Text style={styles.albumText} numberOfLines={1}>{filterValue}</Text>
                    </View>
                    <Back width={7} height={12} style={{ right: 0, transform: [{ rotateY: '180deg' }], position: 'absolute' }} />
                  </View>
                </Pressable>
              }

              {/* {!props.route.params.fromCommunity &&
          <Pressable style={styles.photoVideoButton} onPress={() => setTagVisible(true)}>
            <View style={styles.photoVideoView}>
              <View style={{ marginHorizontal: 15 }}>
                <Text style={styles.albumText} numberOfLines={1}>{tag}</Text>
              </View>
              <Back width={7} height={12} style={{ right: 0, transform: [{ rotateY: '180deg' }], position: 'absolute' }} />
            </View>
          </Pressable>} */}

            </View>

            {filterValue == 'Healing Stories' &&
              <View>
                <CommonDropDown
                  theme={theme}
                  value={formData.age}
                  placeHolder={translate("FILTER")["AGE_DIAGNOSED"]}
                  multiLine={false}
                  editable={true}
                  // isErrowShow={showError && formData?.age.length == 0 ? true : false}
                  onChangeText={(age: string) => {
                    updateFormData({ ...formData, age: age })
                  }}
                />

                <CommonDropDown
                  theme={theme}
                  value={formData.gender}
                  placeHolder={translate("FILTER")["GENDER"]}
                  multiLine={true}
                  editable={false}
                  // isErrowShow={showError && formData?.gender.length == 0 ? true : false}
                  onComponentPress={() => {
                    setGenderDisplay(!genderDisplay)
                  }}
                />
                {genderDisplay &&
                  <GenderSelection selected={formData.gender} updateGender={updateGender} modalDisplay={genderDisplay} setModalDisplay={setGenderDisplay} theme={theme} />
                }

                <CommonDropDown
                  theme={theme}
                  value={formData.city}
                  placeHolder={translate("FILTER")["LOCATION"]}
                  multiLine={true}
                  editable={false}
                  // isErrowShow={showError && formData?.gender.length == 0 ? true : false}
                  onComponentPress={() => {
                    setCitySearchDisplay(true)
                  }}
                />
                {citySearchDisplay &&
                  <CitySearch selectedId={cityId} actions={props.actions} updateCity={updateCity} modalDisplay={citySearchDisplay} setModalDisplay={setCitySearchDisplay} theme={theme} />
                }

                <CommonDropDown
                  theme={theme}
                  value={formData.year2.toString()}
                  placeHolder={translate("FILTER")["YEAR_REMISSION"]}
                  multiLine={true}
                  editable={false}
                  // isErrowShow={showError && formData?.gender.length == 0 ? true : false}
                  onComponentPress={() => {
                    setYearDisplay(true)
                  }}
                />

                <CommonDropDown
                  theme={theme}
                  value={formData.year1.toString()}
                  placeHolder={translate("FILTER")["YEAR_DIAGNOSED"]}
                  multiLine={true}
                  editable={false}
                  // isErrowShow={showError && formData?.gender.length == 0 ? true : false}
                  onComponentPress={() => {
                    setDatePickerDisplay(true)
                  }}
                />

                <CommonDropDown
                  theme={theme}
                  value={formData.treatment}
                  placeHolder={translate("FILTER")["MEDICAL_TREATMENT"]}
                  multiLine={true}
                  editable={false}
                  // isErrowShow={showError && formData?.gender.length == 0 ? true : false}
                  onComponentPress={() => {
                    setFilterIndex(0)
                    setModalDisplay(true)
                  }}
                />

                <CommonDropDown
                  theme={theme}
                  value={formData.camTreatment}
                  placeHolder={translate("FILTER")["CAM_TREATMENT"]}
                  multiLine={true}
                  editable={false}
                  // isErrowShow={showError && formData?.gender.length == 0 ? true : false}
                  onComponentPress={() => {
                    setFilterIndex(1)
                    setModalDisplay(true)
                  }}
                />

                <CommonDropDown
                  theme={theme}
                  value={formData.healthStatus}
                  placeHolder={translate("FILTER")["HEALTH_STATUS"]}
                  multiLine={true}
                  editable={false}
                  // isErrowShow={showError && formData?.gender.length == 0 ? true : false}
                  onComponentPress={() => {
                    setFilterIndex(2)
                    setModalDisplay(true)
                  }}
                />
              </View>
            }
            {/* <Pressable style={{paddingHorizontal:30}} onPress={() => { setProfileDisplay(true) }}>
          <TextField
            // label={translate("FILTER")["PROFILE"]}
            placeholder={translate("FILTER")["PROFILE"]}
             placeholderTextColor={theme.GRAY_BLACK}
            labelHeight={0}
            disabled={false}
            lineWidth={1}
            fontSize={14}
            value={formData.profile}
            iconName={"keyboard-arrow-down"}
            iconType={"MaterialIcons"}
            // labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
            titleTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
            affixTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
            iconStyle={[{ position: "absolute", top: 10, right: 0, color: theme.GRAY_BLACK }]}
            textColor={theme.GRAY_BLACK}
            baseColor={theme.GRAY_BLACK}
            tintColor={theme.SILVER}
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false}
            containerStyle={styles.txtContainer}

          />
        </Pressable> */}
            {/* <Pressable style={{paddingHorizontal:20}} onPress={() => { setCancerSearchDisplay(true) }}>
          <TextField
            // label={translate("FILTER")["CANCER_TYPE"]}
            placeholder={translate("FILTER")["CANCER_TYPE"]}
             placeholderTextColor={theme.GRAY_BLACK}
            labelHeight={0}
            disabled={false}
            lineWidth={1}
            fontSize={14}
            value={formData.cancerType}
            iconName={"keyboard-arrow-down"}
            iconType={"MaterialIcons"}
            // labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
            titleTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
            affixTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
            iconStyle={[{ position: "absolute", top: 10, right: 0, color: theme.GRAY_BLACK }]}
            textColor={theme.GRAY_BLACK}
            baseColor={theme.GRAY_BLACK}
            tintColor={theme.SILVER}
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false}
            containerStyle={styles.txtContainer}

          />
        </Pressable> */}
            {/* <Pressable style={{paddingHorizontal:20}} onPress={() => { setStageDisplay(true) }}>
          <TextField
            // label={translate("FILTER")["CANCER_STAGE"]}
            placeholder={translate("FILTER")["CANCER_STAGE"]}
             placeholderTextColor={theme.GRAY_BLACK}
            labelHeight={0}
            disabled={false}
            lineWidth={1}
            fontSize={14}
            value={formData.stage}
            iconName={"keyboard-arrow-down"}
            iconType={"MaterialIcons"}
            // labelTextStyle={{ fontFamily: FONTFAMILY.MEDIUM, marginLeft: '-15%', marginRight: '15%' }}
            titleTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
            affixTextStyle={{ fontFamily: FONTFAMILY.POPPINS_REGULAR }}
            iconStyle={[{ position: "absolute", top: 10, right: 0, color: theme.GRAY_BLACK }]}
            textColor={theme.GRAY_BLACK}
            baseColor={theme.GRAY_BLACK}
            tintColor={theme.SILVER}
            returnKeyType="next"
            blurOnSubmit={false}
            editable={false}
            containerStyle={styles.txtContainer}

          />
        </Pressable> */}

            {!filterValue == 'Cancer Blogs' &&
              <View style={{ flexDirection: 'row', paddingVertical: 20, alignItems: 'center', paddingHorizontal: 20 }}>
                <CheckBox
                  style={{ width: '50%' }}
                  onClick={() => setChecked(!checked)}
                  isChecked={checked}
                  rightText={translate("CREATE_POST")["Anonymous"]}
                  rightTextStyle={styles.disText}
                  checkBoxColor={theme.GRAY_BLACK}
                />
                {!props.route.params.fromCommunity &&
                  <Pressable style={{ position: 'absolute', right: 30 }}
                    onPress={() => setRulesModalShow(true)}

                  >
                    <Text style={styles.ruleTxt}>{translate("COMMONTEXT")["RULES"]}</Text>
                  </Pressable>
                }
              </View>
            }
            {!filterValue == 'Cancer Blogs' &&
              <Pressable style={styles.postButton} onPress={() => onPressPost()}>
                <Text style={styles.post}>{translate("CREATE_POST")["Post"]}</Text>
              </Pressable>
            }
            {selectedImageArr.length > 0 &&
                <View style={{marginBottom:0, height:(defaultWidth/3)*2}}>
                  <FlatList
                    data={selectedImageArr}
                      showsVerticalScrollIndicator={false}
                      numColumns={3}
                      nestedScrollEnabled={true}
                      style={{ marginBottom:0}}
                      renderItem={({ item, index }) => {
                        
                        return (
                          <>
                            {item?.mime === "image/jpeg" ?
                              <ImageSelection
                                item={item}
                                onPress={() => {
                                  selectedImageArr.splice(selectedImageArr.indexOf(item), 1);
                                  setSelectedImageArr(selectedImageArr);
                                  setReloadPage(!reloadPage);
                                }}
                                theme={theme}
                              />
                              :
                              <Image source={{ uri: item?.thumbnail }} style={styles.selectedImage} />
                            }
                          </>
                        );
                      }}
                    />
                </View>
              } 
          </KeyboardAvoidingView>
        </>
      }



      {openTabBar &&
        <>
          {showTabBar()}
        </>
      }

      {mediaView()}

      {
        isRulesModalShow &&
        <RulesModal
          theme={theme}
          isRulesModalShow={isRulesModalShow}
          setRulesModalShow={setRulesModalShow}
          rulesData={rulesData}
        />
      }
      {profileDisplay &&
        <Stage selectedId={profileId} profile={true} actions={props.actions} updateStage={updateProfile} modalDisplay={profileDisplay} setModalDisplay={setProfileDisplay} theme={theme} />
      }
      {cancerSearchDisplay &&
        <CancerSearch selectedId={cancetTypeId} actions={props.actions} updateCancerType={updateCancerType} modalDisplay={cancerSearchDisplay} setModalDisplay={setCancerSearchDisplay} theme={theme} />
      }
      {stageDisplay &&
        <Stage selectedId={cancerStageId} profile={false} actions={props.actions} updateStage={updateStage} modalDisplay={stageDisplay} setModalDisplay={setStageDisplay} theme={theme} />
      }


      <CategoryModal
        selected={formData.year1}
        data={years}
        onSelect={(text) => {
          updateFormData({ ...formData, year1: text })
        }}
        modalDisplay={datePickerDisplay}
        setModalDisplay={setDatePickerDisplay}
        theme={theme} />

      <CategoryModal
        selected={formData.year2}
        data={years}
        onSelect={(text) => { updateFormData({ ...formData, year2: text }) }}
        modalDisplay={yearDisplay}
        setModalDisplay={setYearDisplay}
        theme={theme} />

      <TreatmenFilterModel
        selected={filterIndex == 0 ? formData.treatment : filterIndex == 1 ? formData.camTreatment : formData.healthStatus} data={filterIndex == 0 ?
          medicalTreatment?.data : filterIndex == 1 ? camTreatment?.data : healthStatus?.data}
        onSelect={(item) => {
          if (filterIndex == 0) {
            updateFormData({ ...formData, treatment: item.name, treatmentId: item.id })
          } else if (filterIndex == 1) {
            updateFormData({ ...formData, camTreatment: item.name, camTreatmentId: item.id })
          } else {
            updateFormData({ ...formData, healthStatus: item.name, healthStatusId: item.id })
          }
        }}
        modalDisplay={modalDisplay} setModalDisplay={setModalDisplay} theme={theme} />

      <FilterModal selected={catId} data={category} onSelect={(item) => {
        setCatId(item.id)
        setFilterValue(item.name)
        setCatImg(item.image)
      }}
        modalDisplay={visibleFilter} setModalDisplay={setVisibleFilter} theme={theme} />

      <CategoryModal selected={tag?.name} data={tags} onSelect={(name) => {
        setTag(name)
      }}
        modalDisplay={tagVisible} setModalDisplay={setTagVisible} theme={theme} />

    </SafeAreaView>
  );
};
export default withTheme(Layout);