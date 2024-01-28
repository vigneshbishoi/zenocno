import React from 'react';
import moment from 'moment'
import GoogleFit, { Scopes } from 'react-native-google-fit'
import AppleHealthKit, {
  HealthValue,
  HealthKitPermissions,
} from 'react-native-health';
import actionTypes from '../store/actions/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export var handle;

export function dateDiffInDaysMonthsYears(timeUpdate) {
  const currentDate = moment();
  const jobDate = moment(timeUpdate);

  const dayDifference = currentDate.diff(jobDate, 'days');

  const monthDifference = currentDate.diff(jobDate, 'months');

  const hourDifference = currentDate.diff(jobDate, 'hours');

  const minuteDifference = currentDate.diff(jobDate, 'minutes');

  const secondDifference = currentDate.diff(jobDate, 'seconds');

  const yearDifference = currentDate.diff(jobDate, 'years');

  let timeShowOnPost = '';

  if (yearDifference !== 0) {
    if (yearDifference > 1) {
      return moment().format('YYYY/MM/DD', timeUpdate);
    } else {
      timeShowOnPost = yearDifference + ' ' + 'y';
    }
  } else if (monthDifference !== 0) {
    timeShowOnPost = getMonthDifference(monthDifference);
  } else if (dayDifference !== 0) {
    timeShowOnPost = getDayDifference(dayDifference);
  } else if (hourDifference !== 0) {
    timeShowOnPost = getHourDifference(hourDifference);
  } else if (minuteDifference !== 0) {
    timeShowOnPost = getMinuteDifference(minuteDifference);
  } else if (secondDifference !== 0) {
    timeShowOnPost = Math.abs(secondDifference) + 's';
  }

  timeShowOnPost = timeShowOnPost;
  return timeShowOnPost;
}

const getMonthDifference = (monthDifference: number) => {
  if (monthDifference > 1) {
    return monthDifference + 'M';
  } else {
    return monthDifference + 'M';
  }
};

const getDayDifference = (dayDifference: number) => {
  if (dayDifference === 1) {
    return ' ' + dayDifference + 'd';
  } else if (dayDifference >= 1 && dayDifference < 8) {
    return ' ' + dayDifference + 'd';
  } else {
    if (dayDifference > 7 && dayDifference < 15) {
      return 1 + ' ' + 'w';
    } else if (dayDifference > 14 && dayDifference < 22) {
      return 2 + ' ' + 'w';
    } else if (dayDifference > 21 && dayDifference < 31) {
      return 3 + ' ' + 'w';
    } else {
      return '';
    }
  }
};

const getHourDifference = (hourDifference: number) => {
  if (hourDifference > 1) {
    return Math.abs(hourDifference) + 'h';
  } else {
    return Math.abs(hourDifference) + 'h';
  }
};

const getMinuteDifference = (minuteDifference: number) => {
  if (minuteDifference > 1) {
    return Math.abs(minuteDifference) + 'm';
  } else {
    return Math.abs(minuteDifference) + 'm';
  }
};

export function numberWithCommas(x) {
  if (x === undefined) return ""
  else return x?.toString().split('.')[0].length > 3 ? x?.toString().substring(0, x?.toString().split('.')[0].length - 3).replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + x?.toString().substring(x.toString().split('.')[0].length - 3) : x?.toString();
}

export function calculateDiscount(original_price, sale_price) {
  if (original_price === undefined) return "0"
  else if (sale_price === undefined) return "0"
  else return Math.round(((original_price - sale_price) / original_price) * 100)
}

