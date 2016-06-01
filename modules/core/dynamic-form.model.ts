import {DynamicFormControlModel} from "./dynamic-form-control.model";

export class DynamicFormModel {

    items: Array<DynamicFormControlModel<any>>;

    constructor(items: Array<DynamicFormControlModel<any>>) {
        this.items = items;
    }

    findById(id: string) {
        return this.items.find(item => item.id === id);
    }
}