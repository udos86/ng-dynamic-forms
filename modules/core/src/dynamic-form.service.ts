import {Injectable} from "@angular/core";
import {FormBuilder, Validators} from "@angular/common";
import {DynamicFormModel} from "./dynamic-form.model";

@Injectable()
export class DynamicFormService {

    formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder) {

        this.formBuilder = formBuilder;
    }

    createControlGroup(dynamicFormModel: DynamicFormModel) {

        let controlGroup = {};

        dynamicFormModel.items.sort((a, b) => a.order - b.order);
        dynamicFormModel.items.forEach(dynamicFormControlModel => {

            controlGroup[dynamicFormControlModel.id] = [
                dynamicFormControlModel.value || null,
                Validators.compose(dynamicFormControlModel.validators),
                Validators.composeAsync(dynamicFormControlModel.validatorsAsync)];
        });

        return this.formBuilder.group(controlGroup);
    }
}