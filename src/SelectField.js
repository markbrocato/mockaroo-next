import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import { Button, Menu, MenuItem } from 'material-ui'
import { ArrowDropDown } from 'material-ui-icons'

const styles = theme => ({
    root: {
        background: theme.palette.background.paper,
    },
})

class SelectField extends Component {

    constructor(props) {
        super(props)

        this.state = {
            anchorEl: undefined,
            open: false
        }
    }

    button = undefined

    handleClickButton = event => {
        this.setState({ open: true, anchorEl: event.currentTarget })
    }

    handleMenuItemClick = (event, value) => {
        const { onChange = Function.prototype } = this.props
        this.setState({ open: false, value })
        onChange({ name: this.props.name, target: { value } })
    }

    handleRequestClose = () => {
        this.setState({ open: false })
    }

    render() {
        const { classes, options, value, label } = this.props
        const selected = options.find(o => value === o.value)

        return (
            <div className={classes.root} style={{ display: 'inline-flex' }}>
                <Button dense onClick={this.handleClickButton} style={{ textTransform: 'none', fontSize: '16px' }}>
                    <span style={{ color: 'rgba(0, 0, 0, 0.54)', marginRight: '10px', fontWeight: 400 }}>{label}: </span>
                    {(selected && selected.text) || <span style={{ color: '#999' }}>None</span>}
                    <ArrowDropDown style={{ height: '16px', width: '16px', marginLeft: '3px' }}/>
                </Button>
                <Menu
                    id="lock-menu"
                    anchorEl={this.state.anchorEl}
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option.value}
                            selected={value === option.value}
                            onClick={event => this.handleMenuItemClick(event, option.value)}
                        >
                            {option.text}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        )
    }
}

SelectField.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SelectField)