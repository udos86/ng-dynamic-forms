<img src="http://udos86.de/logo_ng2_dynamic_forms@2x.png" width="96" height="96" alt="Logo ng2 Dynamic Forms" style="float:left;" />

# ng2 Dynamic Forms

[![npm version](https://badge.fury.io/js/%40ng2-dynamic-forms%2Fcore.svg)](https://badge.fury.io/js/%40ng2-dynamic-forms%2Fcore)
[![Build Status](https://travis-ci.org/udos86/ng2-dynamic-forms.svg?branch=master)](https://travis-ci.org/udos86/ng2-dynamic-forms)
[![Coverage Status](https://coveralls.io/repos/github/udos86/ng2-dynamic-forms/badge.svg)](https://coveralls.io/github/udos86/ng2-dynamic-forms)

ng2 Dynamic Forms is a **rapid form development library** based on the official Angular 2
[**dynamic forms cookbook**](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html).
It simplifies the time-consuming work of implementing reactive Angular 2 forms by building
upon a layer of maintainable form control models to fully automate form UI creation and synchronization.

Therefore it provides a set of **dynamic UI components** with out of the box support for 
**[Bootstrap](http://getbootstrap.com)**, **[Foundation](http://foundation.zurb.com/)**, **[Material 2](https://github.com/angular/material2)** and more.

See what's possible by exploring the [**live demo**](http://ng2-dynamic-forms.udos86.de/example/) 
and the [**API documentation**](http://ng2-dynamic-forms.udos86.de/docs/)!

## Table of Contents

- [Getting Started](#getting-started)
- [Running the Example](#running-the-example)
- [Basic Usage](#basic-usage)
- [UI Modules and Components](#ui-modules-and-components)
- [Model Bindings and Control References](#model-bindings-and-control-references)
- [Form Groups](#form-groups)
- [Form Arrays](#form-arrays)
- [Form Layouts](#form-layouts)
- [Custom Templates](#custom-templates)
- [Custom Validators](#custom-validators)
- [Validation Messaging](#validation-messaging)
- [JSON Export and Import](#json-export-and-import)
- [Disabling and Enabling Form Controls](#disabling-and-enabling-form-controls)
- [Related Form Controls](#related-form-controls)
- [Autocomplete](#autocomplete)
- [Appendix](#appendix)


## Getting Started

**1. Install the core package**:
```
npm install @ng2-dynamic-forms/core --save
```
  
**2. Choose your UI library** (e.g. [**Bootstrap**](http://getbootstrap.com)) and **install the appropriate package**:
```
npm install @ng2-dynamic-forms/ui-bootstrap --save
```

**3.** When using **SystemJS**, update your configuration to **import the corresponding UMD bundles**:
```ts
System.config({

    paths: {
        "npm:": "node_modules/"
    },

    map: {

        // ...all the rest (Angular 2, RxJS, etc.)

        "@ng2-dynamic-forms/core": "npm:@ng2-dynamic-forms/core/bundles/core.umd.js",
        "@ng2-dynamic-forms/ui-bootstrap": "npm:@ng2-dynamic-forms/ui-bootstrap/bundles/ui-bootstrap.umd.js",
    }
});
```


## Running the Example

**1. Clone the Git repository**:
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
import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {ReactiveFormsModule} from "@angular/forms";
import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormsBootstrapUIModule} from "@ng2-dynamic-forms/ui-bootstrap";

// ..all remaining component and routing imports

@NgModule({
    imports: [
        DynamicFormsCoreModule.forRoot(), 
        DynamicFormsBootstrapUIModule, 
        BrowserModule,  
        ReactiveFormsModule
        // ...all remaining imports
    ],
    declarations: [AppComponent, MyDynamicFormComponent],
    bootstrap: [AppComponent]
})

export class AppModule {}
```

**2. Define your dynamic form model as** `Array<DynamicFormControlModel>`:
```ts
import {
    DynamicFormControlModel,
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


## UI Modules and Components

ng2 Dynamic Forms is built to provide **solid yet unobtrusive** support for a variety of common UI libraries:

* **Basic** (pure HTML5)
* **[Bootstrap](http://getbootstrap.com)**
* **[Foundation](http://foundation.zurb.com)**
* **[Material 2](https://github.com/angular/material2)**
* **[PrimeNG](http://www.primefaces.org/primeng/#/)**
* **[Kendo UI](http://www.telerik.com/kendo-angular-ui)**

You can instantly plug in your favorite form controls by **installing the appropriate
package and it's peer dependencies**:
```
npm install @ng2-dynamic-forms/ui-<library-name> --save
```

Right afterwards **just import the corresponding UI** `NgModule`:

```ts
@NgModule({

    imports: [
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsBootstrapUIModule, 
        BrowserModule,  
        ReactiveFormsModule
    ],
    
    // ...all remaining definitions
})

export class AppModule {}
```

Every UI `NgModule` declares a `DynamicFormControlComponent` that **can easily be added to
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

Due to technical restrictions or external dependencies still being in development full support for all form controls 
cannot be provided in every UI library. **See the following compatibility table**:

|               	| Checkbox (Group) 	| Input 	| Radio Group 	| Select 	| Slider 	| Switch 	| Textarea 	|
|---------------	|:----------------:	|:-----:	|:-----------:	|:------:	|:------:	|:------:	|:--------:	|
| ui-basic      	|         ✓        	|   ✓   	|      ✓      	|    ✓   	|    *   	|    ✗   	|     ✓    	|
| ui-bootstrap  	|         ✓        	|   ✓   	|      ✓      	|    ✓   	|    *   	|    ✗   	|     ✓    	|
| ui-foundation 	|         ✓        	|   ✓   	|      ✓      	|    ✓   	|    *   	|    ✓   	|     ✓    	|
| ui-kendo      	|         ✗        	|   ✗   	|      ✗      	|    ✓   	|    ✓   	|    ✓   	|     ✗    	|
| ui-material   	|         ✓        	|   ✓   	|      ✓      	|    ✓   	|    ✓   	|    ✓   	|     ✓    	|
| ui-primeng    	|         ✓        	|   ✓   	|      ✓      	|    ✓   	|    ✓   	|    ✓   	|     ✓    	|

**\*)** sliders can be achieved by using a `DynamicInputModel` with `inputType: "range"`


## Model Bindings and Control References

One of the benefits of using ng2 Dynamic Forms is that interacting with your form programmatically becomes pretty easy.
Since a `DynamicFormControlModel` is bound directly to a `DOM` element via Angular 2 core mechanisms,
changing one of it's properties will immediately trigger a UI update.

Well, almost...

ng2 Dynamic Forms relies on the Angular 2 `ReactiveFormsModule`. Therefore the `value` property **is not** two-way-bound via `[(ngModel)]` under the hood.

*So what if we actually want to update the value of an arbitrary form control at runtime?*

At first we need to get a reference to it's `DynamicFormControlModel` representation. This can easily be achieved either by
a simple index-based array lookup or through the `findById` method of `DynamicFormService`:

```ts
this.myInputModel = this.myDynamicFormModel[2];
```
```ts
this.myInputModel = <DynamicInputModel> this.dynamicFormService.findById("myInput", this.myDynamicFormModel);
```

We now have access to the `valueUpdates` `Rx.Subject` to push new values via `next()` as well as to listen to new user input via `subscribe()`:
```ts
this.myInputModel.valueUpdates.next("my new value");

this.myInputModel.valueUpdates.subscribe(value => console.log("new value: ", value);
```

At any time we can also safely read the most recent user input from the `value` property:
```ts
let currentValue = this.myInputModel.value;
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

**2. Create a** `FormGroup` **and apply a** `DynamicFormControlComponent`:
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

Fortunately, ng2 Dynamic Forms is capable of managing such nested form structures!  

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

    this.myArrayControl = <FormArray> this.myForm.get("myFormArray"); 
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

*But wait a minute... what if we want to append, let's say, a remove* `<button>` *for each array group*?

No Problemo! Particularly for this case you can add a `<template>` and **declare some custom content** that is **rendered equally for all array groups**:
```ts
<form [formGroup]="myForm">

    <dynamic-form-basic-control *ngFor="let controlModel of myDynamicFormModel" 
                                [controlGroup]="myForm" 
                                [model]="controlModel">
    
        <template modelId="myFormArray" let-context="context" let-index="index">

            <button type="button" (click)="removeItem(context, index)">Remove Item</button>
            <button type="button" (click)="insertItem(context, index + 1)">Add Item</button>

        </template>
                                
    </dynamic-form-basic-control>

</form>       
```

Whenever a `<template>` is set for a `DynamicFormArrayModel`, `NgTemplateOutletContext` **is internally bound to 
the associated** `DynamicFormArrayGroup`. 

That means you can **access the group index and it's context** `DynamicFormArrayModel` 
**by declaring some local template variables** `let-context="context"` and `let-index="index"`.

This is extremely useful when you'd like to add a remove or insert function:
```ts
removeItem(context: DynamicFormArrayModel, index: number) {
    this.dynamicFormService.removeFormArrayGroup(index, this.myArrayControl, context);
}

insertItem(context: DynamicFormArrayModel, index: number) {
    this.dynamicFormService.insertFormArrayGroup(index, this.myArrayControl, context);
}
```


## Form Layouts

When using a ng2 Dynamic Forms UI package, e.g. `ui-bootstrap`, **all essential** form classes of the underlying CSS library
(like `form-group` or `form-control`) are automatically put in place for you in the template of the corresponding `DynamicFormControlComponent`.

Apart from that, ng2 Dynamic Forms does not make any further presumptions about optional CSS classes and leaves advanced layouting all up to you. That's **solid** yet **unobtrusive**.

So let's say we want to implement a beautifully aligned Bootstrap [horizonal form](http://getbootstrap.com/css/#forms-horizontal)...

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

## Custom Validators

Adding built-in validators to any `DynamicFormValueControlModel` is dead easy! 

Just reference a `Validators` function by it's name in the `validators` or `asyncValidators` object literal and ng2 Dynamic Forms will do the rest:
```ts 
new DynamicInputModel({

    id: "myInput",
    label: "My Input",
    validators: {
        required: null,
        minLength: 3
    }
})
```

So far so good! But what if you'd like to use a custom validator as well?

**At first use the** `NG_VALIDATORS` **or** `NG_ASYNC_VALIDATORS` **token to provide your function**:
```ts 
function testValidator() {

    return {
        testValidate: {
            valid: true
        }
    };
}

@NgModule({
    // ...
    providers: [
        {provide: NG_VALIDATORS, useValue: testValidator, multi: true}
    ]
})
``` 

> **Note:** thoughtram.io - [Custom Validators in Angular 2](http://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html)

**And as if by magic you can now apply your custom validator, too**:
```ts 
new DynamicInputModel({

    id: "myInput",
    label: "My Input",
    validators: {
        required: null,
        minLength: 3,
        testValidator: null
    }
})
```


## Validation Messaging

Delivering meaningful validation information to the user is an essential part of good form design. Yet HTML5 already comes up 
with some [native functionality](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Forms/Data_form_validation)
you very likely want to use [Angular 2 mechanisms](http://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html) 
to gain much more control over validation logic and it's corresponding message output.

Avoiding a library too opinionated in the beginning, ng2 Dynamic Forms has originally been developed without any kind of obtrusive validation message system in mind.

However, due to it's very common use case and several developer requests, model-based error messaging has eventually become an optional **built-in feature** in `ui-basic`, `ui-bootstrap` and `ui-foundation`: 

**1. Add an** `errorMessages` **object to any** `DynamicFormValueControlModel` and **assign error message templates based on** `Validators` **names**:
```ts 
new DynamicInputModel({

        id: "bootstrapInput",
        label: "Example Input",
        placeholder: "example input",
        validators: {
            required: null
        },
        errorMessages: {
            required: "{{label}} is required."
        }
})
```

**2. Enable error messaging by binding the** `hasErrorMessaging` `@Input()`**property of any** `DynamicFormBootstrapComponent` **or** 
`DynamicFormFoundationSitesComponent` **to** `true`:
```ts

<form [formGroup]="myForm">

    <dynamic-form-bootstrap-control *ngFor="let controlModel of myDynamicFormModel"
                                    [controlGroup]="myForm"
                                    [model]="controlModel"
                                    [hasErrorMessaging]="controlModel.hasErrorMessages"></dynamic-form-bootstrap-control>
</form>
```

**Still you are completely free to implement your own validation messaging. Follow the recommended approach below**:

**1. Create your own custom validation message component and make it accept a** `FormControl` **input**:
```ts 
import {Component, Input} from "@angular/core";
import {FormControl} from "@angular/forms";
 
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
    validators: {
        required: null
    }
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
 
 
## JSON Export and Import

Sooner or later you likely want to persist your dynamic form model in order to restore it at some point in the future.

That's why all `DynamicFormControlModel`s have been preprared to **export properly to JSON**: 
```ts
storeForm() {
    
    let json: string = JSON.stringify(this.myDynamicFormModel);
    
    // ...store JSON in localStorage or transfer to server
}
```

Since all `DynamicFormControlModel`s in ng2 Dynamic Forms **rely on prototypical inheritance** and thus aren't just plain JavaScript objects literals, 
recreating a form from JSON unfortunately becomes more complex. 

The good news is, that `DynamicFormService` **offers the function** `fromJSON()` **to make things short and easy**:
```ts
restoreForm() {

    let json: string;
    
    // ...load JSON from localStorage or server

    let parsedJSON: Array<Object> = JSON.parse(json);
    
    this.myDynamicFormModel = this.dynamicFormService.fromJSON(parsedJSON);
}
```


## Disabling and Enabling Form Controls

Since RC.6 to date, Angular 2 [**does not allow**](https://github.com/angular/angular/issues/11271) any dynamic bindings of the `disabled` attribute in reactive forms. 

That means changing the corresponding `disabled` property of some `DynamicFormControlModel` at runtime won't have any effect.

But similar to [updating values](#model-bindings-and-control-references) ng2 Dynamic Forms helps you out here 
by providing a `Rx.Subject` `disabledUpdates` that can be used to programmatically switch the activation state of any form control:
```ts
this.myInputModel.disabledUpdates.next(true);
```


## Related Form Controls

In many complex forms the activation state of a certain form control depends directly on the `value` or `status` of some other form control.

So let's pretend we need to have our textarea `myTextArea` disabled as soon as the third option of our select menu `mySelect` is chosen.

Manually implementing such a requirement would be time-consuming and only lead to undesired boilerplate code. 

**Using ng2 Dynamic Forms however, you can easily define relations between form controls by declaration**: 
```ts
new DynamicTextAreaModel(
    {
        id: "myTextArea",
        label: "My Textarea",
        relation: [
            {
                action: "DISABLE",
                when: [
                    {
                        id: "mySelect",
                        value: "option-3"
                    }
                ]
            }
        ]
    }
```

The `relation` property may seem a bit oversized at first sight, but that way it allows the flexible declaration of even **multi-related form controls**. 

*So what if the activation state of `myTextArea` should actually depend on another control `myRadioGroup` as well?*

Just add a second entry to the `when` array and define how both relations should logically be connected via `connective`:
```ts
new DynamicTextAreaModel(
    {
        id: "myTextArea",
        label: "My Textarea",
        relation: [
            {
                action: "DISABLE",
                connective: "AND",
                when: [
                    {
                        id: "mySelect",
                        value: "option-3"
                    },
                    {
                        id: "myRadioGroup",
                        value: "option-4"
                    }
                ]
            }
        ]
    }
)
```

  
## Autocomplete

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


## Appendix

* Logo design made by [**oscarana**](http://www.oscarana-art.com)
