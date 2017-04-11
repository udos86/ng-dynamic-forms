# ng2 Dynamic Forms Basic UI

## Installation
```
npm install @ng2-dynamic-forms/ui-basic -S
```

## Import
```ts
@NgModule({

    imports: [
        // ...
        ReactiveFormsModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsBasicUIModule
    ]
})

export class AppModule {}
```

## Usage
```ts
<form [formGroup]="myFormGroup">

    <dynamic-form-basic-control *ngFor="let controlModel of myFormModel"
                                [group]="myFormGroup"
                                [model]="controlModel"></dynamic-form-basic-control>
</form>
```

## Form Controls

|                                Control                               	|           Model          	| Required Property 	|
|:--------------------------------------------------------------------:	|:------------------------:	|:-----------------:	|
| **[Checkbox](https://www.w3.org/wiki/HTML/Elements/input/checkbox)** 	| `DynamicCheckboxModel`   	|         –         	|
|       **[Input](https://www.w3.org/wiki/HTML/Elements/input)**       	| `DynamicInputModel`      	|         –         	|
| **[Radio Group](https://www.w3.org/wiki/HTML/Elements/input/radio)** 	| `DynamicRadioGroupModel` 	|         –         	|
|      **[Select](https://www.w3.org/wiki/HTML/Elements/select)**      	| `DynamicSelectModel`     	|         –         	|
|    **[TextArea](https://www.w3.org/wiki/HTML/Elements/textarea)**    	| `DynamicTextAreaModel`   	|         –         	|