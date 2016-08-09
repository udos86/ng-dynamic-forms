import {Component, Input, ViewChild, ContentChild, TemplateRef, forwardRef} from "@angular/core";
import {FormGroup, REACTIVE_FORM_DIRECTIVES} from "@angular/forms";
import {MdUniqueSelectionDispatcher} from "@angular2-material/core";
import {MdCheckbox} from "@angular2-material/checkbox";
import {MdInput} from "@angular2-material/input";
import {MdRadioButton, MdRadioGroup} from "@angular2-material/radio";
import {DynamicFormControlModel} from "@ng2-dynamic-forms/core";
import {DynamicFormControlComponent, DYNAMIC_FORM_CONTROL_TYPE_SELECT, DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_MATERIAL = "MATERIAL";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES, forwardRef(() => DynamicFormMaterialComponent), MdCheckbox, MdInput,
        MdRadioButton, MdRadioGroup],
    moduleId: module.id,
    providers: [MdUniqueSelectionDispatcher],
    selector: "dynamic-form-material-control",
    templateUrl: "./dynamic-form-material.component.html"
})

export class DynamicFormMaterialComponent extends DynamicFormControlComponent {

    @Input() controlGroup: FormGroup;
    @Input() model: DynamicFormControlModel;

    @ContentChild(TemplateRef) customTemplate;

    @ViewChild(MdCheckbox) mdCheckbox: MdCheckbox;
    @ViewChild(MdInput) mdInput: MdInput;
    @ViewChild(MdRadioGroup) mdRadioGroup: MdRadioGroup;

    incompatibilities: Array<string> = [DYNAMIC_FORM_CONTROL_TYPE_SELECT, DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA];
    type: string = DYNAMIC_FORM_UI_MATERIAL;

    constructor() {
        super();
    }
    
    get characterCount() {
        return this.mdInput ? this.mdInput.characterCount : 0;
    }
}
