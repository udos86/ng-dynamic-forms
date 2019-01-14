import { DYNAMIC_FORM_CONTROL_TYPE_SLIDER, DynamicSliderModel } from "./dynamic-slider.model";

describe("DynamicSliderModel test suite", () => {

    let model: DynamicSliderModel,
        config = {
            id: "slider",
            min: 0,
            max: 100,
            step: 1,
            value: 27,
            additional: {
                "test": true
            }
        };

    beforeEach(() => model = new DynamicSliderModel(config));

    it("should initialize correctly", () => {

        expect(model.disabled).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.min).toBe(config.min);
        expect(model.max).toBe(config.max);
        expect(model.step).toBe(config.step);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SLIDER);
        expect(model.value).toBe(config.value);
        expect(model.vertical).toBe(false);
        expect(model.requiredUpdates).toBeDefined();
        expect(model.disabledUpdates).toBeDefined();
    });

    it("should get additional", () => {

        expect(model.getAdditional("test", null)).toBe(true);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_SLIDER);
    });
});
