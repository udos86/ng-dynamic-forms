import {DynamicFormAbstractControlModel} from "./dynamic-form-abstract-control.model";

export interface IDynamicFormModel {
    items: Array<DynamicFormAbstractControlModel>;
}

export class DynamicFormModel implements IDynamicFormModel{

    items: Array<DynamicFormAbstractControlModel>;

    constructor(items: Array<DynamicFormAbstractControlModel>) {
        this.items = items || [];
    }

    findById(id: string): DynamicFormAbstractControlModel {
        return this.items.find(controlModel => controlModel.id === id);
    }
}