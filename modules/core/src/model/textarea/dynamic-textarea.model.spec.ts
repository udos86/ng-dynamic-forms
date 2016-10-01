import {Validators} from "@angular/forms";
import {
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_TEXTAREA_WRAP_SOFT,
    DynamicTextAreaModel
} from "./dynamic-textarea.model";

describe("DynamicTextAreaModel test suite", () => {

    describe("default model test suite", () => {

        let config = {id: "default", validators: [Validators.required]};
        let defaultModel: DynamicTextAreaModel;

        beforeEach(() => {
            defaultModel = new DynamicTextAreaModel(config);
        });

        it("tests if default model is correctly initialized", () => {

            expect(defaultModel.cols).toBe(20);
            expect(defaultModel.disabled).toBe(false);
            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.label).toBeNull();
            expect(defaultModel.name).toEqual(defaultModel.id);
            expect(defaultModel.rows).toBe(2);
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA);
            expect(defaultModel.value).toBeNull();
            expect(defaultModel.wrap).toEqual(DYNAMIC_FORM_TEXTAREA_WRAP_SOFT);
        });

        it("should serialize correctly", () => {

            let json = JSON.parse(JSON.stringify(defaultModel));

            expect(json.id).toEqual(defaultModel.id);
            expect(json.cols).toBe(defaultModel.cols);
            expect(json.validators.length).toBe(defaultModel.validators.length);
            expect(json.value).toBe(defaultModel.value);
            expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA);
        });

    });

});