import {Injectable} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IDynamicFormModel} from "../model/dynamic-form.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP, DynamicCheckboxGroupModel} from "../model/checkbox/dynamic-checkbox-group.model";

@Injectable()
export class DynamicFormService {

    formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder) {

        this.formBuilder = formBuilder;
    }
    
    createFormGroup(dynamicFormModel: IDynamicFormModel): FormGroup {

        let formGroup = {};
        
        dynamicFormModel.items.forEach(controlModel => {
            
            if (controlModel.type !== DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP) {

                formGroup[controlModel.id] = new FormControl(

                    controlModel.value || null,
                    Validators.compose(controlModel.validators),
                    Validators.composeAsync(controlModel.validatorsAsync)
                );
                
            } else {
                formGroup[controlModel.id] = this.createFormGroup(<DynamicCheckboxGroupModel> controlModel);
            }
        });

        return this.formBuilder.group(formGroup);
    }
}