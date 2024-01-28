export interface ZMessage {
    _id: string | number
    text: string
    createdAt: Date | number
    user: User
    image?: string
    video?: string
    audio?: string
    system?: boolean
    sent?: boolean
    received?: boolean
    pending?: boolean
  }
  export interface User {
    _id:string|number
    name?:string
    avatar?:string
  }