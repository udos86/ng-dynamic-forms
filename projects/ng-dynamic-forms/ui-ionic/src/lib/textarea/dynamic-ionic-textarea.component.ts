import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { IonTextarea } from "@ionic/angular";
import {
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicTextAreaModel
} from "@ng-dynamic-forms/core";

@Component({
    selector: "dynamic-ionic-textarea",
    templateUrl: "./dynamic-ionic-textarea.component.html"
})
export class DynamicIonicTextAreaComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicTextAreaModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("ionTextArea", {static: true}) ionTextArea!: IonTextarea;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
