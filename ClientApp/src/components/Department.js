import * as React from 'react';
import {Table} from 'reactstrap';

export default class Department extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        depts: []
    }

    refreshDepartmentsList = () => {
        fetch(process.env.REACT_APP_API + "department")
            .then(response => response.json())
            .then(data => {
                this.setState({depts: data});
            });
    }

    componentDidMount() {
        this.refreshDepartmentsList();
    }

    componentDidUpdate() {
        this.refreshDepartmentsList();
    }

    render() {
        return(
            <div className="mt-5 d-flex justify-content-center">
                <h2 className="txt-secondary"> 
                    Table of Departments
                </h2>
            </div>
        )
    }
}
