import { NgModule } from "@angular/core";
import { Http, BaseRequestOptions } from "@angular/http";
import { MdCardModule, MdNativeDateModule } from "@angular/material";
import { MockBackend } from "@angular/http/testing";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { ReactiveFormsModule, NG_VALIDATORS } from "@angular/forms";
import { NgbDatepickerModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";

import { DynamicFormsCoreModule } from "@ng-dynamic-forms/core";
import { DynamicFormsBasicUIModule } from "@ng-dynamic-forms/ui-basic";
import { DynamicFormsBootstrapUIModule } from "@ng-dynamic-forms/ui-bootstrap";
import { DynamicFormsFoundationUIModule } from "@ng-dynamic-forms/ui-foundation";
import { DynamicFormsKendoUIModule } from "@ng-dynamic-forms/ui-kendo";
import { DynamicFormsMaterialUIModule } from "@ng-dynamic-forms/ui-material";
import { DynamicFormsNGBootstrapUIModule } from "@ng-dynamic-forms/ui-ng-bootstrap";
import { DynamicFormsPrimeNGUIModule } from "@ng-dynamic-forms/ui-primeng";

import { BasicSampleFormComponent } from "./basic-sample-form/basic-sample-form.component";
import { BootstrapSampleFormComponent } from "./bootstrap-sample-form/bootstrap-sample-form.component";
import { FoundationSampleFormComponent } from "./foundation-sample-form/foundation-sample-form.component";
import { KendoSampleFormComponent } from "./kendo-sample-form/kendo-sample-form.component";
import { MaterialSampleFormComponent } from "./material-sample-form/material-sample-form.component";
import { NGBootstrapSampleFormComponent } from "./ng-bootstrap-sample-form/ng-bootstrap-sample-form.component";
import { PrimeNGSampleFormComponent } from "./primeng-sample-form/primeng-sample-form.component";

import { ValidationMessageComponent } from "./validation-message/validation-message.component";
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { customValidator, customDateRangeValidator } from "./app.validators";

export function mockBackendFactory(mockBackend: MockBackend, baseRequestOptions: BaseRequestOptions) {
    return new Http(mockBackend, baseRequestOptions);
}

@NgModule({

    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        MdNativeDateModule,
        MdCardModule,
        NgbDatepickerModule.forRoot(),
        NgbTimepickerModule.forRoot(),
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsBasicUIModule,
        DynamicFormsBootstrapUIModule,
        DynamicFormsFoundationUIModule,
        DynamicFormsKendoUIModule,
        DynamicFormsMaterialUIModule,
        DynamicFormsNGBootstrapUIModule,
        DynamicFormsPrimeNGUIModule
    ],
    declarations: [
        BasicSampleFormComponent,
        BootstrapSampleFormComponent,
        FoundationSampleFormComponent,
        KendoSampleFormComponent,
        MaterialSampleFormComponent,
        NGBootstrapSampleFormComponent,
        PrimeNGSampleFormComponent,
        ValidationMessageComponent,
        AppComponent
    ],
    providers: [
        BaseRequestOptions,
        MockBackend,
        {
            provide: Http,
            deps: [MockBackend, BaseRequestOptions],
            useFactory: mockBackendFactory
        },
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: NG_VALIDATORS,
            useValue: customValidator,
            multi: true
        },
        {
            provide: NG_VALIDATORS,
            useValue: customDateRangeValidator,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}