import { observable, extendObservable } from 'mobx';

export default class MainStore {
    @observable schema = null
    @observable user = null
    @observable types = null

    constructor(defaults) {
        extendObservable(this, defaults)
    }
}