import { EventEmitter, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlComponent,
    DynamicFormControlEvent,
    DynamicFormControlEventType
} from "./dynamic-form-control.component";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";

export abstract class DynamicFormComponent {

    group: FormGroup;
    hasErrorMessaging: boolean;
    model: DynamicFormControlModel[];

    components: QueryList<DynamicFormControlComponent>;
    templates: QueryList<DynamicTemplateDirective>;

    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    focus: EventEmitter<DynamicFormControlEvent>;

    onEvent($event: DynamicFormControlEvent, type: DynamicFormControlEventType) {

        switch (type) {

            case DynamicFormControlEventType.blur:
                this.blur.emit($event);
                break;

            case DynamicFormControlEventType.change:
                this.change.emit($event);
                break;

            case DynamicFormControlEventType.focus:
                this.focus.emit($event);
                break;
        }
    }
}
