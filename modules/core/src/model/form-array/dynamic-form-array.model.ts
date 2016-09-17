import {ValidatorFn, AsyncValidatorFn} from "@angular/forms";
import {DynamicFormControlModel, DynamicFormControlModelConfig, ClsConfig} from "../dynamic-form-control.model";
import {DynamicFormValueControlModel} from "../dynamic-form-value-control.model";
import {getValue, isFunction} from "../../utils";

export class DynamicFormArrayGroupModel {

    group: Array<DynamicFormValueControlModel<any>>;
    index: number | null;

    constructor(group: Array<DynamicFormValueControlModel<any>> = [], index: number | null = null) {

        this.group = group;
        this.index = index;
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

    asyncValidator: AsyncValidatorFn | null;
    createGroup: () => Array<DynamicFormValueControlModel<any>>;
    groups: Array<DynamicFormArrayGroupModel> = [];
    initialCount: number;
    validator: ValidatorFn | null;

    readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_ARRAY;

    private originGroup: Array<DynamicFormValueControlModel<any>>; // only to reinstantiate from JSON

    constructor(config: DynamicFormArrayModelConfig, cls?: ClsConfig) {

        super(config, cls);

        if (!isFunction(config["createGroup"])) {
            throw new Error("createGroup function must be specified for DynamicFormArrayModel");
        }

        this.asyncValidator = getValue(config, "asyncValidator", null);
        this.createGroup = config["createGroup"];
        this.initialCount = getValue(config, "initialCount", 1);
        this.originGroup = this.createGroup();
        this.validator = getValue(config, "validator", null);

        if (Array.isArray(config.groups)) {

            config.groups.forEach((arrayGroup, index) => {
                this.groups.push(new DynamicFormArrayGroupModel(arrayGroup.group, arrayGroup.index || index));
            });

        } else {

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