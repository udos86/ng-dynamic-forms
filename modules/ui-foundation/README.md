# ng2 Dynamic Forms Foundation UI

## Installation
```
npm install @ng2-dynamic-forms/ui-foundation -S
```

## Import
```ts
@NgModule({

    imports: [
        // ...
        ReactiveFormsModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsFoundationUIModule
    ]
})

export class AppModule {}
```

## Usage
```ts
<form [formGroup]="myFormGroup">

    <dynamic-form-foundation-sites-control *ngFor="let controlModel of myFormModel"
                                           [group]="myFormGroup"
                                           [model]="controlModel"></dynamic-form-foundation-sites-control>
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