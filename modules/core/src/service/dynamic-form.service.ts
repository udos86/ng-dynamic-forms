import {Injectable} from "@angular/core";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {DynamicFormModel} from "../model/dynamic-form.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP} from "../model/checkbox/dynamic-checkbox-group.model";

@Injectable()
export class DynamicFormService {

    formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder) {

        this.formBuilder = formBuilder;
    }
    
    createFormGroup(dynamicFormModel: DynamicFormModel) {

        let formGroup = {};
        
        dynamicFormModel.items.forEach(controlModel => {
            
            if (controlModel.type !== DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP) {

                formGroup[controlModel.id] = new FormControl(

                    controlModel.value || null,
                    Validators.compose(controlModel.validators),
                    Validators.composeAsync(controlModel.validatorsAsync)
                );
            } else {
                // TODO
            }
        });

        return this.formBuilder.group(formGroup);
    }
}