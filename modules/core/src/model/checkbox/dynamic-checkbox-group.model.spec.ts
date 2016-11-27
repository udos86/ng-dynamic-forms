import {DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP, DynamicCheckboxGroupModel} from "./dynamic-checkbox-group.model";
import {DynamicCheckboxModel} from "./dynamic-checkbox.model";

describe("DynamicCheckboxGroupModel test suite", () => {

    let model: DynamicCheckboxGroupModel,
        config = {
            id: "default",
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
                )
            ]
        };

    beforeEach(() => model = new DynamicCheckboxGroupModel(config));

    it("should initialize correctly", () => {

        expect(model.id).toEqual(config.id);
        expect(model.group.length).toBe(config.group.length);
        expect(model.legend).toBeNull();
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP);
    });

    it("should check all checkboxes correctly", () => {

        model.checkAll();

        expect(model.group[0].value).toEqual(true);
        expect(model.group[1].value).toEqual(true);
    });

    it("should uncheck all checkboxes correctly", () => {

        model.uncheckAll();

        expect(model.group[0].value).toEqual(false);
        expect(model.group[1].value).toEqual(false);
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