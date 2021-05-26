import React from 'react';
import './App.module.scss';
import style from "./App.module.scss";
import logo1 from "./common/images/Vector_1.svg"
import logo2 from "./common/images/Vector_2.svg"
import {Start} from "./components/start/Start";
import {Login} from './components/login/Login';
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "./redux/store";
import {setAuth} from "./redux/dataReducer";

function App() {
    const dispatch = useDispatch()
    const isAuth = useSelector<RootReducerType, boolean>(state => state.data.auth)

    const logOutHandler = () => {
        dispatch(setAuth(false))
    }
    return (
        <div className="App">
            <div className={style.container}>
                <div className={style.TopNavBar}>
                    <div className={style.logo}>
                        <img src={logo1} alt=""/>
                        <img src={logo2} alt=""/>
                    </div>
                    <div className={style.rectangle}/>
                    <div className={style.description}>
                        <p>Test Assignement 2021 v1.0</p>
                    </div>
                    <button className={style.logoutBtn} onClick={logOutHandler}>Log out</button>
                </div>
                {
                    !isAuth
                        ? <Login/>
                        : <Start/>
                }
            </div>
        </div>
    );
}

export default App;
