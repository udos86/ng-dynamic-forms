# ng2 Dynamic Forms (alpha.7)

[![npm version](https://badge.fury.io/js/%40ng2-dynamic-forms%2Fcore.svg)](https://badge.fury.io/js/%40ng2-dynamic-forms%2Fcore)
[![Build Status](https://travis-ci.org/udos86/ng2-dynamic-forms.svg?branch=master)](https://travis-ci.org/udos86/ng2-dynamic-forms)

ng2 Dynamic Forms is a rapid form development library based on the official Angular 2
[**dynamic form cookbook**](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html).
It simplifies all the hard, troublesome work of implementing handcrafted forms by building
upon a layer of descriptive object models.

It also provides a flexible system of dynamic UI components with out of the box support for
**Angular 2 Material** and **Bootstrap**.

##Table of Contents

- [Getting Started](#getting-started)
- [Basic Usage](#basic-usage)
- [UI Components](#ui-components)
- [Form Layouts](#form-layouts)

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
        label: {
            text: "Example Input"
        },
        maxLength: 42,
        placeholder: "example input",
    }),

    new DynamicRadioGroupModel<string>({

        id: "exampleRadioGroup",
        label: {
            text: "Example Radio Group"
        },
        options: [
            {
                text: "Option 1",
                value: "option-1",
            },
            {
                disabled: true,
                text: "Option 2",
                value: "option-2"
            },
            {
                text: "Option 3",
                value: "option-3"
            }
        ],
        value: "option-3"
    }),

    new DynamicCheckboxModel({

        id: "exampleCheckbox",
        label: {
            text: "I do agree"
        }
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

ng2 Dynamic Forms is built to provide **solid yet unobtrusive** support for a variety of common ui libraries:

* **Basic** (pure, native HTML5)
* **[Bootstrap](http://getbootstrap.com)**
* **[Material](https://github.com/angular/material2)**
* *Foundation (coming soon)*
* *Kendo UI (coming soon)*

You can instantly plug in your favorite controls by **installing the appropriate
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

To get it all running **just directly bind an arbitrary** `DynamicFormModel`:
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

|              | Checkbox | Input | Radio Group | Select | Textarea |
|--------------|:--------:|:-----:|:-----------:|:------:|:--------:|
| ui-basic     |     ✓    |   ✓   |      ✓      |    ✓   |     ✓    |
| ui-bootstrap |     ✓    |   ✓   |      ✓      |    ✓   |     ✓    |
| ui-material  |     ✓    |   ✓   |      ✓      |    ✗   |     ✗    |


## Form Layouts

When using a ng2 Dynamic Forms UI package, e.g. `ui-bootstrap`, **all essential** form classes of the underlying CSS Library
(like `form-group` or `form-control`) are automatically put in place for you in the corresponding `DynamicFormControlComponent`. 

Apart from that ng2 Dynamic Forms does not make any further presumptions about optional CSS classes and leaves advanced layouting all up to you. That's **solid** yet **unobtrusive**.

So let's say we want to implement a beautifully aligned Bootstrap [horizonal form](http://getbootstrap.com/css/#forms-horizontal):

At first we have to append the mandatory Bootstrap CSS class `form-inline` to the `<form>` element in our template:
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

By providing the `cls` and it's nested `grid` configuration object, ng2 Dynamic Forms allows you to manuallay define additional CSS classes for every `DynamicFormControlModel`, which are then intelligently appended within the `DynamicFormControlComponent` template:
```ts
new DynamicInputModel({

    cls: {
        grid: {
            control: "col-sm-9",
            label: "col-sm-3"
        },
        label: "control-label"
    },

    //... all the rest
})
```
