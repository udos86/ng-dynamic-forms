import { Injectable } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DynamicFormValidationService } from "./dynamic-form-validation.service";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicFormControlRelation } from "../model/misc/dynamic-form-control-relation.model";
import {
    findDisabledRelation, findHiddenRelation,
    findRequiredRelation,
    matchesDisabledRelation,
    matchesHiddenRelation,
    matchesRequiredRelation
} from "../utils/relation.utils";
import { isObject } from "../utils/core.utils";

@Injectable({
    providedIn: "root"
})
export class DynamicFormRelationService {

    constructor(private validationService: DynamicFormValidationService) {}

    private updateByDisabledRelation(model: DynamicFormControlModel, group: FormGroup, relation: DynamicFormControlRelation): void {
        model.disabledUpdates.next(matchesDisabledRelation(relation, group));
    }

    private updateByHiddenRelation(model: DynamicFormControlModel, group: FormGroup, relation: DynamicFormControlRelation): void {
        model.hidden = matchesHiddenRelation(relation, group);
    }

    private updateByRequiredRelation(model: DynamicFormControlModel, control: FormControl, group: FormGroup, relation: DynamicFormControlRelation): void {

        let validatorsConfig = null;

        if (matchesRequiredRelation(relation, group)) {

            validatorsConfig = isObject(model.validators) ? {...model.validators, required: null} : {required: null};

        } else {

            if (isObject(model.validators)) {

                delete model.validators["required"];
                validatorsConfig = {...model.validators};
            }
        }

        this.validationService.updateValidators(validatorsConfig, control, model);
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

    updateByRelation(model: DynamicFormControlModel, control: FormControl, group: FormGroup): void {

        const disabledRelation = findDisabledRelation(model.relation);
        const hiddenRelation = findHiddenRelation(model.relation);
        const requiredRelation = findRequiredRelation(model.relation);

        if (disabledRelation) {
            this.updateByDisabledRelation(model, group, disabledRelation);
        }

        if (hiddenRelation) {
            this.updateByHiddenRelation(model, group, hiddenRelation);
        }

        if (requiredRelation) {
            this.updateByRequiredRelation(model, control, group, requiredRelation);
        }
    }
}
