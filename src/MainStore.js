import { observable, extendObservable } from 'mobx';

export default class MainStore {
    @observable schema = null;

    constructor(defaults) {
        extendObservable(this, defaults);
    }
}