import { Component, Input, Output, EventEmitter, ContentChildren, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { DropDownListComponent, MultiSelectComponent } from "@progress/kendo-angular-dropdowns";
import { Slider, Switch } from "@progress/kendo-angular-inputs";
import {
    DynamicFormControlComponent,
    DynamicFormControlModel,
    DynamicFormControlEvent,
    DynamicFormRelationService,
    DynamicTemplateDirective
} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_KENDO = "KENDO";
/*
export const KENDO_COMBO_BOX_TEMPLATE_DIRECTIVES = {

    footerTemplate: "kendoComboBoxFooterTemplate",
    headerTemplate: "kendoComboBoxHeaderTemplate",
    itemTemplate: "kendoComboBoxItemTemplate",
    noDataTemplate: "kendoComboBoxNoDataTemplate"
};
*/
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

    @ViewChild(DropDownListComponent) kendoDropDownList: DropDownListComponent;
    @ViewChild(MultiSelectComponent) kendoMultiSelect: MultiSelectComponent;
    @ViewChild(Slider) kendoSlider: Slider;
    @ViewChild(Switch) kendoSwitch: Switch;

    readonly type: string = DYNAMIC_FORM_UI_KENDO;

    constructor(relationService: DynamicFormRelationService) {
        super(relationService);
    }

    protected setKendoTemplateDirective(template: DynamicTemplateDirective): void {

        let templateDirectives,
            viewChild;

        if (this.kendoDropDownList) {

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