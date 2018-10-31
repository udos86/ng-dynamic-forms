import { FormGroup, FormControl } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import {
    DynamicFormControlRelation,
    DynamicFormControlRelationGroup,
    DYNAMIC_FORM_CONTROL_ACTION_DISABLE,
    DYNAMIC_FORM_CONTROL_ACTION_ENABLE,
    DYNAMIC_FORM_CONTROL_CONNECTIVE_AND,
    DYNAMIC_FORM_CONTROL_CONNECTIVE_OR
} from "../model/misc/dynamic-form-control-relation.model";

export function findActivationRelation(relGroups: DynamicFormControlRelationGroup[]): DynamicFormControlRelationGroup | null {

    let rel = relGroups.find(rel => {
        return rel.action === DYNAMIC_FORM_CONTROL_ACTION_DISABLE || rel.action === DYNAMIC_FORM_CONTROL_ACTION_ENABLE;
    });

    return rel !== undefined ? rel : null;
}

export function getRelatedFormControls(model: DynamicFormControlModel, controlGroup: FormGroup): FormControl[] {

    let controls: FormControl[] = [];

    model.relation.forEach(relGroup => relGroup.when.forEach(rel => {

        if (model.id === rel.id) {
            throw new Error(`FormControl ${model.id} cannot depend on itself`);
        }

        let control = controlGroup.get(rel.id) as FormControl;

        if (control && !controls.some(controlElement => controlElement === control)) {
            controls.push(control);
        }
    }));

    return controls;
}

export function isFormControlToBeDisabled(relGroup: DynamicFormControlRelationGroup, _formGroup: FormGroup): boolean {

    let formGroup: FormGroup = _formGroup;

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
