import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MdCheckbox, MdInputContainer, MdRadioGroup, MdSelect, MdSlider, MdSlideToggle } from "@angular/material";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormControlEvent,
    DynamicFormRelationService,
    DynamicTemplateDirective
} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_MATERIAL = "MATERIAL";

export enum MdFormControlType {

    Checkbox = 1,
    FormArray = 2,
    FormGroup = 3,
    Input = 4,
    RadioGroup = 5,
    Select = 6,
    Slider = 7,
    SlideToggle = 8,
    Switch = 9,
    TextArea = 10
}

@Component({

    moduleId: module.id,
    selector: "dynamic-form-material-control",
    templateUrl: "./dynamic-form-material.component.html"
})

export class DynamicFormMaterialComponent extends DynamicFormControlComponent {

    private _showCharacterCount: boolean = false;

    @Input() bindId: boolean = true;
    @Input() controlGroup: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<any>;

    @Input()
    get showCharacterHint(): boolean {
        return !!(this._showCharacterCount && this.model["maxLength"] && this.characterCount);
    }

    set showCharacterHint(value: boolean) {
        this._showCharacterCount = value;
    }

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<any>;

    @ViewChild(MdCheckbox) mdCheckbox: MdCheckbox | null;
    @ViewChild(MdInputContainer) mdInputContainer: MdInputContainer | null;
    @ViewChild(MdRadioGroup) mdRadioGroup: MdRadioGroup | null;
    @ViewChild(MdSelect) mdSelect: MdSelect | null;
    @ViewChild(MdSlider) mdSlider: MdSlider | null;
    @ViewChild(MdSlideToggle) mdSlideToggle: MdSlideToggle | null;

    readonly type: string = DYNAMIC_FORM_UI_MATERIAL;

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }

    get characterCount(): number | null {
        return this.mdInputContainer ? this.mdInputContainer._mdInputChild.value.length : null;
    }

    get MdFormControlType(): MdFormControlType | null {

        return null;
    }
}