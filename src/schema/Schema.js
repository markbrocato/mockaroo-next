import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Column from './Column';
import { SortableContainer, SortableHandle, arrayMove } from 'react-sortable-hoc';

@inject(({ mainStore }) => ({ schema: mainStore.schema }))
@observer
export default class Schema extends Component {
    
    render() {
        const { schema } = this.props;

        return (
            <div>
                <input 
                    placeholder="Name" 
                    value={schema.name} 
                    onChange={e => schema.name = e.target.value}
                />
                <button type="button" onClick={this.save}>Save</button>
                <ColumnList 
                    columns={schema.activeColumns} 
                    useDragHandle
                    onSortEnd={this.onSortEnd}
                />
                <button type="button" onClick={this.addColumn}>Add Another Field</button>
            </div>
        );
    }

    addColumn = () => {
        this.props.schema.addColumn()
    }

    save = () => {
        console.log(this.props.schema.toJS());
    }

    onSortEnd = ({oldIndex, newIndex}) => {
        const { schema } = this.props;
        schema.columns = arrayMove(schema.columns, oldIndex, newIndex);
    }
}

const ColumnList = SortableContainer(({ columns }) => (
    <div>
        {columns.map((column, i) => (
            <Column 
                key={i} 
                index={i}
                column={column} 
                onRemoveClick={() => column.destroyed = true}
            />
        ))}
    </div>
))
