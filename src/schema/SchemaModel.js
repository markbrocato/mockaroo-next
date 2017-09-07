import { observable, computed, action, autorun } from 'mobx'
import ColumnModel from './ColumnModel'
import Model from '../Model'
import toNestedParams from '../rails/toNestedParams'

export default class SchemaModel extends Model {
    @observable id = 1
    @observable hash = 'abc123'
    @observable name = null
    @observable columns = []
    @observable deletedColumns = []
    @observable rows = 1000
    @observable format = 'json'
    @observable line_ending = 'unix'
    @observable array = true
    @observable include_nulls = true
    @observable include_header = true
    @observable bom = false
    @observable table_name = 'MOCK_DATA'
    @observable include_create_sql = false
    @observable delimiter = ','
    @observable quote_char = '"'
    @observable xml_root_element = 'dataset'
    @observable xml_record_element = 'record'
    @observable dirty = false

    constructor(config) {
        super(config)
        autorun(() => this.dirty = true)
    }

    @action
    addColumn() {
        const column = new ColumnModel(this.columns[this.columns.length-1].toJS());
        column.advancedFormula = null
        this.columns.push(column);
    } 

    @action
    removeColumn(column) {
        this.columns.remove(column);
        
        if (column.id) {
            this.deletedColumns.push(column);
        }
    }

    @computed
    get isDirty() {
        return this.dirty;
    }

    save() {
        const js = this.toJS();
        js.columns = [...js.columns, js.deletedColumns.map(c => ({ ...c, _destroy: true }))]
        delete js.deletedColumns
        const params = toNestedParams(js)
        console.log('save', params)
    }

}