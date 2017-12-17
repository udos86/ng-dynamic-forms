import { DynamicFormValueControlModel, DynamicFormValueControlModelConfig } from "./dynamic-form-value-control.model";
import { DynamicFormControlLayout } from "./dynamic-form-control-layout.model";
import { serializable } from "../decorator/serializable.decorator";

export interface DynamicCheckControlModelConfig extends DynamicFormValueControlModelConfig<boolean> {

    labelPosition?: string;
}

export abstract class DynamicCheckControlModel extends DynamicFormValueControlModel<boolean> {

    @serializable() labelPosition: string | null;

    constructor(config: DynamicCheckControlModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

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