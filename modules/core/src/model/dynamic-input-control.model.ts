import {DynamicFormControlModel} from "./dynamic-form-control.model";
import {getValue} from "../utils";

export const DYNAMIC_FORM_INPUT_AUTOCOMPLETE_OFF = "off";
export const DYNAMIC_FORM_INPUT_AUTOCOMPLETE_ON = "on";

export abstract class DynamicInputControlModel<T> extends DynamicFormControlModel<T> {

    autoComplete: boolean;
    autoFocus: boolean;
    maxLength: number;
    placeholder: string;
    prefix: string;
    readonly: boolean;
    showLength: boolean;
    suffix: string;

    constructor(modelConfig: {} = {}, clsConfig: {} = {}) {

        super(modelConfig, clsConfig);

        this.autoComplete = getValue(modelConfig, "autoComplete", DYNAMIC_FORM_INPUT_AUTOCOMPLETE_OFF);
        this.autoFocus = getValue(modelConfig, "autoFocus", false);
        this.maxLength = getValue(modelConfig, "maxLength", 100);
        this.placeholder = getValue(modelConfig, "placeholder", "");
        this.prefix = getValue(modelConfig, "prefix", null);
        this.readonly = getValue(modelConfig, "readonly", false);
        this.showLength = getValue(modelConfig, "showLength", false);
        this.suffix = getValue(modelConfig, "suffix", null);
    }
}