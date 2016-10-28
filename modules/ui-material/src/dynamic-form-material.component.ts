import {Component, Input, Output, EventEmitter, ViewChild, ContentChild, TemplateRef} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {MdCheckbox, MdInput, MdRadioGroup} from "@angular/material";
import {DynamicFormControlModel} from "@ng2-dynamic-forms/core";
import {DynamicFormControlComponent} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_MATERIAL = "MATERIAL";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-material-control",
    templateUrl: "./dynamic-form-material.component.html"
})

export class DynamicFormMaterialComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;
    @Input() controlGroup: FormGroup;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplate: TemplateRef<any>;

    @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    @Output() change: EventEmitter<Event> = new EventEmitter<Event>();
    @Output() focus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @ContentChild(TemplateRef) customTemplate;

    @ViewChild(MdCheckbox) mdCheckbox: MdCheckbox;
    @ViewChild(MdInput) mdInput: MdInput;
    @ViewChild(MdRadioGroup) mdRadioGroup: MdRadioGroup;

    readonly type: string = DYNAMIC_FORM_UI_MATERIAL;

    constructor() {
        super();
    }

    /*
     get characterCount() {
     return this.mdInput ? this.mdInput.characterCount : 0;
     }
     */
}