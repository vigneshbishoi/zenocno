import { Share } from 'react-native';
import actionTypes from '../store/actions/types';
import appConfig from '../config/app-config';
  export const onPressLikeWellness = (actions, item: any, userId) => {
    var inputRequest = {
      module: "wellness",
      action: "create_wellnesses_bookmark",
      formData: {
          userId: userId,
          wellnessesId: item.id
      }
    }
    actions.likeWellness(actionTypes.LIKE_WELLNESS, inputRequest);
  }

  export const onPressShareWellness = (item: any) => {
    Share.share({
      message:
      `Hi. I came across ZenOnco Care App that suggests activities to boost immunity, improve wellness & reduce side effects of cancer & its treatment. I’m sharing an activity with you that has helped me a lot: ${item?.title}. \n\nYou can see more such activities on the ZenOnco Care App: \nAndroid: ${appConfig.PLAY_STORE}  \niOS: ${appConfig.APP_STORE}`,
    });
  }
  