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

        dynamicFormModel.model.sort((a, b) => a.order - b.order);
        dynamicFormModel.model.forEach(controlModel => {

            controlGroup[controlModel.id] = [
                
                controlModel.value || null,
                Validators.compose(controlModel.validators),
                Validators.composeAsync(controlModel.validatorsAsync)
            ];
        });

        return this.formBuilder.group(controlGroup);
    }
}