export function askForAndroidPermission(props, permission, postPermission, userId) {
  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
      Scopes.FITNESS_SLEEP_READ,
      Scopes.FITNESS_SLEEP_WRITE,
      Scopes.FITNESS_BODY_TEMPERATURE_READ,
      Scopes.FITNESS_BODY_TEMPERATURE_WRITE,
      Scopes.FITNESS_BLOOD_PRESSURE_READ,
      Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
      Scopes.FITNESS_HEART_RATE_READ,
      Scopes.FITNESS_HEART_RATE_WRITE,
      Scopes.FITNESS_OXYGEN_SATURATION_READ,
      Scopes.FITNESS_OXYGEN_SATURATION_WRITE,
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
      Scopes.FITNESS_REPRODUCTIVE_HEALTH_READ,
      Scopes.FITNESS_REPRODUCTIVE_HEALTH_WRITE,
    ],
  }
  GoogleFit.authorize(options)
    .then(authResult => {
      if (authResult.success) {
        postPermission()
        permission.status = 1
        getData(props, userId)
      } else {
        console.log("errr", authResult)
      }
    })
    .catch((err) => {
      console.log('err >>> ', err)
    })
}
export const askForPermission = (postPermission, permission, props, userId) => {
  console.log("method called")
  const permissions = {
    permissions: {
      read: [AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.BloodPressureDiastolic,
      AppleHealthKit.Constants.Permissions.BloodPressureSystolic,
      AppleHealthKit.Constants.Permissions.BodyTemperature,
      AppleHealthKit.Constants.Permissions.OxygenSaturation,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
      ],
    },
  }

  AppleHealthKit.initHealthKit(permissions, async (error: string) => {
    /* Called after we receive a response from the system */

    if (error) {
      console.log('[ERROR] Cannot grant permissions!')
    } else if (permission.status == 0) {
      postPermission()
      permission.status = 1
    }

    /* Can now read or write to HealthKit */

    const options = {
      startDate: new Date(2020, 1, 1).toISOString(),
    }
    var d = new Date();
    d.setDate(d.getDate() - 1);
    let options1 = {
      startDate: new Date(2022, 0, 0).toISOString(),
      endDate: new Date().toISOString(),
      type: 'Walking', // one of: ['Walking', 'StairClimbing', 'Running', 'Cycling', 'Workout']
    }
    let count = 0
    let heart = []
    let bp = []
    let temp = []
    let oxy = []
    let sleep = []
    let active = []
    let steps = []
    AppleHealthKit.getHeartRateSamples(options, (callbackError: string, results: HealthValue[]) => {
      /* Samples are now collected from HealthKit */
      heart = results
      count = count + 1
      checkCount(count, heart, steps, bp, temp, oxy, sleep, active, userId, props)
    })
    AppleHealthKit.getSamples(options1, (err: Object, results: Array<Object>) => {
      steps = results
      count = count + 1
      checkCount(count, heart, steps, bp, temp, oxy, sleep, active, userId, props)
    })
    AppleHealthKit.getBloodPressureSamples(options1, (err: Object, results: Array<Object>) => {
      bp = results
      count = count + 1
      checkCount(count, heart, steps, bp, temp, oxy, sleep, active, userId, props)
    })
    AppleHealthKit.getBodyTemperatureSamples(options1, (err: Object, results: Array<Object>) => {
      temp = results
      count = count + 1
      checkCount(count, heart, steps, bp, temp, oxy, sleep, active, userId, props)
    })
    AppleHealthKit.getOxygenSaturationSamples(options1, (err: Object, results: Array<Object>) => {
      oxy = results
      count = count + 1
      checkCount(count, heart, steps, bp, temp, oxy, sleep, active, userId, props)
    })
    AppleHealthKit.getActiveEnergyBurned(options1, (err: Object, results: Array<Object>) => {
      active = results
      count = count + 1
      checkCount(count, heart, steps, bp, temp, oxy, sleep, active, userId, props)
    })
    AppleHealthKit.getSleepSamples(options1, (err: Object, results: Array<Object>) => {
      sleep = results
      count = count + 1
      checkCount(count, heart, steps, bp, temp, oxy, sleep, active, userId, props)
    })
  })

}
const checkCount = (count, heart, steps, bp, temp, oxy, sleep, active, userId, props) => {
  if (count == 7) {
    console.log("complete", count, heart, steps, bp, temp, oxy, sleep);
    let data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    let newData = []
    data.map((itemA, index) => {
      let item = {
        userId: userId,
        uuid: "TESTOKFIRST",
        value: "0",
        startDate: new Date(),
        endDate: new Date(),
        userEntered: "1",
        type: ""
      }
      if (index == 0) {
        item.value = steps.length > 0 ? steps[0].quantity : 0
        item.startDate = steps.length > 0 ? steps[0].start : new Date()
        item.endDate = steps.length > 0 ? steps[0].end : new Date()
        item.type = "rpm_steps"
      } else if (index == 1) {
        item.value = temp.length > 0 ? Math.round(temp[0].value) : 0
        item.startDate = temp.length > 0 ? temp[0].startDate : new Date()
        item.endDate = temp.length > 0 ? temp[0].endDate : new Date()
        item.type = "rpm_temperature"
      } else if (index == 2) {
        item.value = heart.length > 0 ? heart[0].value : 0
        item.startDate = heart.length > 0 ? heart[0].startDate : new Date()
        item.endDate = heart.length > 0 ? heart[0].endDate : new Date()
        item.type = "rpm_pulse"
      } else if (index == 3) {
        item.systolic = bp.length > 0 ? bp[0].bloodPressureSystolicValue : 0
        item.startDate = bp.length > 0 ? bp[0].startDate : new Date()
        item.endDate = bp.length > 0 ? bp[0].endDate : new Date()
        item.type = "rpm_bp"
      } else if (index == 4) {
        item.value = oxy.length > 0 ? oxy[0].value : 0
        item.startDate = oxy.length > 0 ? oxy[0].startDate : new Date()
        item.endDate = oxy.length > 0 ? oxy[0].endDate : new Date()
        item.type = "rpm_spo2"
      } else if (index == 5) {
        item.value = active.length > 0 ? active[0].value : 0
        item.startDate = active.length > 0 ? active[0].startDate : new Date()
        item.endDate = active.length > 0 ? active[0].endDate : new Date()
        item.type = "rpm_active_energy"
      } else if (index == 6) {
        item.value = active.length > 0 ? active[0].calorie : 0
        item.startDate = active.length > 0 ? active[0].startDate : new Date()
        item.endDate = active.length > 0 ? active[0].endDate : new Date()
        item.type = "rpm_basal_energy"
      } else if (index == 7) {
        item.value = heart.length > 0 ? heart[0].value : 0
        item.startDate = heart.length > 0 ? heart[0].startDate : new Date()
        item.endDate = heart.length > 0 ? heart[0].endDate : new Date()
        item.type = "rpm_respiration"
      } else if (index == 8) {
        item.value = sleep.length > 0 ? sleep[0].value : 0
        item.startDate = sleep.length > 0 ? sleep[0].startDate : new Date()
        item.endDate = sleep.length > 0 ? sleep[0].endDate : new Date()
        item.type = "rpm_sleep"
      }

      itemA = item
      newData.push(itemA)
    })
    postRpm(newData, props)
  }
}

