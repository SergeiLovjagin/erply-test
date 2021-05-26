import React from "react";
import style from "./SuperInput.module.scss";
import {Field} from "formik";

type SuperInputProps = {
    id: string
    placeholder: string
    name: string
    type?: string
    errors?: string
    touched?: boolean
}

export const SuperInput: React.FC<SuperInputProps> = ({errors, touched, name, id, placeholder, type}) => {
    const required = `${touched && errors && style.required}`
    return (
        <>
            <Field type={type}
                   className={`${style.input} ${required}`}
                   id={id}
                   name={name}
                   placeholder={placeholder}
            />
        </>
    )
}