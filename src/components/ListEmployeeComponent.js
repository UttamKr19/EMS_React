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
        const r = window.confirm("Do you really want to delete this employee information?"); if (r === true) {
            EmployeeService.deleteEmployee(id).then(res => {
                this.setState({ employees: this.state.employees.filter(employee => employee.employeeId !== id) });
            });
        }

    }

    viewEmployee(id) {
        this.props.history.push(`/view-employee/${id}`);
    }

    render() {
        return (
            <div style={{marginBottom:"50px"}}>
                <div>
                    <h2 className="text-center">Employee Database ( Total : {this.state.employees.length} )</h2>
                </div>
                <div>
                    <i className="btn btn-success btn-lg fas fa-plus-circle"
                        onClick={this.addEmployee}>
                        <span style={{ fontFamily: 'sans-serif', marginLeft: "10px" }}>Add Employee</span>
                    </i>
                </div>

                <div>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Photo </th>
                                <th scope="col">Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">DOB</th>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.employees.map(
                                    employee =>
                                        <tr key={employee.employeeId}>
                                            <td><img src={employee.photoUrl} 
                                                onClick={() => this.viewEmployee(employee.employeeId)} 
                                                style={{ width: "50px", height: "50px" , cursor:'pointer'}}></img>
                                            </td>
                                            
                                            <td><b onClick={() => this.viewEmployee(employee.employeeId)}>{employee.employeeName}</b></td>
                                            
                                            <td>{employee.department}</td>
                                            
                                            <td>{employee.dateOfBirth != null ? employee.dateOfBirth.toString().split('T')[0] : " - "}</td>
                                            
                                            <td>
                                                <button className="btn" style={{marginLeft:"0px"}}
                                                    onClick={() => this.updateEmployee(employee.employeeId)}>
                                                    <i className="fa fa-edit" aria-hidden="true"></i>
                                                </button>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" style={{ marginLeft: "0px" }}
                                                    onClick={() => this.deleteEmployee(employee.employeeId)}>
                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                </button>
                                            </td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>


            </div >
        )
    }
}
