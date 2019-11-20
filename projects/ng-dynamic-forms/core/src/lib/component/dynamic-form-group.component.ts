import { DynamicFormControlComponent } from "./dynamic-form-control.component";
import { DynamicFormGroupModel } from "../model/form-group/dynamic-form-group.model";
import { QueryList } from "@angular/core";
import { DynamicFormControlContainerComponent } from "./dynamic-form-control-container.component";

export abstract class DynamicFormGroupComponent extends DynamicFormControlComponent {

    components: QueryList<DynamicFormControlContainerComponent>;
    model: DynamicFormGroupModel;
}
