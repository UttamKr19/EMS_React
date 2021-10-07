import React, { Component } from 'react'
import EmployeeService from '../services/EmployeeService'

export default class ViewEmployeeComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id
        }
    }

    componentDidMount() {
        EmployeeService.getEmployeeById(this.state.id).then(res => {
            this.setState({
                employeeName: res.data.employeeName,
                employeeId: res.data.employeeId,
                salary: res.data.salary,
                photoUrl: res.data.photoUrl,
                department: res.data.department,
                address: res.data.address,
                dateOfJoining: Date.parse(res.data.dateOfJoining.toString()),
                dateOfBirth: Date.parse(res.data.dateOfBirth.toString())
            })
        })
    }

    render() {
        return (
            <div>
                <div>
                    <h2 className="text-center">Employee Details</h2>
                    <hr/>
                </div>
                <div className="row">
                    <div className="col-sm-4" style={{height:"100%"}}>
                        <div className="card">
                            <div className="card-body">
                                <p><img src={this.state.photoUrl}
                                    style={{ width: "300px", height: "300px" }} /></p>
                                <h5 className="card-title">{this.state.employeeName}</h5>
                                <p className="card-text">An employee from {this.state.department} department.</p>
                                
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title" style={{float:"right"}}>Personal details</h5>
                                <p className="card-text"> Name : {this.state.employeeName}</p>
                                <p className="card-text"> Employee ID : {this.state.employeeId}</p>
                                <p className="card-text"> Address : {this.state.address}</p>
                            </div>
                        </div>
                        <hr/>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">More details</h5>
                                <p className="card-text"> Department : {this.state.department}</p>
                                <p className="card-text"> Date of birth : {new Date(this.state.dateOfBirth).toString().substr(0,15)} </p>
                                <p className="card-text"> Date of joining : {new Date(this.state.dateOfJoining).toString().substr(0,15)} </p>
                                <p className="card-text"> Salary : {this.state.salary}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
