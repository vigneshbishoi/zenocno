//for Calendar Data 
export function getCalendar(type: string, payload: any) {
    return {
        type,
        payload,
    }
}
export function getCalendarData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for CalendarSuggestion Data 
export function getCalendarSuggestion(type: string, payload: any) {
    return {
        type,
        payload,
    }
}
export function getCalendarSuggestionData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for Add Calendar Data 
export function addCalendar(type: string, payload: any) {
    return {
        type,
        payload,
    }
}
export function addCalendarData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for Add Calendar Data 
export function calendarCategory(type: string, payload: any) {
    return {
        type,
        payload,
    }
}
export function calendarCategoryData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for edit Calendar Data 
export function editCalendar(type: string, payload: any) {
    return {
        type,
        payload,
    }
}
export function editCalendarData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for create daily streak 
export function creatStreak(type: string, payload: any) {
    return {
        type,
        payload,
    }
}
export function creatStreakData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}

//for delete activity 
export function deleteActivity(type: string, payload: any) {
    return {
        type,
        payload,
    }
}
export function deleteActivityData(index: string, data: object, type: string) {
    return {
        type: type,
        index,
        data
    }
}