import {DYNAMIC_FORM_CONTROL_TYPE_SELECT, DynamicSelectModel} from "./dynamic-select.model";

describe("DynamicSelectModel test suite", () => {

    describe("default model test suite", () => {

        let config = {id: "default"};
        let defaultModel: DynamicSelectModel<any>;

        beforeEach(() => {
            defaultModel = new DynamicSelectModel(config);
        });

        it("tests if default model is correctly initialized", () => {

            expect(defaultModel.disabled).toBeDefined();
            expect(defaultModel.disabled).toBe(false);

            expect(defaultModel.id).toBeDefined();
            expect(defaultModel.id).toEqual(config.id);

            expect(defaultModel.label).toBeDefined();
            expect(defaultModel.label).toBeNull();

            expect(defaultModel.name).toBeDefined();
            expect(defaultModel.name).toEqual(defaultModel.id);

            expect(defaultModel.options).toBeDefined();
            expect(defaultModel.options).toEqual([]);

            expect(defaultModel.type).toBeDefined();
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SELECT);

            expect(defaultModel.value).toBeDefined();
            expect(defaultModel.value).toBeNull();
        });

    });

});