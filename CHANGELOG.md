# 5.4.4

### **Features** 

* full support for Angular Package Format v5.0
* upgrade to NG Bootstrap `1.0.0` stable

***

# 5.4.3

### **Features** 

* initial text mask support for Material UI package (closes [#510](https://github.com/udos86/ng-dynamic-forms/issues/510))
* `pattern` binding added to ion input (closes [#645](https://github.com/udos86/ng-dynamic-forms/issues/645))
* upgrade to ngx-bootstrap `2.0.0`

***

# 5.4.2

### **Features** 

* `maxLength` attribute added to Material textarea control
* upgrade to NG Bootstrap `beta.9`

### **Bugfixes** 

* minlength and maxlength error messages are now created correctly (closes [#647](https://github.com/udos86/ng-dynamic-forms/issues/647))

***

# 5.4.1

### **Features** 

* `hidden` property added to `DynamicFormControlModel` for hiding form controls 

***

# 5.4.0 - Special Xmas Gift Edition

### **Features** 

* new `InjectionToken` `DYNAMIC_VALIDATORS` for entirely avoiding any mangling issues when using custom validators
(see updated chapter on [**Custom Validators**](https://github.com/udos86/ng-dynamic-forms#custom-validators))
* official support for JSON form models (see new chapter on [**JSON Form Models**](https://github.com/udos86/ng-dynamic-forms#json-form-models))
* major accessibility improvements for Material template (closes [#630](https://github.com/udos86/ng-dynamic-forms/issues/630))
* upgrade to NG Bootstrap `beta.8`

***

# 5.3.0

### **Features** 

* **initial support for** [**ngx-bootstrap**](https://valor-software.com/ngx-bootstrap/#/) (`ngx-bootstrap` is now a peer dependency of `@ng-dynamic-forms/ui-bootstrap`)
* **initial support for Prime NG color picker via new** `DynamicColorPickerModel`

***

# 5.2.0

### **Features** 

* `additional` property added to `DynamicFormValueControlModel` for individually configuring UI components 
(see [**new chapter on form component configuration**](https://github.com/udos86/ng-dynamic-forms/tree/master#form-control-configuration))
* upgrade to NG Bootstrap `beta.7`

***

# 5.1.2

### **Features** 

* `name` property can now be configured on any `DynamicFormControlModel` (closes [#600](https://github.com/udos86/ng-dynamic-forms/issues/600))
* upgrade to Angular Material `5.0.0`
* Material UI template improvements 

***

# 5.1.1

### **Features** 

* **initial Chips support in Material UI package**
* `hint` support for Select in Material UI package (closes [#608](https://github.com/udos86/ng-dynamic-forms/issues/608))
* upgrade to Angular Material `5.0.0-rc.2`
* upgrade to NG Bootstrap `beta.6`

### **Bugfixes** 

* packages now pass `strictNullChecks` again (closes [#614](https://github.com/udos86/ng-dynamic-forms/issues/614))

***

# 5.1.0

### **Features** 

* **All new approach to custom form layouts** (see updated [**README**](https://github.com/udos86/ng-dynamic-forms#form-layouts) und [**sample code**](https://github.com/udos86/ng-dynamic-forms/tree/master/sample/app))

### **Deprecation** 

* **using** `clsConfig` **for providing layout information is now deprecated**

***

# 5.0.3

### **Features** 

* **upgrade to Angular Material `5.0.0-rc.1`**
* **upgrade to Prime NG `5.0.0`**

***

# 5.0.2

### **Features** 

* `min`, `max` and `focusedDate` support for `DynamicDatePickerModel` in `ui-ng-bootsrap` (closes [#570](https://github.com/udos86/ng-dynamic-forms/issues/570), [#576](https://github.com/udos86/ng-dynamic-forms/issues/576))

***

# 5.0.1

### **Features** 

* **upgrade to Angular Material `5.0.0-rc0`**

***

# 5.0.0

### **Breaking Changes**

* `blur`, `focus` and `change` outputs have been prefixed with `df` to avoid any interference with native control events bubbling up
(see updated [README.md](https://github.com/udos86/ng-dynamic-forms#form-control-events))
* `asyncValidator` and `validator` properties from `DynamicFormGroupModel` and `DynamicFormArrayModel` 
have been removed and replaced by `asyncValidators` and `validators`
* `groupAsyncValidator` and `groupValidator` properties from `DynamicFormArrayModel` 
have been removed and replaced by `groupAsyncValidators` and `groupValidators`
* `getAsyncValidator()` and `getValidator()` function signatures from `DynamicFormValidationService` have been changed
* `createFormGroup()` function from `DynamicFormService` now accepts `AbstractControlOptions` instead of `extra`

### **Features** 

* **upgrade to Angular 5** (closes [#496](https://github.com/udos86/ng-dynamic-forms/issues/496))
* support for multiple `asyncValidators` and `validators` on `FormArray` and `FormGroup`
* support for `FormHooks` via new property `updateOn` on `DynamicFormControlModel` 
* support for applying both a start **and** end template to a `DynamicFormControlComponent` instead of either / or
* support for updating `validators` and `asyncValidators` at runtime via new `updateValidators()` and `updateAsyncValidators()` functions on `DynamicFormValidationService` (closes [#342](https://github.com/udos86/ng-dynamic-forms/issues/342)) 

### **Bugfixes** 

* `DynamicDateControlModel` now accepts date values of type `object` in order to support proprietary date representations, e.g. `NgbDateStruct` in NG Bootstrap (closes [#556](https://github.com/udos86/ng-dynamic-forms/issues/556))

***

# 1.4.34

This will be the last release before Angular 5.

There'll be a major version incrementation to `5.0.0` to fully stay in sync with Angular version numbers in the future.

### **Features** 

* **major event handling enhancements** (see new chapter on [Form Control Events](https://github.com/udos86/ng-dynamic-forms/tree/development#form-control-events)) 
* **update to @angular/material** `beta.12` 

***

# 1.4.33

### **Bugfixes** 

* **major bundling bug fixed causing `@angular/common` to be bundled with `*.es.js` files**

***

# 1.4.32

### **Features** 

* **NG Dynamic Forms now matches** [**Angular Package Format**](https://docs.google.com/document/d/1CZC2rcpxffTDfRDs6p1cfbmKNLA6x5O-NtkJglDaBVs/edit)
    * this resolves multiple flaws when using AoT build with Angular CLI or `@angular/compiler-cli` (closes [#514](https://github.com/udos86/ng2-dynamic-forms/issues/514))
    * neither TypeScript nor JavaScript source code files are published anymore
* **update to @angular/material** `beta.11` 
    * "md" prefix has been replaced by "mat"
    * see Material [**CHANGELOG.md**](https://github.com/angular/material2/blob/master/CHANGELOG.md) and [**#7253**](https://github.com/angular/material2/issues/7253) on how to upgrade properly  

***

# 1.4.31

### **Announcement** 

:bangbang:**@ng2-dynamic-forms has been renamed to @ng-dynamic-forms**:bangbang:
***
**Please update your dependencies**:
```
npm uninstall @ng2-dynamic-forms/core @ng2-dynamic-forms/ui-<package_name> -S
npm install @ng-dynamic-forms/core @ng-dynamic-forms/ui-<package_name> -S
```
***


# 1.4.30

### **Features** 

* Minor template improvements:
    * full support for grid classes in Basic, Material and Kendo
    * class `k-required` is now automatically added to error messages in Kendo for color styling
    * `<ng-content>` has been removed as it has little benefit and never been officially documented 
* Library code now passes `noUnusedParameters` and `strictNullChecks` TypeScript transpiler checks (closes [#497](https://github.com/udos86/ng2-dynamic-forms/issues/497))
    
***                                                                                               

# 1.4.29

### **Bugfixes** 

* `DynamicValidationService` now correctly resolves alternate validator notation

***

# 1.4.28

### **Features** 

* `options` property added to `ClsConfig` for applying CSS classes to a single option in a radio groups
* **brand new sample forms for Material, Kendo, ng-bootstrap and Prime NG**
* major template improvements for Material, Kendo, ng-bootstrap and Prime NG
* initial support for Spinner and InputMask in `ui-primeng`
* update to ng-bootstrap `beta.4` 

***

# 1.4.27

### **Bugfixes** 

* error messages working again on `FormGroup`s (closes [#475](https://github.com/udos86/ng2-dynamic-forms/issues/475))

***

# 1.4.26

### **Features** 

* **support for Material beta.10** (closes [#479](https://github.com/udos86/ng2-dynamic-forms/issues/479) and [#480](https://github.com/udos86/ng2-dynamic-forms/issues/480))

***

# 1.4.25

### **Features** 

* error messaging template improvements

***

# 1.4.24

### **Features** 

* `indeterminated` support added for `DynamicCheckboxModel` in most UI templates
* update to NG Bootstrap beta.1

***

# 1.4.23

### **Non-Breaking Changes** 

* **new `DynamicFormControlComponent` selectors have been added** 
    * word order has been changed, e.g. `<dynamic-form-bootstrap-control>` becomes `<dynamic-bootstrap-form-control>`
    * old selectors will still work but should be considered deprecated
    * consult **README.md** of UI packages for usage

### **Features** 

* **Introducing the all new `DynamicFormComponent`**
    * available for all UI packages, e.g `<dynamic-bootstrap-form>`
    * makes form markup even more straightforward
    * is now preferred over manually adding `DynamicFormControlComponents` via `*ngFor`  
    * consult updated [**sample code**](https://github.com/udos86/ng2-dynamic-forms/tree/master/example), [**README.md**](https://github.com/udos86/ng2-dynamic-forms/blob/master/README.md) and [**API docs**](http://ng2-dynamic-forms.udos86.de/docs/) for proper usage
 
***

# 1.4.22

### **Features** 
* **NG Bootstrap UI template improvements**: 
    * initial support for native checkbox group via `DynamiCheckboxGroupModel`
    * radio group is working again (closes [#457](https://github.com/udos86/ng2-dynamic-forms/issues/457))
    * CSS class `btn-primary` is not applied automatically anymore 
* update to NG Bootstrap alpha.30

***

# 1.4.21

### **Features** 

* **initial support for Rating controls** in Prime NG UI package via newly introduced model `DynamicRatingModel` 
* `filterable` support for dropdown and multiselect controls in Prime NG UI package (closes [#448](https://github.com/udos86/ng2-dynamic-forms/issues/448)) 
* enhanced datepicker support in NG Bootstrap UI package (closes [#447](https://github.com/udos86/ng2-dynamic-forms/issues/447))

***

# 1.4.20

### **Bugfixes**

* flaws in path resolving and Kendo UI template finally fixed

***

# 1.4.19

### **Minor Breaking Change**

* **path resolving for nested form arrays from `1.4.17` has been removed in favor of a more global approach due to impasses**

### **Bugfixes**

* Kendo form array template bug fixed (closes [#437](https://github.com/udos86/ng2-dynamic-forms/issues/437))

### **Features** 

* `parent` property added for `DynamicFormControlModel` via newly introduced interface `DynamicPathable`
* `getPath()` method added to `DynamicFormService` (see [#414](https://github.com/udos86/ng2-dynamic-forms/issues/414))
* a `DynamicFormArrayGroupModel` can now directly be referenced by a local default template variable (see updated [README.md](https://github.com/udos86/ng2-dynamic-forms#form-arrays))

***

# 1.4.18

### **Minor Breaking Change**

* property `createGroup` of `DynamicFormArrayModel` **has been renamed to `groupFactory` (see updated [README.md](https://github.com/udos86/ng2-dynamic-forms#form-arrays))

### **Features** 

* `parent` and `path` getter added to `DynamicFormArrayGroupModel` (closes [#414](https://github.com/udos86/ng2-dynamic-forms/issues/414)
* Bootstrap CSS class assignment adjusted for checkbox and radio control (closes [#425](https://github.com/udos86/ng2-dynamic-forms/issues/425)

***

# 1.4.17

### **Minor Breaking Change**

* `DynamicFormAutoFillService` **has been refactored to a simple utility class** `AutoFillUtils` (see updated [README.md](https://github.com/udos86/ng2-dynamic-forms#autocompletion))

### **Features** 

* **alternate custom validator notation to support production builds with Angular CLI** (closes [#424](https://github.com/udos86/ng2-dynamic-forms/issues/424) - see updated [README.md](https://github.com/udos86/ng2-dynamic-forms#custom-validators))
* new CSS class config properties `group` and `host` added for more flexible custom layouts
* support for new Foundation XY Grid 
* form array groups are now contained by a `<div>` instead of `<fieldset>` due to CSS Flexbox bug

***

# 1.4.16

### **Minor Breaking Change**

* **custom** `<ng-template>` **input property** `type` **has been renamed to** `as` (currently suported by Kendo UI and Prime NG - see updated [README.md](https://github.com/udos86/ng2-dynamic-forms#custom-templates))

### **Bugfixes**

* Kendo custom templates now working again (closes [#411](https://github.com/udos86/ng2-dynamic-forms/issues/411))

### **Features** 

* datepicker integration in Material UI package has been improved (closes [#407](https://github.com/udos86/ng2-dynamic-forms/issues/407))
* major internal component refactoring (part II of II)

***

# 1.4.15

### **Bugfixes**

* Buggy string enums reset (closes [#409](https://github.com/udos86/ng2-dynamic-forms/issues/409))

***

# 1.4.14

### **Bugfixes**

* Material template bug fixed 

### **Features** 

* major internal component refactoring (part I of II)

***

# 1.4.13

### **Bugfixes**

* `DynamicFormService` imports cleaned up (closes [#402](https://github.com/udos86/ng2-dynamic-forms/issues/402))
* missing text mask dependency added in `package.json` files (closes [#398](https://github.com/udos86/ng2-dynamic-forms/issues/398))

### **Features** 

* initial support for error messsaging in Kendo UI package (closes [#386](https://github.com/udos86/ng2-dynamic-forms/issues/386))

***

# 1.4.12

### **Features** 

* initial [**text mask**](https://github.com/text-mask/text-mask) support for Basic, Bootstrap, Foundation, Ionic and NGBootstrap (closes [#379](https://github.com/udos86/ng2-dynamic-forms/issues/379))
* `DynamicFormControlEvent` has been enhanced by `group` and `context` properties (closes [#378](https://github.com/udos86/ng2-dynamic-forms/issues/378))
* `disabled` input bindings have been completely removed from Kendo UI template 

***

# 1.4.11

### **Bugfixes**

* missing `of` Observable operator import added (closes [#372](https://github.com/udos86/ng2-dynamic-forms/issues/372))

***

# 1.4.10

### **Features** 

* `option` **property of** `DynamicOptionControlModel` **now finally supports** `Observable`s (closes [#165](https://github.com/udos86/ng2-dynamic-forms/issues/165))  
* NG Bootstrap UI template now correctly displays `NgbRadioGroup` (closes [#356](https://github.com/udos86/ng2-dynamic-forms/issues/356))
* update to @angular/material `beta.5` 
* initial datepicker support in Material UI package

***

# 1.4.9

### **Features** 

* **Kendo UI package updated to 1.0.0**
* NG Bootstrap UI template now implements `NgbRadioGroup` (closes [#351](https://github.com/udos86/ng2-dynamic-forms/issues/351))

***

# 1.4.8

### **Features** 

* **All single TypeScript files** are now transpiled to and **published in ES2015 module format**(`**/bundles/*.umd.js` bundle files **are not affected** by this)
* NG Bootstrap template improvements 
* `tabIndex` now supported in `ui-primeng`
* build refactoring 
* sample app now also bundles flawless with Rollup

***

# 1.4.7

### **Bugfixes**

* `FileList` is now correctly read from file inputs (closes [#304](https://github.com/udos86/ng2-dynamic-forms/issues/304))

### **Features** 

* **initial UI support for NG Bootstrap** (closes [#278](https://github.com/udos86/ng2-dynamic-forms/issues/278))
* **npm packages now contain an additional ES bundle for tree-shaking improvements**  
* **new** `DynamicTimePickerModel` **added**
* initial timepicker support in `ui-ionic`, `ui-ng-bootstrap` and `ui-primeng`
* update to PrimeNG `4.0.0` (closes [#340](https://github.com/udos86/ng2-dynamic-forms/issues/340))
* Remaining `noImplicitAny: true` TypeScript errors have been removed (closes [#345](https://github.com/udos86/ng2-dynamic-forms/issues/344))

***

# 1.4.6

### **Features** 

* initial checkbox, input, radio group and textarea support in `ui-kendo`
* `moveFormGroupControl()` function added to `DynamicFormService` (closes [#339](https://github.com/udos86/ng2-dynamic-forms/issues/339))

***

# 1.4.5

### **Breaking Change**

`DynamicDatepickerModel` has been renamed to `DynamicDatePickerModel`

### **Features** 

* `placeholder` property added to `DynamicDateControlModel`
* initial datepicker support in `ui-kendo`

***

# 1.4.4

### **Features** 

* **`DynamicFormBootstrapComponent` now has new `@Input() asBootstrapFormGroup`:**
This is a major improvement to make complex form layouts more easy to achieve. 
By default `form-group` CSS class now **is not set** for nested form models anymore. 

***

# 1.4.3

### **Features** 

* **Initial UI support for Ionic 2** 
* `README.md` files of UI packages now contain form control overview 

***

# 1.4.2

### **Features** 

* **update to Angular Material beta.3** 
* `multiple` now working for `DynamicSelectModel` in `ui-material`
* `md-error` added for `DynamicInputModel` and `DynamicTextareaModel` in `ui-material`

***

# 1.4.1

### **Features** 

* inital support for `DynamicEditorModel` in `ui-primeng` (closes [#317](https://github.com/udos86/ng2-dynamic-forms/issues/317))
* `format` property added to `DynamicDateControl` (closes [#318](https://github.com/udos86/ng2-dynamic-forms/issues/318))
* checkbox and radio button labels are now clickable in `ui-primeng` (closes [#319](https://github.com/udos86/ng2-dynamic-forms/issues/319))
* inital support for `Dateinput` in `ui-kendo` 

***

# 1.4.0

### **Deprecated APIs**

* `[controlGroup]` **input binding of** `DynamicFormControlComponent` **is now deprecated! Use** `[group]` **instead!**

### **Bugfixes** 

* `moduleId` is now removed from distributed component *.ts files (closes [#301](https://github.com/udos86/ng2-dynamic-forms/issues/301))

### **Features** 

* **Update to Angular 4** (closes [#292](https://github.com/udos86/ng2-dynamic-forms/issues/292))

***                      

# 1.3.18

### **Bugfixes** 

* validation messages now working in nested form groups in `ui-material` and `ui-primeng` (closes [#294](https://github.com/udos86/ng2-dynamic-forms/issues/294))


# 1.3.17

### **Features** 

* added `module` and `typings` properties to `package.json` to fix Rollup "MISSING IMPORTS" error (probably closes [#267](https://github.com/udos86/ng2-dynamic-forms/issues/267))
* `DynamicFormArrayModel` typings adjusted (closes [#289](https://github.com/udos86/ng2-dynamic-forms/issues/289))


# 1.3.16

### **Features** 

* custom template support in `ui-primeng` (see example)


# 1.3.15

### **Bugfixes** 

* custom templates are now working in deep nested dynamic form control components (closes [#280](https://github.com/udos86/ng2-dynamic-forms/issues/280))
 
### **Features** 

* `findById()` function of `DynamicFormService` is now capable of looking up nested form group models (closes [#286](https://github.com/udos86/ng2-dynamic-forms/issues/286))
* initial support for `Chips` in `ui-primeng` (closes [#275](https://github.com/udos86/ng2-dynamic-forms/issues/275))
* example code refactored


# 1.3.14

### **Features** 

* custom `NG_VALIDATORS` now working when using Angular CLI without `webpack.config` (closes [#271](https://github.com/udos86/ng2-dynamic-forms/issues/271))
* initial addition of file control models
* initial support for `Upload` in `ui-kendo` 
* update to Angular `2.4.8`
* update to `@angular/material beta.2`


# 1.3.13

### **Features** 

* Template alignment can now be determined by `align` property (closes [#264](https://github.com/udos86/ng2-dynamic-forms/issues/264))
* Templates can now be reused by using `modelType` property (closes [#265](https://github.com/udos86/ng2-dynamic-forms/issues/265))
 

# 1.3.12

### **Bugfixes** 

* dev mode template change detection bug fixed (closes [#266](https://github.com/udos86/ng2-dynamic-forms/issues/280))
 
### **Features** 

* update to Angular `2.4.7`
* update to Prime NG `2.0.0`


# 1.3.11

### **Features** 

* AoT-Compiling is now officially supported
* major template refactoring in all UI modules 
* `max` and `min` support for calendar in `ui-kendo`
* update to Angular `2.4.6`


# 1.3.10

### **Features** 

* initial addition of date control models
* initial support for `Calendar` in `ui-kendo` and `ui-primeng`
* `fromJSON(json: string | Object[])` function refactored to accept raw JSON strings and to revive `Date` objects
* update to Angular `2.4.5`


# 1.3.9

### **Features** 

* functions to add and remove form controls after initialization added in `DynamicFormService` (closes [#252](https://github.com/udos86/ng2-dynamic-forms/issues/252))
* initial support for `AutoComplete`, `MaskedTextBox` and `NumericTextBox` in `ui-kendo`
* update to Angular `2.4.4`


# 1.3.8

### **Features** 

* support for Kendo UI template directives added (see [README.md](https://github.com/udos86/ng2-dynamic-forms#custom-templates), closes [#247](https://github.com/udos86/ng2-dynamic-forms/issues/247))
* initial multi select support added in `ui-kendo`
* update to Angular `2.4.3`


# 1.3.7

### **Features** 

* error messaging enabled in `ui-material` and `ui-primeng` (closes [#240](https://github.com/udos86/ng2-dynamic-forms/issues/240))
* update to Angular `2.4.2` 


# 1.3.6

### **Bugfixes** 

* Caret now visible in Firefox (closes [#237](https://github.com/udos86/ng2-dynamic-forms/issues/237))
 
### **Features** 

* validator properties can now be referenced in error messages (see [README.md](https://github.com/udos86/ng2-dynamic-forms/tree/development#validation-messaging))


# 1.3.5

### **Features** 

* `DynamicFormService` has now a function `moveFormArrayGroup(index: number, step: number, formArray: FormArray, model: DynamicFormArrayModel)` 
to dynamically move form array elements (see updated [**live example**](http://ng2-dynamic-forms.udos86.de/example/))
* `get(index: number)` function added to `DynamicFormArrayGroupModel`
* `[(ngModel)]` could be completely removed from `ui-primeng` template at last 


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
