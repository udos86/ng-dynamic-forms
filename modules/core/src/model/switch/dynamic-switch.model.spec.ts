import {DYNAMIC_FORM_CONTROL_TYPE_SWITCH, DynamicSwitchModel} from "./dynamic-switch.model";

describe("DynamicSwitchModel test suite", () => {

    let model: DynamicSwitchModel,
        config = {
            id: "default"
        };

    beforeEach(() => {
        model = new DynamicSwitchModel(config);
    });

    it("tests if default model is correctly initialized", () => {

        expect(model.disabled).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.name).toEqual(model.id);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SWITCH);
        expect(model.value).toBe(false);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SWITCH);
    });
});