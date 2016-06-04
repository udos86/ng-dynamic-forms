# ng2 Dynamic Forms (alpha.1)

ng2 Dynamic Forms is a rapid form development library based on the official Angular 2
[**dynamic form cookbook**](https://angular.io/docs/ts/latest/cookbook/dynamic-form.html).
It simplifies all the hard, troublesome work of implementing handcrafted forms by building
upon a layer of non-redundant object models.
It also provides a flexible system of dynamic ui components with out of the box support for
**Angular 2 Material** and **Bootstrap**.

##Getting Started

**Install the core package:**
```
npm install @ng2-dynamic-forms/core --save
```
**Choose your ui library**, e.g. Angular 2 Material, **and install the corresponding package:**
```
npm install @ng2-dynamic-forms/ui-material --save
```
**When using SystemJS, update your configuration file**:
```
var map = {

    // ...here goes all the rest

    "@ng2-dynamic-forms": "node_modules/@ng2-dynamic-forms"
};

var ng2DynamicFormsPackageNames = [

    "@ng2-dynamic-forms/core",
    "@ng2-dynamic-forms/ui-material"
];

ng2DynamicFormsPackageNames.forEach(function (packageName) {

    packages[packageName] = {
        main: "index.js",
        defaultExtension: "js"
    };
});
```

**Define your dynamic form model:**
```
export const MY_DYNAMIC_FORM_MODEL = new DynamicFormModel([

    new DynamicFormTextInputModel({

        id: "exampleInput",
        label: "Example Input",
        maxLength: 42,
        placeholder: "example input",
    }),

    new DynamicFormCheckboxModel({

        hideLabel: true,
        id: "exampleCheckbox",
        label: "I do agree",
        text: "I do agree"
    })
]);
```
**Create the form and plug in your ui component:**

```
@Component({

    directives: [FORM_DIRECTIVES, DynamicFormMaterialControlComponent],
    moduleId: module.id,
    providers: [DynamicFormService],
    selector: "dynamic-form",
    templateUrl: "./dynamic-form.component.html",
})

export class DynamicFormComponent implements OnInit {

    dynamicFormModel: DynamicFormModel = MY_DYNAMIC_FORM_MODEL;
    form: ControlGroup;

    constructor(private dynamicFormService: DynamicFormService) {}

    ngOnInit() {
        this.form = this.dynamicFormService.createControlGroup(this.dynamicFormModel);
    }
}
```

**Add the ui component to your template:**
```
<form [ngFormModel]="form">

    <div *ngFor="let controlModel of dynamicFormModel.model" class="form-row">

        <dynamic-form-material-control [model]="controlModel"
                                       [form]="form">
        </dynamic-form-material-control>

    </div>

    ...

</form>
```
