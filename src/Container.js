import React, { Component } from 'react';

export default class Container extends Component {
    
    render() {
        const { children, style, className='', ...styleProps } = this.props;

        return (
            <div 
                className={`${className} mockaroo-container`}
                style={{ display: 'flex', ...style, ...styleProps }}
            >
                {children}
            </div>
        )
    }

}