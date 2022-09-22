import { Inject, Injectable, Injector, Optional } from "@angular/core";
import { UntypedFormControl, UntypedFormGroup } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import {
    AND_OPERATOR,
    DYNAMIC_MATCHERS,
    DynamicFormControlMatcher,
    OR_OPERATOR
} from "./dynamic-form-relation-matchers";
import { DynamicFormControlCondition, DynamicFormControlRelation } from "../model/misc/dynamic-form-control-relation.model";
import { distinctUntilChanged, startWith } from "rxjs/operators";
import { merge, Subscription } from "rxjs";
import { isString } from "../utils/core.utils";

export type DynamicRelatedFormControls = { [path: string]: UntypedFormControl };

@Injectable({
    providedIn: "root"
})
export class DynamicFormRelationService {

    constructor(@Optional() @Inject(DYNAMIC_MATCHERS) private MATCHERS: DynamicFormControlMatcher[], private injector: Injector) {
    }

    getRelatedFormControls(model: DynamicFormControlModel, group: UntypedFormGroup): DynamicRelatedFormControls {
        const conditionReducer = (controls: DynamicRelatedFormControls, condition: DynamicFormControlCondition) => {
            const path = condition.rootPath ?? condition.id;

            if (isString(path) && !controls.hasOwnProperty(path)) {
                const control = condition.rootPath ? group.root.get(condition.rootPath) : group.get(condition.id!);
                control instanceof UntypedFormControl ?
                    controls[path] = control : console.warn(`No related form control with id ${condition.id} could be found`);
            }

            return controls;
        };

        const relationReducer = (controls: DynamicRelatedFormControls, relation: DynamicFormControlRelation) =>
            relation.when.reduce(conditionReducer, controls);

        return model.relations.reduce(relationReducer, {});
    }

    findRelationByMatcher(relations: DynamicFormControlRelation[],
                          matcher: DynamicFormControlMatcher): DynamicFormControlRelation | undefined {
        return relations.find(relation => [matcher.match, matcher.opposingMatch].includes(relation.match));
    }

    matchesCondition(relation: DynamicFormControlRelation,
                     relatedFormControls: DynamicRelatedFormControls,
                     matcher: DynamicFormControlMatcher): boolean {
        const operator = relation.operator ?? OR_OPERATOR;

        return relation.when.reduce<boolean>((hasMatched, condition, index) => {
            const path = condition.rootPath ?? condition.id;
            let relatedFormControl;

            for (const [key, control] of Object.entries(relatedFormControls)) {
                if (key === path) {
                    relatedFormControl = control;
                    break;
                }
            }

            if (relatedFormControl && relation.match === matcher.match) {
                if (index > 0 && operator === AND_OPERATOR && !hasMatched) {
                    return false;
                }

                if (index > 0 && operator === OR_OPERATOR && hasMatched) {
                    return true;
                }

                return condition.value === relatedFormControl.value || condition.status === relatedFormControl.status;
            }

            if (relatedFormControl && relation.match === matcher.opposingMatch) {
                if (index > 0 && operator === AND_OPERATOR && hasMatched) {
                    return true;
                }

                if (index > 0 && operator === OR_OPERATOR && !hasMatched) {
                    return false;
                }

                return !(condition.value === relatedFormControl.value || condition.status === relatedFormControl.status);
            }

            return false;

        }, false);
    }

    subscribeRelations(model: DynamicFormControlModel, group: UntypedFormGroup, control: UntypedFormControl): Subscription[] {
        const relatedFormControls = this.getRelatedFormControls(model, group);
        const subscriptions: Subscription[] = [];

        Object.values(relatedFormControls).forEach(relatedControl => {
            const valueChanges = relatedControl.valueChanges.pipe(startWith(relatedControl.value), distinctUntilChanged());
            const statusChanges = relatedControl.statusChanges.pipe(startWith(relatedControl.status), distinctUntilChanged());

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
