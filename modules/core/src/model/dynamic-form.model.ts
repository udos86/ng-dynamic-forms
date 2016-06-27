import {DynamicFormControlModel} from "./dynamic-form-control.model";

export interface IDynamicFormModel {
    items: Array<DynamicFormControlModel<any>>;
}

export class DynamicFormModel implements IDynamicFormModel{

    items: Array<DynamicFormControlModel<any>>;

    constructor(items: Array<DynamicFormControlModel<any>>) {
        this.items = items || [];
    }

    findById(id: string) {
        return this.items.find(controlModel => controlModel.id === id);
    }
}