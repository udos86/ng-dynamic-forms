import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicOptionControlModel, DynamicOptionControlModelConfig} from "../dynamic-option-control.model";
import {DynamicFieldSet} from "../form-group/dynamic-form-group.model";
import {getValue} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP = "RADIO_GROUP";

export interface DynamicRadioGroupModelConfig extends DynamicOptionControlModelConfig {

    legend?: string | null;
}

export class DynamicRadioGroupModel<T> extends DynamicOptionControlModel<T> implements DynamicFieldSet {

    legend: string | null;

    readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;

    constructor(config: DynamicRadioGroupModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.legend = getValue(config, "legend", null);
    }
}