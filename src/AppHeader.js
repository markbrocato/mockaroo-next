import React, { Component } from 'react'
import { AppBar, Button, Toolbar } from 'material-ui'
import './AppHeader.less'
import MenuButton from './MenuButton'

export default class AppHeader extends Component {

    render() {
        return (
            <AppBar color="accent" position="fixed" className="app-header" style={{ display: 'flex', flexDirection: 'row' }}>
                <Toolbar style={{ minHeight: '50px' }} className="app-row">
                    <Button style={styles.button} color="contrast">Schemas</Button>
                    <Button style={styles.button} color="contrast">Datasets</Button>
                    <Button style={styles.button} color="contrast">Scenarios</Button>
                    <Button style={styles.button} color="contrast">Projects</Button>
                    <div style={{ flex: 1 }}/>
                    <MenuButton 
                        style={styles.button} 
                        color="contrast"
                        text="Users"
                    >
                    </MenuButton>
                </Toolbar>
            </AppBar>
        )
    }

}

const styles = {
    button: {
        minHeight: '50px'
    }
}