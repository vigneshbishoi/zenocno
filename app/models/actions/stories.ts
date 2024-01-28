export interface IStoriesRequestState {
    type: String;
}

interface IStoriesResponse {
    data: object
}
export interface IStoriesResponseState {
    type: object;
    reponse: IStoriesResponse,
}
