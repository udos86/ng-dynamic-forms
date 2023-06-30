import { Component, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { MultiSelectComponent, MultiSelectModule } from "@progress/kendo-angular-dropdowns";
import {
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicSelectModel,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { KENDO_TEMPLATE_DIRECTIVES } from "../dynamic-kendo-form.const";
import { DynamicKendoFormControlWithTemplateComponent } from "../dynamic-kendo-form-control-with-template.component";
import { NgClass } from "@angular/common";

@Component({
    selector: "dynamic-kendo-multiselect",
    templateUrl: "./dynamic-kendo-multiselect.component.html",
    standalone: true,
    imports: [ReactiveFormsModule, MultiSelectModule, NgClass]
})
export class DynamicKendoMultiSelectComponent extends DynamicKendoFormControlWithTemplateComponent {
    readonly templateDirectives = KENDO_TEMPLATE_DIRECTIVES;

    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicSelectModel<string>;
    @Input() templates?: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("kendoMultiSelect", {static: true}) kendoMultiSelect!: MultiSelectComponent;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }

    get viewChild(): MultiSelectComponent {
        return this.kendoMultiSelect;
    }
}
