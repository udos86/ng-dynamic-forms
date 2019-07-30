import { Inject, Injectable, Injector, Optional } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DYNAMIC_MATCHERS, DynamicFormControlMatcher } from "./dynamic-form-relation.matchers";
import {
    AND_OPERATOR,
    DynamicFormControlRelation,
    OR_OPERATOR
} from "../model/misc/dynamic-form-control-relation.model";
import { startWith } from "rxjs/operators";
import { merge, Subscription } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class DynamicFormRelationService {

    constructor(@Optional() @Inject(DYNAMIC_MATCHERS) private DYNAMIC_MATCHERS: DynamicFormControlMatcher[],
                private injector: Injector) {}

    getRelatedFormControls(model: DynamicFormControlModel, group: FormGroup): { [key: string]: FormControl } {

        const conditionReducer = (controls, condition) => {

            const key = condition.rootPath || condition.id;

            if (!controls.hasOwnProperty(key)) {

                const control = condition.rootPath ? group.root.get(condition.rootPath) : group.get(condition.id);

                control instanceof AbstractControl ? controls[key] = control : console.warn(`No related form control with id ${condition.id} could be found`);
            }

            return controls;
        };

        const relationReducer = (controls, relation) => relation.when.reduce(conditionReducer, controls);

        return model.relations.reduce(relationReducer, {});
    }

    findRelationByMatcher(relations: DynamicFormControlRelation[], matcher: DynamicFormControlMatcher): DynamicFormControlRelation | undefined {
        return relations.find(relation => [matcher.match, matcher.opposingMatch].includes(relation.match));
    }

    matchesCondition(relation: DynamicFormControlRelation, relatedControl: FormControl, matcher: DynamicFormControlMatcher): boolean {

        const operator = relation.operator || OR_OPERATOR;

        return relation.when.reduce((hasAlreadyMatched, condition, index) => {

            if (relation.match === matcher.match) {

                if (index > 0 && operator === AND_OPERATOR && !hasAlreadyMatched) {
                    return false;
                }

                if (index > 0 && operator === OR_OPERATOR && hasAlreadyMatched) {
                    return true;
                }

                return condition.value === relatedControl.value || condition.status === relatedControl.status;
            }

            if (relation.match === matcher.opposingMatch) {

                if (index > 0 && operator === AND_OPERATOR && hasAlreadyMatched) {
                    return true;
                }

                if (index > 0 && operator === OR_OPERATOR && !hasAlreadyMatched) {
                    return false;
                }

                return !(condition.value === relatedControl.value || condition.status === relatedControl.status);
            }

            return false;

        }, false);
    }

    subscribeRelations(model: DynamicFormControlModel, group: FormGroup, control: FormControl): Subscription[] {

        const relatedFormControls = this.getRelatedFormControls(model, group), subscriptions: Subscription[] = [];

        Object.entries(relatedFormControls).forEach(([_key, relatedControl]) => {

            const valueChanges = relatedControl.valueChanges.pipe(startWith(relatedControl.value));
            const statusChanges = relatedControl.statusChanges.pipe(startWith(relatedControl.status));

            subscriptions.push(merge(valueChanges, statusChanges).subscribe(() => {

                this.DYNAMIC_MATCHERS.forEach(matcher => {

                    const relation = this.findRelationByMatcher(model.relations, matcher);

                    if (relation) {

                        const hasMatch = this.matchesCondition(relation, relatedControl, matcher);
                        matcher.onChange(hasMatch, model, control, this.injector);
                    }
                });
            }));
        });

        return subscriptions;
    }
}
