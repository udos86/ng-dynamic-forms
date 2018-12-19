# NG Dynamic Forms Foundation UI

## Installation
```
npm i @ng-dynamic-forms/ui-foundation -S
```

## Import
```ts
@NgModule({

    imports: [DynamicFormsFoundationUIModule]
})

export class AppModule {}
```

## Usage

with **`DynamicFoundationFormComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-foundation-form [group]="myFormGroup"
                             [model]="myFormModel"></dynamic-foundation-form>
</form>
```

with **`DynamicFoundationFormControlComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-foundation-form-control *ngFor="let controlModel of myFormModel"
                                     [group]="myFormGroup"
                                     [model]="controlModel"></dynamic-foundation-form-control>
</form>
```

## Form Controls

|                                               Control                                               	|            Model            	| Required Property 	|
|:---------------------------------------------------------------------------------------------------:	|:---------------------------:	|:-----------------:	|
|    **[Checkbox](http://foundation.zurb.com/sites/docs/forms.html#checkboxes-and-radio-buttons)**    	| `DynamicCheckboxModel`      	|         –         	|
| **[Checkbox Group](http://foundation.zurb.com/sites/docs/forms.html#checkboxes-and-radio-buttons)** 	| `DynamicCheckboxGroupModel` 	|         –         	|
|              **[Input](http://foundation.zurb.com/sites/docs/forms.html#text-inputs)**              	| `DynamicInputModel`         	|         –         	|
|   **[Radio Group](http://foundation.zurb.com/sites/docs/forms.html#checkboxes-and-radio-buttons)**  	| `DynamicRadioGroupModel`    	|         –         	|
|             **[Select](http://foundation.zurb.com/sites/docs/forms.html#select-menus)**             	| `DynamicSelectModel`        	|         –         	|
|                   **[Switch](http://foundation.zurb.com/sites/docs/switch.html)**                   	| `DynamicSwitchModel`        	|         –         	|
|             **[TextArea](http://foundation.zurb.com/sites/docs/forms.html#text-areas)**             	| `DynamicTextAreaModel`      	|         –         	|

## Resources

* [**API Documentation**](http://ng2-dynamic-forms.udos86.de/docs/ui-foundation/)
* [**Live Sample**](http://ng2-dynamic-forms.udos86.de/sample/index.aot.html#foundation-sample-form) 
