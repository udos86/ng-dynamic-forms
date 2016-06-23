import {DynamicOptionControlModel} from "../dynamic-option-control.model";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP = "RADIO_GROUP";

export class DynamicRadioGroupModel<T> extends DynamicOptionControlModel<T> {
    
    legend: string;

    constructor(configObject: {} = {}) {

        super(configObject);

        this.legend = getValue(configObject, "legend", null);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;
    }
}