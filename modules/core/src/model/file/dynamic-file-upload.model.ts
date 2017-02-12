import { ClsConfig } from "../dynamic-form-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { getValue } from "../../utils";
import { DynamicFileControlModelConfig, DynamicFileControlModel } from "../dynamic-file-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD = "FILE_UPLOAD";

export interface DynamicFileUploadModelConfig extends DynamicFileControlModelConfig {

    autoUpload?: boolean;
    removeUrl?: string;
    saveUrl?: string;
    showFileList?: boolean;
}

export class DynamicFileUploadModel extends DynamicFileControlModel {

    @serializable() autoUpload: boolean;
    @serializable() removeUrl: string | null;
    @serializable() saveUrl: string | null;
    @serializable() showFileList: boolean;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD;

    constructor(config: DynamicFileUploadModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.autoUpload = getValue(config, "autoUpload", true);
        this.removeUrl = getValue(config, "removeUrl", null);
        this.saveUrl = getValue(config, "saveUrl", null);
        this.showFileList = getValue(config, "showFileList", true);
    }
}