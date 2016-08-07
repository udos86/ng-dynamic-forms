import {
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START,
    DynamicCheckboxModel
} from "./dynamic-checkbox.model";

describe("DynamicCheckboxModel test suite", () => {

    describe("default model test suite", () => {

        let config = {id: "default"};
        let defaultModel: DynamicCheckboxModel;

        beforeEach(() => {
            defaultModel = new DynamicCheckboxModel(config);
        });
        
        it("tests if default model is correctly initialized", () => {

            expect(defaultModel.align).toBeDefined();
            expect(defaultModel.align).toEqual(DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START);

            expect(defaultModel.disabled).toBeDefined();
            expect(defaultModel.disabled).toBe(false);

            expect(defaultModel.id).toBeDefined();
            expect(defaultModel.id).toEqual(config.id);

            expect(defaultModel.indeterminate).toBeDefined();
            expect(defaultModel.indeterminate).toBe(false);

            expect(defaultModel.label).toBeDefined();
            expect(defaultModel.label).toBeNull();

            expect(defaultModel.name).toBeDefined();
            expect(defaultModel.name).toEqual(defaultModel.id);

            expect(defaultModel.type).toBeDefined();
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX);

            expect(defaultModel.value).toBeDefined();
            expect(defaultModel.value).toBe(false);
        });
        
    });

});