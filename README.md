# ng2 Dynamic Forms (beta.2)

[![npm version](https://badge.fury.io/js/%40ng2-dynamic-forms%2Fcore.svg)](https://badge.fury.io/js/%40ng2-dynamic-forms%2Fcore)
[![Build Status](https://travis-ci.org/udos86/ng2-dynamic-forms.svg?branch=master)](https://travis-ci.org/udos86/ng2-dynamic-forms)

ng2 Dynamic Forms is a rapid form development library based on the official Angular 2
[**dynamic form cookbook**](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html).
It simplifies all the hard, troublesome work of implementing handcrafted forms by building
upon a layer of descriptive object models.

It also provides a flexible system of dynamic UI components with out of the box support for **Bootstrap**, **Foundation**,
**Angular 2 Material** and more.

##Table of Contents

- [Getting Started](#getting-started)
- [Basic Usage](#basic-usage)
- [UI Components](#ui-components)
- [Bindings and References](#bindings-and-references)
- [Form Layouts](#form-layouts)
- [Validation Messages](#validation-messages)

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

## Basic Usage

**1. Define your** `DynamicFormModel`:
```ts
import {
    DynamicFormModel,
    DynamicCheckboxModel,
    DynamicInputModel,
    DynamicRadioGroupModel
} from "@ng2-dynamic-forms/core";

export const MY_DYNAMIC_FORM_MODEL = new DynamicFormModel([

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
]);
```

**2. Provide** `DynamicFormService` **and plug in the** `DynamicFormControlComponent`:
```ts
import {DynamicFormService} from "@ng2-dynamic-forms/core";
import {DynamicFormBootstrapComponent} from "@ng2-dynamic-forms/ui-bootstrap";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES, DynamicFormBootstrapComponent],
    providers: [DynamicFormService],

    // ... all mandatory properties (selector, templateUrl, etc.)
})
```

**3. Create the** `FormGroup` **via the** `DynamicFormService`:
```ts
export class MyDynamicFormComponent implements OnInit {

    dynamicFormModel: DynamicFormModel = MY_DYNAMIC_FORM_MODEL;
    form: FormGroup;

    constructor(private dynamicFormService: DynamicFormService) {}

    ngOnInit() {
        this.form = this.dynamicFormService.createFormGroup(this.dynamicFormModel);
    }
}
```

**4. Add the** `DynamicFormControlComponent` **to your template
and bind it's** `FormGroup` **and** `DynamicFormControlModel`:
```ts
<form [formGroup]="form">

    <div *ngFor="let controlModel of dynamicFormModel.items">

        <dynamic-form-bootstrap-control [form]="form"
                                        [model]="controlModel">
        </dynamic-form-bootstrap-control>

    </div>

</form>
```

## UI Components

ng2 Dynamic Forms is built to provide **solid yet unobtrusive** support for a variety of common UI libraries:

* **Basic** (unstyled HTML5)
* **[Bootstrap](http://getbootstrap.com)**
* **[Foundation](http://foundation.zurb.com/)**
* **[Material](https://github.com/angular/material2)**
* **[PrimeNG](http://www.primefaces.org/primeng/#/)**
* *Kendo UI (coming Q3/Q4)*

You can instantly plug in your favorite form controls by **installing the appropriate
package and it's peer dependencies**:
```
npm install @ng2-dynamic-forms/ui-<library-name> --save
```

Every UI package comes with a `DynamicFormControlComponent` that **can easily be added to
your component** `directives` and `template`:
```ts
import {DynamicFormBootstrapComponent} from "@ng2-dynamic-forms/ui-bootstrap";

@Component({

    directives: [REACTIVE_FORM_DIRECTIVES, DynamicFormBootstrapComponent],

    // ... all mandatory component properties (selector, templateUrl, etc.)
})
```

To get it all running **just bind an arbitrary** `DynamicFormModel`:
```ts
<form [formGroup]="form">

    <div *ngFor="let controlModel of dynamicFormModel.items">

        <dynamic-form-bootstrap-control [form]="form"
                                        [model]="controlModel">
        </dynamic-form-bootstrap-control>

    </div>

</form>
```

Due to Angular 2 Material still being in [alpha](https://github.com/angular/material2/blob/master/CHANGELOG.md)
full support for all major form controls cannot be provided at the moment. See the following compatibility table:

|               | Checkbox | Checkbox Group | Input | Radio Group | Select | Textarea |
|---------------|:--------:|:--------------:|:-----:|:-----------:|:------:|:--------:|
| ui-basic      |     ✓    |        ✓       |   ✓   |      ✓      |    ✓   |     ✓    |
| ui-bootstrap  |     ✓    |        ✓       |   ✓   |      ✓      |    ✓   |     ✓    |
| ui-foundation |     ✓    |        ✓       |   ✓   |      ✓      |    ✓   |     ✓    |
| ui-material   |     ✓    |        ✓       |   ✓   |      ✓      |    ✗   |     ✗    |


## Bindings and References

One of the benefits of using ng2 Dynamic Forms is that interacting with your form programmatically becomes pretty easy.
Since a `DynamicFormControlModel` is bound directly to a `DOM` element via Angular 2 core mechanisms,
changing one of it's properties will immediately trigger a UI update.

So what if we actually want to update the value of an arbitrary form control at runtime?

At first we need to get a reference to it's `DynamicFormControlModel` representation. This can easily be achieved either by
a simple index-based `items` array lookup or through the `findById` method of `DynamicFormModel`:

```ts
this.exampleInputModel = this.dynamicFormModel.items[2];
```
```ts
this.exampleInputModel = <DynamicInputModel> this.dynamicFormModel.findById("exampleInput");
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

Just obtain a reference to the `FormControl` and use it's `valueChanges` observable.
```ts
ngOnInit() {

  this.control = <FormControl> this.form.controls[this.exampleInputModel.id];
  this.control.valueChanges.subscribe((value: string) => console.log("value changed to: ", value));
}
```

## Form Layouts

When using a ng2 Dynamic Forms UI package, e.g. `ui-bootstrap`, **all essential** form classes of the underlying CSS library
(like `form-group` or `form-control`) are automatically put in place for you in the template of the corresponding `DynamicFormControlComponent`.

Apart from that, ng2 Dynamic Forms does not make any further presumptions about optional CSS classes and leaves advanced layouting all up to you. That's **solid** yet **unobtrusive**.

So let's say we want to implement a beautifully aligned Bootstrap [horizonal form](http://getbootstrap.com/css/#forms-horizontal):

At first we have to append the mandatory Bootstrap CSS class `form-horizontal` to the `<form>` element in our template:
```ts
<form class="form-horizontal" [formGroup]="form">

    <div *ngFor="let controlModel of dynamicFormModel.items">

        <dynamic-form-bootstrap-control [form]="form"
                                        [model]="controlModel"></dynamic-form-bootstrap-control>

    </div>

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

## Validation Messages

Delievering meaningful validation information to the user is an essential part of good form design. 
Yet ng2 Dynamic Forms was intentionally designed without any kind of internal
validation message system because it would make the library unnecessarily complex.

Instead there's a way better approach to this.
 
 **1. Create your own custom validation component and make it accept an `FormControl` input**:
 ```ts 
 import {Component, Input} from "angular2/core";
 import {FormControl} from "angular2/forms";
 
 @Component({
    
    moduleId: module.id,
    selector: "validation-message",
    templateUrl: "./validation-message.html"
 })
 
 export class ValidationMessage {
 
    @Input() control: FormControl;
     
    constructor () {}
 }
 ```
 
 **2. Create the template file your custom validation component and implement it's logic**:
 ```ts
 <span *ngIf="control && control.hasError('required') && control.touched">Field is required</span>
 <span *ngIf="control && control.hasError('invalidCharacters') && control.touched">Field has invalid characters</span>
 ```
 
 **3. Add your custom validation component right after the `DynamicFormControlComponent` in your custom form template 
 and bind the internal `FormControl` reference through a local template variable**:
 ```ts
 <form [formGroup]="form">
 
    <div *ngFor="let controlModel of dynamicFormModel.items" class="form-row">
    
        <dynamic-form-basic-control [form]="form" [model]="controlModel" #componentRef></dynamic-form-basic-control>
        
        <validation-message [control]="componentRef.control"></validation-message>
    
    </div>
    
</form>
 ```