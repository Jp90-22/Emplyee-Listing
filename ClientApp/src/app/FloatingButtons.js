import React from 'react'
import './FloatingButtons.css'

const FloatingButtons = ({ onClicks }) => {
    return (
        <div>
            <span href="#" class="float-buttons-menu" id="buttons-menu">
                <i class="fa fa-share float-button-text"></i>
            </span>
            <ul id="buttonsList">
                <li>
                    <button className="btn btn-primary" onClick={onClicks[0]}>
                        <i class="fas fa-plus"></i>
                    </button>
                </li>
                <li>
                    <button className="btn btn-primary" id="reloadButton" onClick={onClicks[1]}>
                        <i class="fas fa-redo-alt"></i>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default FloatingButtons