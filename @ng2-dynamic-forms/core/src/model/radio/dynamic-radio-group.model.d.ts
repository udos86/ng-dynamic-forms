import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicOptionControlModel, DynamicOptionControlModelConfig } from "../dynamic-option-control.model";
import { DynamicFieldSet } from "../form-group/dynamic-form-group.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP: string;
export interface DynamicRadioGroupModelConfig extends DynamicOptionControlModelConfig {
    legend?: string | null;
}
export declare class DynamicRadioGroupModel<T> extends DynamicOptionControlModel<T> implements DynamicFieldSet {
    legend: string | null;
    readonly type: string;
    constructor(config: DynamicRadioGroupModelConfig, cls?: ClsConfig);
}
