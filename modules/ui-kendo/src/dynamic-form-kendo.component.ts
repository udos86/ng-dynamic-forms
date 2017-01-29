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
    DynamicTemplateDirective
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

    @ViewChild(AutoCompleteComponent) kendoAutoComplete: AutoCompleteComponent;
    @ViewChild(CalendarComponent) kendoCalendar: CalendarComponent;
    @ViewChild(DropDownListComponent) kendoDropDownList: DropDownListComponent;
    @ViewChild(MaskedTextBox) kendoMaskedTextBox: MaskedTextBox;
    @ViewChild(MultiSelectComponent) kendoMultiSelect: MultiSelectComponent;
    @ViewChild(NumericTextBox) kendoNumericTextBox: NumericTextBox;
    @ViewChild(Slider) kendoSlider: Slider;
    @ViewChild(Switch) kendoSwitch: Switch;

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
}