import React from "react";
import style from "./Login.module.scss"
import {Form, Formik} from "formik";
import {SuperInput} from "../../common/input/SuperInput";
import {SuperButton} from "../../common/button/SuperButton";
import {loginThunkAction} from "../../redux/dataReducer";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../redux/store";


export const Login = () => {
    const dispatch = useDispatch()
    const alertMessage = useSelector<RootReducerType, (string | boolean | null)[]>(state => state.data.alertMessage)

    return (
        <main className={style.main}>
            {
                alertMessage[1] === false && <div className={style.errorModule}>
                    <span>{alertMessage[0]}</span>
                </div>
            }
            <Formik
                initialValues={{
                    clientCode: '',
                    username: '',
                    password: '',
                }}
                onSubmit={async (values) => {
                    dispatch(loginThunkAction(values))
                }}>
                <Form className={style.form}>
                    <h2>Login to Erply</h2>
                    <SuperInput id="clientCode" name="clientCode" placeholder="Insert Account Number"/>
                    <SuperInput id="username" name="username" placeholder="Insert Email"/>
                    <SuperInput id="password" name="password" placeholder="Insert Password" type={'password'}/>
                    <SuperButton/>
                </Form>
            </Formik>
        </main>
    )
}