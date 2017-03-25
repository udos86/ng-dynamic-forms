# ng2 Dynamic Forms Kendo UI

## Installation
```
npm install @ng2-dynamic-forms/ui-kendo -S
```

## Import
```ts
@NgModule({

    imports: [
        // ...
        ReactiveFormsModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsKendoUIModule
    ]
})

export class AppModule {}
```

## Usage
```ts
<form [formGroup]="myFormGroup">

    <dynamic-form-kendo-control *ngFor="let controlModel of myFormModel"
                                [group]="myFormGroup"
                                [model]="controlModel"></dynamic-form-kendo-control>
</form>
```