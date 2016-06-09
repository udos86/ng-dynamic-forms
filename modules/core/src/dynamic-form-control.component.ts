import {OnInit} from "@angular/core";
import {Control, ControlGroup} from "@angular/common";
import {DynamicFormControlModel} from "./dynamic-form-control.model";

export abstract class DynamicFormControlComponent implements OnInit {
    
    control: Control;
    form: ControlGroup;
    hasFocus: boolean;
    model: DynamicFormControlModel<any>;
    name: string; // must be defined by sublcass
    
    incompatibilities: Array<string> = [];
    
    constructor() {}

    ngOnInit() {

        this.checkCompatibility();
        
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

    checkCompatibility() {
        
        if (this.incompatibilities.indexOf(this.model.type) > -1) {
            console.warn(`Control type ${this.model.type} with id ${this.model.id} is not supported by library ${this.type} and therefore omitted.`);
        }
    }
}
