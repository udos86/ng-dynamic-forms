import {
    DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
    DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START,
    DynamicCheckboxModel
} from "./dynamic-checkbox.model";

describe("DynamicCheckboxModel test suite", () => {

    let model: DynamicCheckboxModel,
        config = {
            id: "checkbox",
            value: true
        };

    beforeEach(() => model = new DynamicCheckboxModel(config));

    it("should initialize correctly", () => {

        expect(model.align).toEqual(DYNAMIC_FORM_CONTROL_CHECKBOX_ALIGN_START);
        expect(model.asyncValidators).toEqual(null);
        expect(model.disabled).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.indeterminate).toBe(false);
        expect(model.label).toBeNull();
        expect(model.name).toEqual(model.id);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX);
        expect(model.validators).toEqual(null);
        expect(model.value).toBe(config.value);
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