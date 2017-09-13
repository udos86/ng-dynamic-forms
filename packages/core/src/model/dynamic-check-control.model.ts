import { ClsConfig } from "./dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormValueControlModelConfig } from "./dynamic-form-value-control.model";
import { serializable } from "../decorator/serializable.decorator";
import { Utils } from "../utils/core.utils";

export interface DynamicCheckControlModelConfig extends DynamicFormValueControlModelConfig<boolean> {

    labelPosition?: string;
}

export const DYNAMIC_CHECK_CONTROL_LABEL_POSITION_AFTER = "after";
export const DYNAMIC_CHECK_CONTROL_LABEL_POSITION_BEFORE = "before";

export abstract class DynamicCheckControlModel extends DynamicFormValueControlModel<boolean> {

    @serializable() labelPosition: string;

    constructor(config: DynamicCheckControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.labelPosition = config.labelPosition || DYNAMIC_CHECK_CONTROL_LABEL_POSITION_AFTER;
        this.value = Utils.isBoolean(this.value) ? this.value : false;
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