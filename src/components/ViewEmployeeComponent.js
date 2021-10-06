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
                salary: res.data.salary
            })
        })
    }

    render() {
        return (
            <div>
                View
                <div>
                    {this.state.employeeName}
                </div>
            </div>
        )
    }
}
