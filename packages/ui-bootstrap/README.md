# NG Dynamic Forms Bootstrap UI

## Installation
```
npm install @ng-dynamic-forms/ui-bootstrap -S
```

## Import
```ts
@NgModule({

    imports: [
        // ...
        ReactiveFormsModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsBootstrapUIModule
    ]
})

export class AppModule {}
```

## Usage

with **`DynamicBootstrapFormComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-bootstrap-form [group]="myFormGroup"
                            [model]="myFormModel"></dynamic-bootstrap-form>
</form>
```

with **`DynamicBootstrapFormControlComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-bootstrap-form-control *ngFor="let controlModel of myFormModel"
                                    [group]="myFormGroup"
                                    [model]="controlModel"></dynamic-bootstrap-form-control>
</form>
```

## Form Controls

|                                  Control                                 	|            Model            	| Required Property 	|
|:------------------------------------------------------------------------:	|:---------------------------:	|:-----------------:	|
|    **[Checkbox](http://getbootstrap.com/css/#checkboxes-and-radios)**    	| `DynamicCheckboxModel`      	|         –         	|
| **[Checkbox Group](http://getbootstrap.com/css/#checkboxes-and-radios)** 	| `DynamicCheckboxGroupModel` 	|         –         	|
|             **[Input](http://getbootstrap.com/css/#inputs)**             	| `DynamicInputModel`         	|         –         	|
|   **[Radio Group](http://getbootstrap.com/css/#checkboxes-and-radios)**  	| `DynamicRadioGroupModel`    	|         –         	|
|            **[Select](http://getbootstrap.com/css/#selects)**            	| `DynamicSelectModel`        	|         –         	|
|           **[TextArea](http://getbootstrap.com/css/#textarea)**          	| `DynamicTextAreaModel`      	|         –         	|

## Sample

[**Live Demo**](http://ng2-dynamic-forms.udos86.de/sample/index.aot.html#bootstrap-sample-form) 