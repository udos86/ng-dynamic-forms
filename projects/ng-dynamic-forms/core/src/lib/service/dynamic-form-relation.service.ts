import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";

export const DYNAMIC_FORM_CONTROL_STATE_DISABLED = "DISABLED";
export const DYNAMIC_FORM_CONTROL_STATE_ENABLED = "ENABLED";
export const DYNAMIC_FORM_CONTROL_STATE_HIDDEN = "HIDDEN";
export const DYNAMIC_FORM_CONTROL_STATE_VISIBLE = "VISIBLE";

@Injectable({
    providedIn: "root"
})
export class DynamicFormRelationService {

    private subscriptions: Map<string, Subscription> = new Map();

    private findRelatedFormControl(_model: DynamicFormControlModel, _formGroup: FormGroup): FormControl {

        return null;
    }

    private meetsCondition(): boolean {
        return true;
    }
}