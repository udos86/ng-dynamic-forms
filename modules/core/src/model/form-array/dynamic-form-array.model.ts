import {DynamicFormControlModel, DynamicFormControlModelConfig, ClsConfig} from "../dynamic-form-control.model";
import {DynamicFormValueControlModel} from "../dynamic-form-value-control.model";
import {getValue, isFunction} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_ARRAY = "ARRAY";

export interface FormArrayModelConfig extends DynamicFormControlModelConfig {

    createGroup?: () => Array<DynamicFormValueControlModel<any>>;
    groups?: Array<Array<DynamicFormValueControlModel<any>>>;
    initialCount?: number;
}

export class DynamicFormArrayModel extends DynamicFormControlModel {

    createGroup: () => Array<DynamicFormValueControlModel<any>>;
    groups: Array<Array<DynamicFormValueControlModel<any>>> = [];
    initialCount: number;

    constructor(config: FormArrayModelConfig, cls?: ClsConfig) {

        super(config, cls);

        if (!isFunction(config["createGroup"])) {
            throw new Error("createGroup function must be specified for DynamicFormArrayModel");
        }

        this.createGroup = config["createGroup"];
        this.initialCount = getValue(config, "initialCount", 1);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_ARRAY;

        for (let i = 0; i < this.initialCount; i += 1) {
            this.addGroup();
        }
    }

    updateGroupIndex() {
        this.groups.forEach((group, idx) => group["index"] = idx);
    }

    addGroup(): Array<DynamicFormValueControlModel<any>> {

        let group = this.createGroup();

        this.groups.push(group);
        this.updateGroupIndex();

        return group;
    }

    insertGroup(index: number): Array<DynamicFormValueControlModel<any>> {

        let group = this.createGroup();

        this.groups.splice(index, 0, group);
        this.updateGroupIndex();

        return group;
    }

    removeGroup(index: number): void {

        this.groups.splice(index, 1);
        this.updateGroupIndex();
    }
}