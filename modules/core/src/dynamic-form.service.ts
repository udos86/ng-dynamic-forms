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
        
        dynamicFormModel.model.forEach(formControlModel => {

            formGroup[formControlModel.id] = new FormControl(
                
                formControlModel.value || null,
                Validators.compose(formControlModel.validators),
                Validators.composeAsync(formControlModel.validatorsAsync)
            );
        });

        return this.formBuilder.group(formGroup);
    }
}