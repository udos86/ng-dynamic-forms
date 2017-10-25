import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, FormControl, FormGroup } from "@angular/forms";
import { AbstractControlOptions, FormHooks } from "@angular/forms/src/model";
import {
    DynamicFormControlModel,
    DynamicPathable,
    DynamicValidatorsConfig
} from "../model/dynamic-form-control.model";
import { DynamicFormValueControlModel, DynamicFormControlValue } from "../model/dynamic-form-value-control.model";
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
import { Utils } from "../utils/core.utils";
import { DynamicFormValidationService } from "./dynamic-form-validation.service";

@Injectable()
export class DynamicFormService {

    constructor(private validationService: DynamicFormValidationService) {}


    createAbstractControlOptions(validatorsConfig: DynamicValidatorsConfig | null = null,
                                 asyncValidatorsConfig: DynamicValidatorsConfig | null = null,
                                 updateOn: FormHooks | null = null): AbstractControlOptions {

        return {

            asyncValidators: this.validationService.getAsyncValidators(asyncValidatorsConfig),

            validators: this.validationService.getValidators(validatorsConfig),

            updateOn: updateOn === null ? "change" : updateOn
        };
    }


    createFormArray(arrayModel: DynamicFormArrayModel): FormArray {

        let controls: AbstractControl[] = [],
            options = this.createAbstractControlOptions(
                arrayModel.validators, arrayModel.asyncValidators, arrayModel.updateOn);

        for (let index = 0; index < arrayModel.size; index++) {

            let groupModel = arrayModel.get(index),
                groupOptions = this.createAbstractControlOptions(
                    arrayModel.groupValidators, arrayModel.groupAsyncValidators, arrayModel.updateOn);

            controls.push(this.createFormGroup(groupModel.group, groupOptions, groupModel));
        }

        return new FormArray(controls, options);
    }


    createFormGroup(groupModel: DynamicFormControlModel[],
                    options: AbstractControlOptions | null = null,
                    parent: DynamicPathable | null = null): FormGroup {

        let controls: { [controlId: string]: AbstractControl; } = {};

        groupModel.forEach(model => {

            model.parent = parent;

            switch (model.type) {

                case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:

                    let arrayModel = model as DynamicFormArrayModel;

                    controls[model.id] = this.createFormArray(arrayModel);
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:

                    let groupModel = model as DynamicFormGroupModel,
                        groupOptions = this.createAbstractControlOptions(
                            groupModel.validators, groupModel.asyncValidators, groupModel.updateOn);

                    controls[model.id] = this.createFormGroup(groupModel.group, groupOptions, groupModel);
                    break;

                default:

                    let controlModel = model as DynamicFormValueControlModel<DynamicFormControlValue>,
                        controlState = {value: controlModel.value, disabled: controlModel.disabled},
                        controlOptions = this.createAbstractControlOptions(
                            controlModel.validators, controlModel.asyncValidators, controlModel.updateOn);

                    controls[controlModel.id] = new FormControl(controlState, controlOptions);
            }
        });

        return new FormGroup(controls, options);
    }


