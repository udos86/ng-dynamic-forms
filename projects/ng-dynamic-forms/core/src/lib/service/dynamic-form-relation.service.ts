import { Inject, Injectable, Injector, Optional } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import {
    AND_OPERATOR,
    DYNAMIC_MATCHERS,
    DynamicFormControlMatcher,
    OR_OPERATOR
} from "./dynamic-form-relation-matchers";
import { DynamicFormControlRelation } from "../model/misc/dynamic-form-control-relation.model";
import { startWith } from "rxjs/operators";
import { merge, Subscription } from "rxjs";

export type DynamicRelatedFormControls = { [key: string]: FormControl };

@Injectable({
    providedIn: "root"
})
export class DynamicFormRelationService {

    constructor(@Optional() @Inject(DYNAMIC_MATCHERS) private MATCHERS: DynamicFormControlMatcher[],
                private injector: Injector) {
    }

    getRelatedFormControls(model: DynamicFormControlModel, group: FormGroup): DynamicRelatedFormControls {

        const conditionReducer = (controls, condition) => {

            const path = condition.rootPath ?? condition.id;

            if (!controls.hasOwnProperty(path)) {

                const control = condition.rootPath ? group.root.get(condition.rootPath) : group.get(condition.id);

                control instanceof FormControl ? controls[path] = control : console.warn(`No related form control with id ${condition.id} could be found`);
            }

            return controls;
        };

        const relationReducer = (controls, relation) => relation.when.reduce(conditionReducer, controls);

        return model.relations.reduce(relationReducer, {});
    }

    findRelationByMatcher(relations: DynamicFormControlRelation[], matcher: DynamicFormControlMatcher): DynamicFormControlRelation | undefined {
        return relations.find(relation => [matcher.match, matcher.opposingMatch].includes(relation.match));
    }

    matchesCondition(relation: DynamicFormControlRelation, relatedFormControls: DynamicRelatedFormControls, matcher: DynamicFormControlMatcher): boolean {

        const operator = relation.operator ?? OR_OPERATOR;

        return relation.when.reduce((hasAlreadyMatched, condition, index) => {

            const path = condition.rootPath ?? condition.id;

            let relatedFormControl;

            for (const [key, control] of Object.entries(relatedFormControls)) {
                if (key === path) {
                    relatedFormControl = control;
                    break;
                }
            }

            if (relatedFormControl && relation.match === matcher.match) {

                if (index > 0 && operator === AND_OPERATOR && !hasAlreadyMatched) {
                    return false;
                }

                if (index > 0 && operator === OR_OPERATOR && hasAlreadyMatched) {
                    return true;
                }

                return condition.value === relatedFormControl.value ?? condition.status === relatedFormControl.status;
            }

            if (relatedFormControl && relation.match === matcher.opposingMatch) {

                if (index > 0 && operator === AND_OPERATOR && hasAlreadyMatched) {
                    return true;
                }

                if (index > 0 && operator === OR_OPERATOR && !hasAlreadyMatched) {
                    return false;
                }

                return !(condition.value === relatedFormControl.value ?? condition.status === relatedFormControl.status);
            }

            return false;

        }, false);
    }

    subscribeRelations(model: DynamicFormControlModel, group: FormGroup, control: FormControl): Subscription[] {

        const relatedFormControls = this.getRelatedFormControls(model, group);
        const subscriptions: Subscription[] = [];

        Object.values(relatedFormControls).forEach(relatedControl => {

            const valueChanges = relatedControl.valueChanges.pipe(startWith(relatedControl.value));
            const statusChanges = relatedControl.statusChanges.pipe(startWith(relatedControl.status));

            subscriptions.push(merge(valueChanges, statusChanges).subscribe(() => {

                this.MATCHERS.forEach(matcher => {

                    const relation = this.findRelationByMatcher(model.relations, matcher);

                    if (relation !== undefined) {

                        const hasMatch = this.matchesCondition(relation, relatedFormControls, matcher);
                        matcher.onChange(hasMatch, model, control, this.injector);
                    }
                });
            }));
        });

        return subscriptions;
    }
}
