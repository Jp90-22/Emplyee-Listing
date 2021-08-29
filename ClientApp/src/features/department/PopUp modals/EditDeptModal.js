import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { updateDepartmentThunk, lookDepartmentById } from '../departmentsSlice'
import {
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    Row, 
    Col, 
    Form, 
    Label, 
    Input, 
    Button
} from 'reactstrap';

const EditDeptModal = (props) => {
    const dispatch = useDispatch()

    const departmentToEdit = useSelector(state => 
        lookDepartmentById(state, props.targetid)
    )
    const { DepartmentId, DepartmentName } = departmentToEdit || ''
    const [inputDptName, setInputDptName] = useState(DepartmentName)
    
    useEffect(() => {
        setInputDptName(DepartmentName)
    }, [DepartmentName])

    const onInputChange = (e) => {
        setInputDptName(e.target.value)
    }

    const updateDepartment = (e) => {
        e.preventDefault()
        dispatch(updateDepartmentThunk({
            DepartmentId: DepartmentId,
            DepartmentName: inputDptName
        }))
        props.toggle()
    }

    return (
        <div className="container">

            <Modal {...props} centered size="lg">
            
                <ModalHeader>
                    Edit department
                </ModalHeader>
                
                <ModalBody>
                    <Form onSubmit={updateDepartment}>
                        <Row>
                            <Col sm={6}>
                                <Label for="inputDepartmentId">ID:</Label>
                                <Input 
                                    type="text" 
                                    id="inputDepartmentId"
                                    name="inputDepartmentId"
                                    required
                                    disabled
                                    value={DepartmentId} 
                                />

                                <Label for="inputDepartmentName">Department name:</Label>
                                <Input 
                                    type="text" 
                                    id="inputDepartmentName"
                                    name="inputDepartmentName"
                                    required
                                    maxLength={500}
                                    onChange={onInputChange} 
                                    value={inputDptName} 
                                    placeholder="ITexample" 
                                />
                                <br />
                                <Button color="info">Update department</Button>
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

export default EditDeptModal