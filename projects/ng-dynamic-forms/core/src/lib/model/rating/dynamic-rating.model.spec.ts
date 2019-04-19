import { DYNAMIC_FORM_CONTROL_TYPE_RATING, DynamicRatingModel } from "./dynamic-rating.model";

describe("DynamicRatingModel test suite", () => {

    let model: DynamicRatingModel,
        config = {
            id: "rating",
            max: 5,
            value: 2
        };

    beforeEach(() => model = new DynamicRatingModel(config));

    it("should initialize correctly", () => {

        expect(model.disabled).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.max).toBe(config.max);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_RATING);
        expect(model.value).toBe(config.value);
        expect(model.requiredUpdates).toBeDefined();
        expect(model.disabledUpdates).toBeDefined();
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_RATING);
    });
});