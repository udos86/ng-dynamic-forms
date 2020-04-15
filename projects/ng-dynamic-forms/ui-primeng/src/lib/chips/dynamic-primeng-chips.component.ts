import { Component, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Chips } from "primeng/chips";
import {
    DynamicFormControlCustomEvent, DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputModel,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { PRIME_NG_TEMPLATE_DIRECTIVES } from "../dynamic-primeng-form.const";
import { DynamicPrimeNGFormControlWithTemplateComponent } from "../dynamic-primeng-form-control-with-template.component";

@Component({
    selector: "dynamic-primeng-chips",
    templateUrl: "./dynamic-primeng-chips.component.html"
})
export class DynamicPrimeNGChipsComponent extends DynamicPrimeNGFormControlWithTemplateComponent {

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

    @ViewChild("pChips", { static: true }) pChips: Chips;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    get viewChild(): Chips {
        return this.pChips;
    }
}
