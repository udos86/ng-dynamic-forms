import {ClsConfig} from "./dynamic-form-control.model";
import {DynamicFormValueControlModel, DynamicFormValueControlModelConfig} from "./dynamic-form-value-control.model";
import {getValue} from "../utils";

export interface DynamicFormOptionConfig {

    disabled?: boolean;
    label?: string;
    value: boolean | number | string;
}

export class DynamicFormOption implements DynamicFormOptionConfig {

    disabled: boolean;
    label: string | null;
    value: any;

    constructor(config: DynamicFormOptionConfig) {

        this.disabled = getValue(config, "disabled", false);
        this.label = getValue(config, "label", null);
        this.value = config.value;
    }

    get text() {
        return this.label;
    }

    set text(text: string) {
        this.label = text;
    }
}

export interface DynamicOptionControlModelConfig extends DynamicFormValueControlModelConfig {

    options?: Array<DynamicFormOptionConfig>;
}

export abstract class DynamicOptionControlModel<T> extends DynamicFormValueControlModel<T> {

    options: Array<DynamicFormOption>;

    constructor(config: DynamicOptionControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.options = config.options ? config.options.map(optionConfig => new DynamicFormOption(optionConfig)) : [];
    }
}