import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {DynamicFormsBasicModule} from "@ng2-dynamic-forms/ui-basic";
import {DynamicFormsBootstrapModule} from "@ng2-dynamic-forms/ui-bootstrap";
import {DynamicFormsFoundationModule} from "@ng2-dynamic-forms/ui-foundation";
import {DynamicFormsMaterialModule} from "@ng2-dynamic-forms/ui-material";
import {DynamicFormsPrimeNGModule} from "@ng2-dynamic-forms/ui-primeng";

import {BasicExampleComponent} from "./basic/basic-example.component";
import {BootstrapExampleComponent} from "./bootstrap/bootstrap-example.component";
import {FoundationExampleComponent} from "./foundation/foundation-example.component";
import {MaterialExampleComponent} from "./material/material-example.component";
import {PrimeNGExampleComponent} from "./primeng/primeng-example.component";

import {routing, appRoutingProviders} from './app.routes';
import{AppComponent}  from './app.component';

@NgModule({

    imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule, routing, DynamicFormsBasicModule,
        DynamicFormsBootstrapModule, DynamicFormsFoundationModule, DynamicFormsMaterialModule,
        DynamicFormsPrimeNGModule],
    declarations: [BasicExampleComponent, BootstrapExampleComponent, FoundationExampleComponent,
        MaterialExampleComponent, PrimeNGExampleComponent, AppComponent],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})

export class AppModule {
}