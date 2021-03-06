import { DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER, DynamicTimePickerModel } from "./dynamic-timepicker.model";

describe("DynamicTimePickerModel test suite", () => {
    let model: DynamicTimePickerModel;
    const config = {
        id: "timepicker",
        value: new Date()
    };

    beforeEach(() => model = new DynamicTimePickerModel(config));

    it("should initialize correctly", () => {
        expect(model.disabled).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.format).toBeNull();
        expect(model.max).toBeNull();
        expect(model.meridian).toBe(false);
        expect(model.min).toBeNull();
        expect(model.showSeconds).toBe(false);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER);
        expect(model.value).toBe(config.value);
        expect(model.disabledChanges).toBeDefined();
        expect(model.valueChanges).toBeDefined();
    });

    it("should serialize correctly", () => {
        const json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER);
        expect(json.value).toBe((model.value as Date).toJSON());
    });
});
