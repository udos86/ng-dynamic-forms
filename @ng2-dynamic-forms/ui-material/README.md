#ng2 Dynamic Forms Material UI

## Usage

Please import all `@angular2-material` `NgModule`s in your app root `NgModule`:

```ts
@NgModule({

    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        appRouting,
        DynamicFormsMaterialUIModule,
        MdButtonModule.forRoot(),
        MdCheckboxModule.forRoot(),
        MdInputModule.forRoot(),
        MdRadioModule.forRoot(),
    ],
    declarations: [
        //...
    ],
    providers: [
        //...
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}
```