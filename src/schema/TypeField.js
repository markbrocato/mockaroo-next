import React, { Component } from 'react'
import { TextField } from 'material-ui'
import { ArrowDropDown } from 'material-ui-icons'
import './TypeField.less'

export default class TypeField extends Component {
    render() {
        const { value } = this.props;

        return (
            <div className="typefield">
                <TextField 
                    readonly 
                    className="typefield-text"
                    onChange={this.onChange}
                    style={{ width: '100%' }}
                />
                <div className="typefield-value">{value.name}</div>
                <ArrowDropDown className="typefield-droparrow" />
            </div>
        )
    }

}
