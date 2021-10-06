import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

export default class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: []
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    componentDidMount() {
        EmployeeService.getEmployees().then((res) => {
            this.setState({ employees: res.data });
        });
    }

    addEmployee() {
        this.props.history.push('/save-employee/_add');
    }

    updateEmployee(id) {
        this.props.history.push(`/save-employee/${id}`);
    }

    deleteEmployee(id) {
        EmployeeService.deleteEmployee(id).then(res => {
            this.setState({ employees: this.state.employees.filter(employee => employee.employeeId !== id) });
        });
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="text-center">Employee List</h2>
                </div>
                <div>
                    <button className="btn btn-primary" onClick={this.addEmployee}>Add Employee</button>
                </div>

                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.employeeId}>
                                            <td>{employee.employeeId}</td>
                                            <td>{employee.employeeName}</td>
                                            <td>{employee.salary}</td>
                                            <td>
                                                <button className="btn btn-dark"
                                                    onClick={() => this.updateEmployee(employee.employeeId)}>Update</button>
                                                <button className="btn btn-danger" style={{ marginLeft: "10px" }}
                                                    onClick={() => this.deleteEmployee(employee.employeeId)}>Delete</button>
                                                <button className="btn btn-info" style={{ marginLeft: "10px" }}
                                                    onClick={() => this.viewEmployee(employee.employeeId)}>View</button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        )
    }
}
