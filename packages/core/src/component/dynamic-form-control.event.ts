import { FormControl, FormGroup } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormArrayGroupModel } from "../model/form-array/dynamic-form-array.model";

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
    customEvenType: string;
}

export function isDynamicFormControlEvent($event: any): boolean {
    return $event !== null && typeof $event === "object" && $event.hasOwnProperty("$event");
}