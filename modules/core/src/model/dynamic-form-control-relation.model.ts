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
    on: Array<DynamicFormControlRelation>;
}

export function findDisableRelation(deps: Array<DynamicFormControlRelationGroup>): DynamicFormControlRelationGroup {
    return deps.find(dep => dep.effect === DYNAMIC_FORM_CONTROL_EFFECT_DISABLE);
}

export function findEnableRelation(deps: Array<DynamicFormControlRelationGroup>): DynamicFormControlRelationGroup {
    return deps.find(dep => dep.effect === DYNAMIC_FORM_CONTROL_EFFECT_ENABLE);
}

export function findActivationRelation(deps: Array<DynamicFormControlRelationGroup>): DynamicFormControlRelationGroup {
    return deps.find(dep => dep.effect === DYNAMIC_FORM_CONTROL_EFFECT_DISABLE || dep.effect === DYNAMIC_FORM_CONTROL_EFFECT_ENABLE);
}

export function flattenIds(deps: Array<DynamicFormControlRelationGroup>): Array<string> {

    let ids: Array<string> = [];

    deps.forEach(depGroup => {

        depGroup.on.forEach(dep => {

            if (ids.indexOf(dep.id) === -1) {
                ids.push(dep.id);
            }
        });
    });

    return ids;
}

export function toBeDisabled(depGroup: DynamicFormControlRelationGroup, formGroup: FormGroup): boolean {

    return depGroup.on.reduce((toBeDisabled: boolean, dep: DynamicFormControlRelation, index: number) => {

        let control = formGroup.get(dep.id);

        if (depGroup.effect === DYNAMIC_FORM_CONTROL_EFFECT_DISABLE && control) {

            if (index > 0 && depGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_AND && !toBeDisabled) { // AND: all deps must be true
                return false;
            }

            if (index > 0 && depGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_OR && toBeDisabled) { // OR: one of all deps must be true
                return true;
            }

            return dep.value === control.value || dep.status === control.status;
        }

        return false;

    }, false);
}

export function toBeEnabled(depGroup: DynamicFormControlRelationGroup, formGroup: FormGroup): boolean {

    return depGroup.on.reduce((toBeDisabled: boolean, dep: DynamicFormControlRelation, index: number) => {

        let control = formGroup.get(dep.id);

        if (depGroup.effect === DYNAMIC_FORM_CONTROL_EFFECT_ENABLE && control) {

            if (index > 0 && depGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_AND && toBeDisabled) {
                return true;
            }

            if (index > 0 && depGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_OR && !toBeDisabled) {
                return false;
            }

            return !(dep.value === control.value || dep.status === control.status);
        }

        return false;

    }, false);
}