import {TemplateRef, OnInit, OnDestroy} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {DynamicFormControlModel} from "../model/dynamic-form-control.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX} from "../model/checkbox/dynamic-checkbox.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP} from "../model/checkbox/dynamic-checkbox-group.model";
import {
    DynamicInputModel,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_FILE
} from "../model/input/dynamic-input.model";
import {DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP} from "../model/radio/dynamic-radio-group.model";
import {isDefined} from "../utils";
import {findActivationDependency, toBeDisabled} from "../model/dynamic-form-control-dependency.model";

export abstract class DynamicFormControlComponent implements OnInit, OnDestroy {

    control: FormControl;
    controlGroup: FormGroup;
    customTemplate: TemplateRef<any>;
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

        if (this.model.depends.length > 0) {

            this.setControlActivationState();
            this.registerControlDependencies();
        }

        //@exclude
        this.control.valueChanges.subscribe((value: any) => {
            console.log(this.model.id + " field changed to: ", value, typeof value, this.control.valid);
        });
        //@endexclude
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

    registerControlDependencies(): void {

        this.model.depends.forEach(depGroup => depGroup.on.forEach(dependency => {

            if (this.model.id === dependency.id) {
                throw new Error(`FormControl ${this.model.id} cannot depend on itself`);
            }

            let control: FormControl = <FormControl> this.controlGroup.get(dependency.id);

            if (control) {

                this.subscriptions.push(control.valueChanges.subscribe(value => this.setControlActivationState()));
                this.subscriptions.push(control.statusChanges.subscribe(status => this.setControlActivationState()));
            }
        }));
    }

    setControlActivationState(): void {
        toBeDisabled(findActivationDependency(this.model.depends), this.controlGroup) ? this.disable() : this.enable();
    }

    onBlur($event) {

        this.hasFocus = false;

        //@exclude
        console.log(this.model.id + " field is blurred");
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
        console.log(this.model.id + " field is changed", $event);
        //@endexclude
    }

    onFocus($event) {

        this.hasFocus = true;

        //@exclude
        console.log(this.model.id + " field is focused");
        //@endexclude
    }
}