import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AutoCompleteComponent } from "@progress/kendo-angular-dropdowns";
import {
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputModel,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { KENDO_TEMPLATE_DIRECTIVES } from "../dynamic-kendo-form.const";
import { DynamicKendoTemplateableFormControlComponent } from "../dynamic-kendo-templateable-form-control.component";

@Component({
    selector: "dynamic-kendo-autocomplete",
    templateUrl: "./dynamic-kendo-autocomplete.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicKendoAutoCompleteComponent extends DynamicKendoTemplateableFormControlComponent {

    readonly templateDirectives = KENDO_TEMPLATE_DIRECTIVES;

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicInputModel;
    @Input() templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[] | undefined;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("kendoAutoComplete") kendoAutoComplete: AutoCompleteComponent;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    get viewChild(): AutoCompleteComponent {
        return this.kendoAutoComplete;
    }
}