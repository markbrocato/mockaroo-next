import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import Column from './Column'
import { SortableContainer, arrayMove } from 'react-sortable-hoc'
import { TextField, Button, Divider, MenuItem } from 'material-ui';
import Container from '../Container';
import './Schema.less';
import ButtonBar from '../ButtonBar';
import MenuButton from '../MenuButton';
import FileOptions from'./FileOptions'

@inject(({ mainStore }) => ({ schema: mainStore.schema, user: mainStore.user }))
@observer
export default class Schema extends Component {

    state = {
        loaded: false
    }

    componentDidMount() {
        this.setState({ loaded: true })
    }
    
    render() {
        const { schema, user, className, ...props } = this.props
        const { location } = window;

        return (
            <div {...props} className={`${className} schema`}>
                <div className="indent" style={{ marginBottom: '40px' }}>
                    <TextField 
                        label="Name" 
                        value={schema.name} 
                        onChange={e => schema.name = e.target.value}
                    />
                    <Button 
                        raised 
                        color="default" 
                        onClick={this.save}
                        style={{ marginLeft: '10px' }}
                        disabled={!schema.isDirty}
                    >
                        Save Changes
                    </Button>
                </div>
                <ColumnList 
                    loaded={this.state.loaded}
                    columns={schema.columns} 
                    useDragHandle
                    onSortEnd={this.onSortEnd}
                />
                <div className="indent" style={{ marginTop: '20px'}}>
                    <Button disableRipple raised color="default" onClick={this.addColumn}>Add Another Field</Button>
                </div>
                <Divider style={{ margin: '20px 0' }}/>
                <FileOptions className="indent"/>
                <Divider style={{ margin: '20px 0' }}/>
                <ButtonBar className="indent">
                    <Button disableRipple raised color="accent">Download Data</Button>
                    <Button disableRipple raised style={{ marginRight: '40px' }}>Preview</Button>
                    <MenuButton raised text="Append Dataset">
                    </MenuButton>
                    <MenuButton raised text="More">
                        <MenuItem>Clone this Schema</MenuItem>
                        <MenuItem>Delete this Schema</MenuItem>
                        <Divider/>
                        <MenuItem>Import fields from Excel/CSV header...</MenuItem>
                        <MenuItem>Export fields from create table SQL...</MenuItem>
                        <Divider/>
                        <MenuItem>Export to File...</MenuItem>
                        <MenuItem>Import from File...</MenuItem>
                    </MenuButton>
                </ButtonBar>
                { schema.id && (
                    <div>
                        <Divider style={{ margin: '20px 0' }}/>
                        <p className="indent">Share Link: <a href={`/${schema.hash}`}>{location.protocol}//{location.host}/{schema.hash}</a></p>
                        <p className="indent">Generate data using curl with the following command:</p>
                        <pre className="indent">curl "{location.protocol}//api.{location.host}/api/{schema.hash}?count=100&key={user.apiKey}" > "{schema.name}.{schema.format}"</pre>
                    </div>
                )}
            </div>
        )
    }

    addColumn = () => {
        this.props.schema.addColumn()
    }

    save = () => {
        this.props.schema.save()
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        const { schema } = this.props
        schema.columns = arrayMove(schema.columns, oldIndex, newIndex)
    }
}

@observer
class ColumnList extends Component {

    render() {
        const { columns, loaded, ...props } = this.props;

        return (
            <div {...props}>
                <Container className="column header">
                    <div className="name-column"><div className="indent">Field</div></div>
                    <div className="type-column">Type</div>
                    <div className="options-column">Options</div>
                </Container>
                {columns.map((column, i) => (
                    <Column 
                        key={i} 
                        index={i}
                        column={column} 
                        autoFocus={loaded}
                    />
                ))}
            </div>            
        )
    }

}

ColumnList = SortableContainer(ColumnList);
