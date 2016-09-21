# RC.3

### **Breaking Changes** 

* **!!! IMPORTANT !!!** form control relation API changed (see [`README.md`](https://github.com/udos86/ng2-dynamic-forms#related-form-controls))

### **Bugfixes** 

* none

### **Features**

* **Multi-related Form Controls**(closes [#115](https://github.com/udos86/ng2-dynamic-forms/issues/115)) 


# RC.2

### **Breaking Changes** 

* none

### **Bugfixes** 

* none

### **Features**

* **Related Form Controls**(closes [#111](https://github.com/udos86/ng2-dynamic-forms/issues/111)) 


# RC.1

### **Breaking Changes** 

* **!!! IMPORTANT !!!** UMD bundles now provided in `bundles` sub folder 

### **Bugfixes** 

* UMD bundles now work correctly for all module systems (closes [#106](https://github.com/udos86/ng2-dynamic-forms/issues/106)) 

### **Features**

* Upgrade to TypeScript 2.0 (closes [#108](https://github.com/udos86/ng2-dynamic-forms/issues/108))  
* Minified UMD bundles added to npm packages (closes [#105](https://github.com/udos86/ng2-dynamic-forms/issues/105)) 


# beta.17

### **Breaking Changes** 

* none

### **Bugfixes** 

* none

### **Features**
 
* Migration to Angular 2.0 final (closes [#100](https://github.com/udos86/ng2-dynamic-forms/issues/100)) 
* `fromJSON()` function added to `DynamicFormService` (closes [#99](https://github.com/udos86/ng2-dynamic-forms/issues/99))


# beta.16

### **Breaking Changes** 

* none

### **Bugfixes** 

* none

### **Features**
 
* UMD bundles added (see `README.md`)


# beta.15

### **Major Breaking Changes** 

* none

### **Bugfixes** 

* bad `BrowserModule` imports replaced by `CommonModule` (closes [#89](https://github.com/udos86/ng2-dynamic-forms/issues/89))  

### **Features**
 
* Migration to PrimeNG beta.15 (`ui-primeng` working again)


# beta.14

### **Major Breaking Changes** 

* **!!! IMPORTANT !!!** `DynamicFormsCoreModule` now needs to be imported in app root `NgModule` via `forRoot()`
* **!!! IMPORTANT !!!** `disabled` property bindings were removed! Use `disable()`and `enable()` functions of `DynamicFormControlComponent` instead
(see *Known Issues* for explanation)
* `help` property of `DynamicFormControlModel` renamed to `hint`

### **Bugfixes** 

* none

### **Features**
 
* Migration to Angular 2 RC.6
* Migration to Angular 2 Material alpha.8
* `required` property binding re-added to `DynamicFormControlComponent`s due to [**fixes**](https://github.com/angular/angular/issues/5976) in Angular 2 RC.6
* `tabIndex` property added to `DynamicFormValueControlModel`

### **Known Issues**

* Changing the `disabled` property of `DynamicFormControlModel` after initialization **has no effect**. 
This is due to Angular 2 RC.6 [**not supporting**](https://github.com/angular/angular/pull/11271) `disabled` property bindings anymore!
Use `disable()`and `enable()` functions of `DynamicFormControlComponent` as a workaround!

* Setting `disabled: true` on any `DynamicFormControlModel` in `ui-material` causes an exception. 
This is due to a [**bug**](https://github.com/angular/material2/issues/1171) in Angular 2 Material alpha.8-1.


# beta.13

### **Major Breaking Changes** 

* none

### **Bugfixes** 

* `FormGroup` validator extras now set correctly (closes [#79](https://github.com/udos86/ng2-dynamic-forms/issues/79))  

### **Features**
 
* Sample app start simplified
* `*.ts` files added to npm packages for source map support (closes [#82](https://github.com/udos86/ng2-dynamic-forms/issues/82))


# beta.12

### **Major Breaking Changes** 

* property `validatorsAsync` of `DynamicFormValueControlModel`renamed to `asyncValidators`

### **Minor Breaking Changes** 

* none

### **Features**
 
* support for `FormGroup` and `FormArray` validator functions added (closes [#79](https://github.com/udos86/ng2-dynamic-forms/issues/79))
* `ui-primeng` now working with `NgModule`

# beta.11

### **Major Breaking Changes** 

* none

### **Minor Breaking Changes** 

* `required` attribute (temporarily) removed from templates due to [**issues**](https://github.com/angular/angular/issues/5976) 
still not being resolved in Angular 2


# beta.10

### **Major Breaking Changes** 

* none

### **Bugfixes** 

* `NgTemplateOutletContext` is now correctly set for `<template>` for `DynamicFormArrayModel` 
(closes [#67](https://github.com/udos86/ng2-dynamic-forms/issues/67))


# beta.9

### **Major Breaking Changes** 

* **!!! IMPORTANT !!!** ng2 DynamicForms now supports **`NgModule`** 
--> **Please read updated `README.md**

### **Minor Breaking Changes** 

* none


# beta.8

### **Major Breaking Changes** 

* none

### **Minor Breaking Changes** 

* none

### **Bugfixes**

* `DynamicFormArrayModel` and `DynamicFormGroupModel` now working in all UI packages 


# beta.7

### **Major Breaking Changes** 

* **!!! IMPORTANT !!!** `DynamicFormModel` **has been completely removed** --> use a simple `Array<DynamicFormControlModel>` instead
* **!!! IMPORTANT !!!** `findById()` function of `DynamicFormModel` **has been moved to** `DynamicFormService`


### **Minor Breaking Changes** 

* none

### **Bugfixes**

* `DynamicCheckboxModel` now working correctly again in `ui-primeng`


# beta.6

### **Major Breaking Changes** 

* none

### **Minor Breaking Changes** 

* `DynamicFormControlModel` renamed to `DynamicFormValueControlModel`
* `DynamicFormAbstractControlModel` renamed to `DynamicFormControlModel`


### **Features**

* **Nested form groups** are now supported (closes [#57](https://github.com/udos86/ng2-dynamic-forms/issues/57))
* **Type safety** for `DynamicFormControlModel` coniguration objects added 


# beta.5

### **Breaking Changes** 
>**Please checkout updated README and examples!**

* **!!! IMPORTANT !!!** `items` property of `DynamicFormControlModel` and `DynamicCheckboxGroup` has been renamed to `group`
* **!!! IMPORTANT !!!** `DynamicFormService.createFormGroup` now expects `Array<DynamicFormControlModel<any>>` instead of `DynamicFormModel`
* **!!! IMPORTANT !!!** `@Input()` `form` of `DynamicFormControlComponent` has been renamed to `controlGroup`
* **!!! IMPORTANT !!!** `id` property binding of `DynamicFormControlModel` has been removed

### **Features**

* [**FormArrays**](https://scotch.io/tutorials/how-to-build-nested-model-driven-forms-in-angular-2) are now fully 
supported (closes [#53](https://github.com/udos86/ng2-dynamic-forms/issues/53))


# beta.4

### **Breaking Changes**

* `required` property of `DynamicFormControlModel` is now bound via `[required]` and does not manually apply `Validators.required`
under the hood any more
* `readonly` property of `DynamicInputControlModel` renamed to `readOnly`

### **Features**

* boolean `spellCheck` property added to `DynamicInputControlModel`


# beta.3

### **Breaking Changes**

* default value for `autocomplete` property of `DynamicFormControlModel` is now `on` instead of `off`
* `text` property of `DynamicFormOption` renamed to `label`

### **Bugfixes**

* `DynamicCheckboxGroup` now working correctly in `ui-material`

### **Features**

* **Webpack** bundling now supported (closes [#47](https://github.com/udos86/ng2-dynamic-forms/issues/47))
* `DynamicFormAutoFillService` added for importing and validating new HTML5 [autofill detail tokens](https://html.spec.whatwg.org/multipage/forms.html#autofill)
* `ui-primeng` has arrived


# beta.2

### **Bugfixes**

* `maxlength` attribute is now bound correctly (closes [#43](https://github.com/udos86/ng2-dynamic-forms/issues/43))
* labels of `DynamicCheckboxGroup` items do render now in `ui-basic` (closes [#44](https://github.com/udos86/ng2-dynamic-forms/issues/44))
* `name` attribute now added to `<fieldset>` (closes [#45](https://github.com/udos86/ng2-dynamic-forms/issues/45))
* `disabled` attribute now added to all form controls


# beta.1

### **Breaking Changes**

* `cls` configuration object has now nested `element` configuration object to set css classes for certain elements (see [example](https://github.com/udos86/ng2-dynamic-forms/blob/master/example/app/bootstrap/bootstrap-example.model.ts))
* `name` property of `DynamicFormControlModel` cannot be set anymore by configuration (automatically mapped to `id`)
* `DynamicFormControlComponent` now throws when being bound to non-supported type of `DynamicFormControlModel`

### **Bugfixes**

* `ui-material` finally working again after upgrading to new Angular 2 Material alpha.6 (closes [#29](https://github.com/udos86/ng2-dynamic-forms/issues/29))
* `value` of `DynamicCheckboxModel`is now always initizialized with `false` instead of `null` when not explicitly set to `true`

### **Features**

* [datalists](http://www.w3schools.com/tags/tag_datalist.asp) now supported by `DynamicInputControlModel` (`list` property)


# alpha.10

### **Breaking Changes**

* `label` property of `DynamicFormControlModel` is now just a plain `string` instead of object
 (`hidden` property is removed)

### **Features**
* `DynamicCheckboxGroupModel` has arrived (closes [\#32](https://github.com/udos86/ng2-dynamic-forms/issues/32))


# alpha.9

### **Breaking Changes**

* `cls` is now a true optional declared constructor parameter
* check included for mandatory `id` configuration property
* [\#37](https://github.com/udos86/ng2-dynamic-forms/issues/37) fixed


# alpha.8

### **Breaking Changes**

* `ui-foundation` has arrived
* `cls` configuration object is now a separate constructor parameter (the second) of `DynamicFormControlModel` in order
to uncouple pure model configuration from style configuration
* `cls` bugs in template files fixed
* `readonly` property introduced for `DynamicFormInputModel`


# alpha.7

### **Breaking Changes**

* Upgraded to RC.3
* `cls` property of `DynamicFormControlModel` refactored for advanced form layouts
* Radio groups finally working in ui-basic and ui-bootstrap
* New chapter "Form Layouts" added in README.md

### **Please note:**

ui-material is currently broken due to Angular 2 Material not having upgraded to @angular/forms yet


# alpha.6

### **Breaking Changes**

* Updated everything to [@angular/forms](https://docs.google.com/document/u/1/d/1RIezQqE4aEhBRmArIAS1mRIZtWFf6JxN_7B4meyWK0Y/pub)
* `order` property removed from `DynamicFormControlModel`
* `DynamicRadioModel` renamed to `DynamicRadioGroupModel`
* `model` property of `DynamicFormModel` renamed to `items`


# alpha.5

### **Breaking Changes**

* Major improvements and bug fixes for ui-bootstrap template
* Major improvements for example app
* `text` property removed from `DynamicCheckboxModel` due to redundancy (use
`text` property of `label` object instead)


# alpha.4

### **Breaking Changes**

* `DynamicTextInputModel` and `DynamicNumberInputModel` condensed to `DynamicInputModel`
* `onBlur` and `onFocus` event listeners added for input and textarea controls in ui-basic and ui-bootstrap
* `max`, `min`, `step attributes now working correctly in ui-basic and ui-bootstrap
* `label` is now a configuration object with properties `cls`, `hidden` and `text`
* new property `cls` introduced in `DynamicFormControlModel` for manually setting CSS classes for controls
