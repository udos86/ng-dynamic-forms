import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlCondition,
    DynamicFormControlRelation,
    AND_OPERATOR,
    OR_OPERATOR
} from "../model/misc/dynamic-form-control-relation.model";

export function findRelationByState(relations: DynamicFormControlRelation[], states: String[]): DynamicFormControlRelation | null {

    const relation = relations.find(relation => {
        return states.some(state => state === relation.action);
    });

    return relation || null;
}

export function matchesRelation(relation: DynamicFormControlRelation, group: FormGroup, matchState: String, oppositeState: String): boolean {

    const operator = relation.connective || OR_OPERATOR;

    return relation.when.reduce((hasMatched: boolean, condition: DynamicFormControlCondition, index: number) => {

        const relatedControl = group.get(condition.id);

        if (relatedControl && relation.action === matchState) {

            if (index > 0 && operator === AND_OPERATOR && !hasMatched) {
                return false;
            }

            if (index > 0 && operator === OR_OPERATOR && hasMatched) {
                return true;
            }

            return condition.value === relatedControl.value || condition.status === relatedControl.status;
        }

        if (relatedControl && relation.action === oppositeState) {

            if (index > 0 && operator === AND_OPERATOR && hasMatched) {
                return true;
            }

            if (index > 0 && operator === OR_OPERATOR && !hasMatched) {
                return false;
            }

            return !(condition.value === relatedControl.value || condition.status === relatedControl.status);
        }

        return false;

    }, false);
}
