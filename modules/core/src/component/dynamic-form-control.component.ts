import {OnInit, TemplateRef} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {DynamicFormControlModel} from "../model/dynamic-form-control.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX} from "../model/checkbox/dynamic-checkbox.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP} from "../model/checkbox/dynamic-checkbox-group.model";
import {DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP} from "../model/radio/dynamic-radio-group.model";
import {isDefined} from "../utils";

export abstract class DynamicFormControlComponent implements OnInit {

    control: FormControl;
    controlGroup: FormGroup;
    customTemplate: TemplateRef<any>;
    hasFocus: boolean;
    model: DynamicFormControlModel;

    incompatibilities: Array<string> = [];

    abstract readonly type: string;

    constructor() {
    }

    ngOnInit() {

        if (this.incompatibilities.indexOf(this.model.type) > -1) {
            throw new Error(`Control ${this.model.id} of type ${this.model.type} is not supported by ${this.type} UI package.`);
        }

        if (!isDefined(this.model)) {
            throw new Error(`no model input defined for DynamicFormControlComponent`);
        }

        if (!isDefined(this.controlGroup)) {
            throw new Error(`no controlGroup input defined for DynamicFormControlComponent`);
        }

        this.control = <FormControl> this.controlGroup.get(this.model.id);

        //@exclude
        this.control.valueChanges.subscribe((value: any) => {
            console.log(this.model.id + " field changed to: ", value, typeof value, this.control.valid);
        });
        //@endexclude
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

    onBlur($event) {

        this.hasFocus = false;
        //@exclude
        console.log(this.model.id + " field is blurred");
        //@endexclude
    }

    onChange($event) {
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