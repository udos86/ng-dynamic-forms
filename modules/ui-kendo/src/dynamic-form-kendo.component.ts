import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { CalendarComponent } from "@progress/kendo-angular-dateinputs";
import { AutoCompleteComponent, DropDownListComponent, MultiSelectComponent } from "@progress/kendo-angular-dropdowns";
import { MaskedTextBox, NumericTextBox, Slider, Switch } from "@progress/kendo-angular-inputs";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormControlEvent,
    DynamicFormRelationService,
    DynamicTemplateDirective,
    DynamicInputModel,
    DynamicSelectModel,
    DynamicDatepickerModel,
    DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
    DYNAMIC_FORM_CONTROL_TYPE_GROUP,
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_TYPE_SELECT,
    DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER,
} from "@ng2-dynamic-forms/core";
import {
    DYNAMIC_FORM_UI_KENDO,
    KENDO_AUTOCOMPLETE_TEMPLATE_DIRECTIVES,
    KENDO_CALENDAR_TEMPLATE_DIRECTIVES,
    KENDO_DROPDOWN_LIST_TEMPLATE_DIRECTIVES,
    KENDO_MULTI_SELECT_TEMPLATE_DIRECTIVES,
    KendoFormControlType
} from "./dynamic-form-kendo.const";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-kendo-control",
    templateUrl: "./dynamic-form-kendo.component.html"
})

export class DynamicFormKendoComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;
    @Input() controlGroup: FormGroup;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<any>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<any>;

    @ViewChild(AutoCompleteComponent) kendoAutoComplete: AutoCompleteComponent | null;
    @ViewChild(CalendarComponent) kendoCalendar: CalendarComponent | null;
    @ViewChild(DropDownListComponent) kendoDropDownList: DropDownListComponent | null;
    @ViewChild(MaskedTextBox) kendoMaskedTextBox: MaskedTextBox | null;
    @ViewChild(MultiSelectComponent) kendoMultiSelect: MultiSelectComponent | null;
    @ViewChild(NumericTextBox) kendoNumericTextBox: NumericTextBox | null;
    @ViewChild(Slider) kendoSlider: Slider | null;
    @ViewChild(Switch) kendoSwitch: Switch | null;

    readonly type: string = DYNAMIC_FORM_UI_KENDO;

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }

    protected setKendoTemplateDirective(template: DynamicTemplateDirective): void {

        let templateDirectives,
            viewChild;

        if (this.kendoAutoComplete) {

            templateDirectives = KENDO_AUTOCOMPLETE_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoAutoComplete;

        } else if (this.kendoCalendar) {

            templateDirectives = KENDO_CALENDAR_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoCalendar;

        } else if (this.kendoDropDownList) {

            templateDirectives = KENDO_DROPDOWN_LIST_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoDropDownList;

        } else if (this.kendoMultiSelect) {

            templateDirectives = KENDO_MULTI_SELECT_TEMPLATE_DIRECTIVES;
            viewChild = this.kendoMultiSelect;
        }

        Object.keys(templateDirectives || {}).forEach(key => {

            if (templateDirectives[key] === template.type) {
                viewChild[key] = template;
            }
        });
    }

    protected setTemplates(): void {

        super.setTemplates();

        //noinspection TypeScriptUnresolvedFunction
        this.templates
            .filter(template => template.type.startsWith("kendo"))
            .forEach(template => this.setKendoTemplateDirective(template));
    }

    get formControlType(): number | null {

        let model;

        switch (this.model.type) {

            case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
                return KendoFormControlType.Array;

            case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
                model = this.model as DynamicDatepickerModel;

                return model.inline ? KendoFormControlType.Calendar : null;

            case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
                return KendoFormControlType.Group;

            case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
                model = this.model as DynamicInputModel;

                if (!model.mask && model.inputType !== DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                    return KendoFormControlType.AutoComplete;

                } else if (model.mask && model.inputType !== DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                    return KendoFormControlType.MaskedTextBox;

                } else if (!model.mask && model.inputType === DYNAMIC_FORM_CONTROL_INPUT_TYPE_NUMBER) {
                    return KendoFormControlType.NumericTextBox;

                } else {
                    return null;
                }

            case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
                model = this.model as DynamicSelectModel<any>;

                return model.multiple ? KendoFormControlType.MultiSelect : KendoFormControlType.DropDownList;

            case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
                return KendoFormControlType.Slider;

            case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
                return KendoFormControlType.Switch;

            default:
                return null;
        }
    }
}