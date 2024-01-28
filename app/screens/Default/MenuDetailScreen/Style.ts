import {StyleSheet, Dimensions} from 'react-native';
import {FONTFAMILY} from '../../../config/font-config';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

/**
 * style
 */
const Style = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.PRIMARY,
    },
    headerContainer: {
      marginVertical: height * 0.03,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    headerBackContainer: {
      flex: 0.15,
      paddingHorizontal: '3%',
      paddingVertical: '1%',
    },
    backButton: {
      height: height * 0.02,
      transform: [{rotateY: '180deg'}],
    },
    titleContainer: {justifyContent: 'center', alignItems: 'center', flex: 0.6},
    titleText: {
      color: theme.BLACK,
      fontFamily: FONTFAMILY.REGULAR,
      fontSize: 18,
    },
    horizantalMenus: {
      flexDirection: 'row',
    },
    headingText: {
      fontSize: 14,
      fontWeight: '500',
      marginLeft: 15,
      color: theme.BLACK,
    },
    longDescText: {width: width / 2.4, marginTop: 5, color: '#000'},
    minutesText: {color: 'green', marginLeft: 5},
    shortDescText: {
      fontSize: 14,
      fontWeight: '700',
      width: width / 2.4,
      marginTop: 2,
      color: '#000',
    },
  });
};
export default Style;
