import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { IonTextarea, IonicModule } from "@ionic/angular";
import {
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicTextAreaModel
} from "@ng-dynamic-forms/core";
import { NgIf, NgClass } from "@angular/common";

@Component({
    selector: "dynamic-ionic-textarea",
    templateUrl: "./dynamic-ionic-textarea.component.html",
    standalone: true,
    imports: [IonicModule, ReactiveFormsModule, NgIf, NgClass]
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
