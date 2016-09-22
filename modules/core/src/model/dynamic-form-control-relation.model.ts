import {FormGroup} from "@angular/forms";

export const DYNAMIC_FORM_CONTROL_ACTION_DISABLE = "DISABLE";
export const DYNAMIC_FORM_CONTROL_ACTION_ENABLE = "ENABLE";

export const DYNAMIC_FORM_CONTROL_CONNECTIVE_AND = "AND";
export const DYNAMIC_FORM_CONTROL_CONNECTIVE_OR = "OR";

export interface DynamicFormControlRelation {

    id: string;
    value?: boolean | number | string;
    status?: string;
}

export interface DynamicFormControlRelationGroup {

    action: string;
    connective?: string;
    when: Array<DynamicFormControlRelation>;
}

export function findDisableRelation(relGroups: Array<DynamicFormControlRelationGroup>): DynamicFormControlRelationGroup {
    return relGroups.find(rel => rel.action === DYNAMIC_FORM_CONTROL_ACTION_DISABLE);
}

export function findEnableRelation(relGroups: Array<DynamicFormControlRelationGroup>): DynamicFormControlRelationGroup {
    return relGroups.find(rel => rel.action === DYNAMIC_FORM_CONTROL_ACTION_ENABLE);
}

export function findActivationRelation(relGroups: Array<DynamicFormControlRelationGroup>): DynamicFormControlRelationGroup {
    return relGroups.find(
        rel => rel.action === DYNAMIC_FORM_CONTROL_ACTION_DISABLE || rel.action === DYNAMIC_FORM_CONTROL_ACTION_ENABLE);
}

export function findIds(relGroups: Array<DynamicFormControlRelationGroup>): Array<string> {

    let ids: Array<string> = [];

    relGroups.forEach(relGroup => relGroup.when.forEach(rel => {

        if (ids.indexOf(rel.id) === -1) {
            ids.push(rel.id);
        }
    }));

    return ids;
}

export function toBeDisabled(relGroup: DynamicFormControlRelationGroup, formGroup: FormGroup): boolean {

    return relGroup.when.reduce((toBeDisabled: boolean, rel: DynamicFormControlRelation, index: number) => {

        let control = formGroup.get(rel.id);

        if (control && relGroup.action === DYNAMIC_FORM_CONTROL_ACTION_DISABLE) {

            if (index > 0 && relGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_AND && !toBeDisabled) {
                return false;
            }

            if (index > 0 && relGroup.connective === DYNAMIC_FORM_CONTROL_CONNECTIVE_OR && toBeDisabled) {
                return true;
            }

            return rel.value === control.value || rel.status === control.status;
        }

        if (control && relGroup.action === DYNAMIC_FORM_CONTROL_ACTION_ENABLE) {

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