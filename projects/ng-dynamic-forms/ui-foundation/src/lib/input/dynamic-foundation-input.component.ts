import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { UntypedFormGroup, ReactiveFormsModule } from "@angular/forms";
import {
    DynamicFormControlComponent,
    DynamicFormControlLayout,
    DynamicFormLayout,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputModel,
    DynamicFormsCoreModule
} from "@ng-dynamic-forms/core";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { NgIf, NgClass, NgFor, AsyncPipe } from "@angular/common";

@Component({
    selector: "dynamic-foundation-input",
    templateUrl: "./dynamic-foundation-input.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [ReactiveFormsModule, NgIf, DynamicFormsCoreModule, NgClass, NgxMaskDirective, NgFor, AsyncPipe],
    providers: [provideNgxMask()]
})
export class DynamicFoundationInputComponent extends DynamicFormControlComponent {
    @Input() formLayout?: DynamicFormLayout;
    @Input() group!: UntypedFormGroup;
    @Input() layout?: DynamicFormControlLayout;
    @Input() model!: DynamicInputModel;

    @Output() blur: EventEmitter<any> = new EventEmitter();
    @Output() change: EventEmitter<any> = new EventEmitter();
    @Output() focus: EventEmitter<any> = new EventEmitter();

    constructor(protected layoutService: DynamicFormLayoutService, protected validationService: DynamicFormValidationService) {
        super(layoutService, validationService);
    }
}
