import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import {
    getDepartmentsThunk,
    deleteDepartmentThunk,
    getDeparments,
    selectStateStatus
} from './departmentsSlice'

import { 
    Table,
    Button, 
    ButtonToolbar, 
    ButtonGroup,
    UncontrolledTooltip
} from 'reactstrap';
import SearchBar from '../../app/SearchBar'
import { AbsoluteCentralizedSpinner } from '../../app/Spinners'
import FloatingButtons from '../../app/FloatingButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddDeptModal from './PopUp modals/AddDeptModal';
import EditDeptModal from './PopUp modals/EditDeptModal';
import SweetAlert from 'react-bootstrap-sweetalert';
import ErrorAlert from '../../app/ErrorAlert'

const Department = () => {
    const dispatch = useDispatch()
    
    const departments = useSelector(getDeparments)
    const departmentStateStatus = useSelector(selectStateStatus)
    const stateError = useSelector(state => state.Department.error)

    const [canGetDepartments, setCanGetDepartments] = useState(true)
    const [modalAddOpened, setModalAddOpened] = useState(false)
    const [modalEditOpened, setModalEditOpened] = useState(false)
    const [departmentToEdit, setDepartmentToEdit] = useState(null)
    const [departmentToShow, setDepartmentToShow] = useState(departments)
    const [alertProps, setAlertProps] = useState({ title: "", onConfirm: () => null })
    const [alertMessage, setAlertMessage] = useState("")
    const [isAlertShowing, setIsAlertShowing] = useState(false)
    const [errorAlertMessage, setErrorAlertMessage] = useState("")
    const [isErrorAlertShowing, setIsErrorAlertShowing] = useState(false)

    // Handling Popup modals events (Pop up and Pop out)
    const enterAddMode = () => { 
        setModalAddOpened(!modalAddOpened)
    }

    const exitAddMode = () => { 
        setModalAddOpened(!modalAddOpened)
        setCanGetDepartments(true) 
    }

    const enterEditMode = (DepartmentId) => {
        setDepartmentToEdit(DepartmentId)
        setModalEditOpened(!modalEditOpened)
    }

    const exitEditMode = () => { 
        setModalEditOpened(!modalEditOpened)
        setCanGetDepartments(true) 
    }

    const enterDeleteMode = (DepartmentId) => {
        setAlertProps({
            warning: true,
            showCancel: true,
            confirmBtnText: "Yes, delete it!",
            confirmBtnBsStyle: "danger",
            title: "Are you sure?",
            onConfirm: () => {
                setIsAlertShowing(false)
                deleteDepartment(DepartmentId)
            },
            focusCancelBtn: true
        })

        setAlertMessage("Do you want to delete this department? (This action can't be undone)")

        setIsAlertShowing(true)
    }

    const deleteDepartment = (DepartmentId) => {
        dispatch(deleteDepartmentThunk(DepartmentId))
            .then(unwrapResult)
            .then(() => {
                setAlertProps({
                    success: true,
                    title: "Department deleted",
                    onConfirm: () => {
                        setIsAlertShowing(false)
                        setCanGetDepartments(true)
                    }
                })

                setAlertMessage("The department was deleted from the data base!")

                setIsAlertShowing(true)
            })
    }

    // Dispatching, getting, and redering data
    useEffect(() => {
        if (canGetDepartments) {
            dispatch(getDepartmentsThunk())
            setCanGetDepartments(false)
        } 
    }, [canGetDepartments, dispatch])

    useEffect(() => {
        setDepartmentToShow(departments)
    }, [departments])

    useEffect(() => {
        if (stateError) {
            setErrorAlertMessage(stateError.message)
            setIsErrorAlertShowing(true)
        }
    }, [stateError])

    let Tbody = ({ departments }) => {
        const tRows = departments.map(
            (department, idx) => (
                <tr key={idx}>
                    <th scope="row">{department.DepartmentId}</th>
                    <td>{department.DepartmentName}</td>

                    {/* Department actions */}
                    <td>
                        <ButtonToolbar>
                            <ButtonGroup size="sm">
                                <Button
                                    id={'editItemBtn' + idx}
                                    color="info" 
                                    outline 
                                    onClick={() => enterEditMode(department.DepartmentId)}
                                >
                                    <FontAwesomeIcon icon={['fas', 'edit']} />
                                </Button>

                                <Button
                                    id={'delItemBtn' + idx}
                                    color="danger" 
                                    outline 
                                    onClick={() => enterDeleteMode(department.DepartmentId)}
                                >
                                    <FontAwesomeIcon icon={['fas', 'trash-alt']} />
                                </Button>

                                {/* Tooltips */}
                                <UncontrolledTooltip target={'editItemBtn' + idx} autohide={false} placement="left">
                                    Edit item
                                </UncontrolledTooltip>

                                <UncontrolledTooltip target={'delItemBtn' + idx} autohide={false} placement="bottom">
                                    Delete item
                                </UncontrolledTooltip>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </td>
                </tr>
            )
        )

        return (
            <tbody>
                {tRows}
            </tbody>
        )
    }
    
    Tbody = React.memo(Tbody) // Memoized Tbody component props

    // Search Algorimth
    const searchByName = (name = "") => {
        const newEntries = departments.filter(
            (department) => department.DepartmentName.toLocaleLowerCase().includes(name.toLocaleLowerCase())
        )
        
        setDepartmentToShow(newEntries)
    }

    // Search handler
    const onIptSearchChange = (e) => searchByName(e.target.value)

    const onFormSearchSubmit = (e) => {
        e.preventDefault();
        searchByName(e.target.iptSearch.value)
    }

    return (
        <div className="my-5 d-flex flex-column justify-content-center">
            <h2 className="txt-secondary">
                Table of Departments
            </h2>
                
            <SearchBar onSearchBarSubmit={onFormSearchSubmit} onIptSearchChange={onIptSearchChange} />

            <Table striped hover bordered responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Department name</th>
                        <th>Options</th>
                    </tr>
                </thead>

                {(departmentToShow.length !== 0)? <Tbody departments={departmentToShow} /> 
                        : null}
            </Table>
            
            <FloatingButtons addAction={enterAddMode} reloadAction={() => dispatch(getDepartmentsThunk())} />

            {/* Pop up Add modal */}
            <AddDeptModal isOpen={modalAddOpened} toggle={exitAddMode} />
            <EditDeptModal isOpen={modalEditOpened} toggle={exitEditMode} targetid={departmentToEdit} />

             {/* Alert */}
            <SweetAlert show={isAlertShowing} {...alertProps} onCancel={() => setIsAlertShowing(false)}>
                {alertMessage}
            </SweetAlert>
            <ErrorAlert
                show={isErrorAlertShowing}
                onCancel={() => setIsErrorAlertShowing(false)}
                onConfirm={() => setIsErrorAlertShowing(false)}
                errorMessage={errorAlertMessage}
            />

            {(departmentStateStatus === 'pending')? <AbsoluteCentralizedSpinner /> : null}
        </div>
    )
}

export default Department
