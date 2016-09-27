import {ClsConfig} from "../dynamic-form-control.model";
import {DynamicFormGroupModel, DynamicFormGroupModelConfig} from "../form-group/dynamic-form-group.model";
import {DynamicCheckboxModel} from "./dynamic-checkbox.model";
import {serializable} from "../../decorator/serialize.decorator";

export const DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP = "CHECKBOX_GROUP";

export class DynamicCheckboxGroupModel extends DynamicFormGroupModel {

    @serializable() group: Array<DynamicCheckboxModel>;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP;

    constructor(config: DynamicFormGroupModelConfig, cls?: ClsConfig) {

        super(config, cls);
    }
}