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
import { DynamicFormControlLayout } from "../model/misc/dynamic-form-control-layout.model";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormService } from "../service/dynamic-form.service";
import { DynamicFormLayout, DynamicFormLayoutService } from "../service/dynamic-form-layout.service";

export abstract class DynamicFormComponent {

    formGroup: FormGroup;
    formModel: DynamicFormControlModel[];
    formLayout: DynamicFormLayout;

    components: QueryList<DynamicFormControlComponent>;
    templates: QueryList<DynamicTemplateDirective>;

    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    focus: EventEmitter<DynamicFormControlEvent>;
    customEvent: EventEmitter<DynamicFormControlEvent>;

    constructor(protected formService: DynamicFormService, protected layoutService: DynamicFormLayoutService) {}

    trackByFn(_index: number, model: DynamicFormControlModel): string {
        return model.id;
    }

    getClass(model: DynamicFormControlModel, context: string, place: string): string {

        let controlLayout = this.layoutService.findById(model.id, this.formLayout) || model.layout as DynamicFormControlLayout;

        return this.layoutService.getClass(controlLayout, context, place);
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
                console.log($event);
                this.customEvent.emit($event);
                break;
        }
    }
}
