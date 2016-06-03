import {DynamicFormControlModel} from "./dynamic-form-control.model";

export class DynamicFormModel {

    model: Array<DynamicFormControlModel<any>>;

    constructor(model: Array<DynamicFormControlModel<any>>) {
        this.model = model;
    }

    findById(id: string) {
        return this.model.find(controlModel => controlModel.id === id);
    }
}