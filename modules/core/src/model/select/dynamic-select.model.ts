import {DynamicOptionControlModel} from "../dynamic-option-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_SELECT = "SELECT";

export class DynamicSelectModel<T> extends DynamicOptionControlModel<T> {

    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        this.type = DYNAMIC_FORM_CONTROL_TYPE_SELECT;
    }
}