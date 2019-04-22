import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DynamicFormValidationService } from "./dynamic-form-validation.service";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import {
    STATE_DISABLED,
    STATE_ENABLED,
    STATE_HIDDEN,
    STATE_OPTIONAL,
    STATE_REQUIRED,
    STATE_VISIBLE,
} from "../model/misc/dynamic-form-control-relation.model";
import { findRelationByState, matchesRelation } from "../utils/relation.utils";
import { isObject } from "../utils/core.utils";

@Injectable({
    providedIn: "root"
})
export class DynamicFormRelationService {

    constructor(private validationService: DynamicFormValidationService) {}

    private updateByDisabledRelation(model: DynamicFormControlModel, group: FormGroup): void {

        const relation = findRelationByState(model.relation, [STATE_DISABLED, STATE_ENABLED]);

        if (relation) {
            model.disabledUpdates.next(matchesRelation(relation, group, STATE_DISABLED, STATE_ENABLED));
        }
    }

    private updateByHiddenRelation(model: DynamicFormControlModel, group: FormGroup): void {

        const relation = findRelationByState(model.relation, [STATE_HIDDEN, STATE_VISIBLE]);

        if (relation) {
            model.hidden = matchesRelation(relation, group, STATE_HIDDEN, STATE_VISIBLE);
        }
    }

    private updateByRequiredRelation(model: DynamicFormControlModel, group: FormGroup, control: FormControl): void {

        const relation = findRelationByState(model.relation, [STATE_REQUIRED, STATE_OPTIONAL]);

        if (relation) {

            let validatorsConfig = null;

            if (matchesRelation(relation, group, STATE_REQUIRED, STATE_OPTIONAL)) {

                validatorsConfig = isObject(model.validators) ? {
                    ...model.validators,
                    required: null
                } : {required: null};

            } else {

                if (isObject(model.validators)) {

                    delete model.validators["required"];
                    validatorsConfig = {...model.validators};
                }
            }

            this.validationService.updateValidators(validatorsConfig, control, model);
        }
    }

    getRelatedFormControls(model: DynamicFormControlModel, group: FormGroup): FormControl[] {

        const controls: FormControl[] = [];

        model.relation.forEach(relation => relation.when.forEach(condition => {

            if (model.id === condition.id) {
                throw new Error(`FormControl ${model.id} cannot depend on itself`);
            }

            const control = group.get(condition.id) as FormControl;

            if (control && !controls.some(controlElement => controlElement === control)) {
                controls.push(control);
            }
        }));

        return controls;
    }

    updateByRelations(model: DynamicFormControlModel, control: FormControl, group: FormGroup): void {

        this.updateByDisabledRelation(model, group);
        this.updateByHiddenRelation(model, group);
        this.updateByRequiredRelation(model, group, control);
    }
}
