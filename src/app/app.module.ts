import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";
import { MAT_LEGACY_CHIPS_DEFAULT_OPTIONS as MAT_CHIPS_DEFAULT_OPTIONS } from "@angular/material/legacy-chips";
import { MatNativeDateModule } from "@angular/material/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HashLocationStrategy, LocationStrategy } from "@angular/common";
import { NG_ASYNC_VALIDATORS, NG_VALIDATORS, ReactiveFormsModule } from "@angular/forms";
import { NgbDatepickerModule, NgbRatingModule, NgbTimepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { BsDatepickerModule } from "ngx-bootstrap/datepicker";
import { TimepickerModule } from "ngx-bootstrap/timepicker";
import {
    DYNAMIC_VALIDATORS,
    DynamicFormsCoreModule,
    Validator,
    ValidatorFactory,
    DYNAMIC_MATCHER_PROVIDERS
} from "@ng-dynamic-forms/core";
import { DynamicFormsBasicUIModule } from "@ng-dynamic-forms/ui-basic";
import { DynamicFormsFoundationUIModule } from "@ng-dynamic-forms/ui-foundation";
import { DynamicFormsMaterialUIModule } from "@ng-dynamic-forms/ui-material";
import { DynamicFormsNGBootstrapUIModule } from "@ng-dynamic-forms/ui-ng-bootstrap";
import { DynamicFormsNGxBootstrapUIModule } from "@ng-dynamic-forms/ui-ngx-bootstrap";
import { DynamicFormsPrimeNGUIModule } from "@ng-dynamic-forms/ui-primeng";

import { BasicSampleFormComponent } from "./ui-basic/basic-sample-form.component";
import { FoundationSampleFormComponent } from "./ui-foundation/foundation-sample-form.component";
import { MaterialSampleFormComponent } from "./ui-material/material-sample-form.component";
import { NGBootstrapSampleFormComponent } from "./ui-ng-bootstrap/ng-bootstrap-sample-form.component";
import { NgxBootstrapSampleFormComponent } from "./ui-ngx-bootstrap/ngx-bootstrap-sample-form.component";
import { PrimeNGSampleFormComponent } from "./ui-primeng/primeng-sample-form.component";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import {
    customAsyncValidator,
    customDateRangeValidator,
    customForbiddenValidator,
    customValidator
} from "./app.validators";
import { NgxMaskModule } from "ngx-mask";

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        MatNativeDateModule,
        MatCardModule,
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        NgbDatepickerModule,
        NgbRatingModule,
        NgbTimepickerModule,
        NgxMaskModule.forRoot(),
        DynamicFormsCoreModule.forRoot(),
        DynamicFormsBasicUIModule,
        DynamicFormsFoundationUIModule,
        DynamicFormsMaterialUIModule,
        DynamicFormsNGBootstrapUIModule,
        DynamicFormsNGxBootstrapUIModule,
        DynamicFormsPrimeNGUIModule
    ],
    declarations: [
        BasicSampleFormComponent,
        NgxBootstrapSampleFormComponent,
        FoundationSampleFormComponent,
        MaterialSampleFormComponent,
        NGBootstrapSampleFormComponent,
        PrimeNGSampleFormComponent,
        AppComponent
    ],
    providers: [
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
        },
        {
            provide: NG_ASYNC_VALIDATORS,
            useValue: customAsyncValidator,
            multi: true
        },
        {
            provide: DYNAMIC_VALIDATORS,
            useValue: new Map<string, Validator | ValidatorFactory>([
                ["customValidator", customValidator],
                ["customDateRangeValidator", customDateRangeValidator],
                ["customForbiddenValidator", customForbiddenValidator],
                ["customAsyncValidator", customAsyncValidator]
            ])
        },
        ...DYNAMIC_MATCHER_PROVIDERS,
        {
            provide: MAT_CHIPS_DEFAULT_OPTIONS,
            useValue: {
                separatorKeyCodes: [13, 188]
            }
        }
    ],
    bootstrap: [AppComponent]
})

export class AppModule {
}
