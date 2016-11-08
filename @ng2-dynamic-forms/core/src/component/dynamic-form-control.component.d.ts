/// <reference types="core-js" />
import { EventEmitter, TemplateRef, OnInit, OnDestroy } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
export declare abstract class DynamicFormControlComponent implements OnInit, OnDestroy {
    bindId: boolean;
    blur: EventEmitter<FocusEvent>;
    change: EventEmitter<Event>;
    control: FormControl;
    controlGroup: FormGroup;
    customTemplate: TemplateRef<any>;
    focus: EventEmitter<FocusEvent>;
    hasErrorMessaging: boolean;
    hasFocus: boolean;
    model: DynamicFormControlModel;
    nestedTemplate: TemplateRef<any>;
    private subscriptions;
    readonly abstract type: string;
    constructor();
    ngOnInit(): void;
    ngOnDestroy(): void;
    readonly errorMessages: Array<string>;
    readonly isCheckbox: boolean;
    readonly isCheckboxGroup: boolean;
    readonly isRadioGroup: boolean;
    readonly isSwitch: boolean;
    readonly isValid: boolean;
    readonly isInvalid: boolean;
    registerControlRelations(): void;
    setControlActivationState(): void;
    onControlValueChanges(value: any): void;
    onModelDisabledUpdates(value: boolean): void;
    onModelValueUpdates(value: any): void;
    onBlur($event: FocusEvent): void;
    onChange($event: Event): void;
    onFocus($event: FocusEvent): void;
}
