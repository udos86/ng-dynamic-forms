import { ClsConfig } from "../dynamic-form-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { getValue } from "../../utils";
import { DynamicFileControlModelConfig, DynamicFileControlModel } from "../dynamic-file-control.model";

export const DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD = "FILE_UPLOAD";

export interface DynamicFileUploadModelConfig extends DynamicFileControlModelConfig {

    accept?: string[];
    autoUpload?: boolean;
    maxSize?: number;
    minSize?: number;
    removeUrl?: string;
    showFileList?: boolean;
    url?: string;
}

export class DynamicFileUploadModel extends DynamicFileControlModel {

    @serializable() accept: string[] | null;
    @serializable() autoUpload: boolean;
    @serializable() maxSize: number | null;
    @serializable() minSize: number | null;
    @serializable() removeUrl: string | null;
    @serializable() showFileList: boolean;
    @serializable() url: string | null;

    @serializable() readonly type: string = DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD;

    constructor(config: DynamicFileUploadModelConfig, cls?: ClsConfig) {

        super(config, cls);

        this.accept = getValue(config, "accept", null);
        this.autoUpload = getValue(config, "autoUpload", true);
        this.maxSize = getValue(config, "maxSize", null);
        this.minSize = getValue(config, "minSize", null);
        this.removeUrl = getValue(config, "removeUrl", null);
        this.showFileList = getValue(config, "showFileList", true);
        this.url = getValue(config, "url", null);
    }
}