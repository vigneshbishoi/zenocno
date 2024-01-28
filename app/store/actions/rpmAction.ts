  export function getRpmPermission(type: string, payload: any) {
    return {
        type,
        payload,
    };
  }
  
  export function getRpmPermissionData(
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

  export function postRpmPermission(type: string, payload: any) {
    return {
        type,
        payload,
    };
  }
  
  export function postRpmPermissionData(
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

  //get Emmergency Contacts
  export function getEmergencyContact(type: string, payload: any) {
    return {
        type,
        payload,
    };
  }
  export function getEmergencyContactData(
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

    //post Emmergency Contacts
    export function postEmergencyContact(type: string, payload: any) {
        return {
            type,
            payload,
        };
      }
    export function postEmergencyContactData(
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

//delete Emmergency Contacts
export function deleteEmergencyContact(type: string, payload: any) {
        return {
            type,
            payload,
        };
    }
    export function deleteEmergencyContactData(
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

//fetch rpm data
export function fetchRpm(type: string, payload: any) {
  return {
      type,
      payload,
  };
}
export function fetchRpmData(
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

//post rpm data
export function postRpm(type: string, payload: any) {
  return {
      type,
      payload,
  };
}
export function postRpmData(
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