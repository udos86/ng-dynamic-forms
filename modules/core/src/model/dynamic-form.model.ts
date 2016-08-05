import {DynamicFormControlModel} from "./dynamic-form-control.model";

export class DynamicFormModel {

    group: Array<DynamicFormControlModel>;

    constructor(group: Array<DynamicFormControlModel>) {
        this.group = group || [];
    }

    findById(id: string): DynamicFormControlModel {
        return this.group.find(controlModel => controlModel.id === id);
    }
}