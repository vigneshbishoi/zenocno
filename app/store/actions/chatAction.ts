//for Chat Media 
export function getChatConversation(type: string, payload: any) {
    return (dispatch: any) => {
      return new Promise((resolve, reject) => {
        dispatch({
          type: type,
          payload,
          resolve,
          reject,
        });
      });
    };
  }
  
  export function getChatConversationData(index: string, data: object, type: string) {
    return {
      type: type,
      index,
      data,
    };
  }

   //COACH DATA
  export function getCoachChatId(type: string, payload: any) {
    return {
      type,
      payload,
    };
  }
  export function getCoachChatIdData(
    index: string,
    data: object,
    type: string,
  ) {
    return {
      type: type,
      index,
      data,
    };
  }
