import {OnInit} from "@angular/core";
import {FormControl, FormGroup} from "@angular/forms";
import {DynamicFormControlModel} from "./dynamic-form-control.model";
import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX} from "./checkbox/dynamic-checkbox.model";

export abstract class DynamicFormControlComponent implements OnInit {

    control: FormControl;
    form: FormGroup;
    hasFocus: boolean;
    model: DynamicFormControlModel<any>;
    type: string; // must be defined by sublcass

    incompatibilities: Array<string> = [];
    isCompatible: boolean;

    constructor() {
    }

    ngOnInit() {

        this.isCompatible = this.checkCompatibility();
        this.control = <FormControl> this.form.controls[this.model.id];
        this.control.valueChanges.subscribe((value: string) => {
            console.log(this.model.id + " field changed to: ", value, typeof value, this.form.valid);
        });
    }

    get isValid() {
        return this.control.valid;
    }

    get isCheckbox () {
        return this.model.type === DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX;
    }

    onBlur($event) {

        this.hasFocus = false;
        console.log(this.model.id + " field is blurred");
    }

    onFocus($event) {

        this.hasFocus = true;
        console.log(this.model.id + " field is focused");
    }

    checkCompatibility() {

        if (this.incompatibilities.indexOf(this.model.type) > -1) {

            console.warn(`Control ${this.model.id} of type ${this.model.type} is not supported by UI ${this.type} and therefore is hidden from the DOM.`);
            return false;
        }

        return true;
    }
}
