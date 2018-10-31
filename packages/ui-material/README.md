# NG Dynamic Forms Material UI

## Installation
```
npm i @ng-dynamic-forms/ui-material -S
```

## Import
```ts
@NgModule({

    imports: [DynamicFormsMaterialUIModule]
})

export class AppModule {}
```

## Usage

with **`DynamicMaterialFormComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-material-form [group]="myFormGroup"
                           [model]="myFormModel"></dynamic-material-form>
</form>
```

with **`DynamicMaterialFormControlComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-material-form-control *ngFor="let controlModel of myFormModel"
                                   [group]="myFormGroup"
                                   [model]="controlModel"></dynamic-material-form-control>
</form>
```

## Form Controls

|                                      Control                                      	|            Model            	| Required Property 	|
|:---------------------------------------------------------------------------------:	|:---------------------------:	|:-----------------:	|
| **[Autocomplete](https://material.angular.io/components/component/autocomplete)** 	| `DynamicInputModel`         	|       `list`      	|
|     **[Checkbox](https://material.angular.io/components/component/checkbox)**     	| `DynamicCheckboxModel`      	|         –         	|
|  **[Checkbox Group](https://material.angular.io/components/component/checkbox)**  	| `DynamicCheckboxGroupModel` 	|         –         	|
|        **[Chips](https://material.angular.io/components/component/chips)**        	| `DynamicInputModel`         	|  `multiple: true` 	|
|   **[Datepicker](https://material.angular.io/components/component/datepicker)**   	| `DynamicDatePickerModel`    	|         –         	|
|        **[Input](https://material.angular.io/components/component/input)**        	| `DynamicInputModel`         	|         –         	|
|     **[Radio Group](https://material.angular.io/components/component/radio)**     	| `DynamicRadioGroupModel`    	|         –         	|
|       **[Select](https://material.angular.io/components/component/select)**       	| `DynamicSelectModel`        	|         –         	|
|       **[Slider](https://material.angular.io/components/component/slider)**       	| `DynamicSliderModel`        	|         –         	|
|  **[SlideToggle](https://material.angular.io/components/component/slide-toggle)** 	| `DynamicSwitchModel`        	|         –         	|
|       **[Textarea](https://material.angular.io/components/component/input)**      	| `DynamicTextAreaModel`      	|         –         	|

## Custom UI Events
```ts
<form [formGroup]="myFormGroup">

    <dynamic-material-form [group]="myFormGroup"
                           [model]="myFormModel"
                           (matEvent)="onMatEvent($event)"></dynamic-material-form>
</form>
```

## Resources

* [**API Documentation**](http://ng2-dynamic-forms.udos86.de/docs/ui-material/)
* [**Live Sample**](http://ng2-dynamic-forms.udos86.de/sample/index.aot.html#material-sample-form) 
