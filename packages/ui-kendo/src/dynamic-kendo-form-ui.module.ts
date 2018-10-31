import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DateInputsModule } from "@progress/kendo-angular-dateinputs";
import { DropDownsModule } from "@progress/kendo-angular-dropdowns";
import { InputsModule } from "@progress/kendo-angular-inputs";
import { UploadModule } from "@progress/kendo-angular-upload";
import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicKendoFormControlContainerComponent } from "./dynamic-kendo-form-control-container.component";
import { DynamicKendoFormComponent } from "./dynamic-kendo-form.component";
import { DynamicKendoCheckboxComponent } from "./checkbox/dynamic-kendo-checkbox.component";
import { DynamicKendoCheckboxGroupComponent } from "./checkbox-group/dynamic-kendo-checkbox-group.component";
import { DynamicKendoAutoCompleteComponent } from "./autocomplete/dynamic-kendo-autocomplete.component";
import { DynamicKendoCalendarComponent } from "./calendar/dynamic-kendo-calendar.component";
import { DynamicKendoDateInputComponent } from "./dateinput/dynamic-kendo-dateinput.component";
import { DynamicKendoDatePickerComponent } from "./datepicker/dynamic-kendo-datepicker.component";
import { DynamicKendoDropdownListComponent } from "./dropdownlist/dynamic-kendo-dropdownlist.component";
import { DynamicKendoFormArrayComponent } from "./form-array/dynamic-kendo-form-array.component";
import { DynamicKendoFormGroupComponent } from "./form-group/dynamic-kendo-form-group.component";
import { DynamicKendoInputComponent } from "./input/dynamic-kendo-input.component";
import { DynamicKendoMaskedTextBoxComponent } from "./masked-textbox/dynamic-kendo-maskedtextbox.component";
import { DynamicKendoMultiSelectComponent } from "./multiselect/dynamic-kendo-multiselect.component";
import { DynamicKendoNumericTextBoxComponent } from "./numeric-textbox/dynamic-kendo-numerictextbox.component";
import { DynamicKendoRadioGroupComponent } from "./radio-group/dynamic-kendo-radio-group.component";
import { DynamicKendoSliderComponent } from "./slider/dynamic-kendo-slider.component";
import { DynamicKendoSwitchComponent } from "./switch/dynamic-kendo-switch.component";
import { DynamicKendoTextAreaComponent } from "./textarea/dynamic-kendo-textarea.component";
import { DynamicKendoTimePickerComponent } from "./timepicker/dynamic-kendo-timepicker.component";
import { DynamicKendoUploadComponent } from "./upload/dynamic-kendo-upload.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DateInputsModule,
        DropDownsModule,
        InputsModule,
        UploadModule,
        DynamicFormsCoreModule
    ],
    declarations: [
        DynamicKendoAutoCompleteComponent,
        DynamicKendoCalendarComponent,
        DynamicKendoCheckboxComponent,
        DynamicKendoCheckboxGroupComponent,
        DynamicKendoDateInputComponent,
        DynamicKendoDatePickerComponent,
        DynamicKendoDropdownListComponent,
        DynamicKendoFormArrayComponent,
        DynamicKendoFormComponent,
        DynamicKendoFormControlContainerComponent,
        DynamicKendoFormGroupComponent,
        DynamicKendoInputComponent,
        DynamicKendoMaskedTextBoxComponent,
        DynamicKendoMultiSelectComponent,
        DynamicKendoNumericTextBoxComponent,
        DynamicKendoRadioGroupComponent,
        DynamicKendoSliderComponent,
        DynamicKendoSwitchComponent,
        DynamicKendoTextAreaComponent,
        DynamicKendoTimePickerComponent,
        DynamicKendoUploadComponent
    ],
    entryComponents: [
        DynamicKendoAutoCompleteComponent,
        DynamicKendoCalendarComponent,
        DynamicKendoCheckboxComponent,
        DynamicKendoCheckboxGroupComponent,
        DynamicKendoDateInputComponent,
        DynamicKendoDatePickerComponent,
        DynamicKendoDropdownListComponent,
        DynamicKendoFormArrayComponent,
        DynamicKendoFormGroupComponent,
        DynamicKendoInputComponent,
        DynamicKendoMaskedTextBoxComponent,
        DynamicKendoMultiSelectComponent,
        DynamicKendoNumericTextBoxComponent,
        DynamicKendoRadioGroupComponent,
        DynamicKendoSliderComponent,
        DynamicKendoSwitchComponent,
        DynamicKendoTextAreaComponent,
        DynamicKendoTimePickerComponent,
        DynamicKendoUploadComponent
    ],
    exports: [
        DynamicFormsCoreModule,
        DynamicKendoAutoCompleteComponent,
        DynamicKendoCalendarComponent,
        DynamicKendoCheckboxComponent,
        DynamicKendoCheckboxGroupComponent,
        DynamicKendoDateInputComponent,
        DynamicKendoDatePickerComponent,
        DynamicKendoDropdownListComponent,
        DynamicKendoFormArrayComponent,
        DynamicKendoFormComponent,
        DynamicKendoFormControlContainerComponent,
        DynamicKendoFormGroupComponent,
        DynamicKendoInputComponent,
        DynamicKendoMaskedTextBoxComponent,
        DynamicKendoMultiSelectComponent,
        DynamicKendoNumericTextBoxComponent,
        DynamicKendoRadioGroupComponent,
        DynamicKendoSliderComponent,
        DynamicKendoSwitchComponent,
        DynamicKendoTextAreaComponent,
        DynamicKendoTimePickerComponent,
        DynamicKendoUploadComponent
    ]
})
export class DynamicFormsKendoUIModule {}