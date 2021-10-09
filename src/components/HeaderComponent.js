import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

export class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <header className="text-white bg-dark header"
                style={{ marginBottom: "10px", verticalAlign: "middle" }}>
                <Link to='/'>
                    <i className="fa fa-home" aria-hidden="true"
                        style={{ float: "left", paddingLeft: "2px", paddingRight: "2px" }}>
                    </i>
                </Link>

                Employee Management Web App</header>
        )
    }
}

export default HeaderComponent
