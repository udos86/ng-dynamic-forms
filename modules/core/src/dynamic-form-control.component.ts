import {OnInit} from "@angular/core";
import {Control, ControlGroup} from "@angular/common";
import {DynamicFormControlModel} from "./dynamic-form-control.model";

export abstract class DynamicFormControlComponent implements OnInit {
    
    control: Control;
    form: ControlGroup;
    hasFocus: boolean;
    model: DynamicFormControlModel<any>;
    
    constructor() {
    }

    ngOnInit() {

        this.control = <Control> this.form.controls[this.model.id];
        this.control.valueChanges.subscribe((value: string) => {
            console.log(this.model.id + " field changed to: ", value, typeof value, this.form.valid);
        });
    }

    get isValid() {
        return this.control.valid;
    }

    onBlur($event) {

        this.hasFocus = false;
        console.log(this.model.id + " field is blurred");
    }

    onFocus($event) {

        this.hasFocus = true;
        console.log(this.model.id + " field is focused");
    }
}
