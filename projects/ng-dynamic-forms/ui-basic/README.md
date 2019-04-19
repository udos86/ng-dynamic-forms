# NG Dynamic Forms Basic UI

## Installation
```
npm i @ng-dynamic-forms/ui-basic -S
```

## Import
```ts
@NgModule({

    imports: [DynamicFormsBasicUIModule]
})

export class AppModule {}
```

## Usage

with **`DynamicBasicFormComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-basic-form [group]="myFormGroup"
                        [model]="myFormModel"></dynamic-basic-form>
</form>
```

with **`DynamicBasicFormControlComponent`**:
```ts
<form [formGroup]="myFormGroup">

    <dynamic-basic-form-control *ngFor="let controlModel of myFormModel"
                                [group]="myFormGroup"
                                [model]="controlModel"></dynamic-basic-form-control>
</form>
```

## Form Controls

|                                   Control                                  	|            Model            	| Required Property 	|
|:--------------------------------------------------------------------------:	|:---------------------------:	|:-----------------:	|
|    **[Checkbox](https://www.w3.org/wiki/HTML/Elements/input/checkbox)**    	|    `DynamicCheckboxModel`   	|         –         	|
| **[Checkbox Group](https://www.w3.org/wiki/HTML/Elements/input/checkbox)** 	| `DynamicCheckboxGroupModel` 	|         –         	|
|          **[Input](https://www.w3.org/wiki/HTML/Elements/input)**          	|     `DynamicInputModel`     	|         –         	|
|    **[Radio Group](https://www.w3.org/wiki/HTML/Elements/input/radio)**    	|   `DynamicRadioGroupModel`  	|         –         	|
|         **[Select](https://www.w3.org/wiki/HTML/Elements/select)**         	|     `DynamicSelectModel`    	|         –         	|
|       **[TextArea](https://www.w3.org/wiki/HTML/Elements/textarea)**       	|    `DynamicTextAreaModel`   	|         –         	|

## Resources

* [**API Documentation**](http://ng2-dynamic-forms.udos86.de/docs/ui-basic/)
* [**Live Sample**](http://ng2-dynamic-forms.udos86.de/sample/index.aot.html#basic-sample-form) 
