import { observable } from 'mobx'
import Model from './Model'

export default class UserModel extends Model {
    @observable id = 1
    @observable apiKey = 2
}