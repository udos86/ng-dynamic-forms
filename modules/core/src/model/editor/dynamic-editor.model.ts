import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicInputControlModel, DynamicInputControlModelConfig } from "../dynamic-input-control.model";
import { serializable } from "../../decorator/serializable.decorator";

export const DYNAMIC_FORM_CONTROL_TYPE_EDITOR = "EDITOR";

export interface DynamicEditorModelConfig extends DynamicInputControlModelConfig<string> {
}

export class DynamicEditorModel extends DynamicInputControlModel<string> {

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_EDITOR;

    constructor(config: DynamicEditorModelConfig, cls?: ClsConfig) {

        super(config, cls);
    }
}