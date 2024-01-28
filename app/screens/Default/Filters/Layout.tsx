/**
 * Filters layout page
 * @Author: Anand R
 * @Date: Thu Sep 22 2022 16:54:49 GMT+0530 (India Standard Time)
 * @Desc: View part for component
 */
 import React, { useState } from 'react';
 import style from './Style';
 import { View, FlatList, Pressable } from 'react-native';
 import { withTheme } from '../../../utils/ThemeProvider';
 import Text from '../../../components/CustomText';
 import { SafeAreaView } from 'react-native-safe-area-context';
 import AppHeader from '../../../components/CommonInput/appHeader';
 import translate from '../../../utils/Text'
 import RadioSelect from '../../../assets/images/radio_Select.svg'
 import CheckboxSelected from '../../../assets/images/checkboxSelected.svg'
 import UnselectedCheckbox from '../../../assets/images/unselectedCheckbox.svg'
 import UnselectedRadio from '../../../assets/images/unselectedRadio.svg'
 
 interface IProps {
   theme: any;
 }
 
 const FILTER_DATA = [
   {
     title: "Price",
     isMultiSelect: false,
     data: [
       {
         label: 'Online',
         value: 'online',
         hasSelected:false
       },
       {
         label: 'Offline',
         value: 'offline',
         hasSelected:true
       },
     ]
   },
   {
     title: "Brand",
     isMultiSelect: true,
     data: [
       {
         label: 'Sample Brand Name',
         value: 'sampleBrandName',
         hasSelected:false
       },
       {
         label: 'Brand Name',
         value: 'brandName',
         hasSelected:true
       },
     ]
   },
 ]
 
 const Layout = (props: IProps) => {
   const styles = style(props.theme);
   const theme = props.theme
   const navigation = props.navigation;
 
   const [filterData, setFilterData] = useState(FILTER_DATA)
   const [selectedFilter, setSelectedFilter] = useState(null)
   const [selectedFilterIndex, setSelectedFilterIndex] = useState(null)
 
   const renderItem = ({ item, index }: any) => {
     return (
       <Pressable onPress={() => {
         setSelectedFilter(item);
         setSelectedFilterIndex(index);
       }} style={styles.filterTitleContainer}>
         <Text style={styles.filterTitle}>{item?.title}</Text>
       </Pressable>
     )
   }
 
   console.log('selectedFilter -->', selectedFilter);
   console.log('selectedFilterIndex -->', selectedFilterIndex);
   
 
   return (
     <SafeAreaView style={styles.container}>
       <AppHeader
         theme={theme}
         onBackPress={() => props.navigation.pop()}
         headerTitle={translate("FILTERS")["FILTER"]}
         extraHeaderTxt={styles.headerTitle}
         isRightComponent={true}
         isFirstIcon={true}
         rightFirstIcon={
           <View>
             <Text style={styles.headerClearAll}>
               {
                 translate("FILTERS")["CLEAR_ALL"]
               }
             </Text>
           </View>
         }
         rightFirstPress={() => navigation.navigate('Zen.WriteReview')}
       />
       <View style={styles.adjustcontainer} />
       <View style={styles.borderLine} />
       <View style={styles.subContainer}>
         <View style={{ flexDirection: 'row' }}>
           <View style={{ width: '35%' }}>
             <FlatList
               data={filterData}
               renderItem={renderItem}
               keyExtractor={(item, index) => index.toString()}
             />
           </View>
 
           <View style={styles.filterValueContainer}>
             <FlatList
               data={selectedFilter?.data}
               renderItem={({ item }: any, index: any) => {
                 const { label, hasSelected } = item
                 return (
                   <Pressable 
                     onPress={()=> {
                       
 
                     }}
                     style={styles.filterSubValueContainer}>
                       {
                         selectedFilter?.isMultiSelect ?
                           <View style={{ marginRight: 10 }}>
                             {
                               hasSelected ? 
                                 <CheckboxSelected />
                               :
                                 <UnselectedCheckbox />
                             }
                           </View>
                           :
                           <View style={{ marginRight: 10 }}>
                             {
                               hasSelected ? 
                                 <RadioSelect />
                               :
                                 <UnselectedRadio/>
                             }
                           </View>
                       }
 
                       <View>
                         <Text style={styles.filterVal}>{label}</Text>
                       </View>
                   </Pressable>
                 )
               }}
               keyExtractor={(item, index) => index.toString()}
               extraData={selectedFilter?.data}
             />
           </View>
         </View>
       </View>
     </SafeAreaView >
   );
 };
 export default withTheme(Layout);
 