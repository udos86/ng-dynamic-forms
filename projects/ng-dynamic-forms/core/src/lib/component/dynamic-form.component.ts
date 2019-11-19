import { EventEmitter, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormControlContainerComponent } from "./dynamic-form-control-container.component";
import { DynamicFormControlEvent } from "./dynamic-form-control-event";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormModel } from "../model/dynamic-form.model";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormService } from "../service/dynamic-form.service";
import { DynamicFormLayout, DynamicFormLayoutService } from "../service/dynamic-form-layout.service";

export abstract class DynamicFormComponent {

    group: FormGroup;
    model: DynamicFormModel;
    layout: DynamicFormLayout;

    components: QueryList<DynamicFormControlContainerComponent>;
    templates: QueryList<DynamicTemplateDirective>;

    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    customEvent: EventEmitter<DynamicFormControlEvent>;
    focus: EventEmitter<DynamicFormControlEvent>;

    protected constructor(protected formService: DynamicFormService, protected layoutService: DynamicFormLayoutService) {}

    trackByFn(_index: number, model: DynamicFormControlModel): string {
        return model.id;
    }

    onBlur($event: DynamicFormControlEvent) {
        this.blur.emit($event);
    }

    onChange($event: DynamicFormControlEvent) {
        this.change.emit($event);
    }

    onFocus($event: DynamicFormControlEvent) {
        this.focus.emit($event);
    }

    onCustomEvent($event: DynamicFormControlEvent, customEventEmitter: EventEmitter<DynamicFormControlEvent>) {
        customEventEmitter.emit($event);
    }
}
