import {ClsConfig} from "./dynamic-form-control.model";
import {DynamicFormValueControlModel, DynamicFormValueControlModelConfig} from "./dynamic-form-value-control.model";
import {serializable} from "../decorator/serialize.decorator";
import {getValue, serialize} from "../utils";

export interface DynamicFormOptionConfig {

    disabled?: boolean;
    label?: string;
    value: boolean | number | string;
}

export class DynamicFormOption {

    @serializable disabled: boolean;
    @serializable label: string | null;
    @serializable value: boolean | number | string;

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

    toJSON() {
        return serialize(this);
    }
}

export interface DynamicOptionControlModelConfig extends DynamicFormValueControlModelConfig {

    options?: Array<DynamicFormOptionConfig>;
}

export abstract class DynamicOptionControlModel<T> extends DynamicFormValueControlModel<T> {

    @serializable options: Array<DynamicFormOption>;

    constructor(config: DynamicOptionControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.options = config.options ? config.options.map(optionConfig => new DynamicFormOption(optionConfig)) : [];
    }
}