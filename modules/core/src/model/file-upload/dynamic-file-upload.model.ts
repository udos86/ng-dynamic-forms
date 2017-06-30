import { ClsConfig } from "../dynamic-form-control.model";
import { DynamicFileControlModelConfig, DynamicFileControlModel } from "../dynamic-file-control.model";
import { serializable } from "../../decorator/serializable.decorator";
import { Utils } from "../../core.utils";

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

        this.accept = Array.isArray(config.accept) ? config.accept : null;
        this.autoUpload = Utils.isBoolean(config.autoUpload) ? config.autoUpload : true;
        this.maxSize = Utils.isNumber(config.maxSize) ? config.maxSize : null;
        this.minSize = Utils.isNumber(config.minSize) ? config.minSize : null;
        this.removeUrl = config.removeUrl || null;
        this.showFileList = Utils.isBoolean(config.showFileList) ? config.showFileList : true;
        this.url = config.url || null;
    }
}