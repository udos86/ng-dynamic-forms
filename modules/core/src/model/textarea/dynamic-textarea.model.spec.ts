import {
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA, 
    DYNAMIC_FORM_TEXTAREA_WRAP_SOFT,
    DynamicTextAreaModel
} from "./dynamic-textarea.model";

describe("DynamicTextAreaModel test suite", () => {

    describe("default model test suite", () => {

        let config = {id: "default"};
        let defaultModel: DynamicTextAreaModel;

        beforeEach(() => {
            defaultModel = new DynamicTextAreaModel(config);
        });

        it("tests if default model is correctly initialized", () => {

            expect(defaultModel.cols).toBeDefined();
            expect(defaultModel.cols).toBe(20);

            expect(defaultModel.disabled).toBeDefined();
            expect(defaultModel.disabled).toBe(false);

            expect(defaultModel.id).toBeDefined();
            expect(defaultModel.id).toEqual(config.id);

            expect(defaultModel.label).toBeDefined();
            expect(defaultModel.label).toBeNull();

            expect(defaultModel.name).toBeDefined();
            expect(defaultModel.name).toEqual(defaultModel.id);

            expect(defaultModel.rows).toBeDefined();
            expect(defaultModel.rows).toBe(2);

            expect(defaultModel.type).toBeDefined();
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA);

            expect(defaultModel.value).toBeDefined();
            expect(defaultModel.value).toBeNull();

            expect(defaultModel.wrap).toBeDefined();
            expect(defaultModel.wrap).toEqual(DYNAMIC_FORM_TEXTAREA_WRAP_SOFT);
        });

    });

});