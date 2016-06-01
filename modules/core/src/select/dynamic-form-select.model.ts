import {DynamicFormOptionControlModel} from "../dynamic-form-option-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_SELECT = "select";

export class DynamicFormSelectModel<T> extends DynamicFormOptionControlModel<T> {

    constructor(configObject: {} = {}) {

        super(configObject);

        this.type = DYNAMIC_FORM_CONTROL_TYPE_SELECT;
    }
}