import {Injectable} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray, Validators} from "@angular/forms";
import {IFormGroupModel} from "../model/dynamic-form.model";
import {DynamicFormControlModel} from "../model/dynamic-form-control.model";
import {DynamicFormArrayModel, DYNAMIC_FORM_CONTROL_TYPE_ARRAY} from "../model/dynamic-form-array.model";
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

    createFormArray(dynamicFormArrayModel: DynamicFormArrayModel, count: number): FormArray {

        let formArray = [];

        for (let i = 0; i < count; i += 1) {
            formArray.push(this.createFormGroup(dynamicFormArrayModel));
        }

        return this.formBuilder.array(formArray);
    }

    createFormGroup(formGroupModel: IFormGroupModel): FormGroup {

        let formGroup = {};

        formGroupModel.items.forEach(item => {

            if (item.type === DYNAMIC_FORM_CONTROL_TYPE_ARRAY) {

                let arrayModel = <DynamicFormArrayModel> item;

                formGroup[item.id] = this.createFormArray(arrayModel, arrayModel.initialCount);

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