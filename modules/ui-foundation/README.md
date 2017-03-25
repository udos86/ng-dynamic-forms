# ng2 Dynamic Forms Foundation UI

## Installation
```
npm install @ng2-dynamic-forms/ui-foundation -S
```

## Import
```ts
@NgModule({

    imports: [
        // ...
        ReactiveFormsModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsFoundationUIModule
    ]
})

export class AppModule {}
```

## Usage
```ts
<form [formGroup]="myFormGroup">

    <dynamic-form-foundation-sites-control *ngFor="let controlModel of myFormModel"
                                           [group]="myFormGroup"
                                           [model]="controlModel"></dynamic-form-foundation-sites-control>
</form>
```