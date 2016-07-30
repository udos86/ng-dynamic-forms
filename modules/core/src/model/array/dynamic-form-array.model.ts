import {DynamicFormAbstractControlModel} from "../dynamic-form-abstract-control.model";
import {DynamicFormControlModel} from "../dynamic-form-control.model";
import {getValue, isFunction} from "../../utils";

export const DYNAMIC_FORM_CONTROL_TYPE_ARRAY = "ARRAY";

export class DynamicFormArrayModel extends DynamicFormAbstractControlModel {

    initialCount: number;
    groups: Array<Array<DynamicFormControlModel<any>>> = [];
    createGroup: () => Array<DynamicFormControlModel<any>>;

    constructor(config: {} = {}, cls?: {}) {

        super(config, cls);

        if (!isFunction(config["createGroup"])) {
            throw new Error("createGroup function must be specified for DynamicFormArrayModel");
        }

        this.createGroup = config["createGroup"];
        this.initialCount = getValue(config, "initialCount", 1);
        this.type = DYNAMIC_FORM_CONTROL_TYPE_ARRAY;
    }

    addGroup(): Array<DynamicFormControlModel<any>> {

        let group = this.createGroup();

        this.groups.push(group);

        return group;
    }

    insertGroup(index: number): Array<DynamicFormControlModel<any>> {

        let group = this.createGroup();

        this.groups.splice(index, 0, group);

        return group;
    }

    removeGroup(index: number): void {
        this.groups.splice(index, 1);
    }
}