import React, { Component } from 'react';
import MainStore from './MainStore';
import { Provider } from 'mobx-react';

import Schema from './schema/Schema';
import SchemaModel from './schema/SchemaModel';
import ColumnModel from './schema/ColumnModel';

export default class App extends Component {
    
    mainStore = new MainStore({
        schema: new SchemaModel({
            columns: [
                new ColumnModel({
                    name: 'id',
                    type: 'Row Number'
                }),
                new ColumnModel({
                    name: 'firstName',
                    type: 'First Name'
                }),
                new ColumnModel({
                    name: 'lastName',
                    type: 'Last Name'
                }),
                new ColumnModel({
                    name: 'email',
                    type: 'Email'
                }),
                new ColumnModel({
                    name: 'gender',
                    type: 'Gender'
                })
            ]
        })
    });

    render() {
        console.log('Provider', Provider)

        return (
            <Provider mainStore={this.mainStore}>
                <Schema/>
            </Provider>
        );
    }

}