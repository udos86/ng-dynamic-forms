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
import {
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DynamicCheckboxGroupModel
} from "../model/checkbox/dynamic-checkbox-group.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX, DynamicCheckboxModel,} from "../model/checkbox/dynamic-checkbox.model";
import {DYNAMIC_FORM_CONTROL_TYPE_INPUT, DynamicInputModel} from "../model/input/dynamic-input.model";
import {DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP, DynamicRadioGroupModel} from "../model/radio/dynamic-radio-group.model";
import {DYNAMIC_FORM_CONTROL_TYPE_SELECT, DynamicSelectModel} from "../model/select/dynamic-select.model";
import {DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA, DynamicTextAreaModel} from "../model/textarea/dynamic-textarea.model";
import {deserializeValidator, deserializeValidators} from "../utils";

@Injectable()
export class DynamicFormService {

    constructor(private formBuilder: FormBuilder) {
    }

    createFormArray(model: DynamicFormArrayModel): FormArray {

        let formArray = [];

        model.groups.forEach((arrayGroupModel: DynamicFormArrayGroupModel) => {
            formArray.push(this.createFormGroup(arrayGroupModel.group));
        });

        return this.formBuilder.array(formArray, model.validator, model.asyncValidator);
    }

    createFormGroup(group: Array<DynamicFormControlModel>, groupExtra: {[key: string]: any} | null = null): FormGroup {

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

    fromJSON(json: Array<Object>): Array<DynamicFormControlModel> | never {

        let formModel: Array<DynamicFormControlModel> = [];

        json.forEach(object => {

            ["asyncValidator", "validator"].forEach(prop => {
                object[prop] = deserializeValidator(object[prop]);
            });

            ["asyncValidators", "validators"].forEach(prop => {
                if (Array.isArray(object[prop])) {
                    object[prop] = deserializeValidators(object[prop]);
                }
            });

            switch (object["type"]) {

                case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                    object["createGroup"] = () => this.fromJSON(object["originGroup"]);
                    formModel.push(new DynamicFormArrayModel(object, object["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                    formModel.push(new DynamicCheckboxModel(object, object["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
                    object["group"] = this.fromJSON(object["group"]);
                    formModel.push(new DynamicCheckboxGroupModel(object, object["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                    object["group"] = this.fromJSON(object["group"]);
                    formModel.push(new DynamicFormGroupModel(object, object["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                    formModel.push(new DynamicInputModel(object, object["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                    formModel.push(new DynamicRadioGroupModel(object, object["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                    formModel.push(new DynamicSelectModel(object, object["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                    formModel.push(new DynamicTextAreaModel(object, object["cls"]));
                    break;

                default:
                    throw new Error(`unknown form control type defined on JSON object`);
            }
        });

        return formModel;
    }
}