import {ClsConfig} from "./dynamic-form-control.model";
import {DynamicFormValueControlModel, DynamicFormValueControlModelConfig} from "./dynamic-form-value-control.model";
import {AUTOCOMPLETE_ON} from "../service/dynamic-form-autofill.service";
import {serializable} from "../decorator/serialize.decorator";
import {getValue} from "../utils";

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

export abstract class DynamicInputControlModel<T> extends DynamicFormValueControlModel<T> {

    @serializable() autoComplete: boolean;
    @serializable() autoFocus: boolean;
    @serializable() maxLength: number | null;
    @serializable() minLength: number | null;
    @serializable() placeholder: string;
    @serializable() prefix: string | null;
    @serializable() readOnly: boolean;
    @serializable() spellCheck: boolean;
    @serializable() suffix: string | null;

    constructor(config: DynamicInputControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.autoComplete = getValue(config, "autoComplete", AUTOCOMPLETE_ON);
        this.autoFocus = getValue(config, "autoFocus", false);
        this.maxLength = getValue(config, "maxLength", null);
        this.minLength = getValue(config, "minLength", null);
        this.placeholder = getValue(config, "placeholder", "");
        this.prefix = getValue(config, "prefix", null);
        this.readOnly = getValue(config, "readOnly", false);
        this.spellCheck = getValue(config, "spellCheck", false);
        this.suffix = getValue(config, "suffix", null);
    }
}