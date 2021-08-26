import React from 'react'
import './FloatingButtons.css'

const FloatingButtons = ({ addAction, reloadAction }) => {
    return (
        <div>
            <span className="float-buttons-menu" id="buttons-menu">
                <i className="fa fa-share float-button-text"></i>
            </span>
            <ul id="buttonsList">
                <li>
                    <button className="btn btn-primary" onClick={() => window.scrollTo(0, 0)}>
                        <i class="fas fa-arrow-up"></i>
                    </button>
                </li>
                <li>
                    <button className="btn btn-primary" onClick={addAction}>
                        <i className="fas fa-plus"></i>
                    </button>
                </li>
                <li>
                    <button className="btn btn-primary" id="reloadButton" onClick={reloadAction}>
                        <i className="fas fa-redo-alt"></i>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default FloatingButtons