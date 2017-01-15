import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ReactiveFormsModule, NG_VALIDATORS, FormControl } from "@angular/forms";
import { MaterialModule } from "@angular/material";

import { DynamicFormsCoreModule } from "@ng2-dynamic-forms/core";
import { DynamicFormsBasicUIModule } from "@ng2-dynamic-forms/ui-basic";
import { DynamicFormsBootstrapUIModule } from "@ng2-dynamic-forms/ui-bootstrap";
import { DynamicFormsFoundationUIModule } from "@ng2-dynamic-forms/ui-foundation";
import { DynamicFormsKendoUIModule } from "@ng2-dynamic-forms/ui-kendo";
import { DynamicFormsMaterialUIModule } from "@ng2-dynamic-forms/ui-material";
import { DynamicFormsPrimeNGUIModule } from "@ng2-dynamic-forms/ui-primeng";
import { DynamicFormsSemanticUIModule } from "@ng2-dynamic-forms/ui-semantic";

import { BasicExampleComponent } from "./basic/basic-example.component";
import { BootstrapExampleComponent } from "./bootstrap/bootstrap-example.component";
import { FoundationExampleComponent } from "./foundation/foundation-example.component";
import { KendoExampleComponent } from "./kendo/kendo-example.component";
import { MaterialExampleComponent } from "./material/material-example.component";
import { PrimeNGExampleComponent } from "./primeng/primeng-example.component";
import { SemanticExampleComponent } from "./semantic/semantic-example.component";

import { ValidationMessageComponent } from "./validation-message/validation-message.component";
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';

function testValidator(formControl: FormControl) {

    return {
        testValidator: {
            valid: formControl.value ? <string>formControl.value.startsWith("abc") : false
        }
    };
}

@NgModule({

    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsBasicUIModule,
        DynamicFormsBootstrapUIModule,
        DynamicFormsFoundationUIModule,
        DynamicFormsKendoUIModule,
        DynamicFormsMaterialUIModule,
        DynamicFormsPrimeNGUIModule,
        DynamicFormsSemanticUIModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        BasicExampleComponent,
        BootstrapExampleComponent,
        FoundationExampleComponent,
        KendoExampleComponent,
        MaterialExampleComponent,
        PrimeNGExampleComponent,
        SemanticExampleComponent,
        ValidationMessageComponent,
        AppComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        {provide: NG_VALIDATORS, useValue: testValidator, multi: true}
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}