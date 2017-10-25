import { EventEmitter, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlComponent,
    DynamicFormControlEvent,
    DYNAMIC_FORM_CONTROL_EVENT_TYPE_BLUR,
    DYNAMIC_FORM_CONTROL_EVENT_TYPE_CHANGE,
    DYNAMIC_FORM_CONTROL_EVENT_TYPE_FOCUS,
    DYNAMIC_FORM_CONTROL_EVENT_TYPE_CUSTOM
} from "./dynamic-form-control.component";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";

export abstract class DynamicFormComponent {

    group: FormGroup;
    model: DynamicFormControlModel[];

    components: QueryList<DynamicFormControlComponent>;
    templates: QueryList<DynamicTemplateDirective>;

    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    focus: EventEmitter<DynamicFormControlEvent>;
    customEvent: EventEmitter<DynamicFormControlEvent>;

    trackByFn(_index: number, model: DynamicFormControlModel): string {
        return model.id;
    }

    onEvent($event: DynamicFormControlEvent, type: string) {

        switch (type) {

            case DYNAMIC_FORM_CONTROL_EVENT_TYPE_BLUR:
                this.blur.emit($event);
                break;

            case DYNAMIC_FORM_CONTROL_EVENT_TYPE_CHANGE:
                this.change.emit($event);
                break;

            case DYNAMIC_FORM_CONTROL_EVENT_TYPE_FOCUS:
                this.focus.emit($event);
                break;

            case DYNAMIC_FORM_CONTROL_EVENT_TYPE_CUSTOM:
                this.customEvent.emit($event);
                break;
        }
    }
}
