import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormValueControlModelConfig } from "../dynamic-form-value-control.model";
export declare const DYNAMIC_FORM_CONTROL_TYPE_SWITCH: string;
export declare class DynamicSwitchModel extends DynamicFormValueControlModel<boolean> {
    readonly type: string;
    constructor(config: DynamicFormValueControlModelConfig, cls?: ClsConfig);
}
