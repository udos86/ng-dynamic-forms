import { DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX, DynamicCheckboxModel } from "./dynamic-checkbox.model";

describe("DynamicCheckboxModel test suite", () => {

    let model: DynamicCheckboxModel,
        config = {
            id: "checkbox",
            value: true
        };

    beforeEach(() => model = new DynamicCheckboxModel(config));

    it("should initialize correctly", () => {

        expect(model.asyncValidators).toBeNull();
        expect(model.disabled).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.indeterminate).toBe(false);
        expect(model.label).toBeNull();
        expect(model.labelPosition).toBeNull();
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX);
        expect(model.validators).toBeNull();
        expect(model.value).toBe(config.value);
        expect(model.requiredUpdates).toBeDefined();
        expect(model.disabledUpdates).toBeDefined();
    });

    it("should get and set checked property correctly", () => {

        expect(model.checked).toBe(config.value);

        model.checked = false;

        expect(model.checked).toBe(false);
        expect(model.value).toBe(false);
    });

    it("should toggle correctly", () => {

        model.toggle();

        expect(model.checked).toBe(!config.value);
        expect(model.value).toBe(!config.value);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX);
    });
});