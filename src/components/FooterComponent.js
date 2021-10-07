import React, { Component } from 'react'

export default class FooterComponent extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    
    render() {
        return (
            <div>
                <footer className="footer">
                <i className="fa fa-copyright" aria-hidden="true"></i>
                <span className="text-muted"> Uttam Kumar | All rights reserved 2021</span>
                </footer>
            </div>
        )
    }
}
