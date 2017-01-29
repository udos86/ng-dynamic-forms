import { Inject, Optional } from "@angular/core";
import {
    FormBuilder,
    FormControl,
    FormGroup,
    FormArray,
    Validators,
    ValidatorFn,
    AsyncValidatorFn,
    NG_VALIDATORS,
    NG_ASYNC_VALIDATORS
} from "@angular/forms";
import { DynamicFormControlModel, DynamicValidatorsMap } from "../model/dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormControlValue } from "../model/dynamic-form-value-control.model";
import { DynamicFormArrayModel, DYNAMIC_FORM_CONTROL_TYPE_ARRAY } from "../model/form-array/dynamic-form-array.model";
import { DYNAMIC_FORM_CONTROL_TYPE_GROUP, DynamicFormGroupModel } from "../model/form-group/dynamic-form-group.model";
import {
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DynamicCheckboxGroupModel
} from "../model/checkbox/dynamic-checkbox-group.model";
import { DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX, DynamicCheckboxModel } from "../model/checkbox/dynamic-checkbox.model";
import {
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DynamicDatepickerModel
} from "../model/datepicker/dynamic-datepicker.model";
import { DYNAMIC_FORM_CONTROL_TYPE_INPUT, DynamicInputModel } from "../model/input/dynamic-input.model";
import {
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DynamicRadioGroupModel
} from "../model/radio/dynamic-radio-group.model";
import { DYNAMIC_FORM_CONTROL_TYPE_SELECT, DynamicSelectModel } from "../model/select/dynamic-select.model";
import { DYNAMIC_FORM_CONTROL_TYPE_SLIDER, DynamicSliderModel } from "../model/slider/dynamic-slider.model";
import { DYNAMIC_FORM_CONTROL_TYPE_SWITCH, DynamicSwitchModel } from "../model/switch/dynamic-switch.model";
import { DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA, DynamicTextAreaModel } from "../model/textarea/dynamic-textarea.model";
import { isFunction, isDefined } from "../utils";

export class DynamicFormService {

    constructor(@Inject(FormBuilder) private formBuilder: FormBuilder,
                @Optional() @Inject(NG_VALIDATORS) private NG_VALIDATORS: ValidatorFn[],
                @Optional() @Inject(NG_ASYNC_VALIDATORS) private NG_ASYNC_VALIDATORS: AsyncValidatorFn[]) {}


    private parseJSONReviver(key: string, value: any): any {

        let regexISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

        return value === "string" && regexISO.test(value) ? new Date(value) : value;
    }


    getCustomValidatorFn(validatorName: string): ValidatorFn | AsyncValidatorFn | undefined {

        let validatorFn;

        if (this.NG_VALIDATORS) {
            validatorFn = this.NG_VALIDATORS.find(validator => validatorName === validator.name);
        }

        if (!isDefined(validatorFn) && this.NG_ASYNC_VALIDATORS) {
            validatorFn = this.NG_ASYNC_VALIDATORS.find(asyncValidator => validatorName === asyncValidator.name);
        }

        return validatorFn;
    }


    getValidatorFn(validatorName: string, validatorArgs?: any): ValidatorFn | AsyncValidatorFn | never {

        let validatorFn = Validators[validatorName] || this.getCustomValidatorFn(validatorName);

        if (!isFunction(validatorFn)) {
            throw new Error(`validator "${validatorName}" is not provided via NG_VALIDATORS or NG_ASYNC_VALIDATORS`);
        }

        return isDefined(validatorArgs) ? validatorFn(validatorArgs) : validatorFn;
    }


