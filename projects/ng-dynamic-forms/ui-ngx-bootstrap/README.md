# NG Dynamic Forms ngx-bootstrap UI

## Installation
```
npm i @ng-dynamic-forms/ui-ngx-bootstrap -S
```

## Import
```ts
@NgModule({

    imports: [DynamicFormsNGxBootstrapUIModule]
})

export class AppModule {}
```

## Usage

with **`DynamicNGxBootstrapFormComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-ngx-bootstrap-form [group]="myFormGroup"
                                [model]="myFormModel"></dynamic-ngx-bootstrap-form>
</form>
```

with **`DynamicNGxBootstrapFormControlComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-ngx-bootstrap-form-control *ngFor="let controlModel of myFormModel"
                                        [group]="myFormGroup"
                                        [model]="controlModel"></dynamic-ngx-bootstrap-form-control>
</form>
```

## Form Controls

|                                       Control                                      	|            Model            	| Required Property 	|
|:----------------------------------------------------------------------------------:	|:---------------------------:	|:-----------------:	|
|         **[Checkbox](http://getbootstrap.com/css/#checkboxes-and-radios)**         	| `DynamicCheckboxModel`      	|         –         	|
|  **[Checkbox Group](https://valor-software.com/ngx-bootstrap/#/buttons#checkbox)** 	| `DynamicCheckboxGroupModel` 	|         –         	|
|       **[Datepicker](https://valor-software.com/ngx-bootstrap/#/datepicker)**      	| `DynamicDatePickerModel`    	|         –         	|
|                  **[Input](http://getbootstrap.com/css/#inputs)**                  	| `DynamicInputModel`         	|         –         	|
| **[Radio Group](https://valor-software.com/ngx-bootstrap/#/buttons#radio-button)** 	| `DynamicRadioGroupModel`    	|         –         	|
|           **[Rating](https://valor-software.com/ngx-bootstrap/#/rating)**          	| `DynamicRatingModel`        	|         –         	|
|                 **[Select](http://getbootstrap.com/css/#selects)**                 	| `DynamicSelectModel`        	|         –         	|
|                **[TextArea](http://getbootstrap.com/css/#textarea)**               	| `DynamicTextAreaModel`      	|         –         	|
|       **[Timepicker](https://valor-software.com/ngx-bootstrap/#/timepicker)**      	| `DynamicTimePickerModel`    	|         –         	|

## Resources

* [**API Documentation**](http://ng2-dynamic-forms.udos86.de/docs/ui-ngx-bootstrap/)
* [**Live Sample**](http://ng2-dynamic-forms.udos86.de/sample/index.aot.html#bootstrap-sample-form)
