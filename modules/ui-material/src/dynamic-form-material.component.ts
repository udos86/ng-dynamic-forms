import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MdCheckbox, MdInputContainer, MdRadioGroup, MdSelect, MdSlider, MdSlideToggle } from "@angular/material";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormControlEvent,
    DynamicFormRelationService,
    DynamicTemplateDirective,
    DynamicInputModel,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA
} from "@ng2-dynamic-forms/core";
import { DYNAMIC_FORM_UI_MATERIAL, MdFormControlType } from "./dynamic-form-material.const";

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
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Input()
    get showCharacterHint(): boolean {
        return !!(this._showCharacterCount && (this.model as DynamicInputModel).maxLength && this.characterCount);
    }

    set showCharacterHint(value: boolean) {
        this._showCharacterCount = value;
    }

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

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

    get formControlType(): number | null {

        switch (this.model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return MdFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return MdFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return MdFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                return MdFormControlType.Input;

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return MdFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                return MdFormControlType.Select;

            case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                return MdFormControlType.Slider;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return MdFormControlType.SlideToggle;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return MdFormControlType.TextArea;

            default:
                return null;
        }
    }
}