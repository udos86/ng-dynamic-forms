import {Component} from "@angular/core";
import {Input} from "@angular/core";
import {ControlGroup} from "@angular/common";
import {DynamicFormControlModel} from "@ng2-dynamic-forms/dynamic-form-control.model";
import {DynamicFormControlComponent} from "@ng2-dynamic-forms/dynamic-form-control.component";

@Component({
    
    moduleId: module.id,
    selector: "dynamic-form-native-control",
    templateUrl: "./dynamic-form-native-control.component.html"
})

export class DynamicFormNativeControlComponent extends DynamicFormControlComponent {

    @Input() model: DynamicFormControlModel<any>;
    @Input() form: ControlGroup;
    
    constructor() {
        super();
    }
}
