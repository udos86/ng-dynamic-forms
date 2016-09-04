import {Injectable} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, FormArray, Validators} from "@angular/forms";
import {DynamicFormControlModel} from "../model/dynamic-form-control.model";
import {DynamicFormValueControlModel} from "../model/dynamic-form-value-control.model";
import {
    DynamicFormArrayModel,
    DynamicFormArrayGroupModel,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY
} from "../model/form-array/dynamic-form-array.model";
import {DYNAMIC_FORM_CONTROL_TYPE_GROUP, DynamicFormGroupModel} from "../model/form-group/dynamic-form-group.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP} from "../model/checkbox/dynamic-checkbox-group.model";

@Injectable()
export class DynamicFormService {

    formBuilder: FormBuilder;

    constructor(formBuilder: FormBuilder) {

        this.formBuilder = formBuilder;
    }

    createFormArray(model: DynamicFormArrayModel): FormArray {

        let formArray = [];

        model.groups.forEach((arrayGroupModel: DynamicFormArrayGroupModel) => {
            formArray.push(this.createFormGroup(arrayGroupModel.group));
        });

        return this.formBuilder.array(formArray, model.validator, model.asyncValidator);
    }

    createFormGroup(group: Array<DynamicFormControlModel>, groupExtra: {[key: string]: any} = null): FormGroup {

        let formGroup = {};

        group.forEach(model => {

            if (model.type === DYNAMIC_FORM_CONTROL_TYPE_ARRAY) {

                let arrayModel = <DynamicFormArrayModel> model;

                formGroup[model.id] = this.createFormArray(arrayModel);

            } else if (model.type === DYNAMIC_FORM_CONTROL_TYPE_GROUP || model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP) {

                let groupModel = <DynamicFormGroupModel> model,
                    groupExtra = {validator: groupModel.validator, asyncValidator: groupModel.asyncValidator};

                formGroup[model.id] = this.createFormGroup(groupModel.group, groupExtra);

            } else {

                let controlModel = <DynamicFormValueControlModel<any>> model;

                formGroup[controlModel.id] = new FormControl(
                    {value: controlModel.value, disabled: controlModel.disabled},
                    Validators.compose(controlModel.validators),
                    Validators.composeAsync(controlModel.asyncValidators)
                );
            }
        });

        return this.formBuilder.group(formGroup, groupExtra);
    }


    createFormArrayGroup(dynamicFormArrayModel: DynamicFormArrayModel): FormGroup {

        return this.createFormGroup(dynamicFormArrayModel.addGroup().group);
    }

    addFormArrayGroup(formArray: FormArray, dynamicFormArrayModel: DynamicFormArrayModel): void {

        formArray.push(this.createFormArrayGroup(dynamicFormArrayModel));
    }

    insertFormArrayGroup(index: number, formArray: FormArray, dynamicFormArrayModel: DynamicFormArrayModel): void {

        formArray.insert(index, this.createFormGroup(dynamicFormArrayModel.insertGroup(index).group));
    }

    removeFormArrayGroup(index: number, formArray: FormArray, dynamicFormArrayModel: DynamicFormArrayModel): void {

        formArray.removeAt(index);
        dynamicFormArrayModel.removeGroup(index);
    }

    clearFormArray(formArray: FormArray, dynamicFormArrayModel: DynamicFormArrayModel): void {

        while (formArray.length > 0) {
            this.removeFormArrayGroup(0, formArray, dynamicFormArrayModel);
        }
    }

    findById(id: string, group: Array<DynamicFormControlModel>): DynamicFormControlModel {
        return group.find(controlModel => controlModel.id === id);
    }
}