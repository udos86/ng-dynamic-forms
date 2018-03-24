import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, QueryList, ViewChild } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { UploadComponent } from "@progress/kendo-angular-upload";
import {
    DynamicFileUploadModel,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicTemplateableFormControlComponent,
    DynamicTemplateDirective
} from "@ng-dynamic-forms/core";
import { KENDO_TEMPLATE_DIRECTIVES } from "../dynamic-kendo-form.const";

@Component({
    selector: "dynamic-kendo-upload",
    templateUrl: "./dynamic-kendo-upload.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicKendoUploadComponent extends DynamicTemplateableFormControlComponent {

    readonly templateDirectives = KENDO_TEMPLATE_DIRECTIVES;

    @Input() bindId: boolean = true;
    @Input() group: FormGroup;
    @Input() layout: DynamicFormLayout;
    @Input() model: DynamicFileUploadModel;
    @Input() templates: QueryList<DynamicTemplateDirective> | DynamicTemplateDirective[];

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("kendoUpload") kendoUpload: UploadComponent;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    get templateableViewChild(): UploadComponent {
        return this.kendoUpload;
    }
}