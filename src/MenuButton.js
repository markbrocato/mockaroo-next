import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Menu from 'material-ui/Menu';
import { ArrowDropDown } from 'material-ui-icons';

export default class MenuButton extends Component {

    state = {
        anchorEl: undefined,
        open: false,
    };

    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { text, children, ...buttonProps } = this.props;

        return (
            <div style={{ display: 'inline-block' }}>
                <Button  {...buttonProps} onClick={this.handleClick}>
                    {text}
                    <ArrowDropDown style={{ height: '16px', width: '16px', marginLeft: '3px' }}/>
                </Button>
                <Menu
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    {children}
                </Menu>
            </div>
        );
    }

}