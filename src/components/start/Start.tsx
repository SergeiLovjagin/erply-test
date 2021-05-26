import React, {useState} from "react";
import style from "./Start.module.scss";
import {Form, Formik} from "formik";
import {SuperInput} from "../../common/input/SuperInput";
import {SuperButton} from "../../common/button/SuperButton";
import {SuperSelect} from "../../common/select/SuperSelect";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {RootReducerType} from "../../redux/store";
import {saveDataThunkAction, SavedConfiguration} from "../../redux/dataReducer";

export const Start = () => {
    const [correctEmail, setCorrectEmail] = useState('')
    const dispatch = useDispatch()
    const alertMessage = useSelector<RootReducerType, Array<string | boolean | null>>(state => state.data.alertMessage)
    const {
        companyName,
        email,
        websiteUrl
    } = useSelector<RootReducerType, SavedConfiguration>(state => state.data.savedConfiguration)

    const wareHouses = useSelector<RootReducerType, string[]>(state => state.data.warehouses.map((el: any) => el.name))
    const paymentMethods = useSelector<RootReducerType, string[]>(state => state.data.paymentsMethods.map((el: any) => el.type))
    const paymentTypes = ['Paypal']

    return (
        <main className={style.main}>
            {alertMessage[1] === false &&
            <div className={style.errorModule}>
                <span className={style.errorMessage}>{alertMessage[0]}</span>
            </div>}
            {alertMessage[1] === true &&
            <div className={style.errorModuleSuccess}>
                <span className={style.errorMessage}>{alertMessage[0]}</span>
            </div>}

            <Formik
                initialValues={{
                    companyName: companyName,
                    websiteUrl: websiteUrl,
                    warehouse: '',
                    email: email,
                    paymentGateway: '',
                    erplyPaymentType: '',
                }}
                validationSchema={Yup.object({
                    companyName: Yup.string()
                        .required("Required"),
                    websiteUrl: Yup.string()
                        .matches(
                            /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
                            'Enter correct url!'
                        )
                        .required("Required"),
                    warehouse: Yup.string()
                        .required("Required"),
                    email: Yup.string()
                        .required("Required"),
                    paymentGateway: Yup.string()
                        .required("Required"),
                    erplyPaymentType: Yup.string()
                        .required("Required"),
                })}

                onSubmit={async (values, {resetForm}) => {
                    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                        setCorrectEmail('Email format is not supported')
                    } else {
                        // await new Promise((r) => setTimeout(r, 500));
                        dispatch(saveDataThunkAction(values))
                        setCorrectEmail('')
                        resetForm()
                    }
                }}>
                {({errors, values, touched}) => (
                    <Form className={style.form}>
                        <h2>Basic Information</h2>
                        <div className={style.basicInfo}>
                            <SuperInput id={'companyName'}
                                        name={'companyName'}
                                        placeholder={'Insert Company Name'}
                                        errors={errors.companyName}
                                        touched={touched.companyName}
                            />
                            <SuperInput id={'websiteUrl'}
                                        name={'websiteUrl'}
                                        placeholder={'https://www.erply.com'}
                                        errors={errors.websiteUrl}
                                        touched={touched.websiteUrl}
                            />
                            <SuperSelect id={'warehouse'}
                                         placeholder={'Select Warehouse'}
                                         errors={errors.warehouse}
                                         touched={touched.warehouse}
                                         values={values.warehouse}
                                         options={wareHouses}
                            />
                            {correctEmail.length > 0 && <span className={style.emailError}>{correctEmail}</span>}
                            <SuperInput id={'email'}
                                        name={'email'}
                                        placeholder={'Insert Email'}
                                        errors={errors.email}
                                        touched={touched.email}
                            />
                        </div>
                        <h2>Payment Types Mapping</h2>
                        <div className={style.paymentType}>
                            <SuperSelect id={'paymentGateway'}
                                         placeholder={'Select Payment Gateway'}
                                         errors={errors.paymentGateway}
                                         touched={touched.paymentGateway}
                                         values={values.paymentGateway}
                                         options={paymentTypes}
                            />
                            <SuperSelect id={'erplyPaymentType'}
                                         placeholder={'Select Erply Payment Type'}
                                         errors={errors.erplyPaymentType}
                                         touched={touched.erplyPaymentType}
                                         values={values.erplyPaymentType}
                                         options={paymentMethods}
                            />
                        </div>
                        <SuperButton/>
                    </Form>
                )}
            </Formik>
        </main>
    )
}