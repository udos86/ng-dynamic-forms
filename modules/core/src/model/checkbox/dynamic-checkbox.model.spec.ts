import {
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START,
    DynamicCheckboxModel
} from "./dynamic-checkbox.model";

describe("DynamicCheckboxModel test suite", () => {

    describe("default model test suite", () => {

        let config = {id: "default", value: true};
        let defaultModel: DynamicCheckboxModel;

        beforeEach(() => {
            defaultModel = new DynamicCheckboxModel(config);
        });
        
        it("tests if default model is correctly initialized", () => {

            expect(defaultModel.align).toEqual(DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START);
            expect(defaultModel.asyncValidators).toEqual([]);
            expect(defaultModel.disabled).toBe(false);
            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.indeterminate).toBe(false);
            expect(defaultModel.label).toBeNull();
            expect(defaultModel.name).toEqual(defaultModel.id);
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX);
            expect(defaultModel.validators).toEqual([]);
            expect(defaultModel.value).toBe(config.value);
        });

        it("should get and set checked property correctly", () => {

            expect(defaultModel.checked).toBe(config.value);

            defaultModel.checked = false;

            expect(defaultModel.checked).toBe(false);
            expect(defaultModel.value).toBe(false);
        });

        it("should toggle correctly", () => {

            defaultModel.toggle();

            expect(defaultModel.checked).toBe(!config.value);
            expect(defaultModel.value).toBe(!config.value);
        });

        it("should serialize correctly", () => {

            let json = JSON.parse(JSON.stringify(defaultModel));

            expect(json.id).toEqual(defaultModel.id);
            expect(json.value).toBe(defaultModel.value);
            expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX);
        });
        
    });

});