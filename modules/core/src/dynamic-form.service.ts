import {Injectable} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {DynamicFormModel} from "./dynamic-form.model";

@Injectable()
export class DynamicFormService {

    formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder) {

        this.formBuilder = formBuilder;
    }
    
    createFormGroup(dynamicFormModel: DynamicFormModel) {

        let formGroup = {};
        
        dynamicFormModel.items.forEach(controlModel => {

            formGroup[controlModel.id] = new FormControl(
                
                controlModel.value || null,
                Validators.compose(controlModel.validators),
                Validators.composeAsync(controlModel.validatorsAsync)
            );
        });

        return this.formBuilder.group(formGroup);
    }
}