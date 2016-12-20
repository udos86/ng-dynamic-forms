import { ClsConfig } from "./dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormValueControlModelConfig } from "./dynamic-form-value-control.model";
import { isBoolean } from "../utils";

export abstract class DynamicCheckControlModel extends DynamicFormValueControlModel<boolean> {

    constructor(config: DynamicFormValueControlModelConfig<boolean>, cls?: ClsConfig) {

        super(config, cls);

        this.value = isBoolean(this.value) ? this.value : false;
    }

    get checked(): boolean {
        return this.value;
    }

    set checked(checked: boolean) {
        this.valueUpdates.next(checked);
    }

    toggle(): void {
        this.checked = !this.checked;
    }
}