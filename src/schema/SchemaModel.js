import { observable, computed } from 'mobx';
import ColumnModel from './ColumnModel';
import Model from '../Model';

export default class SchemaModel extends Model {
    @observable name = null;
    @observable columns = [];

    @computed get activeColumns() {
        return this.columns.filter(c => !c.destroyed)
    }

    addColumn(column = new ColumnModel()) {
        this.columns.push(column);
    } 

}