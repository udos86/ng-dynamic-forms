import { DynamicFormValueControlModelConfig, DynamicFormValueControlModel } from "./dynamic-form-value-control.model";
import { DynamicFormControlLayout } from "./misc/dynamic-form-control-layout.model";
import { serializable } from "../decorator/serializable.decorator";

export interface DynamicFileControlModelConfig extends DynamicFormValueControlModelConfig<File | File[]> {

    multiple?: boolean;
}

export abstract class DynamicFileControlModel extends DynamicFormValueControlModel<File | File[]> {

    @serializable() multiple: boolean;

    constructor(config: DynamicFileControlModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.multiple = typeof config.multiple === "boolean" ? config.multiple : false;
    }
}