const getData = async (props, userId) => {
  var d = new Date();
  d.setDate(d.getDate() - 1);
  const opt = {
    startDate: d.toISOString(), // required ISO8601Timestamp
    endDate: new Date().toISOString(), // required ISO8601Timestamp
  };

  const steps = await GoogleFit.getDailyStepCountSamples(opt)
  const sleep = await GoogleFit.getSleepSamples(opt)
  const temp = await GoogleFit.getBodyTemperatureSamples(opt)
  const bp = await GoogleFit.getBloodPressureSamples(opt)
  const hr = await GoogleFit.getHeartRateSamples(opt)
  const oxy = await GoogleFit.getOxygenSaturationSamples(opt)
  const activity = await GoogleFit.getActivitySamples(opt)
  const body = await GoogleFit.getDailyCalorieSamples(opt)
  let data = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  let newData = []
  data.map((itemA, index) => {
    let item = {
      userId: userId,
      uuid: "TESTOKFIRST",
      value: "0",
      startDate: new Date(),
      endDate: new Date(),
      userEntered: "1",
      type: ""
    }
    if (index == 0) {
      item.value = steps.length > 2 ? steps[2].steps[0].value : 0
      item.startDate = steps.length > 2 ? steps[2].steps[0].date : new Date()
      item.endDate = steps.length > 2 ? steps[2].steps[0].date : new Date()
      item.type = "rpm_steps"
    } else if (index == 1) {
      item.value = temp.length > 0 ? temp[0].value : 0
      item.startDate = temp.length > 0 ? temp[0].startDate : new Date()
      item.endDate = temp.length > 0 ? temp[0].endDate : new Date()
      item.type = "rpm_temperature"
    } else if (index == 2) {
      item.value = hr.length > 0 ? hr[0].value : 0
      item.startDate = hr.length > 0 ? hr[0].startDate : new Date()
      item.endDate = hr.length > 0 ? hr[0].endDate : new Date()
      item.type = "rpm_pulse"
    } else if (index == 3) {
      item.systolic = bp.length > 0 ? bp[0].systolic : 0
      item.startDate = bp.length > 0 ? bp[0].startDate : new Date()
      item.endDate = bp.length > 0 ? bp[0].endDate : new Date()
      item.type = "rpm_bp"
    } else if (index == 4) {
      item.value = oxy.length > 0 ? oxy[0].value : 0
      item.startDate = oxy.length > 0 ? oxy[0].startDate : new Date()
      item.endDate = oxy.length > 0 ? oxy[0].endDate : new Date()
      item.type = "rpm_spo2"
    } else if (index == 5) {
      item.value = activity.length > 0 ? activity[0].value : 0
      item.startDate = activity.length > 0 ? activity[0].startDate : new Date()
      item.endDate = activity.length > 0 ? activity[0].endDate : new Date()
      item.type = "rpm_active_energy"
    } else if (index == 6) {
      item.value = body.length > 0 ? body[0].calorie : 0
      item.startDate = body.length > 0 ? body[0].startDate : new Date()
      item.endDate = body.length > 0 ? body[0].endDate : new Date()
      item.type = "rpm_basal_energy"
    } else if (index == 7) {
      item.value = activity.length > 0 ? activity[0].value : 0
      item.startDate = activity.length > 0 ? activity[0].startDate : new Date()
      item.endDate = activity.length > 0 ? activity[0].endDate : new Date()
      item.type = "rpm_respiration"
    } else if (index == 8) {
      item.value = sleep.length > 0 ? sleep[0].value : 0
      item.startDate = sleep.length > 0 ? sleep[0].startDate : new Date()
      item.endDate = sleep.length > 0 ? sleep[0].endDate : new Date()
      item.type = "rpm_sleep"
    }

    itemA = item
    newData.push(itemA)
  })
  postRpm(newData, props)
}

