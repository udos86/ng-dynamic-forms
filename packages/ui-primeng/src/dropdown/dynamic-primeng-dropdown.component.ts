import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { AutoComplete, Dropdown } from "primeng/primeng";
import {
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormValueControlComponent,
    DynamicSelectModel, DynamicTemplateableFormValueControlComponent,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import {
    PRIME_NG_AUTOCOMPLETE_ITEM_TEMPLATE,
    PRIME_NG_AUTOCOMPLETE_SELECTED_ITEM_TEMPLATE_
} from "../autocomplete/dynamic-primeng-autocomplete.component";

export const PRIME_NG_DROPDOWN_ITEM_TEMPLATE = "itemTemplate";

@Component({
    selector: "dynamic-primeng-dropdown",
    templateUrl: "./dynamic-primeng-dropdown.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicPrimeNGDropdownComponent extends DynamicTemplateableFormValueControlComponent {

    private _templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    readonly templateDirectives = [PRIME_NG_DROPDOWN_ITEM_TEMPLATE];

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