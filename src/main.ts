import { bootstrapApplication } from "@angular/platform-browser";
import { enableProdMode } from "@angular/core";
import { LocationStrategy, HashLocationStrategy } from "@angular/common";
import { AppComponent } from "./app/app.component";
import { withInterceptorsFromDi, provideHttpClient } from "@angular/common/http";
import { provideAnimations } from "@angular/platform-browser/animations";
import { NG_VALIDATORS, NG_ASYNC_VALIDATORS } from "@angular/forms";
import { provideRouter } from "@angular/router";
import { MAT_CHIPS_DEFAULT_OPTIONS } from "@angular/material/chips";
import { DYNAMIC_VALIDATORS, Validator, ValidatorFactory, DYNAMIC_MATCHER_PROVIDERS } from "@ng-dynamic-forms/core";
import { appRoutes } from "./app/app.routes";
import { customValidator, customDateRangeValidator, customAsyncValidator, customForbiddenValidator } from "./app/app.validators";
import { environment } from "./environments/environment";

if (environment.production) {
    enableProdMode();
}

bootstrapApplication(AppComponent, {
    providers: [
        provideRouter(appRoutes),
        provideAnimations(),
        provideHttpClient(withInterceptorsFromDi()),
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
    ]
})
    .catch(err => console.error(err));
