# ng2 Dynamic Forms Material UI

## Installation
```
npm install @ng2-dynamic-forms/ui-material -S
```

## Import
```ts
@NgModule({

    imports: [
        // ...
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsMaterialUIModule
    ]
})

export class AppModule {}
```

## Usage
```ts
<form [formGroup]="myFormGroup">

    <dynamic-form-material-control *ngFor="let controlModel of myFormModel"
                                   [group]="myFormGroup"
                                   [model]="controlModel"></dynamic-form-material-control>
</form>
```