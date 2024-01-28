import { StyleSheet, Dimensions } from 'react-native';

// import COLOR from "../../configs/color";
// import TEXT from "../../configs/text";
import { FONTFAMILY } from "../../config/font-config";
import config from '../../config/alertScreen-config';
import themes from '../../config/themes-config';
const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",

    },
    overlay: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: 'rgba(52,52,52,0.5)',
    },
    contentContainer: {
        width: "90%",
        borderRadius: 10,
        backgroundColor: themes[0]?.PRIMARY,
        padding: config.spacing.alertContainerPadding
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: config.spacing.alertContentPadding
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: config.spacing.actionButtonMarginTop,
    },
    title: {
        paddingVertical: config.spacing.titlePadding,
        paddingHorizontal: config.spacing.titlePaddingSides,
        textAlign: 'left',
        // color: COLOR.ERROR,
        fontSize: 18,
        fontFamily: FONTFAMILY.POPPINS_BOLD,
        color: themes[0]?.BLACK

    },
    message: {
        paddingTop: config.spacing.msgPadding,
        color: themes[0]?.BLACK,
        fontSize: 16,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM,
    },
    button: {
        paddingHorizontal: config.spacing.actionButtonPaddingHorizontal,
        paddingVertical: config.spacing.actionButtonPaddingVertical,
        margin: config.spacing.actionButtonMargin,
        borderRadius: config.size.actionButtonBorderRadius,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'red'
    },
    buttonText: {
        color: themes[0]?.PRIMARY,
        fontSize: 16,
        fontFamily: FONTFAMILY.POPPINS_MEDIUM
    },
    btnContainer: {
        flex: 1,
        marginTop: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnLgradient: {
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        paddingHorizontal: 50,
        paddingVertical: 10,
        backgroundColor: themes[0]?.PAGINATION_SELECCT
    },
    btnText: {
        fontSize: 16,
        color: themes[0]?.PRIMARY,
        fontFamily: FONTFAMILY.POPPINS_BOLD
    },
})

export default styles;