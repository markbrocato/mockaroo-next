import { observable } from 'mobx'
import Model from '../Model'

export default class ColumnModel extends Model {
    @observable name = null
    @observable type = null
    @observable destroyed = false
    @observable percentBlank = 0
    @observable advancedFormula = null

    // number
    @observable min = 0
    @observable max = 100
    @observable decimals = 0
    
    // formula
    @observable formula = null
}