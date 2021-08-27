import React from 'react'
import './FloatingButtons.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { UncontrolledTooltip } from 'reactstrap';

const FloatingButtons = ({ addAction, reloadAction }) => {
    return (
        <div>
            <span className="float-buttons-menu" href="#" id="buttons-menu">
                <FontAwesomeIcon icon={['fas', 'tools']} className="float-button-text"/>
            </span>
            <ul id="buttonsList">
                <li>
                    <button id="go2TopBtn" className="btn btn-primary" onClick={() => window.scrollTo(0, 0)}>
                        <FontAwesomeIcon icon={['fas', 'arrow-up']} />
                    </button>
                    <UncontrolledTooltip target="go2TopBtn" placement="left">
                        Go to top
                    </UncontrolledTooltip>
                </li>
                <li>
                    <button id="addBtn" className="btn btn-primary" onClick={addAction}>
                        <FontAwesomeIcon icon={['fas', 'plus']} />
                    </button>
                    <UncontrolledTooltip target="addBtn" placement="left">
                        Add a new item to table
                    </UncontrolledTooltip>
                </li>
                <li>
                    <button className="btn btn-primary" id="reloadButton" onClick={reloadAction}>
                        <FontAwesomeIcon icon={['fas', 'redo-alt']} />
                    </button>
                    <UncontrolledTooltip target="reloadButton" placement="left">
                        Reload the table
                    </UncontrolledTooltip>
                </li>
            </ul>
        </div>
    )
}

export default FloatingButtons