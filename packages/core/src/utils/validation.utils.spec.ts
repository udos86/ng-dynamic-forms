import { ValidationUtils } from "./validation.utils";

describe("Validation Utils test suite", () => {

    it("should check a validator configuration", () => {

        let testValue1: any = {name: "test"},
            testValue2: any = {args: null},
            testValue3: any = {name: "test", args: null},
            testValue4 = null;

        expect(ValidationUtils.isDynamicValidatorDescriptor(testValue1)).toBe(false);
        expect(ValidationUtils.isDynamicValidatorDescriptor(testValue2)).toBe(false);
        expect(ValidationUtils.isDynamicValidatorDescriptor(testValue3)).toBe(true);
        expect(ValidationUtils.isDynamicValidatorDescriptor(testValue4)).toBe(false);
    });

    it("should check a form hook", () => {

        let testValue1 = "test",
            testValue2 = "blur",
            testValue3 = "change",
            testValue4 = "submit",
            testValue5 = null;

        expect(ValidationUtils.isFormHook(testValue1)).toBe(false);
        expect(ValidationUtils.isFormHook(testValue2)).toBe(true);
        expect(ValidationUtils.isFormHook(testValue3)).toBe(true);
        expect(ValidationUtils.isFormHook(testValue4)).toBe(true);
        expect(ValidationUtils.isFormHook(testValue5)).toBe(false);
    });
});