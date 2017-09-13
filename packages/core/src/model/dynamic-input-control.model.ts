import { ClsConfig } from "./dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormValueControlModelConfig } from "./dynamic-form-value-control.model";
import { serializable } from "../decorator/serializable.decorator";
import { AUTOCOMPLETE_ON } from "../utils/autofill.utils";

export interface DynamicInputControlModelConfig<T> extends DynamicFormValueControlModelConfig<T> {

    autoComplete?: string;
    autoFocus?: boolean;
    maxLength?: number;
    minLength?: number;
    placeholder?: string;
    prefix?: string;
    readOnly?: boolean;
    spellCheck?: boolean;
    suffix?: string;
}

export abstract class DynamicInputControlModel<T> extends DynamicFormValueControlModel<T> {

    @serializable() autoComplete: string;
    @serializable() autoFocus: boolean;
    @serializable() maxLength: number | null;
    @serializable() minLength: number | null;
    @serializable() placeholder: string;
    @serializable() prefix: string | null;
    @serializable() readOnly: boolean;
    @serializable() spellCheck: boolean;
    @serializable() suffix: string | null;

    constructor(config: DynamicInputControlModelConfig<T>, cls?: ClsConfig) {

        super(config, cls);

        this.autoComplete = config.autoComplete || AUTOCOMPLETE_ON;
        this.autoFocus = typeof config.autoFocus === "boolean" ? config.autoFocus : false;
        this.maxLength = typeof config.maxLength === "number" ? config.maxLength : null;
        this.minLength = typeof config.minLength === "number" ? config.minLength : null;
        this.placeholder = config.placeholder || "";
        this.prefix = config.prefix || null;
        this.readOnly = typeof config.readOnly === "boolean" ? config.readOnly : false;
        this.spellCheck = typeof config.spellCheck === "boolean" ? config.spellCheck : false;
        this.suffix = config.suffix || null;
    }
}