import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicFormGroupModel, DynamicFormGroupModelConfig} from "../form-group/dynamic-form-group.model";
import {DynamicCheckboxModel} from "./dynamic-checkbox.model";
import {serializable} from "../../decorator/serializable.decorator";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";

export class DynamicCheckboxGroupModel extends DynamicFormGroupModel {

    @serializable() group: Array<DynamicCheckboxModel>;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;

    constructor(config: DynamicFormGroupModelConfig, cls?: ClsConfig) {
        super(config, cls);
    }

    checkAll(): void {
        this.group.forEach(model => model.valueUpdates.next(true));
    }

    uncheckAll(): void {
        this.group.forEach(model => model.valueUpdates.next(false));
    }
}