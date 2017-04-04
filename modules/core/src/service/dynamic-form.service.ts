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
    NG_ASYNC_VALIDATORS, AbstractControl
} from "@angular/forms";
import { DynamicFormControlModel, DynamicValidatorsMap } from "../model/dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormControlValue } from "../model/dynamic-form-value-control.model";
import {
    DynamicFormArrayModel, DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DynamicFormArrayGroupModel
} from "../model/form-array/dynamic-form-array.model";
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
import { DYNAMIC_FORM_CONTROL_TYPE_EDITOR, DynamicEditorModel } from "../model/editor/dynamic-editor.model";
import {
    DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD,
    DynamicFileUploadModel
} from "../model/file-upload/dynamic-file-upload.model";
import { DYNAMIC_FORM_CONTROL_TYPE_INPUT, DynamicInputModel } from "../model/input/dynamic-input.model";
import {
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DynamicRadioGroupModel
} from "../model/radio/dynamic-radio-group.model";
import { DYNAMIC_FORM_CONTROL_TYPE_SELECT, DynamicSelectModel } from "../model/select/dynamic-select.model";
import { DYNAMIC_FORM_CONTROL_TYPE_SLIDER, DynamicSliderModel } from "../model/slider/dynamic-slider.model";
import { DYNAMIC_FORM_CONTROL_TYPE_SWITCH, DynamicSwitchModel } from "../model/switch/dynamic-switch.model";
import { DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA, DynamicTextAreaModel } from "../model/textarea/dynamic-textarea.model";
import { isFunction, isDefined, isString } from "../utils";

export class DynamicFormService {

    constructor(@Inject(FormBuilder) private formBuilder: FormBuilder,
                @Optional() @Inject(NG_VALIDATORS) private NG_VALIDATORS: ValidatorFn[],
                @Optional() @Inject(NG_ASYNC_VALIDATORS) private NG_ASYNC_VALIDATORS: AsyncValidatorFn[]) {}


    private parseJSONReviver(key: string, value: any): any {

        let regexISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*))(?:Z|(\+|-)([\d|:]*))?$/;

        return isString(value) && regexISO.test(value) ? new Date(value) : value;
    }


    getCustomValidatorFn(validatorName: string): ValidatorFn | null {

        let validatorFn = null;

        if (this.NG_VALIDATORS) {

            validatorFn = this.NG_VALIDATORS.find(validatorFn => {
                return validatorName === validatorFn.name || (validatorFn(new FormControl()) as Object).hasOwnProperty(validatorName);
            });
        }

        return validatorFn;
    }


    getCustomAsyncValidatorFn(validatorName: string): AsyncValidatorFn | null {

        let asyncValidatorFn = null;

        if (this.NG_ASYNC_VALIDATORS) {
            asyncValidatorFn = this.NG_ASYNC_VALIDATORS.find(asyncValidatorFn => validatorName === asyncValidatorFn.name);
        }

        return asyncValidatorFn;
    }


    getValidatorFn(validatorName: string, validatorArgs?: any): ValidatorFn | never {

        let validatorFn: any = Validators[validatorName] || this.getCustomValidatorFn(validatorName);

        if (!isFunction(validatorFn)) {
            throw new Error(`validator "${validatorName}" is not provided via NG_VALIDATORS`);
        }

        return isDefined(validatorArgs) ? validatorFn(validatorArgs) : validatorFn;
    }


    getAsyncValidatorFn(asyncValidatorName: string, asyncValidatorArgs?: any): AsyncValidatorFn | never {

        let asyncValidatorFn: any = Validators[asyncValidatorName] || this.getCustomAsyncValidatorFn(asyncValidatorName);

        if (!isFunction(asyncValidatorFn)) {
            throw new Error(`async validator "${asyncValidatorName}" is not provided via NG_ASYNC_VALIDATORS`);
        }

        return isDefined(asyncValidatorArgs) ? asyncValidatorFn(asyncValidatorArgs) : asyncValidatorFn;
    }


    getValidators(config: DynamicValidatorsMap): ValidatorFn[] {

        return isDefined(config) ?
            Object.keys(config).map(validatorName => this.getValidatorFn(validatorName, config[validatorName])) : [];
    }

    getAsyncValidators(config: DynamicValidatorsMap): AsyncValidatorFn[] {

        return isDefined(config) ?
            Object.keys(config).map(asyncValidatorName => this.getAsyncValidatorFn(asyncValidatorName, config[asyncValidatorName])) : [];
    }


    createFormArray(model: DynamicFormArrayModel): FormArray {

        let formArray = [];

        for (let i = 0; i < model.size; i += 1) {
            formArray.push(this.createFormGroup(model.get(i).group));
        }

        return this.formBuilder.array(
            formArray,
            this.getValidators(model.validator)[0] || null,
            this.getAsyncValidators(model.asyncValidator)[0] || null
        );
    }


    createFormGroup(group: DynamicFormControlModel[], groupExtra: {[key: string]: any} | null = null): FormGroup {

        let formGroup: {[id: string]: AbstractControl;} = {};

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
                    Validators.composeAsync(this.getAsyncValidators(controlModel.asyncValidators || []))
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


    findById(id: string, groupModel: DynamicFormControlModel[]): DynamicFormControlModel | null {

        let result = null,
            findByIdFn = (id: string, groupModel: DynamicFormControlModel[]): void => {

                for (let controlModel of groupModel) {

                    if (controlModel.id === id) {
                        result = controlModel;
                        break;
                    }

                    if (controlModel instanceof DynamicFormGroupModel) {
                        findByIdFn(id, (controlModel as DynamicFormGroupModel).group);
                    }
                }
            };

        findByIdFn(id, groupModel);

        return result;
    }


    fromJSON(json: string | Object[]): DynamicFormControlModel[] | never {

        let raw = isString(json) ? JSON.parse(json as string, this.parseJSONReviver) : json,
            group: DynamicFormControlModel[] = [];

        raw.forEach((model: any) => {

            switch (model.type) {

                case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                    model.groups.forEach((groupModel: DynamicFormArrayGroupModel) => {
                        groupModel.group = this.fromJSON(groupModel.group) as DynamicFormControlModel[];
                    });
                    model.createGroup = () => this.fromJSON(model.origin);
                    group.push(new DynamicFormArrayModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                    group.push(new DynamicCheckboxModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
                    model.group = this.fromJSON(model.group) as DynamicCheckboxModel[];
                    group.push(new DynamicCheckboxGroupModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                    group.push(new DynamicDatepickerModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_EDITOR:
                    group.push(new DynamicEditorModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD:
                    model.value = null;
                    group.push(new DynamicFileUploadModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                    model.group = this.fromJSON(model.group);
                    group.push(new DynamicFormGroupModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                    group.push(new DynamicInputModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                    group.push(new DynamicRadioGroupModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                    group.push(new DynamicSelectModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                    group.push(new DynamicSliderModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                    group.push(new DynamicSwitchModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                    group.push(new DynamicTextAreaModel(model, model.cls));
                    break;

                default:
                    throw new Error(`unknown form control model type defined on JSON object with id "${model.id}"`);
            }
        });

        return group;
    }
}