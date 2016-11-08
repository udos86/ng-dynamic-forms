/// <reference types="core-js" />
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormArrayModel } from "../model/form-array/dynamic-form-array.model";
export declare class DynamicFormService {
    private formBuilder;
    constructor(formBuilder: FormBuilder);
    createFormArray(model: DynamicFormArrayModel): FormArray;
    createFormGroup(group: Array<DynamicFormControlModel>, groupExtra?: {
        [key: string]: any;
    } | null): FormGroup;
    createFormArrayGroup(dynamicFormArrayModel: DynamicFormArrayModel): FormGroup;
    addFormArrayGroup(formArray: FormArray, dynamicFormArrayModel: DynamicFormArrayModel): void;
    insertFormArrayGroup(index: number, formArray: FormArray, dynamicFormArrayModel: DynamicFormArrayModel): void;
    removeFormArrayGroup(index: number, formArray: FormArray, dynamicFormArrayModel: DynamicFormArrayModel): void;
    clearFormArray(formArray: FormArray, dynamicFormArrayModel: DynamicFormArrayModel): void;
    findById(id: string, group: Array<DynamicFormControlModel>): DynamicFormControlModel;
    fromJSON(json: Array<Object>): Array<DynamicFormControlModel> | never;
}
