import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";
import {RouterModule} from '@angular/router';

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
        MaterialModule.forRoot()
    ],
    declarations: [
        BasicExampleComponent,
        BootstrapExampleComponent,
        FoundationExampleComponent,
        MaterialExampleComponent,
        PrimeNGExampleComponent,
        AppComponent
    ],
    providers: [
        appRoutingProviders,
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}