import { Injectable } from "@angular/core";
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from "@angular/forms";
import { AbstractControlOptions } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormValueControlModel } from "../model/dynamic-form-value-control.model";
import {
  DynamicFormArrayModel,
  DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
  DynamicFormArrayGroupModel,
} from "../model/form-array/dynamic-form-array.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_GROUP,
  DynamicFormGroupModel,
} from "../model/form-group/dynamic-form-group.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
  DynamicCheckboxGroupModel,
} from "../model/checkbox/dynamic-checkbox-group.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
  DynamicCheckboxModel,
} from "../model/checkbox/dynamic-checkbox.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER,
  DynamicColorPickerModel,
} from "../model/colorpicker/dynamic-colorpicker.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
  DynamicDatePickerModel,
} from "../model/datepicker/dynamic-datepicker.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_EDITOR,
  DynamicEditorModel,
} from "../model/editor/dynamic-editor.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD,
  DynamicFileUploadModel,
} from "../model/file-upload/dynamic-file-upload.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_INPUT,
  DynamicInputModel,
} from "../model/input/dynamic-input.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
  DynamicRadioGroupModel,
} from "../model/radio/dynamic-radio-group.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_RATING,
  DynamicRatingModel,
} from "../model/rating/dynamic-rating.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_SELECT,
  DynamicSelectModel,
} from "../model/select/dynamic-select.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
  DynamicSliderModel,
} from "../model/slider/dynamic-slider.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
  DynamicSwitchModel,
} from "../model/switch/dynamic-switch.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
  DynamicTextAreaModel,
} from "../model/textarea/dynamic-textarea.model";
import {
  DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
  DynamicTimePickerModel,
} from "../model/timepicker/dynamic-timepicker.model";
import { DynamicFormValidationService } from "./dynamic-form-validation.service";
import {
  DynamicFormModel,
  DynamicUnionFormModel,
} from "../model/dynamic-form.model";
import { DynamicPathable } from "../model/misc/dynamic-form-control-path.model";
import {
  DynamicFormHook,
  DynamicValidatorsConfig,
} from "../model/misc/dynamic-form-control-validation.model";
import { maskFromString, parseReviver } from "../utils/json.utils";
import { isString } from "../utils/core.utils";
import { DynamicFormComponent } from "../component/dynamic-form.component";
import { DynamicFormComponentService } from "./dynamic-form-component.service";

@Injectable({
  providedIn: "root",
})
export class DynamicFormService {
  constructor(
    private componentService: DynamicFormComponentService,
    private validationService: DynamicFormValidationService
  ) {}

  private createAbstractControlOptions(
    validatorsConfig: DynamicValidatorsConfig | null = null,
    asyncValidatorsConfig: DynamicValidatorsConfig | null = null,
    updateOn: DynamicFormHook | null = null
  ): AbstractControlOptions {
    return {
      asyncValidators:
        asyncValidatorsConfig !== null
          ? this.validationService.getAsyncValidators(asyncValidatorsConfig)
          : null,
      validators:
        validatorsConfig !== null
          ? this.validationService.getValidators(validatorsConfig)
          : null,
      updateOn:
        updateOn !== null && this.validationService.isFormHook(updateOn)
          ? updateOn
          : DynamicFormHook.Change,
    };
  }

  createFormArray(formArrayModel: DynamicFormArrayModel): FormArray {
    const controls: AbstractControl[] = [];
    const options = this.createAbstractControlOptions(
      formArrayModel.validators,
      formArrayModel.asyncValidators,
      formArrayModel.updateOn
    );

    for (let index = 0; index < formArrayModel.size; index++) {
      const groupModel = formArrayModel.get(index);
      const groupOptions = this.createAbstractControlOptions(
        formArrayModel.groupValidators,
        formArrayModel.groupAsyncValidators,
        formArrayModel.updateOn
      );

      controls.push(
        this.createFormGroup(groupModel.group, groupOptions, groupModel)
      );
    }

    return new FormArray(controls, options);
  }

