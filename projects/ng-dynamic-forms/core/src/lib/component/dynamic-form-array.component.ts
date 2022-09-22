import { QueryList } from "@angular/core";
import { UntypedFormArray } from "@angular/forms";
import { DynamicFormControlComponent } from "./dynamic-form-control.component";
import { DynamicTemplateDirective } from "../directive/dynamic-template.directive";
import { DynamicFormArrayModel } from "../model/form-array/dynamic-form-array.model";
import { DynamicFormControlContainerComponent } from "./dynamic-form-control-container.component";

export abstract class DynamicFormArrayComponent extends DynamicFormControlComponent {
    components!: QueryList<DynamicFormControlContainerComponent>;
    model!: DynamicFormArrayModel;
    templates?: QueryList<DynamicTemplateDirective>;

    get array(): UntypedFormArray {
        return this.control as UntypedFormArray;
    }

    get startTemplate(): DynamicTemplateDirective | undefined {
        return this.layoutService.getStartTemplate(this.model, this.templates);
    }

    get endTemplate(): DynamicTemplateDirective | undefined {
        return this.layoutService.getEndTemplate(this.model, this.templates);
    }

    markForCheck() {
        if (this.components instanceof QueryList) {
            this.components.forEach(component => component.markForCheck());
        }
    }
}
