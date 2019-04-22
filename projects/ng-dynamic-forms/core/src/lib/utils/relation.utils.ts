import { FormGroup } from "@angular/forms";
import {
    DynamicFormControlCondition,
    DynamicFormControlRelation,
    DYNAMIC_FORM_CONTROL_STATE_DISABLED,
    DYNAMIC_FORM_CONTROL_STATE_ENABLED,
    DYNAMIC_FORM_CONTROL_STATE_HIDDEN,
    DYNAMIC_FORM_CONTROL_STATE_REQUIRED,
    DYNAMIC_FORM_CONTROL_STATE_VISIBLE,
    DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_AND,
    DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_OR
} from "../model/misc/dynamic-form-control-relation.model";

export function findDisabledRelation(relations: DynamicFormControlRelation[]): DynamicFormControlRelation | null {

    const relation = relations.find(relation => {
        return relation.action === DYNAMIC_FORM_CONTROL_STATE_DISABLED || relation.action === DYNAMIC_FORM_CONTROL_STATE_ENABLED;
    });

    return relation || null;
}

export function findHiddenRelation(relations: DynamicFormControlRelation[]): DynamicFormControlRelation | null {

    const relation = relations.find(relation => {
        return relation.action === DYNAMIC_FORM_CONTROL_STATE_HIDDEN || relation.action === DYNAMIC_FORM_CONTROL_STATE_VISIBLE;
    });

    return relation || null;
}

export function findRequiredRelation(relations: DynamicFormControlRelation[]): DynamicFormControlRelation | null {

    const relation = relations.find(relation => relation.action === DYNAMIC_FORM_CONTROL_STATE_REQUIRED);

    return relation || null;
}

export function matchesDisabledRelation(relation: DynamicFormControlRelation, group: FormGroup): boolean {

    const operator = relation.connective || DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_OR;

    return relation.when.reduce((disabled: boolean, condition: DynamicFormControlCondition, index: number) => {

        const relatedControl = group.get(condition.id);

        if (relatedControl && relation.action === DYNAMIC_FORM_CONTROL_STATE_DISABLED) {

            if (index > 0 && operator === DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_AND && !disabled) {
                return false;
            }

            if (index > 0 && operator === DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_OR && disabled) {
                return true;
            }

            return condition.value === relatedControl.value || condition.status === relatedControl.status;
        }

        if (relatedControl && relation.action === DYNAMIC_FORM_CONTROL_STATE_ENABLED) {

            if (index > 0 && operator === DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_AND && disabled) {
                return true;
            }

            if (index > 0 && operator === DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_OR && !disabled) {
                return false;
            }

            return !(condition.value === relatedControl.value || condition.status === relatedControl.status);
        }

        return false;

    }, false);
}

export function matchesRequiredRelation(relation: DynamicFormControlRelation, group: FormGroup): boolean {

    const operator = relation.connective || DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_OR;

    return relation.when.reduce((required: boolean, condition: DynamicFormControlCondition, index: number) => {

        const relatedControl = group.get(condition.id);

        if (relatedControl && relation.action === DYNAMIC_FORM_CONTROL_STATE_REQUIRED) {

            if (index > 0 && operator === DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_AND && !required) {
                return false;
            }

            if (index > 0 && operator === DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_OR && required) {
                return true;
            }

            return condition.value === relatedControl.value || condition.status === relatedControl.status;
        }

        return false;

    }, false);
}

export function matchesHiddenRelation(relation: DynamicFormControlRelation, group: FormGroup): boolean {

    const operator = relation.connective || DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_OR;

    return relation.when.reduce((hidden: boolean, condition: DynamicFormControlCondition, index: number) => {

        const relatedControl = group.get(condition.id);

        if (relatedControl && relation.action === DYNAMIC_FORM_CONTROL_STATE_HIDDEN) {

            if (index > 0 && operator === DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_AND && !hidden) {
                return false;
            }

            if (index > 0 && operator === DYNAMIC_FORM_CONTROL_RELATION_OPERATOR_OR && hidden) {
                return true;
            }

            return condition.value === relatedControl.value || condition.status === relatedControl.status;
        }

        return false;

    }, false);
}

