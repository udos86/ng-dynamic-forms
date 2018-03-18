import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { NgbDatepickerModule, NgbButtonsModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { TextMaskModule } from "angular2-text-mask";
import { DynamicNGBootstrapFormControlComponent } from "./dynamic-ng-bootstrap-form-control.component";
import { DynamicNGBootstrapFormComponent } from "./dynamic-ng-bootstrap-form.component";
import { DynamicNGBootstrapCalendarComponent } from "./calendar/dynamic-ng-bootstrap-calendar.component";
import { DynamicNGBootstrapCheckboxComponent } from "./checkbox/dynamic-ng-bootstrap-checkbox.component";
import { DynamicNGBootstrapCheckboxGroupComponent } from "./checkbox-group/dynamic-ng-bootstrap-checkbox-group.component";
import { DynamicNGBootstrapDatePickerComponent } from "./datepicker/dynamic-ng-bootstrap-datepicker.component";
import { DynamicNGBootstrapInputComponent } from "./input/dynamic-ng-bootstrap-input.component";
import { DynamicNGBootstrapRadioGroupComponent } from "./radio-group/dynamic-ng-bootstrap-radio-group.component";
import { DynamicNGBootstrapSelectComponent } from "./select/dynamic-ng-bootstrap-select.component";
import { DynamicNGBootstrapTextAreaComponent } from "./textarea/dynamic-ng-bootstrap-textarea.component";
import { DynamicNGBootstrapTimePickerComponent } from "./timepicker/dynamic-ng-bootstrap-timepicker.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        NgbButtonsModule,
        NgbDatepickerModule,
        NgbTimepickerModule,
        TextMaskModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicNGBootstrapCalendarComponent,
        DynamicNGBootstrapCheckboxComponent,
        DynamicNGBootstrapCheckboxGroupComponent,
        DynamicNGBootstrapDatePickerComponent,
        DynamicNGBootstrapInputComponent,
        DynamicNGBootstrapRadioGroupComponent,
        DynamicNGBootstrapSelectComponent,
        DynamicNGBootstrapTextAreaComponent,
        DynamicNGBootstrapTimePickerComponent,
        DynamicNGBootstrapFormControlComponent,
        DynamicNGBootstrapFormComponent
    ],
    entryComponents: [
        DynamicNGBootstrapCalendarComponent,
        DynamicNGBootstrapCheckboxComponent,
        DynamicNGBootstrapCheckboxGroupComponent,
        DynamicNGBootstrapDatePickerComponent,
        DynamicNGBootstrapInputComponent,
        DynamicNGBootstrapRadioGroupComponent,
        DynamicNGBootstrapSelectComponent,
        DynamicNGBootstrapTextAreaComponent,
        DynamicNGBootstrapTimePickerComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicNGBootstrapFormControlComponent,
        DynamicNGBootstrapFormComponent
    ]
})
export class DynamicFormsNGBootstrapUIModule {
}