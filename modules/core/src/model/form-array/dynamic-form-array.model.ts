import {ValidatorFn, AsyncValidatorFn} from "@angular/forms";
import {DynamicFormControlModel, DynamicFormControlModelConfig, ClsConfig} from "../dynamic-form-control.model";
import {DynamicFormValueControlModel} from "../dynamic-form-value-control.model";
import {getValue, isFunction, isDefined} from "../../utils";

export class DynamicFormArrayGroupModel {

    group: Array<DynamicFormValueControlModel<any>>;
    index: number;

    constructor(group: Array<DynamicFormValueControlModel<any>> = [], index?: number) {

        this.group = group;
        this.index = isDefined(index) ? index : null;
    }
}

export const DYNAMIC_FORM_CONTROL_TYPE_ARRAY = "ARRAY";

export interface DynamicFormArrayModelConfig extends DynamicFormControlModelConfig {

    asyncValidator?: AsyncValidatorFn;
    createGroup?: () => Array<DynamicFormValueControlModel<any>>;
    groups?: Array<DynamicFormArrayGroupModel>;
    initialCount?: number;
    validator?: ValidatorFn;
}

export class DynamicFormArrayModel extends DynamicFormControlModel {

    asyncValidator: AsyncValidatorFn;
    createGroup: () => Array<DynamicFormValueControlModel<any>>;
    groups: Array<DynamicFormArrayGroupModel> = [];
    initialCount: number;
    validator: ValidatorFn;

    private originGroup: Array<DynamicFormValueControlModel<any>>; // only to reinstantiate from JSON

    constructor(config: DynamicFormArrayModelConfig, cls?: ClsConfig) {

        super(config, cls);

        if (!isFunction(config["createGroup"])) {
            throw new Error("createGroup function must be specified for DynamicFormArrayModel");
        }

        this.asyncValidator = getValue(config, "asyncValidator", null);
        this.createGroup = config["createGroup"];
        this.groups = getValue(config, "groups", null);
        this.initialCount = getValue(config, "initialCount", 1);
        this.originGroup = this.createGroup();
        this.type = DYNAMIC_FORM_CONTROL_TYPE_ARRAY;
        this.validator = getValue(config, "validator", null);

        if (!Array.isArray(this.groups)) {

            this.groups = [];
            for (let i = 0; i < this.initialCount; i += 1) {
                this.addGroup();
            }
        }
    }

    updateGroupIndex(): void {
        this.groups.forEach((group, index) => group.index = index);
    }

    addGroup(): DynamicFormArrayGroupModel {

        let group = new DynamicFormArrayGroupModel(this.createGroup());

        this.groups.push(group);
        this.updateGroupIndex();

        return group;
    }

    insertGroup(index: number): DynamicFormArrayGroupModel {

        let group = new DynamicFormArrayGroupModel(this.createGroup());

        this.groups.splice(index, 0, group);
        this.updateGroupIndex();

        return group;
    }

    removeGroup(index: number): void {

        this.groups.splice(index, 1);
        this.updateGroupIndex();
    }
}