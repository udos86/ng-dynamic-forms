import { ValidationUtils } from "./validation.utils";
import { FormControl } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicInputModel } from "../model/input/dynamic-input.model";

describe("Validation Utils test suite", () => {

    it("should create error messages correctly", () => {

        let errorMessages,
            testControl: FormControl = new FormControl(),
            testModel: DynamicFormControlModel = new DynamicInputModel({
                id: "testModel",
                errorMessages: {
                    required: "Field is required",
                    custom: "Field {{ id }} has a custom error"
                }
            });

        errorMessages = ValidationUtils.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(0);

        testControl.setErrors({required: true});

        errorMessages = ValidationUtils.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(1);
        expect(errorMessages[0]).toEqual(testModel.errorMessages["required"]);

        testControl.setErrors({custom: true});

        errorMessages = ValidationUtils.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(1);
        expect(errorMessages[0]).toEqual(`Field ${testModel.id} has a custom error`);
    });

    it("should detect a validator configuration correctly", () => {

        let testConfig1: any = {name: "test"},
            testConfig2: any = {args: null},
            testConfig3: any = {name: "test", args: null},
            testConfig4 = null;

        expect(ValidationUtils.isValidatorConfig(testConfig1)).toBe(false);
        expect(ValidationUtils.isValidatorConfig(testConfig2)).toBe(false);
        expect(ValidationUtils.isValidatorConfig(testConfig3)).toBe(true);
        expect(ValidationUtils.isValidatorConfig(testConfig4)).toBe(false);
    });
});