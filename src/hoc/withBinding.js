import React, { Component } from 'react';

export default function withBinding(modelProp, Target) {

    return class extends Component {
        render() {
            return <Target {...this.props} onChange={this.onChange}/>
        }

        onChange = ({ target: field }) => {
            this.props[modelProp][field.getAttribute('name')] = field.value;
        }
    }

}