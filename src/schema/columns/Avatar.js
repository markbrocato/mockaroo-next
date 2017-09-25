import React from 'react'
import { TextField } from 'material-ui'
import withBinding from '../../hoc/withBinding'
import ColumnOptions from './ColumnOptions'

export default withBinding('column', function Avatar({ column, onChange }) {
    return (
        <ColumnOptions>
            <div className="options-field">
                <InputLabel className="label">size:</InputLabel>
                <NumberField name="avatar_width" value={column.avatar_width} onChange={onChange} small/>
                <InputLabel className="label">x</InputLabel>
                <NumberField name="avatar_height" value={column.avatar_height} onChange={onChange} small/>
            </div>
            
            <div className="options-field">
                <InputLabel className="label">format:</InputLabel>
                <NumberField name="decimals" value={column.decimals} onChange={onChange} single />
            </div>
        </ColumnOptions>
    )
})

    render() {
        const { column, onChange } = this.props

    }

}

export default withBinding('column', Formula)