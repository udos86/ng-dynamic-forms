# ng2 Dynamic Forms NG Bootstrap UI

## Installation
```
npm install @ng2-dynamic-forms/ui-ng-bootstrap -S
```

## Import
```ts
@NgModule({

    imports: [
        // ...
        ReactiveFormsModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsNGBootstrapUIModule
    ]
})

export class AppModule {}
```

## Usage
```ts
<form [formGroup]="myFormGroup">

    <dynamic-form-ng-bootstrap-control *ngFor="let controlModel of myFormModel"
                                       [group]="myFormGroup"
                                       [model]="controlModel"></dynamic-form-ng-bootstrap-control>
</form>
```

## Form Controls

|                                             Control                                             	|            Model            	| Required Property 	|
|:-----------------------------------------------------------------------------------------------:	|:---------------------------:	|:-----------------:	|
|              **[Calendar](https://ng-bootstrap.github.io/#/components/datepicker)**             	| `DynamicDatePickerModel`    	|   `inline: true`  	|
|    **[Checkbox](https://v4-alpha.getbootstrap.com/components/forms/#checkboxes-and-radios)**    	| `DynamicCheckboxModel`      	|         –         	|
| **[Checkbox Group](https://v4-alpha.getbootstrap.com/components/forms/#checkboxes-and-radios)** 	| `DynamicCheckboxGroupModel` 	|         –         	|
|             **[DatePicker](https://ng-bootstrap.github.io/#/components/datepicker)**            	| `DynamicDatePickerModel`    	|         –         	|
|         **[Input](https://v4-alpha.getbootstrap.com/components/forms/#textual-inputs)**         	| `DynamicInputModel`         	|         –         	|
|   **[Radio Group](https://v4-alpha.getbootstrap.com/components/forms/#checkboxes-and-radios)**  	| `DynamicRadioGroupModel`    	|         –         	|
|         **[Select](https://v4-alpha.getbootstrap.com/components/forms/#form-controls)**         	| `DynamicSelectModel`        	|         –         	|
|        **[TextArea](https://v4-alpha.getbootstrap.com/components/forms/#form-controls)**        	| `DynamicTextAreaModel`      	|         –         	|
|             **[TimePicker](https://ng-bootstrap.github.io/#/components/timepicker)**            	| `DynamicTimePickerModel`    	|         –         	|