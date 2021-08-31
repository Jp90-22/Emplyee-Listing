import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { 
    updateEmployeeThunk, 
    getAllDeparmentsNamesThunk, 
    savePhotoThunk,
    selectPhotoStatus,
    lookEmployeeById,
    selectDptNamesStatus
} from '../employeesSlice'

import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Row, 
    Col, 
    Form,
    FormGroup,
    Label, 
    Input, 
    Button,
    UncontrolledTooltip
} from 'reactstrap';
import { InputAlongsideSpinner, PhotoSpinner } from '../../../app/Spinners'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const EditEmpModal = (props) => {
    const dispatch = useDispatch()

    const employeeToEdit = useSelector(state => 
        lookEmployeeById(state, props.targetid)
    )
    const { 
        EmployeeId, 
        EmployeeName, 
        Department, 
        DateOfJoining, 
        PhotoFileName 
    } = employeeToEdit || ''
    
    const dptNamesStatus = useSelector(selectDptNamesStatus)
    const photoStatus = useSelector(selectPhotoStatus)

    const [inputEmpName, setInputEmpName] = useState('')
    const [inputEmpDepartment, setInputEmpDepartment] = useState('')
    const [inputEmpDateOfJoining, setInputEmpDateOfJoining] = useState('')
    const [departmentOptions, setDepartmentOptions] = useState([])
    const [photoThumbnail, setPhotoThumbnail] = useState("anonymous.jpg")
    
    const imageSrc = process.env.REACT_APP_PHOTOSPATH + photoThumbnail;
    
    useEffect(() => {
        setInputEmpName(EmployeeName)
        setInputEmpDepartment(Department)
        
        if (DateOfJoining !== 'NOT SETTED') {
            setInputEmpDateOfJoining(DateOfJoining)
        } else setInputEmpDateOfJoining('')
        
        setPhotoThumbnail(PhotoFileName)
    }, [EmployeeId, EmployeeName, Department, DateOfJoining, PhotoFileName])

    const ReloadDepartments = useCallback(() => {
        dispatch(getAllDeparmentsNamesThunk())
            .then(unwrapResult)
            .then(data => {
                setDepartmentOptions(
                    data.map(({ DepartmentName }, idx) => (
                        <option key={idx} value={DepartmentName}>{DepartmentName}</option>
                        ))
                    )
                }
            )
    }, [dispatch])

    useEffect(() => ReloadDepartments(), [ReloadDepartments])
    
    const onInputEmpNameChange = (e) => setInputEmpName(e.target.value)
    const onInputEmpDepartmentChange = (e) => setInputEmpDepartment(e.target.value)
    const onInputEmpDateOfJoiningChange = (e) => setInputEmpDateOfJoining(e.target.value)

    const onChangePhoto = (e) => {
        e.preventDefault();

        const formData = new FormData()
        formData.append("myPhoto", e.target.files[0], e.target.files[0].name)
        
        dispatch(savePhotoThunk(formData))
            .then(unwrapResult)
            .then(data => {
                setPhotoThumbnail(data)
            })
    }

    const updateEmployee = (e) => {
        e.preventDefault()

        dispatch(updateEmployeeThunk({ 
            EmployeeId,
            EmployeeName: inputEmpName,
            Department: inputEmpDepartment,
            DateOfJoining: inputEmpDateOfJoining,
            PhotoFileName: photoThumbnail
        })).then(() => {
            props.toggle()
            setInputEmpName('')
            setInputEmpDepartment('')
            setInputEmpDateOfJoining('')
            setPhotoThumbnail("anonymous.jpg")
        })
    }

    return (
        <div className="container">

            <Modal {...props} centered size="lg">
            
                <ModalHeader>
                    Update an employee
                </ModalHeader>
                
                <ModalBody>
                    <Form onSubmit={updateEmployee}>
                        <Row>
                            <Col sm={6}>
                                <FormGroup>
                                    <Label for="inputEmployeeId">ID:</Label>
                                    <Input 
                                        type="text" 
                                        id="inputEmployeeId"
                                        name="inputEmployeeId"
                                        required
                                        disabled
                                        value={EmployeeId} 
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="inputEmployeeName">Employee name:</Label>
                                    <Input 
                                        type="text" 
                                        id="inputEmployeeName"
                                        name="inputEmployeeName"
                                        required
                                        maxLength={300}
                                        onChange={onInputEmpNameChange} 
                                        value={inputEmpName} 
                                        placeholder="Jonh Rodriguez" 
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="inputEmployeeDepartment">
                                        Department: 
                                        {(dptNamesStatus === 'pending')? <InputAlongsideSpinner /> : null}
                                    </Label>
                                    <div className="d-flex">
                                        <Input 
                                            type="select" 
                                            id="inputEmployeeDepartment"
                                            name="inputEmployeeDepartment"
                                            required
                                            onChange={onInputEmpDepartmentChange}
                                            value={inputEmpDepartment}
                                        >
                                            <option value=""></option>
                                            {departmentOptions}
                                        </Input>
                                        <Button
                                            id="reloadDptBtn"
                                            className="ml-2"
                                            type="button" 
                                            outline 
                                            color="info"
                                            size="sm"
                                            disabled={dptNamesStatus === 'pending'}
                                            onClick={ReloadDepartments}
                                        >
                                            <FontAwesomeIcon icon={['fas', 'redo-alt']} />
                                        </Button>
                                        <UncontrolledTooltip target="reloadDptBtn" placement="top">
                                            Reload department names
                                        </UncontrolledTooltip>
                                    </div>
                                </FormGroup>

                                <FormGroup>
                                    <Label for="inputEmployeeDateOfJoining">Date of Joining:</Label>
                                    <Input 
                                        type="date" 
                                        id="inputEmployeeDateOfJoining"
                                        name="inputEmployeeDateOfJoining"
                                        maxLength={10}
                                        onChange={onInputEmpDateOfJoiningChange} 
                                        value={inputEmpDateOfJoining} 
                                    />
                                </FormGroup>

                            </Col>

                            <Col className="mt-3" sm={6}>
                                <div className="position-relative" style={{width: "fit-content", height: "fit-content"}}>
                                    <img 
                                        src={imageSrc} 
                                        className="rounded img-thumbnail img-fluid" 
                                        alt="The employee for update"
                                    />
                                    {(photoStatus === 'sending')? <PhotoSpinner /> : null}
                                </div>
                                <Input type="file" onChange={onChangePhoto} />
                            </Col>
                        </Row>
                        <Row>
                            <Col className="mt-3" sm={6}>
                                <Button color="info">Update employee</Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
                
                <ModalFooter>
                    <Button color="danger" onClick={props.toggle}>Close</Button>
                </ModalFooter>

            </Modal>

        </div>
    )
}

export default EditEmpModal
