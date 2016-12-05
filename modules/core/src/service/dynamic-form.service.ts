import {Injectable} from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormArray,
    Validators,
    ValidatorFn,
    AsyncValidatorFn
} from "@angular/forms";
import {DynamicFormControlModel, DynamicValidatorsMap} from "../model/dynamic-form-control.model";
import {DynamicFormValueControlModel, DynamicFormControlValue} from "../model/dynamic-form-value-control.model";
import {DynamicFormArrayModel, DYNAMIC_FORM_CONTROL_TYPE_ARRAY} from "../model/form-array/dynamic-form-array.model";
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
import {isFunction, isDefined} from "../utils";

@Injectable()
export class DynamicFormService {

    constructor(private formBuilder: FormBuilder) {}

    getValidatorFn(validatorName: string, validatorArgs?: any): ValidatorFn | AsyncValidatorFn | never {

        let validatorFn = Validators[validatorName];

        if (!isFunction(validatorFn)) {
            throw new Error(`validator "${validatorName}" is not provided via NG_VALIDATORS multi provider`);
        }

        return isDefined(validatorArgs) ? validatorFn(validatorArgs) : validatorFn;
    }

    getValidatorFns(config: DynamicValidatorsMap): Array<ValidatorFn | AsyncValidatorFn> {

        return isDefined(config) ?
            Object.keys(config).map(validatorName => this.getValidatorFn(validatorName, config[validatorName])) : [];
    }

    createFormArray(model: DynamicFormArrayModel): FormArray {

        let formArray = [];

        for (let i = 0; i < model.size; i += 1) {
            formArray.push(this.createFormGroup(model.get(i).group));
        }

        return this.formBuilder.array(
            formArray,
            this.getValidatorFns(model.validator)[0] || null,
            this.getValidatorFns(model.asyncValidator)[0] || null
        );
    }

    createFormGroup(group: Array<DynamicFormControlModel>, groupExtra: {[key: string]: any} | null = null): FormGroup {

        let formGroup = {};

        group.forEach(model => {

            if (model.type === DYNAMIC_FORM_CONTROL_TYPE_ARRAY) {

                let arrayModel = <DynamicFormArrayModel> model;

                formGroup[model.id] = this.createFormArray(arrayModel);

            } else if (model.type === DYNAMIC_FORM_CONTROL_TYPE_GROUP || model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP) {

                let groupModel = <DynamicFormGroupModel> model,
                    groupExtra = {
                        validator: this.getValidatorFns(groupModel.validator)[0] || null,
                        asyncValidator: this.getValidatorFns(groupModel.asyncValidator)[0] || null
                    };

                formGroup[model.id] = this.createFormGroup(groupModel.group, groupExtra);

            } else {

                let controlModel = <DynamicFormValueControlModel<DynamicFormControlValue>> model;

                formGroup[controlModel.id] = new FormControl(
                    {
                        value: controlModel.value,
                        disabled: controlModel.disabled
                    },
                    Validators.compose(this.getValidatorFns(controlModel.validators || [])),
                    Validators.composeAsync(this.getValidatorFns(controlModel.asyncValidators || []))
                );
            }
        });

        return this.formBuilder.group(formGroup, groupExtra);
    }

    createFormArrayGroup(formArrayModel: DynamicFormArrayModel): FormGroup {

        return this.createFormGroup(formArrayModel.addGroup().group);
    }

    addFormArrayGroup(formArray: FormArray, model: DynamicFormArrayModel): void {

        formArray.push(this.createFormArrayGroup(model));
    }

    insertFormArrayGroup(index: number, formArray: FormArray, model: DynamicFormArrayModel): void {

        formArray.insert(index, this.createFormGroup(model.insertGroup(index).group));
    }

    removeFormArrayGroup(index: number, formArray: FormArray, model: DynamicFormArrayModel): void {

        formArray.removeAt(index);
        model.removeGroup(index);
    }

    clearFormArray(formArray: FormArray, model: DynamicFormArrayModel): void {

        while (formArray.length > 0) {
            this.removeFormArrayGroup(0, formArray, model);
        }
    }

    findById(id: string, group: Array<DynamicFormControlModel>): DynamicFormControlModel {

        return group.find(controlModel => controlModel.id === id);
    }

    fromJSON(json: Array<Object>): Array<DynamicFormControlModel> | never {

        let formModel: Array<DynamicFormControlModel> = [];

        json.forEach(object => {

            switch (object["type"]) {

                case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                    object["groups"].forEach(groupObject => groupObject["group"] = this.fromJSON(groupObject["group"]));
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
                    throw new Error(`unknown form control type with id "${object["id"]}" defined on JSON object`);
            }
        });

        return formModel;
    }
}