import React, { Component } from 'react'

export class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="#" className="navbar-brand" >Employee Management Web app</a></div>

                </nav>
            </div>
        )
    }
}

export default HeaderComponent
