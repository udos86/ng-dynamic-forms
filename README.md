# ng2 Dynamic Forms (beta.13)

[![npm version](https://badge.fury.io/js/%40ng2-dynamic-forms%2Fcore.svg)](https://badge.fury.io/js/%40ng2-dynamic-forms%2Fcore)
[![Build Status](https://travis-ci.org/udos86/ng2-dynamic-forms.svg?branch=master)](https://travis-ci.org/udos86/ng2-dynamic-forms)

ng2 Dynamic Forms is a rapid form development library based on the official Angular 2
[**dynamic forms cookbook**](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html).
It simplifies all the hard work of implementing reactive Angular 2 forms by building
upon a layer of straightforward object models.

It also provides a flexible system of dynamic UI components with out of the box support for **[Bootstrap](http://getbootstrap.com)**, **[Foundation](http://foundation.zurb.com/)**, **[Angular 2 Material](https://github.com/angular/material2)** and more.


##Table of Contents

- [Getting Started](#getting-started)
- [Running the Example](#running-the-example)
- [Basic Usage](#basic-usage)
- [Form UI Modules and Components](#form-ui-modules-and-components)
- [Model Bindings and Control References](#model-bindings-and-control-references)
- [Form Groups](#form-groups)
- [Form Arrays](#form-arrays)
- [Form Layouts](#form-layouts)
- [Form Caching](#form-caching)
- [Validation Messaging](#validation-messaging)
- [Form Autocompletion](#form-autocompletion)


## Getting Started

**1. Install the core package**:
```
npm install @ng2-dynamic-forms/core --save
```
  
**2. Choose your UI library** (e.g. Bootstrap) and **install the corresponding package**:
```
npm install @ng2-dynamic-forms/ui-bootstrap --save
```

**3.** When using **SystemJS**, update your configuration file:

```ts
System.config({

    // ...all the rest (baseURL, etc.)

    map: {

        // ...all the rest (Angular 2, RxJS, etc.)

        "@ng2-dynamic-forms": "node_modules/@ng2-dynamic-forms",
    },

    packages: {

        // ...all the rest (Angular 2, RxJS, etc.)

        "@ng2-dynamic-forms/core": {
            main: "index.js",
            defaultExtension: "js"
        },
        "@ng2-dynamic-forms/ui-bootstrap": {
            main: "index.js",
            defaultExtension: "js"
        }
    }
});
```


## Running the Example

**1. Clone the ng2 Dynamic Forms git repository**:
```
git clone https://github.com/udos86/ng2-dynamic-forms.git
```

**2. Install the npm dependencies**:
```
npm install
```

**3. Transpile the TypeScript files**:
```
npm run tsc
```

**4. Run the sample application**:
```
npm start
```


## Basic Usage

**1. Import the ng2 Dynamic Forms core** `NgModule` **and a corresponding UI** `NgModule`:
```ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DynamicFormsBootstrapUIModule} from "@ng2-dynamic-forms/ui-bootstrap";

// ..all remaining component and routing imports

@NgModule({
    imports: [
        DynamicFormsCoreModule.forRoot(), 
        DynamicFormsBootstrapUIModule, 
        BrowserModule, 
        FormsModule, 
        ReactiveFormsModule
    ],
    declarations: [AppComponent, MyDynamicFormComponent],
    
    // ...all remaining definitions (routing providers, bootstrap, exports)
})

export class AppModule {}
```

**2. Define your dynamic form model as** `Array<DynamicFormControlModel>`:
```ts
import {
    DynamicFormControlModel
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicRadioGroupModel
} from "@ng2-dynamic-forms/core";

export const MY_DYNAMIC_FORM_MODEL: Array<DynamicFormControlModel> = [

    new DynamicInputModel({

        id: "exampleInput",
        label: "Example Input",
        maxLength: 42,
        placeholder: "example input",
    }),

    new DynamicRadioGroupModel<string>({

        id: "exampleRadioGroup",
        label: "Example Radio Group",
        options: [
            {
                label: "Option 1",
                value: "option-1",
            },
            {
                disabled: true,
                label: "Option 2",
                value: "option-2"
            },
            {
                label: "Option 3",
                value: "option-3"
            }
        ],
        value: "option-3"
    }),

    new DynamicCheckboxModel({

        id: "exampleCheckbox",
        label: "I do agree"
    })
];
```

**3. Create a** `FormGroup` **via** `DynamicFormService`:
```ts
import {MY_DYNAMIC_FORM_MODEL} from "./my-dynamic-form.model";
import {DynamicFormControlModel, DynamicFormService} from "@ng2-dynamic-forms/core";

export class MyDynamicFormComponent implements OnInit {

    myDynamicFormModel: Array<DynamicFormControlModel> = MY_DYNAMIC_FORM_MODEL;
    myForm: FormGroup;

    constructor(private dynamicFormService: DynamicFormService) {}

    ngOnInit() {
        this.myForm = this.dynamicFormService.createFormGroup(this.myDynamicFormModel);
    }
}
```

**4. Add the** `DynamicFormControlComponent` **to your template
and bind it's** `FormGroup` **and** `DynamicFormControlModel`:
```ts
<form [formGroup]="myForm">

    <dynamic-form-bootstrap-control *ngFor="let controlModel of myDynamicFormModel" 
                                    [controlGroup]="myForm"
                                    [model]="controlModel"></dynamic-form-bootstrap-control>
</form>
```


## Form UI Modules and Components

ng2 Dynamic Forms is built to provide **solid yet unobtrusive** support for a variety of common UI libraries:

* **Basic** (unstyled HTML5)
* **[Bootstrap](http://getbootstrap.com)**
* **[Foundation](http://foundation.zurb.com/)**
* **[Material](https://github.com/angular/material2)**
* **[PrimeNG](http://www.primefaces.org/primeng/#/)**
* *Kendo UI (coming Q3/Q4)*

You can instantly plug in your favorite form controls by **installing the appropriate
package and it's peer dependencies** and **importing the corresponding UI** `NgModule`:
```
npm install @ng2-dynamic-forms/ui-<library-name> --save
```

```ts
@NgModule({

    imports: [DynamicFormsBootstrapUIModule, BrowserModule, FormsModule, ReactiveFormsModule],
    
    // ...all remaining definitions (declarations, routing providers, bootstrap, exports)
})

export class AppModule {}
```

> **UI modules re-export** `DynamicFormsCoreModule` 
**so you don't need to explicitly import it to your app module**!


Every UI `NgModule` comes with a `DynamicFormControlComponent` that **can easily be added to
your component** `template`:
```ts
<form [formGroup]="myForm">

    <dynamic-form-bootstrap-control *ngFor="let controlModel of myDynamicFormModel" 
                                    [controlGroup]="myForm"
                                    [model]="controlModel"></dynamic-form-bootstrap-control>
</form>
```

**Also don't forget to refer the library stylesheet**:
```ts
<link href="./node_modules/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet"/> 
```

Due to Angular 2 Material still being in [alpha](https://github.com/angular/material2/blob/master/CHANGELOG.md)
full support for all major form controls cannot be provided at the moment. See the following compatibility table:

|               	| Checkbox 	| Checkbox Group 	| Input 	| Radio Group 	| Select 	| Textarea 	|
|---------------	|:--------:	|:--------------:	|:-----:	|:-----------:	|:------:	|:--------:	|
| ui-basic      	|     ✓    	|        ✓       	|   ✓   	|      ✓      	|    ✓   	|     ✓    	|
| ui-bootstrap  	|     ✓    	|        ✓       	|   ✓   	|      ✓      	|    ✓   	|     ✓    	|
| ui-foundation 	|     ✓    	|        ✓       	|   ✓   	|      ✓      	|    ✓   	|     ✓    	|
| ui-material   	|     ✓    	|        ✓       	|   ✓   	|      ✓      	|    ✗   	|     ✗    	|
| ui-primeng    	|     ✓    	|        ✓       	|   ✓   	|      ✓      	|    ✓   	|     ✓    	|


## Model Bindings and Control References

One of the benefits of using ng2 Dynamic Forms is that interacting with your form programmatically becomes pretty easy.
Since a `DynamicFormControlModel` is bound directly to a `DOM` element via Angular 2 core mechanisms,
changing one of it's properties will immediately trigger a UI update.

So what if we actually want to update the value of an arbitrary form control at runtime?

At first we need to get a reference to it's `DynamicFormControlModel` representation. This can easily be achieved either by
a simple index-based `items` array lookup or through the `findById` method of `DynamicFormService`:

```ts
this.exampleInputModel = this.myDynamicFormModel.items[2];
```
```ts
this.exampleInputModel = <DynamicInputModel> this.dynamicFormService.findById("exampleInput", this.myDynamicFormModel);
```

Due to the `value` property being already two-way-bound via `[(ngModel)]` under the hood, assigning a new value to it will just do the job:
```ts
this.exampleInputModel.value = "my new value";
```

At the same time this also means that you can safely read the most recent user input from `value` at any time:
```ts
onSubmit() {
  let currentValue = this.exampleInputModel.value;
}
```

In many cases you may want to step a bit further and keep tracking value changes over time. That's where Angular 2 itself and RxJS come to rescue! 

Just obtain a reference to the `FormControl` and use it's `valueChanges` observable:
```ts
ngOnInit() {

  this.control = <FormControl> this.myForm.controls[this.exampleInputModel.id];
  this.control.valueChanges.subscribe((value: string) => console.log("value changed to: ", value));
}
```


## Form Groups

In order to improve clarity it's often considered good practice to group forms into several logical `fieldset` sections.
Luckily ng2 Dynamic Forms supports nesting of form groups out of the box!
 
**1. Just create a** `DynamicFormGroupModel` **within your** `Array<DynamicFormControlModel>` **and add it's models to the** `group` **array**:
 ```ts
export const MY_DYNAMIC_FORM_MODEL: Array<DynamicFormControlModel> = [
 
    new DynamicFormGroupModel({
 
        id: "basicFormGroup1",
        legend: "Form Group 1",
        group: [
            new DynamicInputModel({
                
                id: "basicGroupInput1-1",
                label: "Example Group Input 1-1",
                value: "Test 1-1"
            }),
            new DynamicInputModel({
                
                id: "basicGroupInput1-2",
                label: "Example Group Input 1-2",
                value: "Test 1-2"
            })
        ]
    }),
    
    new DynamicFormGroupModel({
 
        id: "basicFormGroup2",
        legend: "Form Group 2",
        group: [
            new DynamicInputModel({
                    
                id: "basicGroupInput2-1",
                label: "Example Group Input 2-1",
                value: "Test 2-1"
            }),
            new DynamicInputModel({
                
                id: "basicGroupInput2-2",
                label: "Example Group Input 2-2",
                value: "Test 2-2"
            })
        ]
    })
];  
 ```

**2. Create a** `FormGroup` **and apply a** `DynamicFormControlComponent` **as always**:
```ts
ngOnInit() {
    this.myForm = this.dynamicFormService.createFormGroup(this.myDynamicFormModel);
}
```

```ts
<form [formGroup]="myForm">

    <dynamic-form-bootstrap-control *ngFor="let controlModel of myDynamicFormModel" 
                                    [controlGroup]="myForm"
                                    [model]="controlModel"></dynamic-form-bootstrap-control>
</form>
```


## Form Arrays

Sometimes forms need to allow the user to dynamically add multiple items of the same kind to it, e.g. addresses, products and so on.
Particularly for this reason Angular 2 provides so called [**Form Arrays**](https://scotch.io/tutorials/how-to-build-nested-model-driven-forms-in-angular-2).

Although it's a bit more tricky, ng2 Dynamic Forms is capable of managing such nested form structures!  

**1. Add a** `DynamicFormArrayModel` **to your form model**: 
```ts
export const MY_DYNAMIC_FORM_MODEL: Array<DynamicFormControlModel> = [

    new DynamicFormArrayModel({
        id: "myFormArrayModel"
    })
];
```

**2. Add the** `createGroup` **property** to the `DynamicFormArrayModel` **and assign a function** to it which **returns
the structure** of a single form array item:
```ts
new DynamicFormArrayModel({

    id: "myFormArray",
    initialCount: 5,
    createGroup: () => {
        return [
            new DynamicInputModel({
                
                id: "formArrayInput",
                label: "Form Array Input"
            })
        ];
    }
})
```

**3. As usual, create a** `FormGroup` **via** `DynamicFormService` **and bind it to your component template**:
```ts
this.myForm = this.dynamicFormService.createFormGroup(this.myDynamicFormModel);
```

```ts
<form [formGroup]="myForm">

    <dynamic-form-basic-control *ngFor="let controlModel of myDynamicFormModel" 
                                [controlGroup]="myForm" 
                                [model]="controlModel"></dynamic-form-basic-control>

    <button type="button" (click)="addItem()">Add item</button>
    <button type="button" (click)="clear()">Remove all items</button>

</form>
```

**4. You can now easily modify your form array with** `DynamicFormService`:
```ts
ngOnInit() {

    this.myArrayControl = <FormArray> this.myForm.controls["myFormArray"]; 
    this.myArrayModel = <DynamicFormArrayModel> this.dynamicFormService.findById("myFormArray", myDynamicFormModel);
}

addItem() {
    this.dynamicFormService.addFormArrayGroup(this.myArrayControl, this.myArrayModel);
}

clear() {
    this.dynamicFormService.clearFormArray(this.myArrayControl, this.myArrayModel);
}
```

Alright, works like a charm! 

But wait a minute...**what if we want to append, let's say, a remove** `<button>` **for each array group**?

No Problemo! **By adding a** `<template>` you can **declare some custom content** that is **rendered equally for all array groups**:

```ts
<form [formGroup]="myForm">

    <dynamic-form-basic-control *ngFor="let controlModel of myDynamicFormModel" 
                                [controlGroup]="myForm" 
                                [model]="controlModel">
    
        <template *ngIf="controlModel.type === 'ARRAY'" let-index="index">
            <button type="button" (click)="remove(index)">Remove Item</button>
        </template>
                                
    </dynamic-form-basic-control>

    <button type="button" (click)="addItem()">Add item</button>
    <button type="button" (click)="clear()">Remove all items</button>

</form>       
```

```ts
removeItem(index: number) {
    this.dynamicFormService.removeFormArrayGroup(index, this.myArrayControl, this.myArrayModel);
}
```

> When a `<template>` is set for a `DynamicFormArrayModel`, `NgTemplateOutletContext` **is internally bound to 
the associated** `DynamicFormArrayGroup` so you can **access the group 
index by declaring a local template variable** `let-index="index"`!


## Form Layouts

When using a ng2 Dynamic Forms UI package, e.g. `ui-bootstrap`, **all essential** form classes of the underlying CSS library
(like `form-group` or `form-control`) are automatically put in place for you in the template of the corresponding `DynamicFormControlComponent`.

Apart from that, ng2 Dynamic Forms does not make any further presumptions about optional CSS classes and leaves advanced layouting all up to you. That's **solid** yet **unobtrusive**.

So let's say we want to implement a beautifully aligned Bootstrap [horizonal form](http://getbootstrap.com/css/#forms-horizontal):

At first we have to append the mandatory Bootstrap CSS class `form-horizontal` to the `<form>` element in our template:
```ts
<form class="form-horizontal" [formGroup]="myForm">

    <dynamic-form-bootstrap-control *ngFor="let controlModel of myDynamicFormModel" 
                                    [controlGroup]="myForm"
                                    [model]="controlModel"></dynamic-form-bootstrap-control>
</form>
```

Now we need to position the `<label>` and the `form-control` using the Bootstrap [grid system](http://getbootstrap.com/css/#grid). But since all the template logic for the form controls is capsuled in the scope of the `DynamicFormBootstrapComponent` we cannot directly attach those necessary CSS classes to markup. 

Don't worry!

By providing the `cls` and it's nested `grid` and `element` configuration objects, ng2 Dynamic Forms allows us to optionally define additional CSS classes for every `DynamicFormControlModel`, which are then intelligently appended within the `DynamicFormControlComponent` template.

We can just pass it as a second constructor parameter of every `DynamicFormControlModel`, i.e. separation of model and style information remains intact:
```ts
new DynamicInputModel(
    {
        // ... all model configuration properties
    },
    {
        element: {
            label: "control-label"
        },
        grid: {
            control: "col-sm-9",
            label: "col-sm-3"
        }
    }
)
```


## Form Caching

One of the best things about ng2 Dynamic Forms, you won't recognize at first sight, is that you get **form
caching across routes for free**. All you need to do is to separate the initialization of your `DynamicFormModel` from your 
component code by exporting it on it's own:
```ts
export const MY_DYNAMIC_FORM_MODEL = [

    // ...all dynamic control models
]; 
```

```ts
import {MY_DYNAMIC_FORM_MODEL} from "./my-dynamic-form.model";

export class MyDynamicFormComponent {

    dynamicFormModel: Array<DynamicFormControlModel> = MY_DYNAMIC_FORM_MODEL;

    // ...
}
```

While the component is entirely destroyed when navigating away from it, the `DynamicFormModel` **will remain in memory and 
automatically be reused** when navigating back!


## Validation Messaging

Delivering meaningful validation information to the user is an essential part of good form design. Yet HTML5 already comes up 
with some [native functionality](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/Data_form_validation)
you very likely want to use [Angular 2 mechanisms](http://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html) 
to gain much more control over validation logic and it's corresponding message output.

ng2 Dynamic Forms was intentionally developed without any kind of obtrusive validation message system since this
would be off the original subject and result in a library too opinionated.

As with form layouting, implementing validation messages should be entirely up to you, following the recommended approach below:

**1. Create your own custom validation message component and make it accept a** `FormControl` **input**:
```ts 
import {Component, Input} from "angular2/core";
import {FormControl} from "angular2/forms";
 
@Component({

    moduleId: module.id,
    selector: "my-validation-message",
    templateUrl: "./my-validation-message.html"
})
 
export class MyValidationMessage {

    @Input() control: FormControl;

    constructor () {}
}
```
 
**2. Create a template file** for your custom validation component and **implement it's logic** based on the `control` property:
```ts
<span *ngIf="control && control.hasError('required') && control.touched">Field is required</span>
```

**3. Define some** `Validators` **for your** `DynamicFormControlModel`:
```ts
new DynamicInputModel({
    
    id: "exampleInput",
    label: "Example Input",
    placeholder: "example input",
    validators: [Validators.required]
})
```

**4. Add your validation component aside from the** `DynamicFormControlComponent` in your form component template 
and **bind the internal** `FormControl` **reference via local template variables**:
```ts
<form [formGroup]="myForm">

    <div *ngFor="let controlModel of myDynamicFormModel">
    
        <dynamic-form-basic-control [controlGroup]="myForm" 
                                    [model]="controlModel" #componentRef></dynamic-form-basic-control>
        
        <my-validation-message [control]="componentRef.control"></my-validation-message>
    
    </div>
    
</form>
 ```
 
 
## Form Autocompletion

Adding automatic completion can be key factor to good user experience (especially on mobile devices) and should always 
be considered when designing forms. That's why ng2 Dynamic Forms keeps you covered here, as well!

Following HTML5 [standard behavior](http://www.w3schools.com/tags/att_form_autocomplete.asp), the `autocomplete` attribute is always bound to `on` for any `DynamicFormTextInputControl` form element by default. 
Nevertheless you can completely disable this feature by explicitly setting the corresponding model property to `off`:
```ts
import {AUTOCOMPLETE_OFF} from "@ng2-dynamic-forms/core";

let model = new DynamicInputModel({
    
    autoComplete: AUTOCOMPLETE_OFF
    
    //...all remaining properties
});
```

Further on ng2 Dynamic Forms embraces the brand new HTML5 
[**autofill detail tokens**](https://html.spec.whatwg.org/multipage/forms.html#autofill) by providing 
`AUTOFILL_<TOKEN_NAME|FIELD_NAME>` string constants and `DynamicFormAutoFillService` to help you putting together a valid expression:

> **Note:** Jason Grigsby - ["Autofill: What web devs should know, but don’t"](https://cloudfour.com/thinks/autofill-what-web-devs-should-know-but-dont/)

```ts
import {
    DynamicFormAutoFillService,
    AUTOFILL_TOKEN_BILLING, 
    AUTOFILL_FIELD_NAME, 
    AUTOCOMPLETE_ON
} from "@ng2-dynamic-forms/core";

export class MyAutoFillExample {

    constructor(private autoFillService: DynamicFormAutoFillService) {
    
        let expression = `${AUTOFILL_TOKEN_BILLING} ${AUTOFILL_FIELD_NAME}`;

        let model = new DynamicInputModel({
        
            autoComplete: autoFillService.validate(expression) ? expression : AUTOCOMPLETE_ON
          
            //...all remaining properties
        });
    }
}
```

Besides you can make user input more comfortable, providing HTML5 [**datalists**](http://www.w3schools.com/tags/tag_datalist.asp)
by setting the `list` property of `DynamicInputControlModel`: 
```ts
new DynamicInputModel({
    
    id: "basicInput",
    label: "Example Input",
    list: ["One", "Two", "Three", "Four", "Five"]
})
```