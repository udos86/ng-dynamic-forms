import {getValue} from "../utils";
import {DynamicFormControlModel} from "./dynamic-form-control.model";

export abstract class DynamicFormValueControlModel<T> extends DynamicFormControlModel {

    help: string;
    required: boolean;
    validators: Array<any>;
    validatorsAsync: Array<any>;
    value: T;

    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        this.help = getValue(config, "help", null);
        this.required = getValue(config, "required", false);
        this.validators = getValue(config, "validators", []);
        this.validatorsAsync = getValue(config, "validatorsAsync", []);
        this.value = getValue(config, "value", null);
    }
}