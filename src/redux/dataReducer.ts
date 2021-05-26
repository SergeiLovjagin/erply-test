import {RootReducerType} from "./store";
import {getData, loginApi} from "../api/api";
import {ThunkAction} from "redux-thunk";

type InitialStateType = typeof initialState
const initialState = {
    clientCode: '',
    sessionKey: '',
    paymentsMethods: [] as Array<PaymentTypes>,
    warehouses: [],
    auth: false,
    alertMessage: ['', true] as [string, boolean | null],
    identityToken: '',
    savedConfiguration: {
        companyName: '',
        email: '',
        erplyPaymentType: '',
        paymentGateway: '',
        warehouse: '',
        websiteUrl: ''
    }
}

export const dataReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "SET-SESSION-KEY":
            return {...state, sessionKey: action.sessionKey}
        case "SET-CLIENT-CODE":
            return {...state, clientCode: action.clientCode}

        case "SET-PAYMENT_TYPES":
            return {
                ...state, paymentsMethods: action.paymentTypes
            }
        case "SET-WAREHOUSES":
            return {
                ...state, warehouses: action.warehouses
            }
        case "SET-AUTH":
            return {
                ...state, auth: action.auth
            }
        case "SET-ALERT-MESSAGE":
            return {
                ...state, alertMessage: action.message
            }
        case "SET-IDENTIFY-TOKEN":
            return {
                ...state, identityToken: action.identityToken
            }
        case "SET-SAVED-CONFIGURATION":
            return {
                ...state, savedConfiguration: action.savedConfiguration
            }
        default:
            return state
    }
}

//ACTIONS
const setSessionKey = (sessionKey: string) => ({type: 'SET-SESSION-KEY', sessionKey} as const)
const setClientCode = (clientCode: string) => ({type: 'SET-CLIENT-CODE', clientCode} as const)
const setPayments = (paymentTypes: Array<PaymentTypes>) => ({type: 'SET-PAYMENT_TYPES', paymentTypes} as const)
const setWarehouses = (warehouses: any) => ({type: 'SET-WAREHOUSES', warehouses} as const)
const setAlertMessage = (message: [message: string, value: boolean | null]) => ({type: 'SET-ALERT-MESSAGE', message} as const)
export const setAuth = (auth: boolean) => ({type: 'SET-AUTH', auth} as const)
export const setIdentityToken = (identityToken: string) => ({type: 'SET-IDENTIFY-TOKEN', identityToken} as const)
export const setSavedConfiguration = (savedConfiguration: SavedConfiguration) => ({type: 'SET-SAVED-CONFIGURATION', savedConfiguration} as const)

//THUNKS
export const loginThunkAction = (values: { clientCode: string, username: string, password: string }): ThunkType => async (dispatch) => {
    try {
        const response = await loginApi.data(values)
        dispatch(setSessionKey(response.data.records[0].sessionKey))
        dispatch(setClientCode(values.clientCode))
        dispatch(getWarehousesThunkAction())
        dispatch(getPaymentsThunkAction())
        dispatch(setAuth(true))
        dispatch(setAlertMessage(['', null]))
        dispatch(setIdentityToken(response.data.records[0].identityToken))
        dispatch(getDataThunkAction())
    } catch (e) {
        dispatch(setAlertMessage(['Oops! Something went wrong. Please review the form.', false]))
    }
}
export const getWarehousesThunkAction = (): ThunkType => async (dispatch, getState: () => RootReducerType) => {
    const {clientCode, sessionKey} = getState().data
    try {
        const response = await getData.getWarehouses(clientCode, sessionKey)
        dispatch(setWarehouses(response.data.records))
    } catch (e) {
        dispatch(setAlertMessage(['Oops! Something went wrong. Please review the form.', false]))
    }
}
export const getPaymentsThunkAction = (): ThunkType => async (dispatch, getState: () => RootReducerType) => {
    const {clientCode, sessionKey} = getState().data
    try {
        const response = await getData.getPayments(clientCode, sessionKey)
        dispatch(setPayments(response.data.records))
    } catch (e) {
        dispatch(setAlertMessage(['Oops! Something went wrong. Please review the form.', false]))
    }
}
export const saveDataThunkAction = (values: SubmitDataType): ThunkType => async (dispatch, getState: () => RootReducerType) => {
    const identityToken = getState().data.identityToken
    try {
        await getData.saveDataToSafa(values, identityToken)
        dispatch(setAlertMessage(['Thank you! Your settings have been saved.', true]))
    } catch (e) {
        dispatch(setAlertMessage(['Oops! Something went wrong. Please review the form.', false]))
    }
}
export const getDataThunkAction = (): ThunkType => async (dispatch, getState: () => RootReducerType) => {
    const identityToken = getState().data.identityToken
    try {
        const response = await getData.getDataFromSafa(identityToken)
        dispatch(setSavedConfiguration(response.data[response.data.length - 1].value))
    } catch (e) {
        dispatch(setAlertMessage(['Oops! Something went wrong. Please review the form.', false]))
    }
}

// TYPES
type ActionsType = SetSessionKeyType
    | SetClientCodeType
    | SetPaymentType
    | SetWarehousesType
    | setAuthType
    | setAlertMessageType
    | setIdentityTokenType
    | setSavedConfigurationType
type SetSessionKeyType = ReturnType<typeof setSessionKey>
type SetClientCodeType = ReturnType<typeof setClientCode>
type SetPaymentType = ReturnType<typeof setPayments>
type SetWarehousesType = ReturnType<typeof setWarehouses>
type setAuthType = ReturnType<typeof setAuth>
type setAlertMessageType = ReturnType<typeof setAlertMessage>
type setIdentityTokenType = ReturnType<typeof setIdentityToken>
type setSavedConfigurationType = ReturnType<typeof setSavedConfiguration>
type PaymentTypes = {
    added: string
    id: string
    lastModified: string
    name: string
    print_name: string
    quickBooksDebitAccount: string
    type: string
}
export type SavedConfiguration = {
    companyName: string
    email: string
    erplyPaymentType: string
    paymentGateway: string
    warehouse: string
    websiteUrl: string
}
export type SubmitDataType = {
    companyName: string
    websiteUrl: string
    warehouse: string
    email: string
    paymentGateway: string
    erplyPaymentType: string
}
type ThunkType = ThunkAction<void, RootReducerType, {}, ActionsType>