    getPathSegment(model: DynamicPathable): string {

        return model instanceof DynamicFormArrayGroupModel ?
            model.index.toString() : (model as DynamicFormControlModel).id;
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


    addFormGroupControl(formGroup: FormGroup,
                        groupModel: DynamicFormControlModel[] | DynamicFormGroupModel,
                        ...controlModels: DynamicFormControlModel[]): void {

        if (groupModel instanceof DynamicFormGroupModel) {

            this.insertFormGroupControl(groupModel.size(), formGroup, groupModel, ...controlModels);

        } else {

            let formModel = groupModel as DynamicFormControlModel[];
            this.insertFormGroupControl(formModel.length, formGroup, formModel, ...controlModels);
        }
    }


    moveFormGroupControl(index: number,
                         step: number,
                         groupModel: DynamicFormControlModel[] | DynamicFormGroupModel): void {

        if (groupModel instanceof DynamicFormGroupModel) {

            groupModel.move(index, step);

        } else {

            let formModel = groupModel as DynamicFormControlModel[];
            formModel.splice(index + step, 0, ...formModel.splice(index, 1));
        }
    }


    insertFormGroupControl(index: number,
                           formGroup: FormGroup,
                           groupModel: DynamicFormControlModel[] | DynamicFormGroupModel,
                           ...controlModels: DynamicFormControlModel[]): void {

        let parent = groupModel instanceof DynamicFormGroupModel ? groupModel : null,
            controls = this.createFormGroup(controlModels, null, parent).controls;

        Object.keys(controls).forEach((controlName, idx) => {

            let controlModel = controlModels[idx];

            if (groupModel instanceof DynamicFormGroupModel) {
                groupModel.insert(index, controlModel);

            } else {
                (groupModel as DynamicFormControlModel[]).splice(index, 0, controlModel);
            }

            formGroup.addControl(controlName, controls[controlName]);
        });
    }


    removeFormGroupControl(index: number,
                           formGroup: FormGroup,
                           groupModel: DynamicFormControlModel[] | DynamicFormGroupModel): void {

        if (groupModel instanceof DynamicFormGroupModel) {

            formGroup.removeControl(groupModel.get(index).id);
            groupModel.remove(index);

        } else {

            formGroup.removeControl(groupModel[index].id);
            (groupModel as DynamicFormControlModel[]).splice(index, 1);
        }
    }


    addFormArrayGroup(formArray: FormArray, model: DynamicFormArrayModel): void {

        let groupModel = model.addGroup();

        formArray.push(this.createFormGroup(groupModel.group, null, groupModel));
    }


    insertFormArrayGroup(index: number, formArray: FormArray, model: DynamicFormArrayModel): void {

        let groupModel = model.insertGroup(index);

        formArray.insert(index, this.createFormGroup(groupModel.group, null, groupModel));
    }


    moveFormArrayGroup(index: number, step: number, formArray: FormArray, model: DynamicFormArrayModel): void {

        let newIndex = index + step,
            moveUp = step >= 0;

        if ((index >= 0 && index < model.size) && (newIndex >= 0 && newIndex < model.size)) {

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

            model.moveGroup(index, step);

        } else {
            throw new Error(`form array group cannot be moved due to index or new index being out of bounds`);
        }
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

        let rawFormModel = typeof json === "string" ? JSON.parse(json, Utils.parseJSONReviver) : json,
            formModel: DynamicFormControlModel[] = [];

        rawFormModel.forEach((model: any) => {

            switch (model.type) {

                case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                    let formArrayModel = model as DynamicFormArrayModel;

                    formArrayModel.groups.forEach((groupModel: DynamicFormArrayGroupModel) => {
                        groupModel.group = this.fromJSON(groupModel.group) as DynamicFormControlModel[];
                    });

                    formArrayModel.groupFactory = () => {
                        return this.fromJSON(formArrayModel.groupPrototype || formArrayModel.origin);
                    };

                    formModel.push(new DynamicFormArrayModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                    formModel.push(new DynamicCheckboxModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
                    model.group = this.fromJSON(model.group) as DynamicCheckboxModel[];
                    formModel.push(new DynamicCheckboxGroupModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                    formModel.push(new DynamicDatePickerModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_EDITOR:
                    formModel.push(new DynamicEditorModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD:
                    model.value = null;
                    formModel.push(new DynamicFileUploadModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                    model.group = this.fromJSON(model.group);
                    formModel.push(new DynamicFormGroupModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                    let inputModel = model as DynamicInputModel;

                    if (inputModel.mask !== null) {
                        inputModel.mask = Utils.maskFromString(inputModel.mask as string);
                    }

                    formModel.push(new DynamicInputModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                    formModel.push(new DynamicRadioGroupModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_RATING:
                    formModel.push(new DynamicRatingModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                    formModel.push(new DynamicSelectModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                    formModel.push(new DynamicSliderModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                    formModel.push(new DynamicSwitchModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                    formModel.push(new DynamicTextAreaModel(model, model.cls));
                    break;

                case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
                    formModel.push(new DynamicTimePickerModel(model, model.cls));
                    break;

                default:
                    throw new Error(`unknown form control model type defined on JSON object with id "${model.id}"`);
            }
        });

        return formModel;
    }
}