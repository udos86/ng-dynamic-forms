import { ClsConfig } from "./dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormValueControlModelConfig } from "./dynamic-form-value-control.model";
export interface DynamicInputControlModelConfig extends DynamicFormValueControlModelConfig {
    autoComplete?: boolean;
    autoFocus?: boolean;
    maxLength?: number;
    minLength?: number;
    placeholder?: string;
    prefix?: string;
    readOnly?: boolean;
    spellCheck?: boolean;
    suffix?: string;
}
export declare abstract class DynamicInputControlModel<T> extends DynamicFormValueControlModel<T> {
    autoComplete: boolean;
    autoFocus: boolean;
    maxLength: number | null;
    minLength: number | null;
    placeholder: string;
    prefix: string | null;
    readOnly: boolean;
    spellCheck: boolean;
    suffix: string | null;
    constructor(config: DynamicInputControlModelConfig, cls?: ClsConfig);
}
