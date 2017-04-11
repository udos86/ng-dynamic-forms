# ng2 Dynamic Forms Kendo UI

## Installation
```
npm install @ng2-dynamic-forms/ui-kendo -S
```

## Import
```ts
@NgModule({

    imports: [
        // ...
        ReactiveFormsModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsKendoUIModule
    ]
})

export class AppModule {}
```

## Usage
```ts
<form [formGroup]="myFormGroup">

    <dynamic-form-kendo-control *ngFor="let controlModel of myFormModel"
                                [group]="myFormGroup"
                                [model]="controlModel"></dynamic-form-kendo-control>
</form>
```

## Form Controls

|                                             Control                                             	|           Model          	|   Required Property   	|
|:-----------------------------------------------------------------------------------------------:	|:------------------------:	|:---------------------:	|
|  **[AutoComplete](http://www.telerik.com/kendo-angular-ui/components/dropdowns/autocomplete/)** 	| `DynamicInputModel`      	|         `list`        	|
|     **[Calendar](http://www.telerik.com/kendo-angular-ui/components/dateinputs/calendar/)**     	| `DynamicDatepickerModel` 	|     `inline: true`    	|
|    **[DateInput](http://www.telerik.com/kendo-angular-ui/components/dateinputs/dateinput/)**    	| `DynamicInputModel`      	|  `inputType: "date"`  	|
|  **[DropDownList](http://www.telerik.com/kendo-angular-ui/components/dropdowns/dropdownlist/)** 	| `DynamicSelectModel`     	|           –           	|
|  **[MaskedTextBox](http://www.telerik.com/kendo-angular-ui/components/inputs/maskedtextbox/)**  	| `DynamicInputModel`      	|         `mask`        	|
|   **[MultiSelect](http://www.telerik.com/kendo-angular-ui/components/dropdowns/multiselect/)**  	| `DynamicSelectModel`     	|    `multiple: true`   	|
| **[NumericTextBox](http://www.telerik.com/kendo-angular-ui/components/inputs/numerictextbox/)** 	| `DynamicInputModel`      	| `inputType: "number"` 	|
|         **[Slider](http://www.telerik.com/kendo-angular-ui/components/inputs/slider/)**         	| `DynamicSliderModel`     	|           –           	|
|         **[Switch](http://www.telerik.com/kendo-angular-ui/components/inputs/switch/)**         	| `DynamicSwitchModel`     	|           –           	|
|             **[Upload](http://www.telerik.com/kendo-angular-ui/components/upload/)**            	| `DynamicFileUploadModel` 	|           –           	|