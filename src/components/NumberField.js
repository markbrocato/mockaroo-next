import React, { Component } from 'react';
import { TextField } from 'material-ui'

export default class NumberField extends Component {

    render() {
        let { 
            style = {}, 
            single, 
            double,
            small, 
            maxLength, 
            ...props 
        } = this.props
        
        this.applyStyle(style)

        if (single && !maxLength) {
            maxLength = 1
        } else if (double && !maxLength) {
            maxLength = 2
        }

        return (
            <TextField {...props} inputProps={{ style, maxLength }}/>
        )
    }

    applyStyle(style) {
        if (this.props.single) {
            style.width = '30px'
            style.textAlign = 'center'
        } else if (this.props.double) {
            style.width = '30px'
            style.textAlign = 'center'
        } else if(this.props.small) {
            style.minWidth = '70px'
            style.maxWidth = '90px'
        }
    }

}