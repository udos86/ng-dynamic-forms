import {EventEmitter, TemplateRef, OnInit, OnDestroy} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {MdCheckboxChange, MdSlideToggleChange, MdRadioChange} from "@angular/material";
import {Subscription} from "rxjs/Subscription";
import {DynamicFormControlModel} from "../model/dynamic-form-control.model";
import {DynamicFormValueControlModel, DynamicFormControlValue} from "../model/dynamic-form-value-control.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX} from "../model/checkbox/dynamic-checkbox.model";
import {DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP} from "../model/radio/dynamic-radio-group.model";
import {DYNAMIC_FORM_CONTROL_TYPE_SWITCH} from "../model/switch/dynamic-switch.model";
import {
    DynamicInputModel,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE
} from "../model/input/dynamic-input.model";
import {findIds, findActivationRelation, toBeDisabled} from "../model/dynamic-form-control-relation.model";
import {isDefined} from "../utils";

export type MdFormControlChangeEvent = MdCheckboxChange | MdRadioChange | MdSlideToggleChange;

export interface DynamicFormControlEvent {

    $event: Event | FocusEvent | MdFormControlChangeEvent;
    control: FormControl;
    model: DynamicFormControlModel;
}

export abstract class DynamicFormControlComponent implements OnInit, OnDestroy {

    bindId: boolean;
    blur: EventEmitter<DynamicFormControlEvent>;
    change: EventEmitter<DynamicFormControlEvent>;
    control: FormControl;
    controlGroup: FormGroup;
    customTemplate: TemplateRef<any>;
    focus: EventEmitter<DynamicFormControlEvent>;
    hasErrorMessaging: boolean = false;
    hasFocus: boolean;
    model: DynamicFormControlModel;
    nestedTemplate: TemplateRef<any>;

    private subscriptions: Array<Subscription> = [];

    abstract readonly type: string;

    constructor() {
    }

    ngOnInit() {

        if (!isDefined(this.model) || !isDefined(this.controlGroup)) {
            throw new Error(`no [model] or [controlGroup] property binding defined for DynamicFormControlComponent`);
        }

        this.control = <FormControl> this.controlGroup.get(this.model.id);

        this.subscriptions.push(this.control.valueChanges.subscribe(this.onControlValueChanges.bind(this)));
        this.subscriptions.push(this.model.disabledUpdates.subscribe(this.onModelDisabledUpdates.bind(this)));

        if (this.model instanceof DynamicFormValueControlModel) {

            let model = <DynamicFormValueControlModel<DynamicFormControlValue>> this.model;

            this.subscriptions.push(model.valueUpdates.subscribe(this.onModelValueUpdates.bind(this)));
        }

        this.registerControlRelations();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    get errorMessages(): Array<string> {

        let messages = [];

        if (isDefined(this.model["errorMessages"])) {

            for (let validatorName in this.control.errors) {

                let message;

                if (this.model["errorMessages"][validatorName]) {

                    message = this.model["errorMessages"][validatorName].replace(/\{\{(.+?)\}\}/mg,
                        (match, propertyName) => this.model[propertyName] ? this.model[propertyName] : null);

                } else {
                    message = `Validation "${validatorName}" failed`;
                }

                messages.push(message);
            }
        }

        return messages;
    }

    get isCheckbox(): boolean {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
    }

    get isRadioGroup(): boolean {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;
    }

    get isSwitch(): boolean {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_SWITCH;
    }

    get isValid(): boolean {
        return this.control.valid;
    }

    get isInvalid(): boolean {
        return this.control.touched && this.control.invalid;
    }

    registerControlRelations(): void {

        if (this.model.relation.length > 0 && findActivationRelation(this.model.relation)) {

            this.updateControlActivation();

            findIds(this.model.relation).forEach(controlId => {

                if (this.model.id === controlId) {
                    throw new Error(`FormControl ${this.model.id} cannot depend on itself`);
                }

                let control = <FormControl> this.controlGroup.get(controlId);

                if (control) {

                    this.subscriptions.push(control.valueChanges.subscribe(value => this.updateControlActivation()));
                    this.subscriptions.push(control.statusChanges.subscribe(status => this.updateControlActivation()));
                }
            });
        }
    }

    updateControlActivation(): void {

        this.model.disabledUpdates.next(
            toBeDisabled(findActivationRelation(this.model.relation), this.controlGroup)
        );
    }

    onControlValueChanges(value: boolean | number | string): void {

        if (this.model instanceof DynamicFormValueControlModel) {

            let model = <DynamicFormValueControlModel<boolean | number | string>> this.model;

            if (model.value !== value) {
                model.valueUpdates.next(value);
            }
        }
    }

    onModelValueUpdates(value: boolean | number | string) {

        if (this.control.value !== value) {
            this.control.setValue(value);
        }
    }

    onModelDisabledUpdates(value: boolean): void {
        value ? this.control.disable() : this.control.enable();
    }

    onValueChange($event: Event | MdFormControlChangeEvent | DynamicFormControlEvent): void {

        if ($event instanceof Event) {

            $event.stopImmediatePropagation();

            if (this.model.type === DYNAMIC_FORM_CONTROL_TYPE_INPUT) {

                let model = <DynamicInputModel> this.model;

                if (model.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE) {
                    model.files = $event.srcElement["files"];
                }
            }

            this.change.emit({$event: $event as Event, control: this.control, model: this.model});

        } else if ((<DynamicFormControlEvent> $event).$event instanceof Event) {

            this.change.emit($event as DynamicFormControlEvent);

        } else {

            this.change.emit({$event: $event as MdFormControlChangeEvent, control: this.control, model: this.model});
        }
    }

    onFocusChange($event: FocusEvent | DynamicFormControlEvent): void {

        if ($event instanceof FocusEvent) {

            $event.stopImmediatePropagation();

            this.hasFocus = $event.type === "focus";

            this[$event.type].emit({$event: $event, control: this.control, model: this.model});

        } else {
            this[(<FocusEvent> (<DynamicFormControlEvent> $event).$event).type].emit($event as DynamicFormControlEvent);
        }
    }
}