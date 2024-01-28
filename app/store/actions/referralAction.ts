

export function loader(index: string, data: boolean, type: string) {
    return {
        type: type,
        index,
        data,
    };
}

export function getReferralCode(type: string, payload: any) {
    return {
        type,
        payload,
    };
}

export function getReferralCodeData(
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

export function getReferralCoin(type: string, payload: any) {
    return {
        type,
        payload,
    };
}

export function getReferralCoinData(
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

export function getNews(type: string, payload: any) {
    return {
        type,
        payload,
    };
  }

  export function getNewsBookMark(type: string, payload: any) {
    return {
        type,
        payload,
    };
  }

  export function getNewsBookMarkUpdate(type: string, payload: any) {
    return {
        type,
        payload,
    };
  }
  export function getNewsBookMarkData(
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
  
  export function getNewsData(
    index: string,
    data: object,
    type: string,
    page: string
  ) {
    return {
        type: type,
        index,
        data,
        page
    };
  }
  
  
  export function getNewsById(type: string, payload: any) {
    return {
        type,
        payload,
    };
  }
  
  export function getNewsByIdData(
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

  export function getNewsSearch(type: string, payload: any) {
    return {
        type,
        payload,
    };
  }
  
  export function getNewsSearchData(
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