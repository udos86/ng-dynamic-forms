# beta.3

### **Breaking Changes**

* default value for `autocomplete` property of `DynamicFormControlModel` is now `on` instead of `off`
* `text` property of `DynamicFormOption` renamed to `label`

### **Features**

* constants and validator added for new HTML5 [autofill detail tokens](https://html.spec.whatwg.org/multipage/forms.html#autofill)


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
