import React, { Component } from 'react';

export default function withBinding(modelProp, Target) {

    return class extends Component {
        render() {
            return <Target {...this.props} onChange={this.onChange}/>
        }

        onChange = ({ name, target: field }) => {
            name = name || field.getAttribute('name');
            const props = this.props;
            const model = props[modelProp];

            if (field.hasOwnProperty('checked')) {
                model[name] = field.checked;
            } else {
                model[name] = field.value;
            }
        }
    }

}