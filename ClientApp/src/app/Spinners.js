import React from 'react'
import { Spinner } from "reactstrap"
import "./Spinners.css"

export const AbsoluteCentralizedSpinner = ({ type = "border"}) => {
    return (
        <div className="Centralizer-container Absolute-Centralizer-container">
            <Spinner type={type} style={{width: "3rem", height: "3rem"}} color="info" />
        </div>
    )
}

export const PhotoSpinner = () => {
    return (
        <div className="Centralizer-container Absolute-Centralizer-container Opacity-Container">
            <Spinner style={{width: "1.5rem", height: "1.5rem"}} color="warning" />
        </div>
    )
}

export const InputAlongsideSpinner = () => {
    return (
        <span>
            <Spinner type="grow" color="warning" size="sm" />
        </span>
    )
}
