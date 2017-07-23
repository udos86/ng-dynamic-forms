# ng2 Dynamic Forms Prime NG UI

## Installation
```
npm install @ng2-dynamic-forms/ui-primeng -S
```

## Import
```ts
@NgModule({

    imports: [
        // ...
        ReactiveFormsModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsPrimeNGUIModule
    ]
})

export class AppModule {}
```

## Usage
```ts
<form [formGroup]="myFormGroup">

    <dynamic-form-primeng-control *ngFor="let controlModel of myFormModel"
                                  [group]="myFormGroup"
                                  [model]="controlModel"></dynamic-form-primeng-control>
</form>
```

## Form Controls

|                                 Control                                 	|                        Model                       	| Required Property 	|
|:-----------------------------------------------------------------------:	|:--------------------------------------------------:	|:-----------------:	|
|  **[AutoComplete](https://www.primefaces.org/primeng/#/autocomplete)**  	| `DynamicInputModel`                                	|       `list`      	|
|      **[Calendar](https://www.primefaces.org/primeng/#/calendar)**      	| `DynamicDatePickerModel`, `DynamicTimePickerModel` 	|         –         	|
|      **[Checkbox](https://www.primefaces.org/primeng/#/checkbox)**      	| `DynamicCheckboxModel`                             	|         –         	|
|         **[Chips](https://www.primefaces.org/primeng/#/chips)**         	| `DynamicInputModel`                                	|  `multiple: true` 	|
|      **[Dropdown](https://www.primefaces.org/primeng/#/dropdown)**      	| `DynamicSelectModel`                               	|         –         	|
|        **[Editor](https://www.primefaces.org/primeng/#/editor)**        	| `DynamicEditorModel`                               	|         –         	|
|   **[InputSwitch](https://www.primefaces.org/primeng/#/inputswitch)**   	| `DynamicSwitchModel`                               	|         –         	|
|     **[InputText](https://www.primefaces.org/primeng/#/inputtext)**     	| `DynamicInputModel`                                	|         –         	|
| **[InputTextArea](https://www.primefaces.org/primeng/#/inputtextarea)** 	| `DynamicTextAreaModel`                             	|         –         	|
|   **[MultiSelect](https://www.primefaces.org/primeng/#/multiselect)**   	| `DynamicSelectModel`                               	|  `multiple: true` 	|
|   **[Radio Group](https://www.primefaces.org/primeng/#/radiobutton)**   	| `DynamicRadioGroupModel`                           	|         –         	|
|        **[Slider](https://www.primefaces.org/primeng/#/slider)**        	| `DynamicSliderModel`                               	|         –         	|