# NG Dynamic Forms Kendo UI

## Installation
```
npm i @ng-dynamic-forms/ui-kendo -S
```

## Import
```ts
@NgModule({

    imports: [DynamicFormsKendoUIModule]
})

export class AppModule {}
```

## Usage

with **`DynamicKendoFormComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-kendo-form [group]="myFormGroup"
                        [model]="myFormModel"></dynamic-kendo-form>
</form>
```

with **`DynamicKendoFormControlComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-kendo-form-control *ngFor="let controlModel of myFormModel"
                                [group]="myFormGroup"
                                [model]="controlModel"></dynamic-kendo-form-control>
</form>
```

## Form Controls

|                                             Control                                             	|            Model            	|   Required Property   	|
|:-----------------------------------------------------------------------------------------------:	|:---------------------------:	|:---------------------:	|
|  **[AutoComplete](http://www.telerik.com/kendo-angular-ui/components/dropdowns/autocomplete/)** 	| `DynamicInputModel`         	|         `list`        	|
|     **[Calendar](http://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/)**     	| `DynamicDatepickerModel`    	|     `inline: true`    	|
|     **[Checkbox](http://www.telerik.com/kendo-angular-ui/components/forms/#toc-checkboxes)**    	| `DynamicCheckboxModel`      	|           –           	|
|  **[Checkbox Group](http://www.telerik.com/kendo-angular-ui/components/forms/#toc-checkboxes)** 	| `DynamicCheckboxGroupModel` 	|           –           	|
|    **[DateInput](http://www.telerik.com/kendo-angular-ui/components/dateinputs/dateinput/)**    	| `DynamicInputModel`         	|  `inputType: "date"`  	|
|   **[DatePicker](http://www.telerik.com/kendo-angular-ui/components/dateinputs/datepicker/)**   	| `DynamicDatepickerModel`    	|           –           	|
|  **[DropDownList](http://www.telerik.com/kendo-angular-ui/components/dropdowns/dropdownlist/)** 	| `DynamicSelectModel`        	|           –           	|
|  **[MaskedTextBox](http://www.telerik.com/kendo-angular-ui/components/inputs/maskedtextbox/)**  	| `DynamicInputModel`         	|         `mask`        	|
|   **[MultiSelect](http://www.telerik.com/kendo-angular-ui/components/dropdowns/multiselect/)**  	| `DynamicSelectModel`        	|    `multiple: true`   	|
| **[NumericTextBox](http://www.telerik.com/kendo-angular-ui/components/inputs/numerictextbox/)** 	| `DynamicInputModel`         	| `inputType: "number"` 	|
|  **[Radio Button](http://www.telerik.com/kendo-angular-ui/components/forms/#toc-radiobuttons)** 	| `DynamicRadioGroupModel`    	|           –           	|
|         **[Slider](http://www.telerik.com/kendo-angular-ui/components/inputs/slider/)**         	| `DynamicSliderModel`        	|           –           	|
|         **[Switch](http://www.telerik.com/kendo-angular-ui/components/inputs/switch/)**         	| `DynamicSwitchModel`        	|           –           	|
|      **[TextArea](http://www.telerik.com/kendo-angular-ui/components/forms/#toc-textarea)**     	| `DynamicTextAreaModel`      	|           –           	|
|       **[TextBox](http://www.telerik.com/kendo-angular-ui/components/forms/#toc-textbox)**      	| `DynamicInputModel`         	|           –           	|
|   **[TimePicker](http://www.telerik.com/kendo-angular-ui/components/dateinputs/timepicker/)**   	| `DynamicTimePickerModel`    	|           –           	|
|             **[Upload](http://www.telerik.com/kendo-angular-ui/components/upload/)**            	| `DynamicFileUploadModel`    	|           –           	|

## Custom UI Events
```ts
<form [formGroup]="myFormGroup">

    <dynamic-kendo-form [group]="myFormGroup"
                        [model]="myFormModel"
                        (kendoEvent)="onKendoEvent($event)"></dynamic-kendo-form>
</form>
```

## Resources

* [**API Documentation**](http://ng2-dynamic-forms.udos86.de/docs/ui-kendo/)
* [**Live Sample**](http://ng2-dynamic-forms.udos86.de/sample/index.aot.html#kendo-sample-form) 

