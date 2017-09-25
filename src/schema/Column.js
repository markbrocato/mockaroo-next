import React, { Component } from 'react'
import { func } from 'prop-types'
import { observer, inject } from 'mobx-react'
import withBinding from '../hoc/withBinding'
import { SortableElement, SortableHandle } from 'react-sortable-hoc'
import './Column.less'
import { TextField, IconButton, InputLabel, Button } from 'material-ui'
import Container from '../Container'
import { Close } from 'material-ui-icons'
import AdvancedFormulaDialog from './AdvancedFormulaDialog'
import TypeField from './TypeField'
import columns from './columns'
import NumberField from '../components/NumberField'

const DragHandle = SortableHandle(() => (
    <div className="drag-handle"/>
))

@inject(({ mainStore }) => ({ schema: mainStore.schema }))
@observer
class Column extends Component {

    static propTypes = {
        onRemoveClick: func
    }

    state = {
        advancedFormulaOpen: false
    }

    render() {
        const { column, onChange } = this.props
        const OptionsComponent = columns[column.type.name]

        return (
            <Container className="column">
                <Container className="name-column">
                    <DragHandle/>
                    <TextField 
                        inputRef={this.nameRef} 
                        name="name" 
                        type="text" 
                        value={column.name || ''} 
                        onChange={onChange} 
                        style={{ flex: 1 }}
                        className="code"
                    />
                </Container>
                <Container className="type-column">
                    <TypeField value={column.type}/>
                </Container>
                <Container className="options-column">
                    { OptionsComponent && <OptionsComponent column={column}/> }
                    <InputLabel className="label">Blank:</InputLabel>
                    <NumberField
                        name="percentBlank" 
                        onChange={onChange} 
                        value={column.percentBlank} 
                        double
                    /> 
                    <InputLabel className="label">%</InputLabel>
                    <Button 
                        color={column.advancedFormula ? 'primary' : 'default'} 
                        fab
                        className={`action-button advanced-formula-button${column.advancedFormula ? '-primary' : ''}`} 
                        onClick={this.openAdvancedFormulaDialog}
                        dense
                        style={{ marginLeft: '10px' }}
                    >
                        <span/>
                    </Button>
                    <IconButton className="action-button" onClick={this.onRemoveClick}><Close/></IconButton>
                </Container>
                <AdvancedFormulaDialog 
                    open={this.state.advancedFormulaOpen} 
                    onRequestClose={this.closeAdvancedFormulaDialog}
                    onRequestApply={this.applyAdvancedFormula}
                    value={column.advancedFormula}
                />
            </Container>
        )

    }

    openAdvancedFormulaDialog = () => this.setState({ advancedFormulaOpen: true })
    closeAdvancedFormulaDialog = () => this.setState({ advancedFormulaOpen: false })
    onRemoveClick = () => this.props.schema.removeColumn(this.props.column)
    
    nameRef = (name) => {
        if (name && this.props.autoFocus) {
            name.focus()
            name.select()
        }
    }
    
    applyAdvancedFormula = (advancedFormula) => {
        this.setState({ advancedFormulaOpen: false })
        this.props.column.advancedFormula = advancedFormula
    }

}   

// export default Column
export default SortableElement(withBinding('column', Column))

