import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AutoComplete } from "primeng/primeng";
import {
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateableFormValueControlComponent,
    DynamicInputModel,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";

export const PRIME_NG_AUTOCOMPLETE_ITEM_TEMPLATE = "itemTemplate";
export const PRIME_NG_AUTOCOMPLETE_SELECTED_ITEM_TEMPLATE_ = "selectedItemTemplate";

@Component({
    selector: "dynamic-primeng-autocomplete",
    templateUrl: "./dynamic-primeng-autocomplete.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DynamicPrimeNGAutoCompleteComponent extends DynamicTemplateableFormValueControlComponent {

    private _suggestions: string[];
    private _templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    readonly templateDirectives = [PRIME_NG_AUTOCOMPLETE_ITEM_TEMPLATE, PRIME_NG_AUTOCOMPLETE_SELECTED_ITEM_TEMPLATE_];

    @Input() bindId: boolean = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicInputModel;

    @Input()
    get templates(): QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[] {
        return this._templates;
    }

    set templates(templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[]) {
        this._templates = templates;
        this.bindTemplates();
    }

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pAutoComplete") pAutoComplete: AutoComplete;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    onAutoComplete(_$event: any): void {

        if (Array.isArray(this.model.list)) {
            this._suggestions = this.model.list.map(item => item);
        }
    }

    get templateableViewChild(): AutoComplete {
        return this.pAutoComplete;
    }
}