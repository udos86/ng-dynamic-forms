import {DYNAMIC_FORM_CONTROL_TYPE_SELECT, DynamicSelectModel} from "./dynamic-select.model";

describe("DynamicSelectModel test suite", () => {

    describe("default model test suite", () => {

        let config = {id: "default", options: [{value: "1"}, {value: "2"}]};
        let defaultModel: DynamicSelectModel<any>;

        beforeEach(() => {
            defaultModel = new DynamicSelectModel(config);
        });

        it("tests if default model is correctly initialized", () => {


            expect(defaultModel.disabled).toBe(false);
            expect(defaultModel.id).toEqual(config.id);
            expect(defaultModel.label).toBeNull();
            expect(defaultModel.name).toEqual(defaultModel.id);
            expect(defaultModel.options.length).toBe(config.options.length);
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SELECT);
            expect(defaultModel.value).toBeNull();
        });

        it("should serialize correctly", () => {

            let json = JSON.parse(JSON.stringify(defaultModel));

            expect(json.id).toEqual(defaultModel.id);
            expect(json.options.length).toBe(defaultModel.options.length);
            expect(json.value).toBe(defaultModel.value);
            expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SELECT);
        });

    });

});