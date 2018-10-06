import { EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DynamicFormControl } from "./dynamic-form-control.interface";
import { DynamicFormControlCustomEvent } from "./dynamic-form-control.event";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormArrayGroupModel } from "../model/form-array/dynamic-form-array.model";
import { DynamicCheckboxModel } from "../model/checkbox/dynamic-checkbox.model";
import {
    DynamicFormControlLayout,
    DynamicFormControlLayoutContext,
    DynamicFormControlLayoutPlace
} from "../model/misc/dynamic-form-control-layout.model";
import { DynamicFormValidationService } from "../service/dynamic-form-validation.service";
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormControlTemplates
} from "../service/dynamic-form-layout.service";
import { isString } from "../utils/core.utils";

export abstract class DynamicFormControlComponent implements DynamicFormControl {

    private _hasFocus: boolean = false;

    group: FormGroup;
    layout: DynamicFormLayout;
    model: DynamicFormControlModel;
    templates: DynamicFormControlTemplates;

    blur: EventEmitter<any>;
    change: EventEmitter<any>;
    customEvent: EventEmitter<DynamicFormControlCustomEvent> | undefined;
    focus: EventEmitter<any>;

    protected constructor(protected layoutService: DynamicFormLayoutService,
                          protected validationService: DynamicFormValidationService) {}

    get control(): FormControl {
        return this.group.get(this.model.id) as FormControl;
    }

    get errorMessages(): string[] {
        return this.validationService.createErrorMessages(this.control, this.model);
    }

    get hasFocus(): boolean {
        return this._hasFocus;
    }

    get hasId(): boolean {
        return this.model.parent === null || !(this.model.parent instanceof DynamicFormArrayGroupModel);
    }

    get isInvalid(): boolean {
        return this.control.invalid;
    }

    get isValid(): boolean {
        return this.control.valid;
    }

    get showErrorMessages(): boolean {
        return this.model.hasErrorMessages && this.control.touched && !this.hasFocus && this.isInvalid;
    }

    getClass(context: DynamicFormControlLayoutContext, place: DynamicFormControlLayoutPlace, model: DynamicFormControlModel = this.model): string {

        let controlLayout = (this.layout && this.layout[model.id]) || model.layout as DynamicFormControlLayout;

        return this.layoutService.getClass(controlLayout, context, place);
    }

    onBlur($event: any) {

        if ($event instanceof Event) {
            $event.stopPropagation();
        }

        this._hasFocus = false;
        this.blur.emit($event);
    }

    onChange($event: any) {

        if ($event instanceof Event) {
            $event.stopPropagation();
        }

        this.change.emit($event);
    }

    onEmbeddedCheckboxChange($event: Event, model: DynamicCheckboxModel) {

        this.onChange($event);

        model.valueUpdates.next(($event.target as HTMLInputElement).checked);
    }

    onCustomEvent($event: any, type: string | null = null, bypass: boolean = false) {

        let emitter = this.customEvent as EventEmitter<DynamicFormControlCustomEvent>;

        if (bypass) {

            emitter.emit($event);

        } else if (isString(type)) {

            emitter.emit({customEvent: $event, customEventType: type});
        }
    }

    onFocus($event: any) {

        if ($event instanceof Event) {
            $event.stopPropagation();
        }

        this._hasFocus = true;
        this.focus.emit($event);
    }
}
