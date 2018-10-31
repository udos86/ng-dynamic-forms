import { EventEmitter, QueryList } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DynamicFormControlContainerComponent } from "./dynamic-form-control-container.component";
import { DynamicFormControlEvent, DynamicFormControlEventType } from "./dynamic-form-control.event";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormModel } from "../model/dynamic-form.model";
import {
    DynamicFormControlLayout,
    DynamicFormControlLayoutContext,
    DynamicFormControlLayoutPlace
} from "../model/misc/dynamic-form-control-layout.model";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormService } from "../service/dynamic-form.service";
import { DynamicFormLayout, DynamicFormLayoutService } from "../service/dynamic-form-layout.service";

export abstract class DynamicFormComponent {

    formGroup: FormGroup;
    formModel: DynamicFormModel;
    formLayout: DynamicFormLayout;

    components: QueryList<DynamicFormControlContainerComponent>;
    templates: QueryList<DynamicTemplateDirective>;

    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    focus: EventEmitter<DynamicFormControlEvent>;
    customEvent: EventEmitter<DynamicFormControlEvent>;

    protected constructor(protected formService: DynamicFormService, protected layoutService: DynamicFormLayoutService) {}

    trackByFn(_index: number, model: DynamicFormControlModel): string {
        return model.id;
    }

    getClass(model: DynamicFormControlModel, context: DynamicFormControlLayoutContext, place: DynamicFormControlLayoutPlace): string {

        let controlLayout = this.layoutService.findById(model.id, this.formLayout) || model.layout as DynamicFormControlLayout;

        return this.layoutService.getClass(controlLayout, context, place);
    }

    onEvent($event: DynamicFormControlEvent, type: string) {

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

            case DynamicFormControlEventType.Custom:
                this.customEvent.emit($event);
                break;
        }
    }
}
