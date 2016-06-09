import {DynamicOptionControlModel} from "../dynamic-option-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_RADIO = "radio";

export class DynamicRadioModel<T> extends DynamicOptionControlModel<T> {

    constructor(configObject: {} = {}) {

        super(configObject);

        this.type = DYNAMIC_FORM_CONTROL_TYPE_RADIO;
    }
}