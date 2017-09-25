import React, { Component } from 'react'
import { InputLabel } from 'material-ui'
import NumberField from '../../components/NumberField'
import withBinding from '../../hoc/withBinding'
import ColumnOptions from './ColumnOptions'

class Number extends Component {

    render() {
        const { column, onChange } = this.props

        return (
            <ColumnOptions>
                <div className="options-field">
                    <InputLabel className="label">min:</InputLabel>
                    <NumberField name="min" value={column.min} onChange={onChange} small/>
                </div>
                
                <div className="options-field">
                    <InputLabel className="label">max:</InputLabel>
                    <NumberField name="min" value={column.max} onChange={onChange} small/>
                </div>

                <div className="options-field">
                    <InputLabel className="label">decimals:</InputLabel>
                    <NumberField name="decimals" value={column.decimals} onChange={onChange} single />
                </div>
            </ColumnOptions>
        )
    }

}

export default withBinding('column', Number)