import React from 'react'
import { StyleSheet, Pressable, View, TextInput } from 'react-native'
import Back from '../../assets/images/Back.svg'
import Search from '../../assets/images/search.svg'

const AppHeaderSearch = (props) => {
    const {
        theme,
        onBackPress,
        searchValue,
        setSearchValue,
        onSearch,
        showSearchIcon=false,
        inputStyle = {},
        inputViewStyle = {}
    } = props

    const stylesActivity = (theme: any) => {
        return StyleSheet.create({
            headerContainer: {
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                height: 50,
            },
            backImgVw: {
                position: "absolute",
                left: 0,
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center'
            },
            searchVw: {
                height:35,
                width:'85%',
                backgroundColor:'#f1f2f6',
                borderRadius: 17,
                marginLeft: 20,
                paddingHorizontal: 10,
              },
        })
    };

    const styles = stylesActivity(theme);

    return (
        <View style={styles.headerContainer} >
            <Pressable onPress={onBackPress} style={styles.backImgVw}>
                <Back width={8} height={15} />
            </Pressable>
            <View style={[styles.searchVw, {flexDirection:"row", alignItems:'center'}]}>
                { showSearchIcon && 
                    <Search width={15} height={15} />
                }
                <View style={[{ justifyContent:"center"},inputViewStyle]}>
                <TextInput placeholder={translate("COMMONTEXT")["SEARCH"]} 
                    returnKeyType='search'
                    placeholderTextColor={theme.SEARCH_TITLE} 
                    autoFocus={true}
                    onChangeText={value => {
                        setSearchValue(value)
                        onSearch(value)
                    }} 
                    onSubmitEditing={() => {
                        onSearch(searchValue)
                    }} 
                    value={searchValue} 
                    style={[{marginLeft: showSearchIcon == true ? 10 : 0, width:300},inputStyle]} 
                />
                </View>
            </View>
        </View>
    );
}

export default AppHeaderSearch;