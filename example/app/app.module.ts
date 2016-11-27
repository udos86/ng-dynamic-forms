import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "@angular/material";

import {DynamicFormsCoreModule} from "@ng2-dynamic-forms/core";
import {DynamicFormsBasicUIModule} from "@ng2-dynamic-forms/ui-basic";
import {DynamicFormsBootstrapUIModule} from "@ng2-dynamic-forms/ui-bootstrap";
import {DynamicFormsFoundationUIModule} from "@ng2-dynamic-forms/ui-foundation";
//import {DynamicFormsKendoUIModule} from "@ng2-dynamic-forms/ui-kendo";
import {DynamicFormsMaterialUIModule} from "@ng2-dynamic-forms/ui-material";
import {DynamicFormsPrimeNGUIModule} from "@ng2-dynamic-forms/ui-primeng";

import {BasicExampleComponent} from "./basic/basic-example.component";
import {BootstrapExampleComponent} from "./bootstrap/bootstrap-example.component";
import {FoundationExampleComponent} from "./foundation/foundation-example.component";
//import {KendoExampleComponent} from "./kendo/kendo-example.component";
import {MaterialExampleComponent} from "./material/material-example.component";
import {PrimeNGExampleComponent} from "./primeng/primeng-example.component";

import {AppRoutingModule} from './app.routing.module';
import {AppComponent} from './app.component';

@NgModule({

    imports: [
        BrowserModule,
        ReactiveFormsModule,
        AppRoutingModule,
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsBasicUIModule,
        DynamicFormsBootstrapUIModule,
        DynamicFormsFoundationUIModule,
        //DynamicFormsKendoUIModule,
        DynamicFormsMaterialUIModule,
        DynamicFormsPrimeNGUIModule,
        MaterialModule.forRoot()
    ],
    declarations: [
        BasicExampleComponent,
        BootstrapExampleComponent,
        FoundationExampleComponent,
        //KendoExampleComponent,
        MaterialExampleComponent,
        PrimeNGExampleComponent,
        AppComponent
    ],
    providers: [
        {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}