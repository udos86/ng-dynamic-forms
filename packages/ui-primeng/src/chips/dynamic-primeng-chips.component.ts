import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Chips } from "primeng/primeng";
import {
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputModel,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { PRIME_NG_TEMPLATE_DIRECTIVES } from "../dynamic-primeng-form.const";
import { DynamicPrimeNGTemplateableFormControlComponent } from "../dynamic-primeng-templateable-form-control.component";

@Component({
    selector: "dynamic-primeng-chips",
    templateUrl: "./dynamic-primeng-chips.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPrimeNGChipsComponent extends DynamicPrimeNGTemplateableFormControlComponent {

    readonly templateDirectives = PRIME_NG_TEMPLATE_DIRECTIVES;

    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicInputModel;
    @Input() templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[] | undefined;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() customEvent: EventEmitter<DynamicFormControlCustomEvent> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pChips") pChips: Chips;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    get viewChild(): Chips {
        return this.pChips;
    }
}