  createFormGroup(
    formModel: DynamicFormModel,
    options: AbstractControlOptions | null = null,
    parent: DynamicPathable | null = null
  ): FormGroup {
    const controls: { [controlId: string]: AbstractControl } = {};

    formModel.forEach(model => {
      model.parent = parent;

      switch (model.type) {
        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
          controls[model.id] = this.createFormArray(
            model as DynamicFormArrayModel
          );
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
          const groupModel = model as DynamicFormGroupModel;
          const groupOptions = this.createAbstractControlOptions(
            groupModel.validators,
            groupModel.asyncValidators,
            groupModel.updateOn
          );

          controls[model.id] = this.createFormGroup(
            groupModel.group,
            groupOptions,
            groupModel
          );
          break;

        default:
          const controlModel = model as DynamicFormValueControlModel<any>;
          const controlState = {
            value: controlModel.value,
            disabled: controlModel.disabled,
          };
          const controlOptions = this.createAbstractControlOptions(
            controlModel.validators,
            controlModel.asyncValidators,
            controlModel.updateOn
          );

          controls[model.id] = new FormControl(controlState, controlOptions);
      }
    });

    return new FormGroup(controls, options);
  }

  getPathSegment(model: DynamicPathable): string {
    return model instanceof DynamicFormArrayGroupModel
      ? model.index.toString()
      : (model as DynamicFormControlModel).id;
  }

  getPath(model: DynamicPathable, join: boolean = false): string[] | string {
    const path = [this.getPathSegment(model)];
    let parent = model.parent;

    while (parent) {
      path.unshift(this.getPathSegment(parent));
      parent = parent.parent;
    }

    return join ? path.join(".") : path;
  }

  addFormGroupControl(
    formGroup: FormGroup,
    formModel: DynamicUnionFormModel,
    ...models: DynamicFormModel
  ): void {
    if (formModel instanceof DynamicFormGroupModel) {
      this.insertFormGroupControl(
        formModel.size(),
        formGroup,
        formModel,
        ...models
      );
    } else {
      const model = formModel as DynamicFormModel;
      this.insertFormGroupControl(model.length, formGroup, model, ...models);
    }
  }

  moveFormGroupControl(
    index: number,
    step: number,
    formModel: DynamicUnionFormModel
  ): void {
    if (formModel instanceof DynamicFormGroupModel) {
      formModel.move(index, step);
    } else {
      const model = formModel as DynamicFormModel;
      model.splice(index + step, 0, ...model.splice(index, 1));
    }
  }

  insertFormGroupControl(
    index: number,
    formGroup: FormGroup,
    formModel: DynamicUnionFormModel,
    ...models: DynamicFormModel
  ): void {
    const parent =
      formModel instanceof DynamicFormGroupModel ? formModel : null;
    const controls = this.createFormGroup(models, null, parent).controls;

    Object.keys(controls).forEach((controlName, idx) => {
      const controlModel = models[idx];

      if (formModel instanceof DynamicFormGroupModel) {
        formModel.insert(index, controlModel);
      } else {
        (formModel as DynamicFormModel).splice(index, 0, controlModel);
      }

      formGroup.addControl(controlName, controls[controlName]);
    });
  }

  removeFormGroupControl(
    index: number,
    formGroup: FormGroup,
    formModel: DynamicUnionFormModel
  ): void {
    if (formModel instanceof DynamicFormGroupModel) {
      formGroup.removeControl(formModel.get(index).id);
      formModel.remove(index);
    } else {
      formGroup.removeControl(formModel[index].id);
      (formModel as DynamicFormModel).splice(index, 1);
    }
  }

  addFormArrayGroup(
    formArray: FormArray,
    formArrayModel: DynamicFormArrayModel
  ): void {
    const groupModel = formArrayModel.addGroup();

    formArray.push(this.createFormGroup(groupModel.group, null, groupModel));
  }

  insertFormArrayGroup(
    index: number,
    formArray: FormArray,
    formArrayModel: DynamicFormArrayModel
  ): void {
    const groupModel = formArrayModel.insertGroup(index);

    formArray.insert(
      index,
      this.createFormGroup(groupModel.group, null, groupModel)
    );
  }

  moveFormArrayGroup(
    index: number,
    step: number,
    formArray: FormArray,
    formArrayModel: DynamicFormArrayModel
  ): void {
    const newIndex = index + step;
    const moveUp = step >= 0;

    if (
      index >= 0 &&
      index < formArrayModel.size &&
      newIndex >= 0 &&
      newIndex < formArrayModel.size
    ) {
      const movingGroups: AbstractControl[] = [];

      for (
        let i = moveUp ? index : newIndex;
        i <= (moveUp ? newIndex : index);
        i++
      ) {
        movingGroups.push(formArray.at(i));
      }

      movingGroups.forEach((formControl, idx) => {
        let position;

        if (moveUp) {
          position = idx === 0 ? newIndex : index + idx - 1;
        } else {
          position =
            idx === movingGroups.length - 1 ? newIndex : newIndex + idx + 1;
        }

        formArray.setControl(position, formControl);
      });

      formArrayModel.moveGroup(index, step);
    } else {
      throw new Error(
        `form array group cannot be moved due to index or new index being out of bounds`
      );
    }
  }

