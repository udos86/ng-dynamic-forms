import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {ControlGroup} from "@angular/common";
import {DynamicFormControlModel} from "@ng2-dynamic-forms/core";
import {DynamicFormControlComponent} from "@ng2-dynamic-forms/core";

@Component({
    
    moduleId: module.id,
    selector: "dynamic-form-basic-control",
    templateUrl: "./dynamic-form-basic-control.component.html"
})

export class DynamicFormBasicControlComponent extends DynamicFormControlComponent {

    @Input() model: DynamicFormControlModel<any>;
    @Input() form: ControlGroup;
    
    constructor() {
        super();
    }
}
