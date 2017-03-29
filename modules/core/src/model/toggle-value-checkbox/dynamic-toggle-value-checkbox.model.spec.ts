import { DYNAMIC_CHECK_CONTROL_LABEL_POSITION_AFTER } from "../dynamic-check-control.model";
import { DYNAMIC_FORM_CONTROL_TYPE_TOGGLE_CHECKBOX, DynamicToggleValueCheckboxModel } from "./dynamic-toggle-value-checkbox.model";

describe("DynamicToggleValueCheckboxModel test suite", () => {

    let model: DynamicToggleValueCheckboxModel,
        config = {
            id: "toggle-checkbox",
            trueValue: "Accept",
            falseValue: "Reject"
        };

    beforeEach(() => model = new DynamicToggleValueCheckboxModel(config));

    it("should initialize correctly", () => {

        expect(model.asyncValidators).toBeNull();
        expect(model.disabled).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.indeterminate).toBe(config.falseValue);
        expect(model.label).toBeNull();
        expect(model.labelPosition).toEqual(DYNAMIC_CHECK_CONTROL_LABEL_POSITION_AFTER);
        expect(model.name).toEqual(model.id);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_TOGGLE_CHECKBOX);
        expect(model.validators).toBeNull();
        expect(model.value).toBe(config.falseValue);
    });

    it("should get and set checked property correctly", () => {

        expect(model.checked).toBe(false);
        expect(model.value).toBe(config.falseValue);

        model.checked = true;
        expect(model.checked).toBe(true);
        expect(model.value).toBe(config.trueValue);
    });

    it("should toggle correctly", () => {

        model.checked = true;
        model.toggle();

        expect(model.checked).toBe(config.falseValue);

        model.toggle();
        expect(model.value).toBe(config.trueValue);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_TOGGLE_CHECKBOX);
    });
});
