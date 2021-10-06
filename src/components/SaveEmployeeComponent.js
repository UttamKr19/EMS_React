import { getByTitle } from '@testing-library/react';
import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';

export default class SaveEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employeeName: "",
            employeeId: "",
            salary: ""
        }

        this.changeIdHandler = this.changeIdHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeIdHandler = this.changeIdHandler.bind(this);
        this.saveEmployee = this.saveEmployee.bind(this);
    }

    componentDidMount() {
        if (this.state.id === "_add") {
            return
        }
        else {
            EmployeeService.getEmployeeById(this.state.id).then(res => {
                let employee = res.data;
                this.setState({
                    employeeName: employee.employeeName,
                    employeeId: employee.employeeId,
                    salary: employee.salary
                })
            })
        }

    }

    changeNameHandler = (event) => {
        this.setState({ employeeName: event.target.value })
    }

    changeIdHandler = (event) => {
        this.setState({ employeeId: parseInt(event.target.value) })
    }

    changeSalaryHandler = (event) => {
        this.setState({ salary: parseInt(event.target.value) })
    }

    cancel() {
        this.props.history.push('/employees');
    }

    saveEmployee = (e) => {
        e.preventDefault();

        let employee = {
            employeeId: this.state.employeeId,
            employeeName: this.state.employeeName,
            salary: this.state.salary
        }

        if (this.state.id == '_add') {
            EmployeeService.addEmployee(employee).then(res => {
                this.props.history.push('/employees');
            })
        }
        else {
            EmployeeService.updateEmployee(employee, this.state.employeeId).then(res => {
                this.props.history.push('/employees');
            })
        }

    }

    getTitle(){
        if (this.state.id === '_add') {
            return "Add employee"
        }
        return "Update employee"
    }

    render() {
        return (
            <div>

                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center"> {this.getTitle()}</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label for="employeeName">Name</label>
                                            <input type="text" className="form-control" id="employeeName" placeholder="Name"
                                                value={this.state.employeeName} onChange={this.changeNameHandler} />
                                        </div>
                                        <div className="form-group">
                                            <label for="employeeId">Employee id</label>
                                            <input type="number" className="form-control" id="employeeId" placeholder="Employee Id"
                                                value={this.state.employeeId} onChange={this.changeIdHandler} />
                                        </div>

                                        <div className="form-group">
                                            <label for="salary">Salary</label>
                                            <input type="number" className="form-control" id="salary" placeholder="salary"
                                                value={this.state.salary} onChange={this.changeSalaryHandler} />
                                        </div>
                                    </div>

                                    <hr />

                                    {/* <div className="form-group">
                                        <label for="inputAddress2">Address 2</label>
                                        <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-md-6">
                                            <label for="inputCity">City</label>
                                            <input type="text" className="form-control" id="inputCity" />
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label for="inputState">State</label>
                                            <select id="inputState" className="form-control">
                                                <option selected>Choose...</option>
                                                <option>...</option>
                                            </select>
                                        </div>
                                    </div> */}

                                    <button type="submit" className="btn btn-primary" onClick={this.saveEmployee}>Save</button>
                                    <button className="btn btn-secondary" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
