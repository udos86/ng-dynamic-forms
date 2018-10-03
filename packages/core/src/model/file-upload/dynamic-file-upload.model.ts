import { DynamicFileControlModelConfig, DynamicFileControlModel } from "../dynamic-file-control.model";
import { DynamicFormControlLayout } from "../misc/dynamic-form-control-layout.model";
import { serializable } from "../../decorator/serializable.decorator";
import { isBoolean, isNumber } from "../../utils/core.utils";

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

    constructor(config: DynamicFileUploadModelConfig, layout?: DynamicFormControlLayout) {

        super(config, layout);

        this.accept = Array.isArray(config.accept) ? config.accept : null;
        this.autoUpload = isBoolean(config.autoUpload) ? config.autoUpload : true;
        this.maxSize = isNumber(config.maxSize) ? config.maxSize : null;
        this.minSize = isNumber(config.minSize) ? config.minSize : null;
        this.removeUrl = config.removeUrl || null;
        this.showFileList = isBoolean(config.showFileList) ? config.showFileList : true;
        this.url = config.url || null;
    }
}