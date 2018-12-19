# NG Dynamic Forms NG Bootstrap UI

## Installation
```
npm i @ng-dynamic-forms/ui-ng-bootstrap -S
```

## Import
```ts
@NgModule({

    imports: [DynamicFormsNGBootstrapUIModule]
})

export class AppModule {}
```

## Usage

with **`DynamicNGBootstrapFormComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-ng-bootstrap-form [group]="myFormGroup"
                               [model]="myFormModel"></dynamic-ng-bootstrap-form>
</form>
```

with **`DynamicNGBootstrapFormControlComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-ng-bootstrap-form-control *ngFor="let controlModel of myFormModel"
                                       [group]="myFormGroup"
                                       [model]="controlModel"></dynamic-ng-bootstrap-form-control>
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
|             **[Rating](https://ng-bootstrap.github.io/#/components/rating)**            	        | `DynamicRatingModel`    	    |         –         	|
|         **[Select](https://v4-alpha.getbootstrap.com/components/forms/#form-controls)**         	| `DynamicSelectModel`        	|         –         	|
|        **[TextArea](https://v4-alpha.getbootstrap.com/components/forms/#form-controls)**        	| `DynamicTextAreaModel`      	|         –         	|
|             **[TimePicker](https://ng-bootstrap.github.io/#/components/timepicker)**            	| `DynamicTimePickerModel`    	|         –         	|

## Resources

* [**API Documentation**](http://ng2-dynamic-forms.udos86.de/docs/ui-ng-bootstrap/)
* [**Live Sample**](http://ng2-dynamic-forms.udos86.de/sample/index.aot.html#ng-bootstrap-sample-form) 
