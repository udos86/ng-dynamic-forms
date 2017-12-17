import { DynamicFormGroupModel, DynamicFormGroupModelConfig } from "../form-group/dynamic-form-group.model";
import { DynamicCheckboxModel } from "./dynamic-checkbox.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";

export class DynamicCheckboxGroupModel extends DynamicFormGroupModel {

    @serializable() group: DynamicCheckboxModel[];

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;

    constructor(config: DynamicFormGroupModelConfig, layout?: DynamicFormControlLayout) {
        super(config, layout);
    }

    check(...indices: number[]): void {
        indices.forEach(index => this.group[index].checked = true);
    }

    uncheck(...indices: number[]): void {
        indices.forEach(index => this.group[index].checked = false);
    }

    checkAll(): void {
        this.group.forEach(model => model.checked = true);
    }

    uncheckAll(): void {
        this.group.forEach(model => model.checked = false);
    }
}