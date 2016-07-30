import {Injectable} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray, Validators} from "@angular/forms";
import {DynamicFormAbstractControlModel} from "../model/dynamic-form-abstract-control.model";
import {DynamicFormControlModel} from "../model/dynamic-form-control.model";
import {DynamicFormArrayModel, DYNAMIC_FORM_CONTROL_TYPE_ARRAY} from "../model/array/dynamic-form-array.model";
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
            formArray.push(this.createFormArrayGroup(dynamicFormArrayModel));
        }

        return this.formBuilder.array(formArray);
    }

    createFormGroup(group: Array<DynamicFormAbstractControlModel>): FormGroup {

        let formGroup = {};

        group.forEach(model => {

            if (model.type === DYNAMIC_FORM_CONTROL_TYPE_ARRAY) {

                let arrayModel = <DynamicFormArrayModel> model;

                formGroup[model.id] = this.createFormArray(arrayModel, arrayModel.initialCount);

            } else if (model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP) {

                let checkboxGroupModel = <DynamicCheckboxGroupModel> model;

                formGroup[model.id] = this.createFormGroup(checkboxGroupModel.group);

            } else {

                let controlModel = <DynamicFormControlModel<any>> model;

                formGroup[controlModel.id] = new FormControl(
                    controlModel.value || null,
                    Validators.compose(controlModel.validators),
                    Validators.composeAsync(controlModel.validatorsAsync)
                );
            }
        });

        return this.formBuilder.group(formGroup);
    }


    createFormArrayGroup(dynamicFormArrayModel: DynamicFormArrayModel): FormGroup {

        return this.createFormGroup(dynamicFormArrayModel.addGroup());
    }

    addFormArrayGroup(formArray: FormArray, dynamicFormArrayModel: DynamicFormArrayModel): void {

        formArray.push(this.createFormArrayGroup(dynamicFormArrayModel));
    }

    insertFormArrayGroup(index: number, formArray: FormArray, dynamicFormArrayModel: DynamicFormArrayModel): void {

        formArray.insert(index, this.createFormGroup(dynamicFormArrayModel.insertGroup(index)));
    }

    removeFormArrayGroup(index: number, formArray: FormArray, dynamicFormArrayModel: DynamicFormArrayModel): void {

        formArray.removeAt(index);
        dynamicFormArrayModel.removeGroup(index);
    }
}