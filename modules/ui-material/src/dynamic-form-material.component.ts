import { Component, Input, Output, EventEmitter, ViewChild, ContentChild, TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MdCheckbox, MdInputContainer, MdRadioGroup, MdSelect, MdSlider, MdSlideToggle } from "@angular/material";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormControlEvent,
    DynamicFormRelationService
} from "@ng2-dynamic-forms/core";

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

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChild(TemplateRef) customTemplate;

    @ViewChild(MdCheckbox) mdCheckbox: MdCheckbox;
    @ViewChild(MdInputContainer) mdInputContainer: MdInputContainer;
    @ViewChild(MdRadioGroup) mdRadioGroup: MdRadioGroup;
    @ViewChild(MdSelect) mdSelect: MdSelect;
    @ViewChild(MdSlider) mdSlider: MdSlider;
    @ViewChild(MdSlideToggle) mdSlideToggle: MdSlideToggle;

    readonly type: string = DYNAMIC_FORM_UI_MATERIAL;

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }

    get characterCount(): number | null {
        return this.mdInputContainer ? this.mdInputContainer._mdInputChild.value.length : null;
    }
}