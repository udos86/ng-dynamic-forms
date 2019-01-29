import { TestBed, inject } from "@angular/core/testing";
import { ReactiveFormsModule, FormControl, NG_VALIDATORS, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { DynamicFormValidationService } from "./dynamic-form-validation.service";
import { DYNAMIC_VALIDATORS, Validator, ValidatorFactory } from "./dynamic-form.validators";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { DynamicInputModel } from "../model/input/dynamic-input.model";
import { isFunction } from "../utils/core.utils";

describe("DynamicFormValidationService test suite", () => {

    let service: DynamicFormValidationService;

    function testValidator(): ValidationErrors | null {
        return {testValidator: {valid: true}};
    }

    function testValidatorFactory(): () => ValidationErrors | null {
        return (): ValidationErrors | null => {
            return {testValidatorFactory: {valid: true}};
        };
    }

    function testAsyncValidator() {
        return new Promise<boolean>(resolve => setTimeout(() => resolve(true), 0));
    }

    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            providers: [
                DynamicFormValidationService,
                {
                    provide: NG_VALIDATORS,
                    useValue: testValidator,
                    multi: true
                },
                {
                    provide: NG_ASYNC_VALIDATORS,
                    useValue: testAsyncValidator,
                    multi: true
                },
                {
                    provide: DYNAMIC_VALIDATORS,
                    useValue: new Map<string, Validator | ValidatorFactory>([
                        ["testValidatorFactory", testValidatorFactory]
                    ])
                }
            ]
        });
    });

    beforeEach(inject([DynamicFormValidationService],
        (validationService: DynamicFormValidationService) => service = validationService));


    it("should resolve a validator by name", () => {

        expect(service.getValidator("required")).toBeTruthy();
        expect(service.getValidator("testValidator")).toBeTruthy();
        expect(service.getValidator("testValidatorFactory")).toBeTruthy();
    });


    it("should resolve a async validator by name correctly", () => {

        expect(service.getAsyncValidator("testAsyncValidator")).toBeTruthy();
    });


    it("should resolve validators from config", () => {

        let config: any = {required: null, maxLength: 7, minLength: 3},
            validators = service.getValidators(config);

        expect(validators.length === Object.keys(config).length).toBe(true);
    });


    it("should resolve custom validators from config", () => {

        let config: any = {required: null, maxLength: 7, testValidator: null, testValidatorFactory: "test"},
            validators = service.getValidators(config);

        expect(validators.length === Object.keys(config).length).toBe(true);
    });


    it("should resolve custom validators from detailed config", () => {

        let config: any = {testValidator: {name: testValidator.name, args: null}},
            validators = service.getValidators(config);

        expect(validators.length === Object.keys(config).length).toBe(true);
    });


    it("should resolve custom async validators from config", () => {

        let config: any = {testAsyncValidator: null},
            validators = service.getAsyncValidators(config);

        expect(validators.length === Object.keys(config).length).toBe(true);
    });


    it("should throw when validator is not provided via NG_VALIDATORS", () => {

        expect(() => service.getValidator("test", null))
            .toThrow(new Error(`validator "test" is not provided via NG_VALIDATORS, NG_ASYNC_VALIDATORS or DYNAMIC_FORM_VALIDATORS`));
    });


    it("should update validators on control and model", () => {

        let config: any = {testValidator: null},
            control: FormControl = new FormControl(),
            model: DynamicFormControlModel = new DynamicInputModel({id: "input"});

        expect(control["validator"]).toBeNull();
        expect(model.validators).toBeNull();

        service.updateValidators(config, control, model);

        expect(isFunction(control["validator"])).toBe(true);
        expect((model.validators as object).hasOwnProperty("testValidator")).toBe(true);

        service.updateValidators(null, control, model);

        expect(control["validator"]).toBeNull();
        expect(model.validators).toBeNull();
    });


    it("should update async validators on control and model", () => {

        let config: any = {testAsyncValidator: null},
            control: FormControl = new FormControl(),
            model: DynamicFormControlModel = new DynamicInputModel({id: "input"});

        expect(control["asyncValidator"]).toBeNull();
        expect(model.asyncValidators).toBeNull();

        service.updateAsyncValidators(config, control, model);

        expect(isFunction(control["asyncValidator"])).toBe(true);
        expect((model.asyncValidators as object).hasOwnProperty("testAsyncValidator")).toBe(true);

        service.updateAsyncValidators(null, control, model);

        expect(control["asyncValidator"]).toBeNull();
        expect(model.asyncValidators).toBeNull();
    });


    it("should create error messages", () => {

        let errorMessages,
            testControl: FormControl = new FormControl(),
            testModel: DynamicFormControlModel = new DynamicInputModel({
                id: "testModel",
                minLength: 5,
                errorMessages: {
                    required: "Field is required",
                    minLength: "Field must contain at least {{ minLength }} characters",
                    custom1: "Field {{ id }} has a custom error",
                    custom2: "Field has a custom error: {{ validator.param }}"
                }
            });

        errorMessages = service.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(0);

        testControl.setErrors({required: true, minlength: 5});

        errorMessages = service.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(2);
        expect(errorMessages[0]).toEqual((testModel.errorMessages as any)["required"]);
        expect(errorMessages[1]).toEqual("Field must contain at least 5 characters");

        testControl.setErrors({custom1: true});

        errorMessages = service.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(1);
        expect(errorMessages[0]).toEqual(`Field ${testModel.id} has a custom error`);

        testControl.setErrors({custom2: {param: 42}});

        errorMessages = service.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(1);
        expect(errorMessages[0]).toEqual("Field has a custom error: 42");
    });


    it("should check form hooks", () => {

        expect(service.isFormHook(null)).toBe(false);
        expect(service.isFormHook("blur")).toBe(true);
        expect(service.isFormHook("focus")).toBe(false);
        expect(service.isFormHook("change")).toBe(true);
        expect(service.isFormHook("submit")).toBe(true);
    });
});
