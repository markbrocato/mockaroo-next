import React, { Component } from 'react';
import { func } from 'prop-types';
import { observer } from 'mobx-react';
import withBinding from '../hoc/withBinding';
import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import './Column.less';
import Input from 'react-toolbox/lib/input'

const DragHandle = SortableHandle(() => <span>::</span>);

@observer
class Column extends Component {

    static propTypes = {
        onRemoveClick: func
    }

    render() {
        const { column, onChange, onRemoveClick, index } = this.props;

        return (
            <div className="column">
                <DragHandle/>
                <Input name="name" type="text" value={column.name} onChange={onChange}/>
                <select name="type" value={column.type} onChange={onChange}>
                    <option value="ID">ID</option>
                    <option value="First Name">First Name</option>
                    <option value="Last Name">Last Name</option>
                    <option value="Email">Email</option>
                    <option value="Gender">Gender</option>
                </select>
                <div className="remove" onClick={onRemoveClick}>&times;</div>
            </div>
        )
    }

}   

// export default Column;
export default SortableElement(withBinding('column', Column));

