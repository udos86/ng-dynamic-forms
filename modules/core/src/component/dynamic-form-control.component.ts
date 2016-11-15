import {EventEmitter, TemplateRef, OnInit, OnDestroy} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {DynamicFormControlModel} from "../model/dynamic-form-control.model";
import {DynamicFormValueControlModel} from "../model/dynamic-form-value-control.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX} from "../model/checkbox/dynamic-checkbox.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP} from "../model/checkbox/dynamic-checkbox-group.model";
import {DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP} from "../model/radio/dynamic-radio-group.model";
import {DYNAMIC_FORM_CONTROL_TYPE_SWITCH} from "../model/switch/dynamic-switch.model";
import {
    DynamicInputModel,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE
} from "../model/input/dynamic-input.model";
import {findIds, findActivationRelation, toBeDisabled} from "../model/dynamic-form-control-relation.model";
import {isDefined} from "../utils";

export abstract class DynamicFormControlComponent implements OnInit, OnDestroy {

    bindId: boolean;
    blur: EventEmitter<FocusEvent>;
    change: EventEmitter<Event>;
    control: FormControl;
    controlGroup: FormGroup;
    customTemplate: TemplateRef<any>;
    focus: EventEmitter<FocusEvent>;
    hasErrorMessaging: boolean = false;
    hasFocus: boolean;
    model: DynamicFormControlModel;
    nestedTemplate: TemplateRef<any>;

    private subscriptions: Array<Subscription> = [];

    abstract readonly type: string;

    constructor() {
    }

    ngOnInit() {

        if (!isDefined(this.model)) {
            throw new Error(`no model input defined for DynamicFormControlComponent`);
        }

        if (!isDefined(this.controlGroup)) {
            throw new Error(`no controlGroup input defined for DynamicFormControlComponent`);
        }

        this.control = <FormControl> this.controlGroup.get(this.model.id);

        this.subscriptions.push(this.control.valueChanges.subscribe(this.onControlValueChanges.bind(this)));
        this.subscriptions.push(this.model.disabledUpdates.subscribe(this.onModelDisabledUpdates.bind(this)));

        if (this.model instanceof DynamicFormValueControlModel) {

            let model = <DynamicFormValueControlModel<boolean | number | string>> this.model;

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

                let message: string;

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

    get isCheckboxGroup(): boolean {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
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

            this.setControlActivationState();

            findIds(this.model.relation).forEach(controlId => {

                if (this.model.id === controlId) {
                    throw new Error(`FormControl ${this.model.id} cannot depend on itself`);
                }

                let control: FormControl = <FormControl> this.controlGroup.get(controlId);

                if (control) {

                    this.subscriptions.push(control.valueChanges.subscribe(
                        value => this.setControlActivationState())
                    );

                    this.subscriptions.push(control.statusChanges.subscribe(
                        status => this.setControlActivationState())
                    );
                }
            });
        }
    }

    setControlActivationState(): void {

        this.model.disabledUpdates.next(
            toBeDisabled(findActivationRelation(this.model.relation), this.controlGroup)
        );
    }

    onControlValueChanges(value: any) {

        if (this.model instanceof DynamicFormValueControlModel) {

            let model = <DynamicFormValueControlModel<boolean | number | string>> this.model;

            if (model.value !== value) {
                model.valueUpdates.next(value);
            }
        }
        //@exclude
        //console.log(`valueChanges on ${this.model.id}: `, value, typeof value, this.control.valid, this.model);
        //@endexclude
    }

    onModelDisabledUpdates(value: boolean) {
        value ? this.control.disable() : this.control.enable();
    }

    onModelValueUpdates(value: any) {

        if (this.control.value !== value) {
            this.control.setValue(value);
        }
    }

    onBlur($event: FocusEvent) {

        this.blur.emit($event);
        this.hasFocus = false;

        //@exclude
        console.log(`Blur event on ${this.model.id}: `, $event);
        //@endexclude
    }

    onChange($event: Event) {

        this.change.emit($event);

        if (this.model.type === DYNAMIC_FORM_CONTROL_TYPE_INPUT) {

            let inputModel = <DynamicInputModel> this.model;

            if (inputModel.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE) {
                inputModel.files = $event.srcElement["files"];
            }
        }

        //@exclude
        console.log(`Change event on ${this.model.id}: `, $event);
        //@endexclude
    }

    onFocus($event: FocusEvent) {

        this.focus.emit($event);
        this.hasFocus = true;

        //@exclude
        console.log(`Focus event on ${this.model.id}: `, $event);
        //@endexclude
    }
}