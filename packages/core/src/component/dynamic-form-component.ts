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
    model: DynamicFormControlModel[];

    components: QueryList<DynamicFormControlComponent>;
    templates: QueryList<DynamicTemplateDirective>;

    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    focus: EventEmitter<DynamicFormControlEvent>;

    trackByFn(_index: number, model: DynamicFormControlModel): string {
        return model.id;
    }

    onEvent($event: DynamicFormControlEvent, type: DynamicFormControlEventType) {

        switch (type) {

            case DynamicFormControlEventType.Blur:
                this.blur.emit($event);
                break;

            case DynamicFormControlEventType.Change:
                this.change.emit($event);
                break;

            case DynamicFormControlEventType.Focus:
                this.focus.emit($event);
                break;
        }
    }
}
