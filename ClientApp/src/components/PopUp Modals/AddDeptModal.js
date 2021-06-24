import * as React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Row, Col, Form, Label, Input, Button} from 'reactstrap';

export default class AddDeptModal extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    addNewDepartment = (evt) => {
        evt.preventDefault(); 
    }

    render() {
        
        return (
            <div className="container">

                <Modal {...this.props} centered size="lg">
                
                    <ModalHeader>
                        Add a new department
                    </ModalHeader>
                    
                    <ModalBody>
                        <Form>
                            <Row>
                                <Col sm={6}>
                                    <Label for="inputDepartmentName">Department name:</Label>
                                    <Input type="text" id="inputDepartmentName" placeholder="ITexample" />
                                </Col>
                            </Row>
                            <br />
                            <Row>
                                <Col sm={6}>
                                    <Button color="info" onClick={this.addNewDepartment}>Add department</Button>
                                </Col>
                            </Row>
                        </Form>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button color="danger" onClick={this.props.toggle}>Close</Button>
                    </ModalFooter>

                </Modal>

            </div>
        );
    }
}
