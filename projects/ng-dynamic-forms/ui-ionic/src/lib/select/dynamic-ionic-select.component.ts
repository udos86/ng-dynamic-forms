import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import { IonSelect, IonicModule } from "@ionic/angular";
import {
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicFormControlComponent,
    DynamicSelectModel
} from "@ng-dynamic-forms/core";
import { NgIf, NgClass, NgFor, AsyncPipe } from "@angular/common";

@Component({
    selector: "dynamic-ionic-select",
    templateUrl: "./dynamic-ionic-select.component.html",
    standalone: true,
    imports: [IonicModule, ReactiveFormsModule, NgIf, NgClass, NgFor, AsyncPipe]
})
export class DynamicIonicSelectComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicSelectModel<string>;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    @ViewChild("ionSelect", {static: true}) ionSelect!: IonSelect;

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
