import { Component, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AutoComplete } from "primeng/autocomplete";
import {
    DynamicFormControlCustomEvent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputModel,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { PRIME_NG_TEMPLATE_DIRECTIVES } from "../dynamic-primeng-form.const";
import { DynamicPrimeNGFormControlWithTemplateComponent } from "../dynamic-primeng-form-control-with-template.component";

@Component({
    selector: "dynamic-primeng-autocomplete",
    templateUrl: "./dynamic-primeng-autocomplete.component.html"
})
export class DynamicPrimeNGAutoCompleteComponent extends DynamicPrimeNGFormControlWithTemplateComponent {

    private _suggestions: string[];

    readonly templateDirectives = PRIME_NG_TEMPLATE_DIRECTIVES;

    @Input() formLayout: DynamicFormLayout;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormControlLayout;
    @Input() model: DynamicInputModel;
    @Input() templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[] | undefined;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pAutoComplete", {static: true}) pAutoComplete: AutoComplete;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    get suggestions(): string[] {
        return this._suggestions;
    }

    get viewChild(): AutoComplete {
        return this.pAutoComplete;
    }

    onAutoComplete(_$event: any): void {

        if (Array.isArray(this.model.list)) {
            this._suggestions = this.model.list.map(item => item);
        }
    }
}
