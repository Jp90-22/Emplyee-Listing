import React from 'react'
import './FloatingButtons.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const FloatingButtons = ({ addAction, reloadAction }) => {
    return (
        <div>
            <span className="float-buttons-menu" id="buttons-menu">
                <FontAwesomeIcon icon={['fas', 'share']} className="float-button-text"/>
            </span>
            <ul id="buttonsList">
                <li>
                    <button className="btn btn-primary" onClick={() => window.scrollTo(0, 0)}>
                        <FontAwesomeIcon icon={['fas', 'arrow-up']} />
                    </button>
                </li>
                <li>
                    <button className="btn btn-primary" onClick={addAction}>
                        <FontAwesomeIcon icon={['fas', 'plus']} />
                    </button>
                </li>
                <li>
                    <button className="btn btn-primary" id="reloadButton" onClick={reloadAction}>
                        <FontAwesomeIcon icon={['fas', 'redo-alt']} />
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default FloatingButtons