import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AutoComplete } from "primeng/primeng";
import {
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormValueControlComponent,
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
export class DynamicPrimeNGAutoCompleteComponent extends DynamicFormValueControlComponent {

    private suggestions: string[];

    @Input() bindId: boolean = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicInputModel;
    @Input() templates: DynamicTemplateDirective[];

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
            this.suggestions = this.model.list.map(item => item);
        }
    }
}