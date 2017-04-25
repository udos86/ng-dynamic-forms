# ng2 Dynamic Forms Bootstrap UI

## Installation
```
npm install @ng2-dynamic-forms/ui-bootstrap -S
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
```ts
<form [formGroup]="myFormGroup">

    <dynamic-form-bootstrap-control *ngFor="let controlModel of myFormModel"
                                    [group]="myFormGroup"
                                    [model]="controlModel"></dynamic-form-bootstrap-control>
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