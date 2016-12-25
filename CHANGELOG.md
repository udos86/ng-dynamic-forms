# 1.3.4

### **Features** 

**!!! IMPORTANT !!!** 

**Adding custom templates has become more powerful!**

**You now need to assign a** `modelId` **attribute to any of your custom templates.** 

**Please see new chapter in [README.md](https://github.com/udos86/ng2-dynamic-forms/tree/development#custom-templates) and updated examples!**

* update to `@angular 2.4.1`
* update to `@angular/material beta.1`
* `@Input() showCharacterHint` added in `DynamicFormMaterialComponent`
* `DynamicSelectModel` now enabled in `ui-kendo`


# 1.3.3

### **Bugfixes** 

* `DynamicFormsCoreModule` now working when used in async routes (closes [#212](https://github.com/udos86/ng2-dynamic-forms/issues/212))
 
### **Features** 

* async routing example added to demo application
* template improvements for checkboxes (closes [#214](https://github.com/udos86/ng2-dynamic-forms/issues/214))
* `hint` property added to `Cls` interface

# 1.3.2

### **Bugfixes** 

* `DynamicSliderModel` and `DynamicSwitchModel` are now correctly deserialized from JSON
 
### **Features** 

* `min` and `max` typing updated (closes [#206](https://github.com/udos86/ng2-dynamic-forms/issues/206))
* update to `@angular 2.3.1`
* update to `foundation 6.3.0`
* update to `primeng 1.1.0`


# 1.3.1

### **Bugfixes** 

* custom validator functions are now correctly detected in model configuration (closes [#200](https://github.com/udos86/ng2-dynamic-forms/issues/200))
 
### **Features** 

* `DynamicSliderModel` added (working in `ui-material`, `ui-kendo`, `ui-primeng`)
* `DynamicSelectModel` now working in `ui-material`
* `hint` now working in `ui-basic` (closes [#203](https://github.com/udos86/ng2-dynamic-forms/issues/203))
* update to `@angular 2.3.0`
* update to `rxjs rc.4`
* update to `zone.js 0.7.2`
* update to `@angular-material alpha-11.3`


# 1.3.0

### **Breaking Changes**

**!!! IMPORTANT !!!** All `Validators` of any `DynamicFormControlModel` now need to be configured by a simply object literal (similar to `errorMessages`) instead of an `Array<ValidatorFn | AsyncValidatorFn>`.

This change was unavoidable to allow proper serialization for all validators as well as a significant code reduction 
(closes [#200](https://github.com/udos86/ng2-dynamic-forms/issues/200))!.

Defining validators becomes even more easy now!

**Before:**
```ts
new DynamicInputModel({

    id: "myInput",
    validators: [Validators.required, Validators.minLength(3)]
})
```

**After:**
```ts
new DynamicInputModel({

    id: "myInput",
    validators: {
        required: null,
        minLength: 3
    }
})
```

**Please see updated [example](https://github.com/udos86/ng2-dynamic-forms/tree/master/example) for practical use!!!**

### **Features** 

* `ui-material` now supports `offLabel` and `onLabel` properties of `DynamicSwitchModel`
(see [**Material example**](https://github.com/udos86/ng2-dynamic-forms/tree/master/example/app/material))
* update to `@angular 2.2.4`


# 1.2.5

### **Bugfixes** 

* `change` **event handler in** `DynamicFormBasicComponent` **corrected** (closes [#197](https://github.com/udos86/ng2-dynamic-forms/issues/197))
 

# 1.2.4

### **Bugfixes** 

* **bad** `@angular/material` **import removed from** `DynamicFormControlComponent` (closes [#194](https://github.com/udos86/ng2-dynamic-forms/issues/194))
 

# 1.2.3

### **Features** 

* `ui-foundation` and `ui-primeng` now support `DynamicSwitchModel`
* `DynamicSwitchModel` now has `offLabel` and `onLabel` properties
* `DynamicFormControlRelationModel` refactored and `DynamicFormRelationService` introduced 
* template files optimized
* update to tslint `4.0.0`

# 1.2.2

### **Bugfixes** 

* `DynamicCheckboxGroupModel` **internally works identical to** `DynamicFormGroupModel` **now in order to make property bindings work correctly** 
(closes [#172](https://github.com/udos86/ng2-dynamic-forms/issues/172) and [#189](https://github.com/udos86/ng2-dynamic-forms/issues/189))
 
### **Features** 

* **!!! IMPORTANT !!!** `blur, focus, change` events are now emitted for single checkbox in a `DynamicCheckboxGroupModel` instead of the whole group
* `@angular/material` change events are now correctly included in `DynamicFormControlEvent`
* update to `@angular 2.2.3`
* update to `primeng 1.0.0`


# 1.2.1

### **Bugfixes** 

* `addGroup()` **function of** `DynamicFormArrayModel` **does now work correctly** (closes [#183](https://github.com/udos86/ng2-dynamic-forms/issues/183))
 
### **Features** 

* update to `@angular 2.2.1`
* update to `primeng rc.5`
* `add()`, `insert()` and `remove()` function added to `DynamicOptionControlModel` (closes [#180](https://github.com/udos86/ng2-dynamic-forms/issues/180))


# 1.2.0

### **Breaking Changes** 

* `DynamicFormControlComponent` **does now emit a** `DynamicFormControlEvent` **on blur, change and focus instead of simply passing through** `$event`:
 ```
 export interface DynamicFormControlEvent {
     
     $event: Event | FocusEvent;
     control: FormControl;
     model: DynamicFormControlModel;
 }
 ```
* **blur, change and focus events are only emitted for single form controls and checkbox groups from now on** (see Bootstrap example)

### **Features** 

* update to `@angular 2.2.0`
* update to `@angular/material alpha.10`
* update to `primeng rc.4`
* `valueUpdates Rx.Subject` can now safely be used from anywhere to listen to new values
* `checked` setter/getter and `toggle()` function added to `DynamicCheckControlModel`
* `checkAll()` and `uncheckAll()` function added to `DynamicCheckboxGroupModel`
* `select()` and `get()` function added to `DynamicOptionControlModel`
* `get()`function added to `DynamicFormGroupModel` and `DynamicFormArrayModel`
* textarea support for `ui-material` added


# 1.1.3

### **Bugfixes** 

* `checked` attribute added to templates (closes [#168](https://github.com/udos86/ng2-dynamic-forms/issues/168)) 


# 1.1.2

### **Bugfixes** 

* `validators` deserialization fixed (closes [#163](https://github.com/udos86/ng2-dynamic-forms/issues/163)) 
* `rxjs` peer dependency downgraded to match with Angular 2 (closes [#162](https://github.com/udos86/ng2-dynamic-forms/issues/162)) 

### **Features**

* error validation messaging added for `ui-basic` (closes [#154](https://github.com/udos86/ng2-dynamic-forms/issues/154)) 


# 1.1.1

### **Bugfixes** 

* `DynamicCheckboxGroupModel` template bugs fixed (closes [#160](https://github.com/udos86/ng2-dynamic-forms/issues/160)) 

### **Features**

* `label`, `legend`, `prefix`, `suffix` and `hint` are now bound via `[innerHTML]` (see [#157](https://github.com/udos86/ng2-dynamic-forms/issues/157)) 


# 1.1.0

### **Features**

* Error Messaging system to `ui-bootstrap` and `ui-foundation` added (closes [#153](https://github.com/udos86/ng2-dynamic-forms/issues/153) 
, see [README.md](https://github.com/udos86/ng2-dynamic-forms#validation-messaging)) **Thanks @DavyJohnes** 
* `@Output() change` `EventEmitter<Event>` added to `DynamicFormControlComponent` ([#149](https://github.com/udos86/ng2-dynamic-forms/issues/149))
* Update to `@angular 2.1.2`


# 1.0.7

### **Bugfixes** 

* `fromJSON()` finally working flawless

### **Features**

* Upgrade to Angular `2.1.0`


# 1.0.5

### **Bugfixes** 

* support for nested `templates`(closes [#139](https://github.com/udos86/ng2-dynamic-forms/issues/139)) 

### **Features**

* `disabledUpdates` `Rx.Subject` added for setting activation state at model level


# 1.0.4

### **Features**

* `focus` and `blur` outputs added to `DynamicFormControlComponent` for event bindings (closes [#130](https://github.com/udos86/ng2-dynamic-forms/issues/130)) 
* JSON export code has been improved


# 1.0.3

### **Bugfixes** 

* some JSON export flaws have been fixed

### **Features**

* Upgrade to `@angular/material` (closes [#129](https://github.com/udos86/ng2-dynamic-forms/issues/129)) 
* JSON export for `Validators` added (closes [#128](https://github.com/udos86/ng2-dynamic-forms/issues/128)) 


# 1.0.2

### **Breaking Changes** 

* **!!! IMPORTANT !!!** `[(ngModel)]` bindings have been completely removed. If you need to update the `value` of any `DynamicFormControlModel` 
at runtime use `valueUpdates` `Rx.Subject` [(see README.md)](https://github.com/udos86/ng2-dynamic-forms#model-bindings-and-control-references) 

### **Features**

* proper JSON export of all `DynamicFormControlModel`s (closes [#125](https://github.com/udos86/ng2-dynamic-forms/issues/125))_ 


# 1.0.1

### **Features**

* `DynamicSwitchModel` introduced in `ui-material`
* `id` attribute is now bound again to improve accessibility (see [#42](https://github.com/udos86/ng2-dynamic-forms/issues/42)) 
* `disabled` bindings added in `ui-material` where appropriate


# 1.0.0

### **Bugfixes** 

* Webpack flaws fixed (closes [#118](https://github.com/udos86/ng2-dynamic-forms/issues/118)) 


# RC.3

### **Breaking Changes** 

* **!!! IMPORTANT !!!** form control relation API changed (see [`README.md`](https://github.com/udos86/ng2-dynamic-forms#related-form-controls))

### **Bugfixes** 

* `files` field added to `DynamicInputModel` (closes [#114](https://github.com/udos86/ng2-dynamic-forms/issues/114)) 

### **Features**

* **Multi-related Form Controls** (closes [#115](https://github.com/udos86/ng2-dynamic-forms/issues/115)) 


# RC.2

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

### **Features**
 
* Migration to Angular 2.0 final (closes [#100](https://github.com/udos86/ng2-dynamic-forms/issues/100)) 
* `fromJSON()` function added to `DynamicFormService` (closes [#99](https://github.com/udos86/ng2-dynamic-forms/issues/99))


# beta.16

### **Features**
 
* UMD bundles added (see `README.md`)


# beta.15

### **Bugfixes** 

* bad `BrowserModule` imports replaced by `CommonModule` (closes [#89](https://github.com/udos86/ng2-dynamic-forms/issues/89))  

### **Features**
 
* Migration to PrimeNG beta.15 (`ui-primeng` working again)


# beta.14

### **Breaking Changes** 

* **!!! IMPORTANT !!!** `DynamicFormsCoreModule` now needs to be imported in app root `NgModule` via `forRoot()`
* **!!! IMPORTANT !!!** `disabled` property bindings were removed! Use `disable()`and `enable()` functions of `DynamicFormControlComponent` instead
(see *Known Issues* for explanation)
* `help` property of `DynamicFormControlModel` renamed to `hint`

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

### **Bugfixes** 

* `FormGroup` validator extras now set correctly (closes [#79](https://github.com/udos86/ng2-dynamic-forms/issues/79))  

### **Features**
 
* Sample app start simplified
* `*.ts` files added to npm packages for source map support (closes [#82](https://github.com/udos86/ng2-dynamic-forms/issues/82))


# beta.12

### **Breaking Changes** 

* property `validatorsAsync` of `DynamicFormValueControlModel`renamed to `asyncValidators`

### **Features**
 
* support for `FormGroup` and `FormArray` validator functions added (closes [#79](https://github.com/udos86/ng2-dynamic-forms/issues/79))
* `ui-primeng` now working with `NgModule`


# beta.11

### **Breaking Changes** 

* `required` attribute (temporarily) removed from templates due to [**issues**](https://github.com/angular/angular/issues/5976) 
still not being resolved in Angular 2


# beta.10

### **Bugfixes** 

* `NgTemplateOutletContext` is now correctly set for `<template>` for `DynamicFormArrayModel` 
(closes [#67](https://github.com/udos86/ng2-dynamic-forms/issues/67))


# beta.9

### **Breaking Changes** 

* **!!! IMPORTANT !!!** ng2 DynamicForms now supports **`NgModule`** 
--> **Please read updated** `README.md


# beta.8

### **Bugfixes**

* `DynamicFormArrayModel` and `DynamicFormGroupModel` now working in all UI packages 


# beta.7

### **Breaking Changes** 

* **!!! IMPORTANT !!!** `DynamicFormModel` **has been completely removed** --> use a simple `Array<DynamicFormControlModel>` instead
* **!!! IMPORTANT !!!** `findById()` function of `DynamicFormModel` **has been moved to** `DynamicFormService`

### **Bugfixes**

* `DynamicCheckboxModel` now working correctly again in `ui-primeng`


# beta.6

### **Breaking Changes** 

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
