import React, { Component } from 'react'
import './ButtonBar.less'

export default class ButtonBar extends Component {
    
    render() {
        const { children, className, ...props} = this.props;

        return (
            <div 
                {...props}
                className={`${className} mockaroo-button-bar`}
            >
                {children}
            </div>
        )
    }

}