const postRpm = async (newData, props) => {
  props.actions.postRpm(actionTypes.POST_RPM, {
    module: 'rpm',
    action: 'create_rpm_data',
    formData: newData,
  });
}
export const getDates = (item, holidayArr) => {
  const now = new Date();
  const year = now.getYear()
  now.setDate(now.getDate() + (item.day + (7 - now.getDay())) % 7);
  let allDates = []
  while (now.getYear() === year) {
    var pushDate = new Date(now.getTime());
    let date1 = pushDate.getFullYear() + '-' + ((pushDate.getMonth() + 1) > 9 ? (pushDate.getMonth() + 1) : '0' + (pushDate.getMonth() + 1)) + '-' + pushDate.getDate()
    if (!holidayArr.includes(date1)) {
      allDates.push({
        date: date1,
        timeInfo: item.timeInfo
      });
    }
    now.setDate(now.getDate() + 7);
  }
  return allDates
}
export const getTimeSlot = (obj, filterData) => {
  let allTimes = []
  let currentTime = moment(moment(), "HH:mm").add(60, 'minutes').format('HH:mm');
  let currentDate = moment(moment(), "yyyy-MM-DD").format('yyyy-MM-DD');
  obj.timeInfo.map(item => {
    let startTime = moment(item?.startTime, "HH:mm");
    //Format the end time and the next day to it 
    let endTime = moment(item?.endTime, "HH:mm");
    while (startTime < endTime) {
      let timeFilter = []
      if (filterData?.length > 0) {
        timeFilter = filterData.filter(itemA => itemA.apptTime == startTime?.format("HH:mm:ss"))
      }
      let startTime1 = moment(startTime, "HH:mm").format("HH:mm");
      //Push times
      if (timeFilter?.length == 0) {
        if (currentDate == obj.date) {
          if (startTime1 >= currentTime) {
            allTimes.push(startTime?.format("HH:mm"));
          }
        } else {
          allTimes.push(startTime?.format("HH:mm"));
        }
      }

      //Add interval of 30 minutes
      startTime?.add(item?.durationMins, 'minutes');
    }
  })
  return allTimes
}

