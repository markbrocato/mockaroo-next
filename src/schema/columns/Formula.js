import React, { Component } from 'react'
import { TextField } from 'material-ui'
import withBinding from '../../hoc/withBinding'

class Formula extends Component {

    render() {
        const { column, onChange } = this.props

        return (
            <TextField 
                style={{ flex: 1 }} 
                className="options-field code"
                placeholder="example: mass * acceleration" 
                value={column.formula}
                onChange={onChange}
            />
        )
    }

}

export default withBinding('column', Formula)