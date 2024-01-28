export interface ISearchRequestState {
    type: String;
}

interface ISearchResponse {
    search_data: object
}
export interface ISearchResponseState {
    type: object;
    reponse: ISearchResponse,
}
