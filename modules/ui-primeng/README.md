# ng2 Dynamic Forms Bootstrap UI

## Installation
```
npm install @ng2-dynamic-forms/ui-primeng -S
```

## Import
```ts
@NgModule({

    imports: [
        // ...
        ReactiveFormsModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsPrimeNGUIModule
    ]
})

export class AppModule {}
```

## Usage
```ts
<form [formGroup]="myFormGroup">

    <dynamic-form-primeng-control *ngFor="let controlModel of myFormModel"
                                  [group]="myFormGroup"
                                  [model]="controlModel"></dynamic-form-primeng-control>
</form>
```