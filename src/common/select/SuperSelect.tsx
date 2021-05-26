import {Field} from "formik";
import style from "./SuperSelect.module.scss";
import React from "react";

type SuperSelectProps = {
    id: string
    placeholder: string
    errors?: string
    touched?: boolean
    values?: any
    options?: any
}

export const SuperSelect: React.FC<SuperSelectProps> = ({options, values, touched, errors, placeholder, id}) => {
    const required = `${touched && errors && style.required}`
    return (
        <>
            <Field component={'select'}
                   className={`${style.input} ${required}`}
                   id={id} value={values}>
                <option value={''} className={style.defaultValue} defaultValue={''} disabled>{placeholder}</option>
                {
                    options?.map((el: any, index: React.Key) => {
                        return <option key={index} value={el}>{el}</option>
                    })
                }
            </Field>
        </>
    )
}