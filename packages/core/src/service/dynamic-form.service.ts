import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { AbstractControlOptions, FormHooks } from "@angular/forms/src/model";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormValueControlModel } from "../model/dynamic-form-value-control.model";
import {
    DynamicFormArrayModel,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DynamicFormArrayGroupModel
} from "../model/form-array/dynamic-form-array.model";
import { DYNAMIC_FORM_CONTROL_TYPE_GROUP, DynamicFormGroupModel } from "../model/form-group/dynamic-form-group.model";
import {
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DynamicCheckboxGroupModel
} from "../model/checkbox/dynamic-checkbox-group.model";
import { DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX, DynamicCheckboxModel } from "../model/checkbox/dynamic-checkbox.model";
import {
    DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER,
    DynamicColorPickerModel
} from "../model/colorpicker/dynamic-colorpicker.model";
import {
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DynamicDatePickerModel
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
import { DYNAMIC_FORM_CONTROL_TYPE_RATING, DynamicRatingModel } from "../model/rating/dynamic-rating.model";
import { DYNAMIC_FORM_CONTROL_TYPE_SELECT, DynamicSelectModel } from "../model/select/dynamic-select.model";
import { DYNAMIC_FORM_CONTROL_TYPE_SLIDER, DynamicSliderModel } from "../model/slider/dynamic-slider.model";
import { DYNAMIC_FORM_CONTROL_TYPE_SWITCH, DynamicSwitchModel } from "../model/switch/dynamic-switch.model";
import { DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA, DynamicTextAreaModel } from "../model/textarea/dynamic-textarea.model";
import {
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
    DynamicTimePickerModel
} from "../model/timepicker/dynamic-timepicker.model";
import { DynamicFormValidationService } from "./dynamic-form-validation.service";
import { DynamicFormModel, DynamicUnionFormModel } from "../model/dynamic-form.model";
import { DynamicPathable } from "../model/misc/dynamic-form-control-path.model";
import { DynamicValidatorsConfig } from "../model/misc/dynamic-form-control-validation.model";
import { maskFromString, parseReviver } from "../utils/json.utils";
import { isString } from "../utils/core.utils";

@Injectable({
    providedIn: "root"
})
export class DynamicFormService {

    constructor(private validationService: DynamicFormValidationService) {}


    private createAbstractControlOptions(validatorsConfig: DynamicValidatorsConfig | null = null,
                                         asyncValidatorsConfig: DynamicValidatorsConfig | null = null,
                                         updateOn: FormHooks | null = null): AbstractControlOptions {

        return {

            asyncValidators: asyncValidatorsConfig !== null ? this.validationService.getAsyncValidators(asyncValidatorsConfig) : null,

            validators: validatorsConfig !== null ? this.validationService.getValidators(validatorsConfig) : null,

            updateOn: updateOn !== null && this.validationService.isFormHook(updateOn) ? updateOn : "change"
        };
    }


    createFormArray(formArrayModel: DynamicFormArrayModel): FormArray {

        let controls: AbstractControl[] = [],
            options = this.createAbstractControlOptions(formArrayModel.validators, formArrayModel.asyncValidators,
                formArrayModel.updateOn);

        for (let index = 0; index < formArrayModel.size; index++) {

            let groupModel = formArrayModel.get(index),
                groupOptions = this.createAbstractControlOptions(formArrayModel.groupValidators,
                    formArrayModel.groupAsyncValidators, formArrayModel.updateOn);

            controls.push(this.createFormGroup(groupModel.group, groupOptions, groupModel));
        }

        return new FormArray(controls, options);
    }


    createFormGroup(formModel: DynamicFormModel, options: AbstractControlOptions | null = null,
                    parent: DynamicPathable | null = null): FormGroup {

        let controls: { [controlId: string]: AbstractControl; } = {};

        formModel.forEach(model => {

            model.parent = parent;

            switch (model.type) {

                case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:

                    controls[model.id] = this.createFormArray(model as DynamicFormArrayModel);
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:

                    let groupModel = model as DynamicFormGroupModel,
                        groupOptions = this.createAbstractControlOptions(groupModel.validators,
                            groupModel.asyncValidators, groupModel.updateOn);

                    controls[model.id] = this.createFormGroup(groupModel.group, groupOptions, groupModel);
                    break;

                default:

                    let controlModel = model as DynamicFormValueControlModel<any>,
                        controlState = {value: controlModel.value, disabled: controlModel.disabled},
                        controlOptions = this.createAbstractControlOptions(controlModel.validators,
                            controlModel.asyncValidators, controlModel.updateOn);

                    controls[model.id] = new FormControl(controlState, controlOptions);
            }
        });

        return new FormGroup(controls, options);
    }


    getPathSegment(model: DynamicPathable): string {

        return model instanceof DynamicFormArrayGroupModel ? model.index.toString() : (model as DynamicFormControlModel).id;
    }


    getPath(model: DynamicPathable): string[] {

        let path = [this.getPathSegment(model)],
            parent = model.parent;

        while (parent) {

            path.unshift(this.getPathSegment(parent));
            parent = parent.parent;
        }

        return path;
    }


    addFormGroupControl(formGroup: FormGroup, formModel: DynamicUnionFormModel, ...models: DynamicFormModel): void {

        if (formModel instanceof DynamicFormGroupModel) {

            this.insertFormGroupControl(formModel.size(), formGroup, formModel, ...models);

        } else {

            let _formModel = formModel as DynamicFormModel;
            this.insertFormGroupControl(_formModel.length, formGroup, _formModel, ...models);
        }
    }


    moveFormGroupControl(index: number, step: number, formModel: DynamicUnionFormModel): void {

        if (formModel instanceof DynamicFormGroupModel) {

            formModel.move(index, step);

        } else {

            let _formModel = formModel as DynamicFormModel;
            _formModel.splice(index + step, 0, ..._formModel.splice(index, 1));
        }
    }


    insertFormGroupControl(index: number, formGroup: FormGroup, formModel: DynamicUnionFormModel,
                           ...models: DynamicFormModel): void {

        let parent = formModel instanceof DynamicFormGroupModel ? formModel : null,
            controls = this.createFormGroup(models, null, parent).controls;

        Object.keys(controls).forEach((controlName, idx) => {

            let controlModel = models[idx];

            if (formModel instanceof DynamicFormGroupModel) {
                formModel.insert(index, controlModel);

            } else {
                (formModel as DynamicFormModel).splice(index, 0, controlModel);
            }

            formGroup.addControl(controlName, controls[controlName]);
        });
    }


    removeFormGroupControl(index: number, formGroup: FormGroup, formModel: DynamicUnionFormModel): void {

        if (formModel instanceof DynamicFormGroupModel) {

            formGroup.removeControl(formModel.get(index).id);
            formModel.remove(index);

        } else {

            formGroup.removeControl(formModel[index].id);
            (formModel as DynamicFormModel).splice(index, 1);
        }
    }


    addFormArrayGroup(formArray: FormArray, formArrayModel: DynamicFormArrayModel): void {

        let groupModel = formArrayModel.addGroup();

        formArray.push(this.createFormGroup(groupModel.group, null, groupModel));
    }


    insertFormArrayGroup(index: number, formArray: FormArray, formArrayModel: DynamicFormArrayModel): void {

        let groupModel = formArrayModel.insertGroup(index);

        formArray.insert(index, this.createFormGroup(groupModel.group, null, groupModel));
    }


    moveFormArrayGroup(index: number, step: number, formArray: FormArray, formArrayModel: DynamicFormArrayModel): void {

        let newIndex = index + step,
            moveUp = step >= 0;

        if ((index >= 0 && index < formArrayModel.size) && (newIndex >= 0 && newIndex < formArrayModel.size)) {

            let movingGroups: AbstractControl[] = [];

            for (let i = moveUp ? index : newIndex; i <= (moveUp ? newIndex : index); i++) {
                movingGroups.push(formArray.at(i));
            }

            movingGroups.forEach((formControl, idx) => {

                let position;

                if (moveUp) {
                    position = idx === 0 ? newIndex : index + idx - 1;

                } else {
                    position = idx === movingGroups.length - 1 ? newIndex : newIndex + idx + 1;
                }

                formArray.setControl(position, formControl);
            });

            formArrayModel.moveGroup(index, step);

        } else {
            throw new Error(`form array group cannot be moved due to index or new index being out of bounds`);
        }
    }


    removeFormArrayGroup(index: number, formArray: FormArray, formArrayModel: DynamicFormArrayModel): void {

        formArray.removeAt(index);
        formArrayModel.removeGroup(index);
    }


    clearFormArray(formArray: FormArray, formArrayModel: DynamicFormArrayModel): void {

        while (formArray.length > 0) {
            this.removeFormArrayGroup(0, formArray, formArrayModel);
        }
    }


    findById(id: string, formModel: DynamicFormModel): DynamicFormControlModel | null {

        let result = null,
            findByIdFn = (id: string, groupModel: DynamicFormModel): void => {

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

        findByIdFn(id, formModel);

        return result;
    }


    fromJSON(json: string | object[]): DynamicFormModel | never {

        let formModelJSON = isString(json) ? JSON.parse(json, parseReviver) : json,
            formModel: DynamicFormModel = [];

        formModelJSON.forEach((model: any) => {

            let layout = model.layout || null;

            switch (model.type) {

                case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                    let formArrayModel = model as DynamicFormArrayModel;

                    if (Array.isArray(formArrayModel.groups)) {

                        formArrayModel.groups.forEach((groupModel: DynamicFormArrayGroupModel) => {
                            groupModel.group = this.fromJSON(groupModel.group) as DynamicFormModel;
                        });
                    }

                    formArrayModel.groupFactory = () => {
                        return this.fromJSON(formArrayModel.groupPrototype);
                    };

                    formModel.push(new DynamicFormArrayModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                    formModel.push(new DynamicCheckboxModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
                    model.group = this.fromJSON(model.group) as DynamicCheckboxModel[];
                    formModel.push(new DynamicCheckboxGroupModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER:
                    formModel.push(new DynamicColorPickerModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                    formModel.push(new DynamicDatePickerModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_EDITOR:
                    formModel.push(new DynamicEditorModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD:
                    model.value = null;
                    formModel.push(new DynamicFileUploadModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                    model.group = this.fromJSON(model.group);
                    formModel.push(new DynamicFormGroupModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                    let inputModel = model as DynamicInputModel;

                    if (inputModel.mask !== null) {
                        inputModel.mask = maskFromString(inputModel.mask as string);
                    }

                    formModel.push(new DynamicInputModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                    formModel.push(new DynamicRadioGroupModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_RATING:
                    formModel.push(new DynamicRatingModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                    formModel.push(new DynamicSelectModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                    formModel.push(new DynamicSliderModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                    formModel.push(new DynamicSwitchModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                    formModel.push(new DynamicTextAreaModel(model, layout));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
                    formModel.push(new DynamicTimePickerModel(model, layout));
                    break;

                default:
                    throw new Error(`unknown form control model type defined on JSON object with id "${model.id}"`);
            }
        });

        return formModel;
    }
}