export const newGetTimeSlot = (obj, filterData) => {
  let allTimes = []
  let currentTime = moment(moment(), "HH:mm").add(60, 'minutes').format('HH:mm');
  let currentDate = moment(moment(), "yyyy-MM-DD").format('yyyy-MM-DD');
  obj.timeInfo.map(item => {
    let startTime = moment(item?.startTime, "HH:mm");
    //Format the end time and the next day to it 
    let endTime = moment(item?.endTime, "HH:mm");
    while (startTime < endTime) {
      let timeFilter = []
      if (filterData?.length > 0) {
        timeFilter = filterData.filter(itemA => itemA.apptTime == startTime?.format("HH:mm:ss"))
      }
      let startTime1 = moment(startTime, "HH:mm").format("HH:mm");
      //Push times
      if (timeFilter?.length == 0) {
        if (currentDate == obj.date) {
          if (startTime1 >= currentTime) {
            allTimes.push(startTime?.format("HH:mm"));
          }
        } else {
          allTimes.push(startTime?.format("HH:mm"));
        }
      }

      //Add interval of 30 minutes
      startTime?.add(item?.durationMins, 'minutes');
    }
  })
  return allTimes
}
export const handleSlots = (doctorSchedule, setSlots, setBookedSlots, setAvailableDates) => {
  let arr = []
  let holidayArr = []
  setBookedSlots(doctorSchedule?.app_booking?.length > 0 ? doctorSchedule?.app_booking : [])
  doctorSchedule?.app_holiday?.map(item => {
    moment.locale('en');
    var dt = item.holidayDate;
    let formattedDate = moment(dt).format('yyyy-MM-DD')
    holidayArr.push(formattedDate)
  })
  let data = []
  doctorSchedule?.data?.map(item => {
    if (data.length > 0) {
      let filterData = data.filter(itemA => itemA.day == item.day)
      if (filterData.length > 0) {
        let obj1 = {
          startTime: item.startTime,
          endTime: item.endTime,
          durationMins: item.durationMins
        }
        filterData[0]?.timeInfo?.push(obj1)
      } else {
        let obj = {}
        obj.day = item.day
        let obj1 = {
          startTime: item.startTime,
          endTime: item.endTime,
          durationMins: item.durationMins
        }
        obj.timeInfo = [obj1]
        data.push(obj)
      }
    } else {
      let obj = {}
      obj.day = item.day
      let obj1 = {
        startTime: item.startTime,
        endTime: item.endTime,
        durationMins: item.durationMins
      }
      obj.timeInfo = [obj1]
      data.push(obj)
    }
  })

  data?.map(item => {
    let arr1 = getDates(item, holidayArr)
    arr = [...arr, ...arr1]
  })
  let sortedDates = arr?.sort((a, b) => new Date(...a.date.split('-')) - new Date(...b.date.split('-')));
  if (sortedDates.length > 0) {
    let filterData = []
    if (doctorSchedule?.app_booking?.length > 0) {
      filterData = doctorSchedule?.app_booking?.filter(item => item.apptDate === sortedDates[0]?.date)
    }
    let timeSlots = getTimeSlot(sortedDates[0], filterData)
    setSlots(timeSlots)
  }
  setAvailableDates(sortedDates)
}
export const initatePayment = (userId, selected, amount, actions, setRazorPayKey, setShowRazorpay) => {
  var inputRequest = {
    module: 'payment',
    action: 'initiatePay',
    formData: {
      userId: userId,
      subscriptionPlanId: selected,
      amount: amount,
      currency: 'INR',
    },
  };
  if (selected) {
    actions
      .callPayment(actionTypes.GET_PAYMENT, inputRequest)
      .then(data => {
        if (data?.razorpay_config?.length > 0) {
          let filterData = data.razorpay_config.filter(item => item.description == 'Razorpay key')
          if (filterData?.length > 0) {
            setRazorPayKey(filterData[0]?.value)
            setTimeout(() => {
              setShowRazorpay(true);
            }, 600)
          }
        }
      });
  }
}

export const shortNameFunc = (userDetail) => {
  let descText = ''
  let cancer_category = '';
  let cancer_stage = '';
  let user_profile = '';
  let chj_health_status = '';
  if (userDetail != undefined && userDetail != null) {
    if (userDetail?.cancer_category != null || userDetail?.cancer_category != undefined) {
      cancer_category =
        userDetail?.cancer_category?.short_name != null || userDetail?.cancer_category?.short_name != undefined ?
          userDetail?.cancer_category?.short_name : ''
    }
    if (userDetail?.cancer_stage != null || userDetail?.cancer_stage != undefined) {
     cancer_stage =
        userDetail?.cancer_stage?.shortName != null || userDetail?.cancer_stage?.short_name != undefined ?
          userDetail?.cancer_stage?.shortName : ''
    }
    if (userDetail?.user_profile != null || userDetail?.user_profile != undefined) {
      user_profile =
        userDetail?.user_profile?.shortName != null || userDetail?.user_profile?.short_name != undefined ?
          userDetail?.user_profile?.shortName : ''
    }
    if (userDetail?.chj_health_status != null || userDetail?.chj_health_status != undefined) {
      chj_health_status =
        userDetail?.chj_health_status?.shortName != null || userDetail?.chj_health_status?.short_name != undefined ?
          userDetail?.chj_health_status?.shortName : ''
    } else if(userDetail?.data?.chj_health_status?.shortName != null || userDetail?.data?.chj_health_status?.shortName != undefined){
      chj_health_status =
        userDetail?.data?.chj_health_status?.shortName != null || userDetail?.data?.chj_health_status?.short_name != undefined ?
          userDetail?.data?.chj_health_status?.shortName 
        : ''
    }
    if (chj_health_status) {
      descText = cancer_category + " - " +cancer_stage + ' (' + user_profile + " - " + chj_health_status + ')'
    }
    descText = descText.replace(' - decd' , '')
  }
  return descText;
}
