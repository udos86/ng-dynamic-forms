import {getValue} from "../utils";
import {DynamicFormAbstractControlModel} from "./dynamic-form-abstract-control.model";

export abstract class DynamicFormControlModel<T> extends DynamicFormAbstractControlModel {

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