import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicOptionControlModel, DynamicOptionControlModelConfig} from "../dynamic-option-control.model";
import {DynamicFieldSet} from "../form-group/dynamic-form-group.model";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP = "RADIO_GROUP";

export interface RadioGroupModelConfig extends DynamicOptionControlModelConfig {

    legend?: string;
}

export class DynamicRadioGroupModel<T> extends DynamicOptionControlModel<T> implements DynamicFieldSet {

    legend: string;

    constructor(config: RadioGroupModelConfig = {}, cls?: ClsConfig) {

        super(config, cls);

        this.legend = getValue(config, "legend", null);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;
    }
}