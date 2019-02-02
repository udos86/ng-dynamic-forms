import { DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP, DynamicCheckboxGroupModel } from "./dynamic-checkbox-group.model";
import { DynamicCheckboxModel } from "./dynamic-checkbox.model";

describe("DynamicCheckboxGroupModel test suite", () => {

    let model: DynamicCheckboxGroupModel,
        config = {
            id: "checkboxGroup",
            group: [
                new DynamicCheckboxModel(
                    {
                        id: "checkbox1",
                        label: "Checkbox 1",
                        value: true
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "checkbox2",
                        label: "Checkbox 2",
                        value: false
                    }
                ),
                new DynamicCheckboxModel(
                    {
                        id: "checkbox3",
                        label: "Checkbox 3",
                        value: false
                    }
                )
            ]
        };

    beforeEach(() => model = new DynamicCheckboxGroupModel(config));

    it("should initialize correctly", () => {

        expect(model.id).toEqual(config.id);
        expect(model.group.length).toBe(config.group.length);
        expect(model.legend).toBeNull();
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
        expect(model.requiredUpdates).toBeDefined();
        expect(model.disabledUpdates).toBeDefined();
    });

    it("should check checkboxes correctly", () => {

        model.check(0, 2);

        expect(model.group[0].value).toBe(true);
        expect(model.group[2].value).toBe(true);
    });

    it("should check all checkboxes correctly", () => {

        model.checkAll();

        expect(model.group[0].value).toBe(true);
        expect(model.group[1].value).toBe(true);
        expect(model.group[2].value).toBe(true);
    });

    it("should uncheck checkboxes correctly", () => {

        model.uncheck(0, 2);

        expect(model.group[0].value).toBe(false);
        expect(model.group[2].value).toBe(false);
    });

    it("should uncheck all checkboxes correctly", () => {

        model.uncheckAll();

        expect(model.group[0].value).toBe(false);
        expect(model.group[1].value).toBe(false);
        expect(model.group[2].value).toBe(false);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
    });
});