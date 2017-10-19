import { ValidationUtils } from "./validation.utils";

describe("Validation Utils test suite", () => {

    it("should detect a validator configuration correctly", () => {

        let testConfig1: any = {name: "test"},
            testConfig2: any = {args: null},
            testConfig3: any = {name: "test", args: null},
            testConfig4 = null;

        expect(ValidationUtils.isDynamicValidatorDescriptor(testConfig1)).toBe(false);
        expect(ValidationUtils.isDynamicValidatorDescriptor(testConfig2)).toBe(false);
        expect(ValidationUtils.isDynamicValidatorDescriptor(testConfig3)).toBe(true);
        expect(ValidationUtils.isDynamicValidatorDescriptor(testConfig4)).toBe(false);
    });
});