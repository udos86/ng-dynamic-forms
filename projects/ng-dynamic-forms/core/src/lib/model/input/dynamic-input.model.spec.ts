import {
    DYNAMIC_FORM_CONTROL_TYPE_INPUT,
    DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT,
    DynamicInputModel
} from "./dynamic-input.model";
import { AUTOCOMPLETE_ON } from "../../utils/autofill.utils";
import { isString } from "../../utils/core.utils";

describe("DynamicInputModel test suite", () => {

    let model: DynamicInputModel,
        config = {
            id: "input",
            list: ["One", "Two", "Three"],
            mask: ["test", /[1-9]/]
        };

    let fnMask = (a: any) => {
        return [a];
    };

    let modelMask: DynamicInputModel,
        configMask = {
            id: "input",
            list: ["One", "Two", "Three"],
            mask: fnMask
        };

    beforeEach(() => {
        model = new DynamicInputModel(config);
        modelMask = new DynamicInputModel(configMask);
    });

    it("should initialize correctly", () => {

        expect(model.asyncValidators).toBeNull();
        expect(model.disabled).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.validators).toBeNull();
        expect(model.requiredUpdates).toBeDefined();
        expect(model.disabledUpdates).toBeDefined();
    });

    it("tests if correct default type property is set", () => {

        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_INPUT);
    });

    it("tests if correct default input type property is set", () => {

        expect(model.inputType).toEqual(DYNAMIC_FORM_CONTROL_INPUT_TYPE_TEXT);
    });

    it("tests if correct default autoComplete property is set", () => {

        expect(model.autoComplete).toEqual(AUTOCOMPLETE_ON);
    });

    it("tests if correct default autoFocus property is set", () => {

        expect(model.autoFocus).toBe(false);
    });

    it("tests if correct default hint property is set", () => {

        expect(model.hint).toBeNull();
    });

    it("tests if correct default label property is set", () => {

        expect(model.label).toBeNull();
    });

    it("tests if correct default list property is set", () => {

        expect(model.hasList).toBe(true);
        expect(isString(model.listId)).toBe(true);
        expect(model.list$).toBeDefined();
    });

    it("tests if correct default max property is set", () => {

        expect(model.max).toBeNull();
    });

    it("tests if correct default maxLength property is set", () => {

        expect(model.maxLength).toBeNull();
    });

    it("tests if correct default minLength property is set", () => {

        expect(model.minLength).toBeNull();
    });

    it("tests if correct default min property is set", () => {

        expect(model.min).toBeNull();
    });

    it("tests if correct default placeholder property is set", () => {

        expect(model.placeholder).toEqual("");
    });

    it("tests if correct default readonly property is set", () => {

        expect(model.readOnly).toBe(false);
    });

    it("tests if correct default required property is set", () => {

        expect(model.required).toBe(false);
    });

    it("tests if correct default spellcheck property is set", () => {

        expect(model.spellCheck).toBe(false);
    });

    it("tests if correct default step property is set", () => {

        expect(model.step).toBeNull();
    });

    it("tests if correct default prefix property is set", () => {

        expect(model.prefix).toBeNull();
    });

    it("tests if correct default suffix property is set", () => {

        expect(model.suffix).toBeNull();
    });

    it("should serialize correctly", () => {

        let json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(json.disabled).toEqual(model.disabled);
        expect(json.hidden).toEqual(model.hidden);
        expect(json.mask).toEqual(["test", "/[1-9]/"]);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_INPUT);
    });

    it("should mask function correctly", () => {

        expect(modelMask.mask).toEqual(fnMask);
    });
});
