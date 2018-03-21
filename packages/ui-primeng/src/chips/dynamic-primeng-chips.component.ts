import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Chips } from "primeng/primeng";
import {
    DynamicFormControlCustomEvent,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputModel,
    DynamicTemplateableFormValueControlComponent,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";

export const PRIME_CHIPS_TEMPLATE_DIRECTIVES = new Map<string, string>([
    ["itemTemplate", "itemTemplate"]
]);

@Component({
    selector: "dynamic-primeng-chips",
    templateUrl: "./dynamic-primeng-chips.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPrimeNGChipsComponent extends DynamicTemplateableFormValueControlComponent {

    private _templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    readonly templateDirectives = PRIME_CHIPS_TEMPLATE_DIRECTIVES;

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

    @ViewChild("pChips") pChips: Chips;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    get templateableViewChild(): Chips {
        return this.pChips;
    }
}