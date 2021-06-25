import { DYNAMIC_FORM_CONTROL_TYPE_EDITOR, DynamicEditorModel } from "./dynamic-editor.model";

describe("DynamicEditorModel test suite", () => {
    let model: DynamicEditorModel;
    const config: any = {
        id: "editor",
        validators: {required: null, minLength: 5}
    };

    beforeEach(() => model = new DynamicEditorModel(config));

    it("should initialize correctly", () => {
        expect(model.disabled).toBe(false);
        expect(model.errorMessages).toBeNull();
        expect(model.hasErrorMessages).toBe(false);
        expect(model.hidden).toBe(false);
        expect(model.id).toEqual(config.id);
        expect(model.label).toBeNull();
        expect(model.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_EDITOR);
        expect(model.value).toBeNull();
        expect(model.disabledChanges).toBeDefined();
        expect(model.valueChanges).toBeDefined();
    });

    it("should set disabled property correctly", () => {
        model.disabled = true;

        expect(model.disabled).toBe(true);
    });

    it("should serialize correctly", () => {
        const json = JSON.parse(JSON.stringify(model));

        expect(json.id).toEqual(model.id);
        expect(Object.keys(json.validators).length).toBe(Object.keys(model.validators as any).length);
        expect(json.value).toBe(model.value);
        expect(json.type).toEqual(DYNAMIC_FORM_CONTROL_TYPE_EDITOR);
    });
});
