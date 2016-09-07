import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MdButtonModule} from "@angular2-material/button";
import {MdCheckboxModule} from "@angular2-material/checkbox";
import {MdInputModule} from "@angular2-material/input";
import {MdRadioModule} from "@angular2-material/radio";

import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormsBasicUIModule} from "@ng2-dynamic-forms/ui-basic";
import {DynamicFormsBootstrapUIModule} from "@ng2-dynamic-forms/ui-bootstrap";
import {DynamicFormsFoundationUIModule} from "@ng2-dynamic-forms/ui-foundation";
import {DynamicFormsMaterialUIModule} from "@ng2-dynamic-forms/ui-material";
import {DynamicFormsPrimeNGUIModule} from "@ng2-dynamic-forms/ui-primeng";

import {BasicExampleComponent} from "./basic/basic-example.component";
import {BootstrapExampleComponent} from "./bootstrap/bootstrap-example.component";
import {FoundationExampleComponent} from "./foundation/foundation-example.component";
import {MaterialExampleComponent} from "./material/material-example.component";
import {PrimeNGExampleComponent} from "./primeng/primeng-example.component";

import {appRouting, appRoutingProviders} from './app.routing';
import {AppComponent} from './app.component';

@NgModule({

    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        appRouting,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsBasicUIModule,
        DynamicFormsBootstrapUIModule,
        DynamicFormsFoundationUIModule,
        DynamicFormsMaterialUIModule,
        DynamicFormsPrimeNGUIModule,
        MdButtonModule.forRoot(),
        MdCheckboxModule.forRoot(),
        MdInputModule.forRoot(),
        MdRadioModule.forRoot()
    ],
    declarations: [
        BasicExampleComponent,
        BootstrapExampleComponent,
        FoundationExampleComponent,
        MaterialExampleComponent,
        PrimeNGExampleComponent,
        AppComponent
    ],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})

export class AppModule {
}