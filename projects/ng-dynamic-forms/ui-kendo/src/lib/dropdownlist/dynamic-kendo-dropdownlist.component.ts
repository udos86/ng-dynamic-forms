import {
    Component,
    EventEmitter,
    Input,
    Output,
    QueryList,
    ViewChild
} from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { DropDownListComponent } from "@progress/kendo-angular-dropdowns";
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

@Component({
    selector: "dynamic-kendo-dropdownlist",
    templateUrl: "./dynamic-kendo-dropdownlist.component.html"
})
export class DynamicKendoDropdownListComponent extends DynamicKendoFormControlWithTemplateComponent {
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

    @ViewChild("kendoDropDownList", {static: true}) kendoDropDownList!: DropDownListComponent;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }

    get viewChild(): DropDownListComponent {
        return this.kendoDropDownList;
    }
}
