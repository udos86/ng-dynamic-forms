import { DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER, DynamicColorPickerModel } from "./dynamic-colorpicker.model";

describe("DynamicColorPickerModel test suite", () => {

    let model: DynamicColorPickerModel,
        config = {
            id: "colorpicker",
            value: "#ffffff"
        };

    beforeEach(() => model = new DynamicColorPickerModel(config));

    it("should initialize correctly", () => {

        expect(model.disabled).toBe(false);
        expect(model.format).toBeNull();
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.inline).toBe(false);
        expect(model.label).toBeNull();
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER);
        expect(model.value).toBe(config.value);
        expect(model.requiredUpdates).toBeDefined();
        expect(model.disabledUpdates).toBeDefined();
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER);
    });
});