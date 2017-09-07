import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import { TextField, InputLabel, FormControlLabel, Checkbox } from 'material-ui'
import SelectField from '../SelectField'
import './FileOptions.less'
import withBinding from '../hoc/withBinding'

@observer
class FileOptions extends Component {

    render() {
        const { schema, onChange, ...props } = this.props
        const options = this.createOptions[schema.format]
        const hint = this.createHint[schema.format]

        return (
            <div>
                <div {...props} className="file-options indent">
                    <InputLabel># Rows:</InputLabel>
                    <TextField 
                        name="rows"
                        value={schema.rows} 
                        style={{ width: '100px', marginRight: '20px'}} 
                        inputProps={{ style: { textAlign: 'right' } }}
                        onChange={onChange}
                    />
                    <SelectField 
                        name="format"
                        value={schema.format}
                        label="Format"
                        onChange={onChange}
                        options={[
                            { value: 'csv', text: 'CSV' },
                            { value: 'json', text: 'JSON' },
                            { value: 'txt', text: 'Tab Delimited' },
                            { value: 'sql', text: 'SQL' },
                            { value: 'cql', text: 'Cassandra SQL' },
                            { value: 'firebase', text: 'Firebase' },
                            { value: 'custom', text: 'Custom' },
                            { value: 'excel', text: 'Excel' },
                            { value: 'xml', text: 'XML' },
                            { value: 'dbunit', text: 'DBUnit XML' }
                        ]}
                    />
                    { options && options() }
                </div>
                { hint && hint() }
            </div>
        )
    }

    createOptions = {
        json: () => {
            const { schema, onChange } = this.props

            return [
                <FormControlLabel
                    className="checkbox-correct"
                    label="array"
                    key="array"
                    control={
                        <Checkbox name="array" checked={schema.array} onChange={onChange}/>
                    }
                />,
                <FormControlLabel
                    className="checkbox-correct"
                    label="include nulls"
                    key="include_nulls"
                    control={
                        <Checkbox name="include_nulls" checked={schema.include_nulls} onChange={onChange}/>
                    }
                />                
            ]
        },

        csv: () => this.createOptions.flat(),
        txt: () => this.createOptions.flat(),
        flat: () => {
            const { schema, onChange } = this.props

            return [
                <SelectField
                    name="line_ending"
                    label="Line Ending"
                    value={schema.line_ending}
                    onChange={onChange}
                    options={[
                        { value: 'unix', text: 'Unix (LF)' },
                        { value: 'windows', text: 'Windows (CRLF)' }
                    ]}
                />,
                <InputLabel>Include:</InputLabel>,
                <FormControlLabel
                    className="checkbox-correct"
                    label="header"
                    control={
                        <Checkbox name="include_header" checked={schema.include_header} onChange={onChange}/>
                    }
                />,
                <FormControlLabel
                    className="checkbox-correct"
                    label="BOM"
                    control={
                        <Checkbox name="include_bom" checked={schema.include_bom} onChange={onChange}/>
                    }
                />    
            ]
        },

        dbunit: () => {
            const { schema, onChange } = this.props

            return [
                <InputLabel>Table Name:</InputLabel>,
                <TextField 
                    name="table_name"
                    value={schema.table_name} 
                    onChange={onChange}
                />  
            ]
        },

        sql: () => {
            const { schema, onChange } = this.props

            return [
                ...this.createOptions.dbunit(),
                <FormControlLabel
                    className="checkbox-correct"
                    label="include create table"
                    control={
                        <Checkbox name="include_create_sql" checked={schema.include_create_sql} onChange={onChange}/>
                    }
                />    
            ]
        },

        custom: () => {
            const { schema, onChange } = this.props

            return [
                <InputLabel>Delimiter:</InputLabel>,
                <TextField 
                    name="delimiter"
                    value={schema.delimiter} 
                    onChange={onChange}
                    style={{ width: '30px' }}
                    inputProps={{
                        maxLength: 1,
                        style: {
                            textAlign: 'center'
                        }
                    }}
                />,
                <InputLabel>Quote:</InputLabel>,
                <TextField 
                    name="quote_char"
                    value={schema.quote_char} 
                    onChange={onChange}
                    style={{ width: '30px' }}
                    inputProps={{
                        maxLength: 1,
                        style: {
                            textAlign: 'center'
                        }
                    }}
                />,
                ...this.createOptions.flat()
            ]
        },

        xml: () => {
            const { schema, onChange } = this.props

            return [
                <InputLabel>Root Element:</InputLabel>,
                <TextField 
                    name="xml_root_element"
                    value={schema.xml_root_element} 
                    onChange={onChange}
                />,
                <InputLabel>Record Element:</InputLabel>,
                <TextField 
                    name="xml_record_element"
                    value={schema.xml_record_element} 
                    onChange={onChange}
                />,
            ]
        }
    }

    createHint = {
        cql: () => (
            <p className="indent">Hint: Use "." in column names to generate a map value, brackets to generate a list value. <a href="help/cql">More information CQL Collections...</a></p>
        ),
        json: () => (
            <p className="indent">Hint: Use "." in column names to generate nested json objects, brackets to generate arrays. <a href="help/json">More information...</a></p>
        ),
        xml: () => (
            <p className="indent">Hint: Use "." in column names to generate nested elements, brackets to generate multiple values. <a href="help/xml">More information...</a></p>
        )
    }

}

export default inject(({ mainStore }) => ({ schema: mainStore.schema }))(
    withBinding('schema', FileOptions)
)