import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicOptionControlModel, DynamicOptionControlModelConfig } from "../dynamic-option-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_SELECT: string;
export declare class DynamicSelectModel<T> extends DynamicOptionControlModel<T> {
    readonly type: string;
    constructor(config: DynamicOptionControlModelConfig, cls?: ClsConfig);
}
