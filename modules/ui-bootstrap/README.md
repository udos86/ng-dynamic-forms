# ng2 Dynamic Forms Bootstrap UI

## Installation
```
npm install @ng2-dynamic-forms/ui-bootstrap -S
```

## Import
```ts
@NgModule({

    imports: [
        // ...
        ReactiveFormsModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsBootstrapUIModule
    ]
})

export class AppModule {}
```

## Usage
```ts
<form [formGroup]="myFormGroup">

    <dynamic-form-bootstrap-control *ngFor="let controlModel of myFormModel"
                                    [group]="myFormGroup"
                                    [model]="controlModel"></dynamic-form-bootstrap-control>
</form>
```