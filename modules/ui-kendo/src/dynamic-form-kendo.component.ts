import { Component, OnInit, Input, Output, EventEmitter, ContentChildren, QueryList, ViewChild } from "@angular/core";
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
    DynamicDatepickerModel
} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_KENDO = "KENDO";

export const KENDO_AUTOCOMPLETE_TEMPLATE_DIRECTIVES = {

    footerTemplate: "kendoAutoCompleteFooterTemplate",
    headerTemplate: "kendoAutoCompleteHeaderTemplate",
    itemTemplate: "kendoAutoCompleteItemTemplate",
    noDataTemplate: "kendoAutoCompleteNoDataTemplate"
};

export const KENDO_CALENDAR_TEMPLATE_DIRECTIVES = {

    cellTemplate: "kendoCalendarCellTemplate"
};

export const KENDO_DROPDOWN_LIST_TEMPLATE_DIRECTIVES = {

    footerTemplate: "kendoDropDownListFooterTemplate",
    headerTemplate: "kendoDropDownListHeaderTemplate",
    itemTemplate: "kendoDropDownListItemTemplate",
    noDataTemplate: "kendoDropDownListNoDataTemplate",
    valueTemplate: "kendoDropDownListValueTemplate"
};

export const KENDO_MULTI_SELECT_TEMPLATE_DIRECTIVES = {

    footerTemplate: "kendoMultiSelectFooterTemplate",
    headerTemplate: "kendoMultiSelectHeaderTemplate",
    itemTemplate: "kendoMultiSelectItemTemplate",
    noDataTemplate: "kendoMultiSelectNoDataTemplate",
    tagTemplate: "kendoMultiSelectTagTemplate"
};

export enum KendoFormControlType {

    AutoComplete = 1,
    Calendar = 2,
    DropDownList = 3,
    FormArray = 4,
    FormGroup = 5,
    MaskedTextBox = 6,
    MultiSelect = 7,
    NumericTextBox = 8,
    Slider = 9,
    Switch = 10
}

@Component({

    moduleId: module.id,
    selector: "dynamic-form-kendo-control",
    templateUrl: "./dynamic-form-kendo.component.html"
})

export class DynamicFormKendoComponent extends DynamicFormControlComponent implements OnInit{

    @Input() bindId: boolean = true;
    @Input() controlGroup: FormGroup;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplates: QueryList<any>;

    @Output() blur: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() change: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();
    @Output() focus: EventEmitter<DynamicFormControlEvent> = new EventEmitter<DynamicFormControlEvent>();

    @ContentChildren(DynamicTemplateDirective) templates: QueryList<any>;

    @ViewChild(AutoCompleteComponent) kendoAutoComplete: AutoCompleteComponent;
    @ViewChild(CalendarComponent) kendoCalendar: CalendarComponent;
    @ViewChild(DropDownListComponent) kendoDropDownList: DropDownListComponent;
    @ViewChild(MaskedTextBox) kendoMaskedTextBox: MaskedTextBox;
    @ViewChild(MultiSelectComponent) kendoMultiSelect: MultiSelectComponent;
    @ViewChild(NumericTextBox) kendoNumericTextBox: NumericTextBox;
    @ViewChild(Slider) kendoSlider: Slider;
    @ViewChild(Switch) kendoSwitch: Switch;

    private controlType: Number;

    readonly type: string = DYNAMIC_FORM_UI_KENDO;

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }

    ngOnInit(): void {

        super.ngOnInit();

        this.controlType = this.kendoFormControlType;
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

    get kendoFormControlType(): KendoFormControlType | null {

        if (this.model.type === "ARRAY") {

            return KendoFormControlType.FormArray;

        } else if (this.model.type === "DATEPICKER") {

            let model = this.model as DynamicDatepickerModel;

            return model.inline ? KendoFormControlType.Calendar : null;

        } else if (this.model.type === "GROUP" || this.model.type === "CHECKBOX_GROUP") {

            return KendoFormControlType.FormGroup;

        } else if (this.model.type === "INPUT") {

            let model = this.model as DynamicInputModel;

            if (!model.mask && model.inputType !== "number") {
                return KendoFormControlType.AutoComplete;

            } else if (model.mask && model.inputType !== "number") {
                return KendoFormControlType.MaskedTextBox;

            } else if (!model.mask && model.inputType === "number") {
                return KendoFormControlType.NumericTextBox;
            }

        } else if (this.model.type === "SELECT") {

            let model = this.model as DynamicSelectModel<any>;

            return model.multiple ? KendoFormControlType.MultiSelect : KendoFormControlType.DropDownList;

        } else if (this.model.type === "SLIDER") {

            return KendoFormControlType.Slider;

        } else if (this.model.type === "SWITCH") {

            return KendoFormControlType.Switch;
        }

        return null;
    }
}