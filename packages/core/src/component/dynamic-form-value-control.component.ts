import { EventEmitter } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DynamicFormControlValue, DynamicFormValueControlModel } from "../model/dynamic-form-value-control.model";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormControlLayout } from "../model/misc/dynamic-form-control-layout.model";
import { DynamicFormValidationService } from "../service/dynamic-form-validation.service";
import { DynamicFormLayout, DynamicFormLayoutService } from "../service/dynamic-form-layout.service";

export interface DynamicFormControlCustomEvent {
    customEvent: any;
    customEvenType: string;
}

export class DynamicFormValueControlComponent {

    private _hasFocus: boolean = false;

    bindId: boolean;
    group: FormGroup;
    layout: DynamicFormLayout;
    model: DynamicFormValueControlModel<DynamicFormControlValue>;

    blur: EventEmitter<any>;
    change: EventEmitter<any>;
    customEvent: EventEmitter<DynamicFormControlCustomEvent>;
    focus: EventEmitter<any>;

    constructor(protected layoutService: DynamicFormLayoutService,
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

    get isInvalid(): boolean {
        return this.control.invalid;
    }

    get isValid(): boolean {
        return this.control.valid;
    }

    get showErrorMessages(): boolean {
        return this.model.hasErrorMessages && this.control.touched && !this.hasFocus && this.isInvalid;
    }

    getClass(context: string, place: string, model: DynamicFormControlModel = this.model): string {

        let controlLayout = (this.layout && this.layout[model.id]) || model.layout as DynamicFormControlLayout;

        return this.layoutService.getClass(controlLayout, context, place);
    }

    onBlur($event: Event) {
        this._hasFocus = false;
        this.blur.emit($event);
    }

    onChange($event: Event) {
        this.change.emit($event);
    }

    onCustomEvent($event: Event, type: string) {
        this.customEvent.emit({customEvent: $event, customEvenType: type});
    }

    onFocus($event: Event) {
        this._hasFocus = true;
        this.focus.emit($event);
    }
}