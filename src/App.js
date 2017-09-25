import React, { Component } from 'react'
import MainStore from './MainStore'
import { Provider } from 'mobx-react'
import AppHeader from './AppHeader'
import Schema from './schema/Schema'
import SchemaModel from './schema/SchemaModel'
import ColumnModel from './schema/ColumnModel'
import UserModel from './UserModel'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import './App.less'
import green from 'material-ui/colors/green'
import blue from 'material-ui/colors/blue'

const theme = createMuiTheme({
    palette: {
        primary: {
            ...blue
        },

        secondary: {
            ...green,
            A200: '#52A552'
        },

        shades: {
            dark: {
                input: {
                    bottomLine: blue['400']
                }
            }
        }
    }
})

export default class App extends Component {
    
    mainStore = new MainStore({
        user: new UserModel({
            apiKey: '123'
        }),
        types: [
            { id: 1, name: 'Row Number' },
            { id: 2, name: 'First Name' },
            { id: 3, name: 'Last Name' },
            { id: 4, name: 'Email' },
            { id: 5, name: 'Gender' },
        ],
        schema: new SchemaModel({
            name: 'My Schema',
            columns: [
                new ColumnModel({
                    name: 'id',
                    type: { id: 1, name: 'Row Number' }
                }),
                new ColumnModel({
                    name: 'firstName',
                    type: { id: 2, name: 'First Name' }
                }),
                new ColumnModel({
                    name: 'lastName',
                    type: { id: 3, name: 'Last Name' }
                }),
                new ColumnModel({
                    name: 'email',
                    type: { id: 4, name: 'Email' }
                }),
                new ColumnModel({
                    name: 'gender',
                    type: { id: 5, name: 'Gender' }
                }),
                new ColumnModel({
                    name: 'age',
                    type: { id: 6, name: 'Number' },
                    min: 0,
                    max: 100,
                    decimals: 0
                }),
                new ColumnModel({
                    name: 'rank',
                    type: { id: 7, name: 'Formula' }
                }),
            ]
        })
    })

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <Provider mainStore={this.mainStore}>
                    <div>
                        <AppHeader/>
                        <Schema style={{ marginTop: '80px' }} className="app-row"/>
                    </div>
                </Provider>
            </MuiThemeProvider>
        )
    }

}