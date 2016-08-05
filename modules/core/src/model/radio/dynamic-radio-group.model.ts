import {DynamicOptionControlModel} from "../dynamic-option-control.model";
import {IDynamicFieldSet} from "../form-group/dynamic-form-group.model";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP = "RADIO_GROUP";

export class DynamicRadioGroupModel<T> extends DynamicOptionControlModel<T> implements IDynamicFieldSet {

    legend: string;

    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        this.legend = getValue(config, "legend", null);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;
    }
}