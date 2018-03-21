import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Dropdown } from "primeng/primeng";
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicSelectModel, DynamicTemplateableFormValueControlComponent,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";

export const PRIME_DROPDOWN_TEMPLATE_DIRECTIVES = new Map<string, string>([
    ["itemTemplate", "itemTemplate"]
]);

@Component({
    selector: "dynamic-primeng-dropdown",
    templateUrl: "./dynamic-primeng-dropdown.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPrimeNGDropdownComponent extends DynamicTemplateableFormValueControlComponent {

    private _templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    readonly templateDirectives = PRIME_DROPDOWN_TEMPLATE_DIRECTIVES;

    @Input() bindId: boolean = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicSelectModel<string>;

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
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("pDropdown") pDropdown: Dropdown;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    get templateableViewChild(): Dropdown {
        return this.pDropdown;
    }
}