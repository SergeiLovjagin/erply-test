import style from "./SuperButton.module.scss";
import React from "react";

export const SuperButton = () => {
    return (
        <button className={style.submitBtn} type="submit">Login</button>
    )
}