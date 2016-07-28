import {DynamicFormAbstractControlModel} from "./dynamic-form-abstract-control.model";

export interface IDynamicFormGroupModel {

    group: Array<DynamicFormAbstractControlModel>;
}

export class DynamicFormModel implements IDynamicFormGroupModel {

    group: Array<DynamicFormAbstractControlModel>;

    constructor(group: Array<DynamicFormAbstractControlModel>) {
        this.group = group || [];
    }

    findById(id: string): DynamicFormAbstractControlModel {
        return this.group.find(controlModel => controlModel.id === id);
    }
}