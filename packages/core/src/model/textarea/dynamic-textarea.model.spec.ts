import {
    DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
    DYNAMIC_FORM_TEXTAREA_WRAP_SOFT,
    DynamicTextAreaModel
} from "./dynamic-textarea.model";

describe("DynamicTextAreaModel test suite", () => {

    let model: DynamicTextAreaModel,
        config: any = {
            id: "textarea",
            validators: {required: null, minLength: 5}
        };

    beforeEach(() => model = new DynamicTextAreaModel(config));

    it("should initialize correctly", () => {

        expect(model.cols).toBe(20);
        expect(model.disabled).toBe(false);
        expect(model.errorMessages).toBeNull();
        expect(model.hasErrorMessages).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.rows).toBe(2);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA);
        expect(model.value).toBeNull();
        expect(model.wrap).toEqual(DYNAMIC_FORM_TEXTAREA_WRAP_SOFT);
        expect(model.requiredUpdates).toBeDefined();
        expect(model.disabledUpdates).toBeDefined();
    });

    it("should set disabled property correctly", () => {

        model.disabledUpdates.next(true);

        expect(model.disabled).toBe(true);
    });

    it("should set required property correctly", () => {

        model.requiredUpdates.next(true);

        expect(model.required).toBe(true);
    });


    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.cols).toBe(model.cols);
        expect(Object.keys(json.validators).length).toBe(Object.keys(model.validators as any).length);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA);
    });
});