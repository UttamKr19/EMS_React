import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService';
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from 'react-datepicker';
import '../App.css'
import moment from 'moment'

export default class SaveEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            employeeName: "",
            employeeId: "",
            salary: "",
            image: "",
            photoUrl: "",
            address: "",
            department: "",
            dateOfJoining: Date.now(),
            dateOfBirth: Date.now()
        }

        this.changeIdHandler = this.changeIdHandler.bind(this);
        this.changeNameHandler = this.changeNameHandler.bind(this);
        this.changeSalaryHandler = this.changeSalaryHandler.bind(this);
        this.changePhotoHandler = this.changePhotoHandler.bind(this);
        this.changeAddressHandler = this.changeAddressHandler.bind(this);
        this.changeDepartmentHandler = this.changeDepartmentHandler.bind(this);
        this.changeDateOfJoiningHandler = this.changeDateOfJoiningHandler.bind(this);
        this.changeDateOfBirthHandler = this.changeDateOfBirthHandler.bind(this);

        this.saveEmployee = this.saveEmployee.bind(this);
    }

    componentDidMount() {
        if (this.state.id === "_add") {
            this.setState({
                dateOfJoining: Date.now(),
                dateOfBirth: Date.now()
            });
        }
        else {
            EmployeeService.getEmployeeById(this.state.id).then(res => {
                let employee = res.data;
                this.setState({
                    employeeName: employee.employeeName,
                    employeeId: employee.employeeId,
                    salary: employee.salary,
                    photoUrl: employee.photoUrl,
                    address: employee.address,
                    department: employee.department,
                    dateOfJoining: moment(res.data.dateOfJoining.toString(), "DD/MM/YYYY").toDate(),
                    dateOfBirth: moment(res.data.dateOfBirth.toString(), "DD/MM/YYYY").toDate()
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
        this.setState({ salary: parseFloat(event.target.value) })
    }

    changePhotoHandler = (event) => {
        this.setState({ photoUrl: event.target.value })
    }

    changeAddressHandler = (event) => {
        this.setState({ address: event.target.value })
    }

    changeDepartmentHandler = (event) => {
        this.setState({ department: event.target.value })
    }

    changeDateOfJoiningHandler = (date) => {
        console.log('joining date ' + date)
        this.setState({ dateOfJoining: date })
    }

    changeDateOfBirthHandler = (date) => {
        this.setState({ dateOfBirth: date })
    }

    cancel() {
        this.props.history.push('/employees');
    }

    saveEmployee = (e) => {
        e.preventDefault();

        let doj = new Date(this.state.dateOfJoining);
        doj = doj.getDate() + "/" + (doj.getMonth() + 1) + "/" + doj.getFullYear();
        let dob = new Date(this.state.dateOfBirth);
        dob = dob.getDate() + "/" + (dob.getMonth() + 1) + "/" + dob.getFullYear();

        let employee = {
            employeeId: this.state.employeeId,
            employeeName: this.state.employeeName,
            salary: this.state.salary,
            photoUrl: this.state.photoUrl,
            address: this.state.address,
            department: this.state.department,
            dateOfJoining: doj,
            dateOfBirth: dob
        }

        console.log(employee);

        if (this.state.id === '_add') {
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

    getTitle() {
        if (this.state.id === '_add') {
            return "Add employee"
        }
        return "Update employee"
    }

    render() {
        return (
            <div style={{ marginBottom: "50px" }}>

                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            <h3 className="text-center"> {this.getTitle()}</h3>
                            <div className="card-body">
                                <form>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="employeeName">Name</label>
                                            <input type="text" className="form-control" id="employeeName" placeholder="name"
                                                value={this.state.employeeName} onChange={this.changeNameHandler}
                                                required="required" />
                                        </div>
                                        {
                                            this.state.id !== '_add' &&
                                            <div className="form-group">
                                                <label htmlFor="employeeId">Employee id</label>
                                                <input type="number" className="form-control" id="employeeId" placeholder="Employee Id"
                                                    value={this.state.employeeId} onChange={this.changeIdHandler} />
                                            </div>
                                        }


                                        <div className="form-group">
                                            <label htmlFor="department">Department</label>
                                            <input type="text" className="form-control" id="department" placeholder="department"
                                                value={this.state.department} onChange={this.changeDepartmentHandler} />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="salary">Salary</label>
                                            <input type="number" className="form-control" id="salary" placeholder="salary"
                                                value={this.state.salary} onChange={this.changeSalaryHandler} />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input type="text" className="form-control" id="address" placeholder="address"
                                            value={this.state.address} onChange={this.changeAddressHandler} />
                                    </div>

                                    <div className="form-group" >
                                        <label htmlFor="photoUrl">Photo url</label>
                                        <input type="text" className="form-control" id="photoUrl" placeholder="paste photo link"
                                            value={this.state.photoUrl} onChange={this.changePhotoHandler}
                                            style={{ width: "80%"}} />

                                        <img src={this.state.photoUrl}
                                            style={{ float:"right", width:"20%",width: "60px", height: "60px",marginTop:"-50px" }} />


                                    </div>

                                    <div>

                                        <div style={{ float: "left" }}>
                                            <div className="form-group">
                                                <label htmlFor="dateOfJoining">Date of Joining</label>
                                                <ReactDatePicker
                                                    id="dateOfJoining"
                                                    selected={this.state.dateOfJoining}
                                                    dateFormat="dd/MM/yyyy"
                                                    onChange={date => this.changeDateOfJoiningHandler(date)}
                                                    placeholderText="dd/mm/yyyy"
                                                />
                                            </div>


                                            <div className="form-group">
                                                <label htmlFor="dateOfBirth">Date of Birth</label>
                                                <ReactDatePicker
                                                    id="dateOfBirth"
                                                    selected={this.state.dateOfBirth}
                                                    dateFormat="dd/MM/yyyy"
                                                    onChange={date => this.changeDateOfBirthHandler(date)}
                                                    placeholderText="dd/mm/yyyy"
                                                />
                                            </div>
                                        </div>



                                    </div>
                                </form>
                            </div>

                            <div className="container">
                                <button type="submit" className="btn-lg btn-success" style={{ width: "40%" }}
                                    onClick={this.saveEmployee}>Save</button>
                                <button className="btn btn-outline-secondary"
                                    onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
