import { Component, Input, Output, EventEmitter, QueryList, ContentChildren, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormArrayGroupModel,
    DynamicFormControlEvent,
    DynamicFormRelationService,
    DynamicTemplateDirective,
    DynamicInputModel,
    DynamicSelectModel,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_EDITOR,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER
} from "@ng2-dynamic-forms/core";
import {
    AutoComplete,
    Calendar,
    Checkbox,
    Chips,
    Dropdown,
    Editor,
    InputSwitch,
    MultiSelect,
    Slider
} from "primeng/primeng";
import {
    PFormControlType,
    PRIMENG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES,
    PRIMENG_CHIPS_TEMPLATE_DIRECTIVES,
    PRIMENG_DROPDOWN_LIST_TEMPLATE_DIRECTIVES
} from "./dynamic-form-primeng.const";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-primeng-control",
    templateUrl: "./dynamic-form-primeng.component.html"
})

export class DynamicFormPrimeNGComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;
    @Input() context: DynamicFormArrayGroupModel = null;
    @Input() group: FormGroup;
    @Input() hasErrorMessaging: boolean = false;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<DynamicTemplateDirective>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<DynamicTemplateDirective>;

    @ViewChild(AutoComplete) pAutoComplete: AutoComplete | null;
    @ViewChild(Calendar) pCalendar: Calendar | null;
    @ViewChild(Checkbox) pCheckbox: Checkbox | null;
    @ViewChild(Chips) pChips: Chips | null;
    @ViewChild(Dropdown) pDropDown: Dropdown | null;
    @ViewChild(Editor) pEditor: Editor | null;
    @ViewChild(InputSwitch) pInputSwitch: InputSwitch | null;
    @ViewChild(MultiSelect) pMultiSelect: MultiSelect | null;
    @ViewChild(Slider) pSlider: Slider | null;

    suggestions: string[];

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }

    protected setPTemplateDirective(directive: DynamicTemplateDirective): void {

        let templateDirectives: any,
            viewChild: any;

        if (this.pAutoComplete) {

            templateDirectives = PRIMENG_AUTOCOMPLETE_TEMPLATE_DIRECTIVES;
            viewChild = this.pAutoComplete;

        } else if (this.pChips) {

            templateDirectives = PRIMENG_CHIPS_TEMPLATE_DIRECTIVES;
            viewChild = this.pChips;

        } else if (this.pDropDown) {

            templateDirectives = PRIMENG_DROPDOWN_LIST_TEMPLATE_DIRECTIVES;
            viewChild = this.pDropDown;
        }

        Object.keys(templateDirectives || {}).forEach((key: string) => {

            if (templateDirectives[key] === directive.type) {
                viewChild[key] = directive.templateRef;
            }
        });
    }

    protected getFormControlType(): PFormControlType | null {

        let model;

        switch (this.model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return PFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
                return PFormControlType.Checkbox;

            case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return PFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
            case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
                return PFormControlType.Calendar;

            case DYNAMIC_FORM_CONTROL_TYPE_EDITOR:
                return PFormControlType.Editor;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                model = this.model as DynamicInputModel;

                if (model.list) {
                    return PFormControlType.AutoComplete;

                } else if (model.multiple) {
                    return PFormControlType.Chips;

                } else {
                    return PFormControlType.Input;
                }

            case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
                return PFormControlType.RadioGroup;

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                model = this.model as DynamicSelectModel<any>;

                return model.multiple ? PFormControlType.MultiSelect : PFormControlType.DropDown;

            case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                return PFormControlType.Slider;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return PFormControlType.InputSwitch;

            case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
                return PFormControlType.TextArea;

            default:
                return null;
        }
    }

    protected setTemplates(): void {

        super.setTemplates();

        this.templateDirectives
            .filter(directive => typeof directive.type === "string")
            .forEach(directive => this.setPTemplateDirective(directive));
    }

    onAutoComplete($event: any): void {
        this.suggestions = (this.model as DynamicInputModel).list.map(item => item);
    }
}