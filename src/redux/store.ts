import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {dataReducer} from "./dataReducer";

export type RootReducerType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    data: dataReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))

//@ts-ignore
window.__store__ = store