    getValidators(config: DynamicValidatorsMap): ValidatorFn[] | AsyncValidatorFn[] {

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
            this.getValidators(model.validator)[0] || null,
            this.getValidators(model.asyncValidator)[0] || null
        );
    }


    createFormGroup(group: DynamicFormControlModel[], groupExtra: {[key: string]: any} | null = null): FormGroup {

        let formGroup = {};

        group.forEach(model => {

            if (model.type === DYNAMIC_FORM_CONTROL_TYPE_ARRAY) {

                let arrayModel = model as DynamicFormArrayModel;

                formGroup[model.id] = this.createFormArray(arrayModel);

            } else if (model.type === DYNAMIC_FORM_CONTROL_TYPE_GROUP || model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP) {

                let groupModel = model as DynamicFormGroupModel,
                    groupExtra = {
                        validator: this.getValidators(groupModel.validator)[0] || null,
                        asyncValidator: this.getValidators(groupModel.asyncValidator)[0] || null
                    };

                formGroup[model.id] = this.createFormGroup(groupModel.group, groupExtra);

            } else {

                let controlModel = model as DynamicFormValueControlModel<DynamicFormControlValue>;

                formGroup[controlModel.id] = new FormControl(
                    {
                        value: controlModel.value,
                        disabled: controlModel.disabled
                    },
                    Validators.compose(this.getValidators(controlModel.validators || [])),
                    Validators.composeAsync(this.getValidators(controlModel.asyncValidators || []))
                );
            }
        });

        return this.formBuilder.group(formGroup, groupExtra);
    }


    addFormGroupControl(formGroup: FormGroup,
                        groupModel: DynamicFormControlModel[] | DynamicFormGroupModel,
                        ...controlModels: DynamicFormControlModel[]): void {

        let controls = this.createFormGroup(controlModels).controls;

        Object.keys(controls).forEach((controlName, index) => {

            let controlModel = controlModels[index];

            if (groupModel instanceof DynamicFormGroupModel) {
                groupModel.add(controlModel);

            } else {
                (groupModel as DynamicFormControlModel[]).push(controlModel);
            }

            formGroup.addControl(controlName, controls[controlName]);
        });
    }


    removeFormGroupControl(index: number,
                           formGroup: FormGroup,
                           groupModel: DynamicFormControlModel[] | DynamicFormGroupModel) {

        if (groupModel instanceof DynamicFormGroupModel) {

            formGroup.removeControl(groupModel.get(index).id);
            groupModel.remove(index);

        } else {

            formGroup.removeControl(groupModel[index].id);
            (groupModel as DynamicFormControlModel[]).splice(index, 1);
        }
    }


    addFormArrayGroup(formArray: FormArray, model: DynamicFormArrayModel): void {

        formArray.push(this.createFormGroup(model.addGroup().group));
    }


    insertFormArrayGroup(index: number, formArray: FormArray, model: DynamicFormArrayModel): void {

        formArray.insert(index, this.createFormGroup(model.insertGroup(index).group));
    }


    removeFormArrayGroup(index: number, formArray: FormArray, model: DynamicFormArrayModel): void {

        formArray.removeAt(index);
        model.removeGroup(index);
    }


    moveFormArrayGroup(index: number, step: number, formArray: FormArray, model: DynamicFormArrayModel): void {

        let newIndex = index + step,
            formControl = formArray.at(index);

        if ((index >= 0 && index < model.size) && (newIndex >= 0 && newIndex < model.size)) {

            formArray.setControl(index, formArray.at(newIndex));
            formArray.setControl(newIndex, formControl);
            model.moveGroup(index, step);

        } else {
            throw new Error(`form array group cannot be moved due to index or new index being out of bounds`);
        }
    }


    clearFormArray(formArray: FormArray, model: DynamicFormArrayModel): void {

        while (formArray.length > 0) {
            this.removeFormArrayGroup(0, formArray, model);
        }
    }


    findById(id: string, groupModel: DynamicFormControlModel[]): DynamicFormControlModel | undefined {

        return groupModel.find(controlModel => controlModel.id === id);
    }


    fromJSON(json: string | Object[]): DynamicFormControlModel[] | never {

        let rawModel = typeof json === "string" ? JSON.parse(json, this.parseJSONReviver) : json,
            formModel = [];

        rawModel.forEach(model => {

            switch (model["type"]) {

                case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                    model["groups"].forEach(groupObject => groupObject["group"] = this.fromJSON(groupObject["group"]));
                    model["createGroup"] = () => this.fromJSON(model["originGroup"]);
                    formModel.push(new DynamicFormArrayModel(model, model["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                    formModel.push(new DynamicCheckboxModel(model, model["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
                    model["group"] = this.fromJSON(model["group"]);
                    formModel.push(new DynamicCheckboxGroupModel(model, model["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                    formModel.push(new DynamicDatepickerModel(model, model["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                    model["group"] = this.fromJSON(model["group"]);
                    formModel.push(new DynamicFormGroupModel(model, model["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                    formModel.push(new DynamicInputModel(model, model["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                    formModel.push(new DynamicRadioGroupModel(model, model["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                    formModel.push(new DynamicSelectModel(model, model["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                    formModel.push(new DynamicSliderModel(model, model["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                    formModel.push(new DynamicSwitchModel(model, model["cls"]));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                    formModel.push(new DynamicTextAreaModel(model, model["cls"]));
                    break;

                default:
                    throw new Error(`unknown form control type with id "${model["id"]}" defined on JSON object`);
            }
        });

        return formModel;
    }
}