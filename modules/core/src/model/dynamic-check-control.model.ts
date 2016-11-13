import {ClsConfig} from "./dynamic-form-control.model";
import {DynamicFormValueControlModel, DynamicFormValueControlModelConfig} from "./dynamic-form-value-control.model";
import {isBoolean} from "../utils";

export abstract class DynamicCheckControlModel extends DynamicFormValueControlModel<boolean> {

    constructor(config: DynamicFormValueControlModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.value = isBoolean(this.value) ? this.value : false;
    }

    get checked(): boolean {
        return this.value;
    }

    set checked(checked: boolean) {
        this.valueUpdates.next(checked);
    }

    check(): void {
        this.valueUpdates.next(true);
    }

    uncheck(): void {
        this.valueUpdates.next(false);
    }

    toggle(): void {
        this.valueUpdates.next(!this.value);
    }
}