  removeFormArrayGroup(
    index: number,
    formArray: FormArray,
    formArrayModel: DynamicFormArrayModel
  ): void {
    formArray.removeAt(index);
    formArrayModel.removeGroup(index);
  }

  clearFormArray(
    formArray: FormArray,
    formArrayModel: DynamicFormArrayModel
  ): void {
    formArray.clear();
    formArrayModel.clear();
  }

  findById(
    id: string,
    formModel: DynamicFormModel
  ): DynamicFormControlModel | null {
    let result = null;

    const findByIdFn = (
      modelId: string,
      groupModel: DynamicFormModel
    ): void => {
      for (const controlModel of groupModel) {
        if (controlModel.id === modelId) {
          result = controlModel;
          break;
        }

        if (controlModel instanceof DynamicFormGroupModel) {
          findByIdFn(modelId, (controlModel as DynamicFormGroupModel).group);
        }
      }
    };

    findByIdFn(id, formModel);

    return result;
  }

  findByPath = (
    fullPath: string,
    formModel: DynamicFormControlModel[]
  ): DynamicFormControlModel | null => {
    let result = null,
      findByPathFn = (path: string, groupModel: any): void => {
        let id: string = path.split(".")[0];
        let pathArray: string[] = path.split(".");
        pathArray.splice(0, 1);
        path = pathArray.join(".");

        for (let controlModel of groupModel) {
          if (controlModel.id === id) {
            if (path.length === 0) {
              result = controlModel;
              break;
            } else if (
              path.split(".").length == 1 &&
              Number.isInteger(Number(path.split(".")[0])) &&
              !controlModel["multiple"]
            ) {
              result = (controlModel as DynamicFormArrayModel).groups[
                path.split(".")[0]
              ];
              break;
            } else {
              if (controlModel instanceof DynamicFormGroupModel) {
                findByPathFn(path, controlModel.group);
              } else if (controlModel instanceof DynamicFormArrayModel) {
                id = path.split(".")[0];
                pathArray = path.split(".");
                pathArray.splice(0, 1);
                path = pathArray.join(".");
                if (
                  controlModel.groups &&
                  controlModel.groups[id] &&
                  controlModel.groups[id].group
                ) {
                  findByPathFn(path, controlModel.groups[id].group);
                }
              }
            }
          }
        }
      };

    findByPathFn(fullPath, formModel);

    return result;
  };

  findModelById<T extends DynamicFormControlModel>(
    id: string,
    formModel: DynamicFormModel
  ): T | null {
    return this.findById(id, formModel) as T;
  }

  findControlByModel<T extends AbstractControl>(
    model: DynamicFormControlModel,
    group: FormGroup
  ): T | null {
    return group.root.get(this.getPath(model, true)) as T;
  }

  detectChanges(formComponent?: DynamicFormComponent): void {
    if (formComponent instanceof DynamicFormComponent) {
      formComponent.markForCheck();
      formComponent.detectChanges();
    } else {
      for (const form of this.componentService.getForms()) {
        form.markForCheck();
        form.detectChanges();
      }
    }
  }

  fromJSON(json: string | object[]): DynamicFormModel | never {
    const formModelJSON = isString(json)
      ? JSON.parse(json, parseReviver)
      : json;
    const formModel: DynamicFormModel = [];

    formModelJSON.forEach((model: any) => {
      const layout = model.layout ?? null;

      switch (model.type) {
        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
          const formArrayModel = model as DynamicFormArrayModel;

          if (Array.isArray(formArrayModel.groups)) {
            formArrayModel.groups.forEach(
              (groupModel: DynamicFormArrayGroupModel) => {
                groupModel.group = this.fromJSON(
                  groupModel.group
                ) as DynamicFormModel;
              }
            );
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
          const inputModel = model as DynamicInputModel;

          if (inputModel.mask !== null) {
            if (!(inputModel.mask instanceof Function)) {
              inputModel.mask = maskFromString(inputModel.mask as string);
            }
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
          throw new Error(
            `unknown form control model type defined on JSON object with id "${model.id}"`
          );
      }
    });

    return formModel;
  }
}
