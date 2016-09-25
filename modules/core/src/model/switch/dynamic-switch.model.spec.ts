import {
    DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
    DynamicSwitchModel
} from "./dynamic-switch.model";

describe("DynamicSwitchModel test suite", () => {

    describe("default model test suite", () => {

        let config = {id: "default"};
        let defaultModel: DynamicSwitchModel;

        beforeEach(() => {
            defaultModel = new DynamicSwitchModel(config);
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

            expect(defaultModel.type).toBeDefined();
            expect(defaultModel.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SWITCH);

            expect(defaultModel.value).toBeDefined();
            expect(defaultModel.value).toBe(false);
        });
        
    });

});