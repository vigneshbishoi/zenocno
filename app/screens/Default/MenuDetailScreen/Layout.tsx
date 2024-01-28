import React, {useRef, useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
  FlatList,
  BackHandler,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import _ from 'lodash';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store';
import {withTheme} from '../../../utils/ThemeProvider';
import translate from '../../../utils/Text';
import style from './Style';
import {useIsFocused} from '@react-navigation/native';
import actionTypes from '../../../store/actions/types';
// import AppLoader from '../../../components/Plugins/AppLoader';
import styles from '../../../components/Plugins/Textfield/src/components/affix/styles';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const DUMMY_IMG = `https://via.placeholder.com/${Math.round(
  width / 2.4,
)}x${Math.round(height / 4)}/19CEAB/FFFFFF/?text=Zenonco`;

const Header = ({
  theme,
  title,
  navigation,
  setSelectedItem,
  isItemSelected,
  setIsItemSelected,
}: any) => {
  const styles = style(theme);
  const handleNavigation = () => {
    if (isItemSelected) {
      setIsItemSelected(false);
      setSelectedItem(null);
    } else {
      navigation.goBack();
    }
  };
  return (
    <View style={styles.headerContainer}>
      <Pressable style={styles.headerBackContainer} onPress={handleNavigation}>
        <View>
          <Image
            style={styles.backButton}
            source={require('../../../assets/images/right.png')}
          />
        </View>
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={{flex: 0.15}}></View>
    </View>
  );
};

const RenderSingleItem = ({value, onItemSelect, theme}: any) => {
  const styles = style(theme);
  const image_source =
    value &&
    value.image &&
    value.image.match(
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
    )
      ? value.image
      : DUMMY_IMG;

  return (
    <TouchableOpacity
      onPress={() => {
        onItemSelect(value);
      }}
      style={{
        flex: 1,
        justifyContent: 'space-between',
        marginLeft: 15,
        marginTop: 20,
      }}>
      <Image
        style={{
          width: width / 2.4,
          height: height / 4,
          borderRadius: 15,
          borderWidth: 2,
        }}
        source={{uri: image_source}}
      />
      <Text style={styles.shortDescText}>{value.short_description}...</Text>
      <View style={{flexDirection: 'row', marginTop: 5}}>
        <Image
          resizeMode={'contain'}
          style={{width: 18, height: 18, tintColor: 'green'}}
          source={require('../../../assets/images/clock.png')}
        />
        <Text style={styles.minutesText}>{value.minutes}m</Text>
      </View>
      <Text style={styles.longDescText}>
        {value.long_description.substring(0, 55)}...
      </Text>
    </TouchableOpacity>
  );
};

const ScreenContent = ({
  title,
  flowData,
  theme,
  navigation,
  data,
  onItemSelect,
}: any) => {
  const itemDetail = data && _.head(data);
  const styles = style(theme);
  const VirtualizedView = (props: any) => {
    return (
      <FlatList
        data={[]}
        ListEmptyComponent={null}
        keyExtractor={() => 'dummy'}
        renderItem={null}
        horizontal
        ListHeaderComponent={() => (
          <React.Fragment>{props.children}</React.Fragment>
        )}
      />
    );
  };

  return (
    <ScrollView>
      <>
        {itemDetail &&
          itemDetail.data.length > 0 &&
          itemDetail.data.map(item => {
            return (
              <View style={{marginTop: 10, marginLeft: 15}}>
                <Text style={styles.headingText}>{item.title}</Text>
                <VirtualizedView>
                  <FlatList
                    data={item.items}
                    renderItem={({item}) => (
                      <RenderSingleItem
                        value={item}
                        onItemSelect={onItemSelect}
                        theme={theme}
                      />
                    )}
                    numColumns={2}
                  />
                </VirtualizedView>
              </View>
            );
          })}
      </>
    </ScrollView>
  );
};

const SingleItemPage = ({setIsShow, isShow, data, theme}: any) => {
  return (
    <ScrollView>
      <View style={{paddingHorizontal: 22}}>
        <Image
          style={{
            width: width / 1.1,
            height: height * 0.32,
            borderRadius: 15,
            alignSelf: 'center',
          }}
          source={{
            uri:
              'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg' ||
              data.image,
          }}
        />
        <Text
          style={{
            fontSize: 15,
            fontWeight: '700',
            marginTop: 5,
            lineHeight: 25,
          }}>
          {data.short_description || ''}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 5}}>
          <Image
            style={{width: 20, height: 20, tintColor: 'green'}}
            source={require('../../../assets/images/clock.png')}
          />
          <Text style={{color: 'green', marginLeft: 5}}>
            {data.minutes || 0}m
          </Text>
        </View>
        <Text style={{lineHeight: 20, marginTop: 5, color:theme.BLACK}}>
          {data.long_description || ''}...
          {isShow && (
            <Text>
              {' '}
              malesuada faucibus. Vivamus sed lacus in dolor mollis commodo at
              at purus. Nullam sem justo, volutpat eget mattis vitae, lobortis
              at ipsum. Fusce egestas velit id enim rutrum maximus. Aliquam erat
              volutpat. Morbi eleifend magna et tortor auctor, a pretium diam
              tempus. Fusce cursus in sapien eu imperdiet. Suspendisse potenti.
              Aenean velit mi, luctus tincidunt pulvinar vitae, faucibus ut
              ante. Quisque libero leo, sollicitudin non malesuada id, maximus
              eu lectus. Curabitur ut ante ut felis imperdiet venenatis at
              quis...
            </Text>
          )}
          {!isShow ? (
            <Text
              onPress={() => setIsShow(!isShow)}
              style={{fontSize: 15, color: 'blue'}}>
              More
            </Text>
          ) : (
            <Text
              onPress={() => setIsShow(!isShow)}
              style={{fontSize: 15, color: 'blue'}}>
              Less
            </Text>
          )}
        </Text>
      </View>
    </ScrollView>
  );
};
const BottomContainer = ({theme, onPlayClick}: any) => {
  return (
    <Pressable onPress={onPlayClick}>
      <View
        style={{
          borderRadius: 10,
          alignItems: 'center',
          justifyContent: 'center',
          width: '88%',
          paddingVertical: height * 0.03,
          alignSelf: 'center',
          flexDirection: 'row',
          marginBottom: 10,
        }}>
        <Image
          style={{width: 20, height: 20, tintColor: theme.PRIMARY, marginRight: 5}}
          source={require('../../../assets/images/play.png')}
        />
        <Text style={{fontSize: 18, color: theme.PRIMARY, marginLeft: 5}}>Play</Text>
      </View>
    </Pressable>
  );
};
const Layout = ({theme, navigation, route, actions}: any) => {
  const {title, table_name = ''} = route.params;
  const styles = style(theme);
  const isFocused = useIsFocused();
  const [isShow, setIsShow] = useState(false);
  const [isItemSelected, setIsItemSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const flowData = useSelector(
    (state: RootState) => state.dietPlanReducer.flowData,
  );
  const menuItemDetail =
    useSelector((state: RootState) => state.storiesReducer.menuItemDetail) ||
    [];
  // const isLoading = useSelector(
  //   (state: RootState) => state.storiesReducer.loader,
  // );

  useEffect(() => {
    if (isFocused) {
      actions.getMenuItemDetailData(actionTypes.GET_DETAIL_MENU_ITEM, {
        module: 'menu_option',
        action: `get_option_detail?table_name=${table_name}`,
      });
    }
  }, [isFocused]);
  const onItemSelect = (item: any) => {
    setIsItemSelected(true);
    setSelectedItem(item);
  };
  const handlePlayClick = () => {
    //playVideo
    if (selectedItem) {
      navigation.navigate('Zen.VideoScreen', selectedItem);
    }
  };
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Header
          theme={theme}
          title={title}
          navigation={navigation}
          setIsItemSelected={setIsItemSelected}
          isItemSelected={isItemSelected}
          setSelectedItem={setSelectedItem}
        />

        {typeof menuItemDetail === 'object' &&
          menuItemDetail &&
          menuItemDetail[0]?.message === 'records found' &&
          !isItemSelected && (
            <ScreenContent
              theme={theme}
              title={title}
              navigation={navigation}
              flowData={flowData}
              data={menuItemDetail}
              onItemSelect={onItemSelect}
            />
          )}
        {isItemSelected && (
          <>
            <SingleItemPage
              setIsShow={setIsShow}
              isShow={isShow}
              data={selectedItem}
              theme={theme}
            />
            <BottomContainer theme={theme} onPlayClick={handlePlayClick} />
          </>
        )}
      </SafeAreaView>
    </>
  );
};
export default withTheme(Layout);
