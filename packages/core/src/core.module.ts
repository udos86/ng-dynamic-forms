import { CommonModule } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicIdDirective } from "./directive/dynamic-id.directive";
import { DynamicListDirective } from "./directive/dynamic-list.directive";
import { DynamicTemplateDirective } from "./directive/dynamic-template.directive";
import { DynamicFormService } from "./service/dynamic-form.service";
import { DynamicFormLayoutService } from "./service/dynamic-form-layout.service";
import { DynamicFormValidationService } from "./service/dynamic-form-validation.service";
import { DynamicFormInstancesService } from "./service/dynamic-form-instances.service";
import { DynamicFormInstancesDummyService } from "./service/dynamic-form-instances-dummy.service";
import { DynamicFormInstancesExplicitService } from "./service/dynamic-form-instances-explicit.service";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        DynamicIdDirective,
        DynamicListDirective,
        DynamicTemplateDirective
    ],
    exports: [
        DynamicIdDirective,
        DynamicListDirective,
        DynamicTemplateDirective
    ]
})
export class DynamicFormsCoreModule {

    static forRoot(withInstanceService = false): ModuleWithProviders {

        return {
            ngModule: DynamicFormsCoreModule,

            providers: [
                DynamicFormService,
                DynamicFormLayoutService,
                DynamicFormValidationService,
                withInstanceService ? {
                    provide: DynamicFormInstancesService,
                    useClass: DynamicFormInstancesExplicitService
                } : {
                    provide: DynamicFormInstancesService,
                    useClass: DynamicFormInstancesDummyService
                }
            ]
        };
    }
}
