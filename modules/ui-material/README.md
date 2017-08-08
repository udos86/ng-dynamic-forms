# ng2 Dynamic Forms Material UI

## Installation
```
npm install @ng2-dynamic-forms/ui-material -S
```

## Import
```ts
@NgModule({

    imports: [
        // ...
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsMaterialUIModule
    ]
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
|   **[Datepicker](https://material.angular.io/components/component/datepicker)**   	| `DynamicDatePickerModel`    	|         –         	|
|        **[Input](https://material.angular.io/components/component/input)**        	| `DynamicInputModel`         	|         –         	|
|     **[Radio Group](https://material.angular.io/components/component/radio)**     	| `DynamicRadioGroupModel`    	|         –         	|
|       **[Select](https://material.angular.io/components/component/select)**       	| `DynamicSelectModel`        	|         –         	|
|       **[Slider](https://material.angular.io/components/component/slider)**       	| `DynamicSliderModel`        	|         –         	|
|  **[SlideToggle](https://material.angular.io/components/component/slide-toggle)** 	| `DynamicSwitchModel`        	|         –         	|
|       **[Textarea](https://material.angular.io/components/component/input)**      	| `DynamicTextAreaModel`      	|         –         	|