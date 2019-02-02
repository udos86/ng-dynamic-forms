import { EventEmitter } from "@angular/core";
import { AbstractControl, FormGroup } from "@angular/forms";
import { DynamicFormControl } from "./dynamic-form-control.interface";
import { DynamicFormControlCustomEvent } from "./dynamic-form-control.event";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
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

    get control(): AbstractControl | never {

        const control = this.group.get(this.model.id);

        if (control === null) {
            throw new Error(`form group does not contain an abstract control with id ${this.model.id}`);
        }

        return control as AbstractControl;
    }

    get elementId(): string {
        return this.layoutService.getElementId(this.model);
    }

    get errorMessages(): string[] {
        return this.validationService.createErrorMessages(this.control, this.model);
    }

    get hasFocus(): boolean {
        return this._hasFocus;
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
