import {
    DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD,
    DynamicFileUploadModel
} from "./dynamic-file-upload.model";

describe("DynamicFileUploadModel test suite", () => {

    let model: DynamicFileUploadModel,
        config: any = {
            id: "upload"
        };

    beforeEach(() => model = new DynamicFileUploadModel(config));

    it("should initialize correctly", () => {

        expect(model.autoUpload).toBe(true);
        expect(model.disabled).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.multiple).toBe(false);
        expect(model.removeUrl).toBeNull();
        expect(model.showFileList).toBe(true);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD);
        expect(model.url).toBeNull();
        expect(model.value).toBeNull();
        expect(model.requiredUpdates).toBeDefined();
        expect(model.disabledUpdates).toBeDefined();
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD);
        expect(json.value).toBeNull();
    });
});