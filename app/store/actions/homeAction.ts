export function allHome(type: string, payload: any) {
    return {
      type,
      payload,
    };
  }
  export function allHomeData(
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
  export function loader(index: string, data: boolean, type: string) {
    return {
      type: type,
      index,
      data,
    };
  }