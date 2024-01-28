export interface IDietRequestState {
    type: String;
}

interface IDietResponse {
    data: object
}
export interface IDietResponseState {
    type: object;
    reponse: IDietResponse,
}
