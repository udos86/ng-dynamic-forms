import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BasicExampleComponent} from "./basic/basic-example.component";
import {BootstrapExampleComponent} from "./bootstrap/bootstrap-example.component";
import {FoundationExampleComponent} from "./foundation/foundation-example.component";
import {MaterialExampleComponent} from "./material/material-example.component";
import {PrimeNGExampleComponent} from "./primeng/primeng-example.component";
import{AppComponent}  from './app.component';
import {routing, appRoutingProviders} from './app.routes';

@NgModule({

    imports: [BrowserModule, FormsModule, ReactiveFormsModule, RouterModule, routing],
    declarations: [BasicExampleComponent, BootstrapExampleComponent, FoundationExampleComponent,
        PrimeNGExampleComponent, AppComponent],
    providers: [appRoutingProviders],
    bootstrap: [AppComponent]
})

export class AppModule {
}