import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getDepartmentsThunk,
    deleteDepartmentThunk,
    getDeparments,
    selectStateStatus
} from './departmentsSlice'

import { 
    Table,
    Form,
    FormGroup,
    Input,
    Button, 
    ButtonToolbar, 
    ButtonGroup,
    UncontrolledTooltip
} from 'reactstrap';
import { AbsoluteCentralizedSpinner } from '../../app/Spinners'
import FloatingButtons from '../../app/FloatingButtons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddDeptModal from './PopUp modals/AddDeptModal';
import EditDeptModal from './PopUp modals/EditDeptModal';

const Department = () => {
    const dispatch = useDispatch()
    
    const departments = useSelector(getDeparments)
    const departmentStateStatus = useSelector(selectStateStatus)
    const error = useSelector(state => state.Department.error)

    const [canGetDepartments, setCanGetDepartments] = useState(true)
    const [modalAddOpened, setModalAddOpened] = useState(false)
    const [modalEditOpened, setModalEditOpened] = useState(false)
    const [departmentToEdit, setDepartmentToEdit] = useState(null)
    const [departmentToShow, setDepartmentToShow] = useState(departments)

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
        if(window.confirm("Are you sure you want to delete this department? (This action can't be undone)")) {
            dispatch(deleteDepartmentThunk(DepartmentId))
        }

        setCanGetDepartments(true)
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

    const Tbody = ({ departments }) => {
        const tRows = departments.map(
            (department, idx) => (
                <tr key={idx}>
                    <td>{department.DepartmentId}</td>
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
    
    if (departmentStateStatus === 'rejected') {
        alert("Something went worng!\n" + error.message)
    }

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
                
            
            <Form className="pb-2 w-auto" inline onSubmit={onFormSearchSubmit}>
                <FormGroup className="w-100 justify-content-end">
                    <div className="d-inline-flex w-50 justify-content-end">
                        <Input
                            id="iptSearch"
                            className="d-inline-block" 
                            type="text" 
                            required
                            onChange={onIptSearchChange}
                            placeholder="Search item by name..." 
                        />
                    </div>
                    <Button id="searchBtn" className="ml-1" type="submit" color="primary">
                        <FontAwesomeIcon icon={['fas', 'search']} />
                    </Button>

                    <UncontrolledTooltip target="searchBtn" placement="top">
                        Search it
                    </UncontrolledTooltip>
                </FormGroup>
            </Form>

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

            {(departmentStateStatus === 'pending')? <AbsoluteCentralizedSpinner /> : null}
        </div>
    )
}

export default Department
