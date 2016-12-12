import {DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP, DynamicRadioGroupModel} from "./dynamic-radio-group.model";

describe("DynamicRadioModel test suite", () => {

    let model: DynamicRadioGroupModel<string>,
        config = {
            id: "radio",
            options: [
                {
                    value: "1",
                    label: "One"
                },
                {
                    value: "2",
                    label: "Two"
                }
            ]
        };

    beforeEach(() => model = new DynamicRadioGroupModel(config));

    it("should initialize correctly", () => {

        expect(model.disabled).toBe(false);
        expect(model.errorMessages).toBeNull();
        expect(model.hasErrorMessages).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.legend).toBeNull();
        expect(model.name).toEqual(model.id);
        expect(model.options.length).toBe(config.options.length);
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP);
        expect(model.value).toBeNull();
    });

    it("should select the correct option", () => {

        model.select(1);

        expect(model.value).toEqual(model.get(1).value);
    });

    it("should insert another option", () => {

        let option = {label: "test option", value: "test-option"},
            index = 1;

        model.insert(index, option);

        expect(model.options.length).toBe(config.options.length + 1);
        expect(model.get(index).value).toEqual(option.value);
    });

    it("should remove a given option correctly", () => {

        model.remove(1);

        expect(model.options.length).toBe(config.options.length - 1);
    });

    it("should get the correct option", () => {

        expect(model.get(0)).toEqual(model.options[0]);
        expect(model.get(1)).toEqual(model.options[1]);
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.options.length).toBe(model.options.length);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP);
    });
});