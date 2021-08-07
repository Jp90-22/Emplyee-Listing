import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { postDepartmentThunk } from '../departmentsSlice'
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

const AddDeptModal = (props) => {
    const dispatch = useDispatch()

    const [inputDptName, setInputDptName] = useState('')

    const onInputChange = (e) => {
        setInputDptName(e.target.value)
    }

    const addNewDepartment = (e) => {
        e.preventDefault()
        dispatch(postDepartmentThunk({ DepartmentName: inputDptName}))
        setInputDptName('')
        props.toggle()
    }

    return (
        <div className="container">

            <Modal {...props} centered size="lg">
            
                <ModalHeader>
                    Add a new department
                </ModalHeader>
                
                <ModalBody>
                    <Form onSubmit={addNewDepartment}>
                        <Row>
                            <Col sm={6}>
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
                                <Button color="info">Add department</Button>
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

export default AddDeptModal
