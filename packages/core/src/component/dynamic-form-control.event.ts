import { FormControl, FormGroup } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormArrayGroupModel } from "../model/form-array/dynamic-form-array.model";

export enum DynamicFormControlEventType {Blur = "blur", Change = "change", Custom = "custom", Focus = " focus"}

export interface DynamicFormControlEvent {

    $event: Event | FocusEvent | DynamicFormControlEvent | any;
    context: DynamicFormArrayGroupModel | null;
    control: FormControl;
    group: FormGroup;
    model: DynamicFormControlModel;
    type: string;
}

export interface DynamicFormControlCustomEvent {

    customEvent: any;
    customEventType: string;
}

export function isDynamicFormControlEvent($event: any): $event is DynamicFormControlEvent {
    return $event !== null && typeof $event === "object" && $event.hasOwnProperty("$event");
}