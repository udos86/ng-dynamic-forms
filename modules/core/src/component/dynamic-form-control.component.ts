import {TemplateRef, OnInit, OnDestroy} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs/Subscription";
import {DynamicFormControlModel, DynamicFormControlDependency} from "../model/dynamic-form-control.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX} from "../model/checkbox/dynamic-checkbox.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP} from "../model/checkbox/dynamic-checkbox-group.model";
import {DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP} from "../model/radio/dynamic-radio-group.model";
import {isDefined} from "../utils";

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

        this.model.depends.forEach(dependency => {

            if (this.model.id === dependency.on) {
                throw new Error(`FormControl ${this.model.id} cannot depend on itself`);
            }

            let control: FormControl = <FormControl> this.controlGroup.get(dependency.on);

            if (control) {

                this.checkFormControlDependency(dependency, control);

                this.subscriptions.push(control.valueChanges.subscribe(value => {
                    this.checkFormControlDependency(dependency, control);
                }));

                this.subscriptions.push(control.statusChanges.subscribe(status => {
                    this.checkFormControlDependency(dependency, control);
                }));
            }
        });

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

    checkFormControlDependency(dep: DynamicFormControlDependency, control: FormControl) {

        if (dep.disableValue || dep.disableStatus) {
            (dep.disableValue === control.value || dep.disableStatus === control.status) ? this.disable() : this.enable();
        }

        if (dep.enableValue || dep.enableStatus) {
            (dep.enableValue === control.value || dep.enableStatus === control.status) ? this.enable() : this.disable();
        }
    }

    disable(): void {

        this.control.disable();
        this.model.disabled = true;
    }

    enable(): void {

        this.control.enable();
        this.model.disabled = false;
    }

    onBlur($event) {

        this.hasFocus = false;
        //@exclude
        console.log(this.model.id + " field is blurred");
        //@endexclude
    }

    onChange($event) {
        //@exclude
        //console.log(this.model.id + " field is changed", $event);
        //@endexclude
    }

    onFocus($event) {

        this.hasFocus = true;
        //@exclude
        console.log(this.model.id + " field is focused");
        //@endexclude
    }
}