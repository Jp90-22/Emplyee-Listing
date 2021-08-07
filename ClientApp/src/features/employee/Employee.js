import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    getEmployeesThunk,
    deleteEmployeeThunk,
    getEmployees,
    selectStateStatus
} from './employeesSlice'

import { 
    Table, 
    Button, 
    ButtonToolbar, 
    ButtonGroup
} from 'reactstrap';
import { AbsoluteCentralizedSpinner } from '../../app/Spinners'
import FloatingButtons from '../../app/FloatingButtons'
import AddEmpModal from './PopUp modals/AddEmpModal';
import EditEmpModal from './PopUp modals/EditEmpModal';

const Employee = () => {
    const dispatch = useDispatch()
    
    const employees = useSelector(getEmployees)
    const employeeStateStatus = useSelector(selectStateStatus)
    const error = useSelector(state => state.Employee.error)

    const [canGetEmployees, setCanGetEmployees] = useState(false)
    const [modalAddOpened, setModalAddOpened] = useState(false)
    const [modalEditOpened, setModalEditOpened] = useState(false)
    const [employeeToEdit, setEmployeeToEdit] = useState(null)
    
    // Handling Popup modals events (Pop up and Pop out)
    const enterAddMode = () => { 
        setModalAddOpened(!modalAddOpened)
    }

    const exitAddMode = () => { 
        setModalAddOpened(!modalAddOpened)
        setCanGetEmployees(true) 
    }

    const enterEditMode = (EmployeeId) => {
        setEmployeeToEdit(EmployeeId)
        setModalEditOpened(!modalEditOpened)
    }

    const exitEditMode = () => { 
        setModalEditOpened(!modalEditOpened)
        setCanGetEmployees(true) 
    }

    const enterDeleteMode = (EmployeeId) => {
        if(window.confirm("Are you sure you want to delete this employee? (This action can't be undone)")) {
            dispatch(deleteEmployeeThunk(EmployeeId))
        }

        setCanGetEmployees(true)
    }

    // Dispatching, getting, and redering data
    useEffect(() => {
        setCanGetEmployees(true)
    }, [])

    useEffect(() => {
        if (canGetEmployees) {
            dispatch(getEmployeesThunk())
            setCanGetEmployees(false)
        } 
    }, [canGetEmployees, dispatch])

    let tableRows
    if (employees) {
        tableRows = employees.map(
            (employee, idx) => (
                <tr key={idx}>
                    <td>{employee.EmployeeId}</td>
                    <td>{employee.EmployeeName}</td>
                    <td>{employee.Department}</td>
                    <td>{employee.DateOfJoining}</td>

                    {/* Department actions */}
                    <td>
                        <ButtonToolbar>
                            <ButtonGroup size="sm">
                                <Button color="info" outline onClick={() => enterEditMode(employee.EmployeeId)}>Edit</Button>
                                <Button color="danger" outline onClick={() => enterDeleteMode(employee.EmployeeId)}>Delete</Button>
                            </ButtonGroup>
                        </ButtonToolbar>
                    </td>
                </tr>
            )
        )
    }
    
    if (employeeStateStatus === 'rejected') {
        alert("Something went worng!\n" + error.message)
    }

    return (
        <div className="my-5 d-flex flex-column justify-content-center">
            <h2 className="txt-secondary">
                Table of Departments
            </h2>
                
            <Table striped hover bordered responsive>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Employee name</th>
                        <th>Department</th>
                        <th>Date of Joining</th>
                        <th>Options</th>
                    </tr>
                </thead>

                <tbody>
                    {tableRows}
                </tbody>
            </Table>
            
            <FloatingButtons onClicks={[enterAddMode, () => dispatch(getEmployeesThunk())]} />

            {/* Pop up Add modal */}
            <AddEmpModal isOpen={modalAddOpened} toggle={exitAddMode} />
            <EditEmpModal isOpen={modalEditOpened} toggle={exitEditMode} targetid={employeeToEdit} />

            {(employeeStateStatus === 'pending')? <AbsoluteCentralizedSpinner /> : null}
        </div>
    )
}

export default Employee

