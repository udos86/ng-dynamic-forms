import { DynamicFormValueControlModel, DynamicFormValueControlModelConfig } from "./dynamic-form-value-control.model";
import { DynamicFormControlLayout } from "./misc/dynamic-form-control-layout.model";
import { serializable } from "../decorator/serializable.decorator";
import { isBoolean } from "../utils/core.utils";

export interface DynamicCheckControlModelConfig extends DynamicFormValueControlModelConfig<boolean> {

    labelPosition?: string;
}

export abstract class DynamicCheckControlModel extends DynamicFormValueControlModel<boolean> {

    @serializable() labelPosition: string | null;

    protected constructor(config: DynamicCheckControlModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.labelPosition = config.labelPosition || null;
        this.value = isBoolean(this.value) ? this.value : false;
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