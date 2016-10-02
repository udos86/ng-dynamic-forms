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
    control: FormControl;
    controlGroup: FormGroup;
    customTemplate: TemplateRef<any>;
    focus: EventEmitter<FocusEvent>;
    hasFocus: boolean;
    model: DynamicFormControlModel;

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
        this.control.valueChanges.subscribe((value: any) => {

            if (this.model instanceof DynamicFormValueControlModel) {
                (<DynamicFormValueControlModel<any>> this.model).value = value;
            }

            //@exclude
            console.log(this.model.id + " field changed to: ", value, typeof value, this.control.valid, this.model);
            //@endexclude
        });

        if (this.model instanceof DynamicFormValueControlModel) {
            (<DynamicFormValueControlModel<any>> this.model).valueUpdates.subscribe(value => this.control.setValue(value));
        }

        this.registerControlRelations();
    }

    ngOnDestroy() {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    get isCheckbox() {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
    }

    get isCheckboxGroup() {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;
    }

    get isRadioGroup() {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP;
    }

    get isSwitch() {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_SWITCH;
    }

    get isValid() {
        return this.control.valid;
    }

    disable(): void {

        this.control.disable();
        this.model.disabled = true;
    }

    enable(): void {

        this.control.enable();
        this.model.disabled = false;
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

                    this.subscriptions.push(control.valueChanges.subscribe(value => this.setControlActivationState()));
                    this.subscriptions.push(control.statusChanges.subscribe(status => this.setControlActivationState()));
                }
            });
        }
    }

    setControlActivationState(): void {

        toBeDisabled(
            findActivationRelation(this.model.relation), this.controlGroup) ? this.disable() : this.enable();
    }

    onBlur($event: FocusEvent) {

        this.blur.emit($event);
        this.hasFocus = false;

        //@exclude
        console.log($event, this.model.id + " field is blurred");
        //@endexclude
    }

    onChange($event) {

        if (this.model.type === DYNAMIC_FORM_CONTROL_TYPE_INPUT) {

            let inputModel = <DynamicInputModel> this.model;

            if (inputModel.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE) {
                inputModel.files = $event.srcElement.files;
            }
        }

        //@exclude
        console.log($event, this.model.id + " field is changed", $event);
        //@endexclude
    }

    onFocus($event: FocusEvent) {

        this.focus.emit($event);
        this.hasFocus = true;

        //@exclude
        console.log($event, this.model.id + " field is focused");
        //@endexclude
    }
}