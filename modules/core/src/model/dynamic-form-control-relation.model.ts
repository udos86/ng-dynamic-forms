import {FormGroup} from "@angular/forms";

export const DYNAMIC_FORM_CONTROL_CONNECTIVE_AND = "AND";
export const DYNAMIC_FORM_CONTROL_CONNECTIVE_OR = "OR";

export const DYNAMIC_FORM_CONTROL_EFFECT_DISABLE = "DISABLE";
export const DYNAMIC_FORM_CONTROL_EFFECT_ENABLE = "ENABLE";

export interface DynamicFormControlRelation {

    id: string;
    value?: boolean | number | string;
    status?: string;
}

export interface DynamicFormControlRelationGroup {

    connective: string;
    effect: string;
    requires: Array<DynamicFormControlRelation>;
}

export function findDisableRelation(relGroups: Array<DynamicFormControlRelationGroup>): DynamicFormControlRelationGroup {
    return relGroups.find(rel => rel.effect === DYNAMIC_FORM_CONTROL_EFFECT_DISABLE);
}

export function findEnableRelation(relGroups: Array<DynamicFormControlRelationGroup>): DynamicFormControlRelationGroup {
    return relGroups.find(rel => rel.effect === DYNAMIC_FORM_CONTROL_EFFECT_ENABLE);
}

export function findActivationRelation(relGroups: Array<DynamicFormControlRelationGroup>): DynamicFormControlRelationGroup {
    return relGroups.find(
        rel => rel.effect === DYNAMIC_FORM_CONTROL_EFFECT_DISABLE || rel.effect === DYNAMIC_FORM_CONTROL_EFFECT_ENABLE);
}

export function flattenIds(relGroups: Array<DynamicFormControlRelationGroup>): Array<string> {

    let ids: Array<string> = [];

    relGroups.forEach(relGroup => relGroup.requires.forEach(rel => {

        if (ids.indexOf(rel.id) === -1) {
            ids.push(rel.id);
        }
    }));

    return ids;
}

export function toBeDisabled(relGroup: DynamicFormControlRelationGroup, formGroup: FormGroup): boolean {

    return relGroup.requires.reduce((toBeDisabled: boolean, rel: DynamicFormControlRelation, index: number) => {

        let control = formGroup.get(rel.id);

        if (control && relGroup.effect === DYNAMIC_FORM_CONTROL_EFFECT_DISABLE) {

            if (index > 0 && relGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_AND && !toBeDisabled) {
                return false;
            }

            if (index > 0 && relGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_OR && toBeDisabled) {
                return true;
            }

            return rel.value === control.value || rel.status === control.status;
        }

        if (control && relGroup.effect === DYNAMIC_FORM_CONTROL_EFFECT_ENABLE) {

            if (index > 0 && relGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_AND && toBeDisabled) {
                return true;
            }

            if (index > 0 && relGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_OR && !toBeDisabled) {
                return false;
            }

            return !(rel.value === control.value || rel.status === control.status);
        }

        return false;

    }, false);
}