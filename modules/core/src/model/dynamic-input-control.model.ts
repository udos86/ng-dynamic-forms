import {DynamicFormControlModel} from "./dynamic-form-control.model";
import {AUTOCOMPLETE_ON} from "./dynamic-form-autofill";
import {getValue} from "../utils";

export abstract class DynamicInputControlModel<T> extends DynamicFormControlModel<T> {

    autoComplete: boolean;
    autoFocus: boolean;
    maxLength: number;
    placeholder: string;
    prefix: string;
    readonly: boolean;
    suffix: string;

    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        this.autoComplete = getValue(config, "autoComplete", AUTOCOMPLETE_ON);
        this.autoFocus = getValue(config, "autoFocus", false);
        this.maxLength = getValue(config, "maxLength", 100);
        this.placeholder = getValue(config, "placeholder", "");
        this.prefix = getValue(config, "prefix", null);
        this.readonly = getValue(config, "readonly", false);
        this.suffix = getValue(config, "suffix", null);
    }
}