import { extendObservable, toJS } from 'mobx';

export default class Model {
    constructor(defaults = {}) {
        extendObservable(this, defaults)
    }

    toJS() {
        return toJS(this)
    }

}