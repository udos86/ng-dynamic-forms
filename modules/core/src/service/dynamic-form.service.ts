import {Injectable} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IDynamicFormModel} from "../model/dynamic-form.model";
import {DynamicFormControlModel} from "../model/dynamic-form-control.model";
import {DYNAMIC_FORM_CONTROL_TYPE_ARRAY} from "../model/dynamic-form-array-control.model";
import {
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DynamicCheckboxGroupModel
} from "../model/checkbox/dynamic-checkbox-group.model";

@Injectable()
export class DynamicFormService {

    formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder) {

        this.formBuilder = formBuilder;
    }

    createFormGroup(dynamicFormModel: IDynamicFormModel): FormGroup {

        let formGroup = {};

        dynamicFormModel.items.forEach(item => {

            if (item.type === DYNAMIC_FORM_CONTROL_TYPE_ARRAY) {

                // TODO

            } else if (item.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP) {

                formGroup[item.id] = this.createFormGroup(<DynamicCheckboxGroupModel> item);

            } else {

                let controlModel = <DynamicFormControlModel<any>> item;

                formGroup[controlModel.id] = new FormControl(
                    controlModel.value || null,
                    Validators.compose(controlModel.validators),
                    Validators.composeAsync(controlModel.validatorsAsync)
                );
            }
        });

        return this.formBuilder.group(formGroup);
    }
}