import { observable } from 'mobx';
import Model from '../Model';

export default class ColumnModel extends Model {
    @observable name = null;
    @observable type = null;
    @observable destroyed = false;
}