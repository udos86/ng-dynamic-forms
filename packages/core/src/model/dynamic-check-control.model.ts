import { DynamicFormControlClsConfig } from "./dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormValueControlModelConfig } from "./dynamic-form-value-control.model";
import { serializable } from "../decorator/serializable.decorator";

export interface DynamicCheckControlModelConfig extends DynamicFormValueControlModelConfig<boolean> {

    labelPosition?: string;
}

export abstract class DynamicCheckControlModel extends DynamicFormValueControlModel<boolean> {

    @serializable() labelPosition: string | null;

    constructor(config: DynamicCheckControlModelConfig, clsConfig?: DynamicFormControlClsConfig) {

        super(config, clsConfig);

        this.labelPosition = config.labelPosition || null;
        this.value = typeof this.value === "boolean" ? this.value : false;
    }

    get checked(): boolean {
        return !!this.value;
    }

    set checked(checked: boolean) {
        this.valueUpdates.next(checked);
    }

    toggle(): void {
        this.checked = !this.checked;
    }
}