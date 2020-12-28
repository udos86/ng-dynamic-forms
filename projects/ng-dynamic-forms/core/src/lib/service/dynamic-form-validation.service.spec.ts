import { TestBed, inject } from "@angular/core/testing";
import { ReactiveFormsModule, FormControl, NG_VALIDATORS, NG_ASYNC_VALIDATORS, ValidationErrors, Validators } from "@angular/forms";
import { DynamicFormValidationService } from "./dynamic-form-validation.service";
import {
  DYNAMIC_GLOBAL_ERROR_MESSAGES, DYNAMIC_VALIDATORS,
  Validator, ValidatorErrorMessageFn,
  ValidatorFactory,
} from "./dynamic-form-validators";
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
                },
                {
                    provide: DYNAMIC_GLOBAL_ERROR_MESSAGES,
                    useValue:  new Map<string, string | ValidatorErrorMessageFn>([
                      ['testDynamicError', 'this is a test'],
                      ['testFunc', (model: DynamicFormControlModel, error: string) => error],
                      ['*', 'this is a catch-all'],
                    ]),
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

        const config: any = {required: null, maxLength: 7, minLength: 3};
        const validators = service.getValidators(config);

        expect(validators.length === Object.keys(config).length).toBe(true);
    });


    it("should resolve custom validators from config", () => {

        const config: any = {required: null, maxLength: 7, testValidator: null, testValidatorFactory: "test"};
        const validators = service.getValidators(config);

        expect(validators.length === Object.keys(config).length).toBe(true);
    });


    it("should resolve custom validators from detailed config", () => {

        const config: any = {testValidator: {name: testValidator.name, args: null}};
        const validators = service.getValidators(config);

        expect(validators.length === Object.keys(config).length).toBe(true);
    });


    it("should resolve custom async validators from config", () => {

        const config: any = {testAsyncValidator: null};
        const validators = service.getAsyncValidators(config);

        expect(validators.length === Object.keys(config).length).toBe(true);
    });


    it("should throw when validator is not provided via NG_VALIDATORS", () => {

        expect(() => service.getValidator("test", null))
            .toThrow(new Error(`validator "test" is not provided via NG_VALIDATORS, NG_ASYNC_VALIDATORS or DYNAMIC_FORM_VALIDATORS`));
    });


    it("should update validators on control and model", () => {

        const config: any = {testValidator: null};
        const control: FormControl = new FormControl();
        const model: DynamicFormControlModel = new DynamicInputModel({id: "input"});

        expect(control.validator).toBeNull();
        expect(model.validators).toBeNull();

        service.updateValidators(config, control, model);

        expect(isFunction(control.validator)).toBe(true);
        expect((model.validators as object).hasOwnProperty("testValidator")).toBe(true);

        service.updateValidators(null, control, model);

        expect(control.validator).toBeNull();
        expect(model.validators).toBeNull();
    });


    it("should update async validators on control and model", () => {

        const config: any = {testAsyncValidator: null};
        const control: FormControl = new FormControl();
        const model: DynamicFormControlModel = new DynamicInputModel({id: "input"});

        expect(control.asyncValidator).toBeNull();
        expect(model.asyncValidators).toBeNull();

        service.updateAsyncValidators(config, control, model);

        expect(isFunction(control.asyncValidator)).toBe(true);
        expect((model.asyncValidators as object).hasOwnProperty("testAsyncValidator")).toBe(true);

        service.updateAsyncValidators(null, control, model);

        expect(control.asyncValidator).toBeNull();
        expect(model.asyncValidators).toBeNull();
    });


    it("should create error messages", () => {

        const testControl: FormControl = new FormControl();
        const testModel: DynamicFormControlModel = new DynamicInputModel({
            id: "testModel",
            minLength: 5,
            errorMessages: {
                required: "Field is required",
                minLength: "Field must contain at least {{ minLength }} characters",
                custom1: "Field {{ id }} has a custom error",
                custom2: "Field has a custom error: {{ validator.param }}",
                customFunc: (model: DynamicFormControlModel, error: string) => error,
                '*': 'catch-all',
            }
        });

        let errorMessages;

        errorMessages = service.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(0);

        testControl.setErrors({required: true, minlength: 5});

        errorMessages = service.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(2);
        expect(errorMessages[0]).toEqual((testModel.errorMessages as any).required);
        expect(errorMessages[1]).toEqual("Field must contain at least 5 characters");

        testControl.setErrors({custom1: true});

        errorMessages = service.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(1);
        expect(errorMessages[0]).toEqual(`Field ${testModel.id} has a custom error`);

        testControl.setErrors({custom2: {param: 42}});

        errorMessages = service.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(1);
        expect(errorMessages[0]).toEqual("Field has a custom error: 42");

        testControl.setErrors({customFunc: 'error message'});

        errorMessages = service.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(1);
        expect(errorMessages[0]).toEqual("error message");

        testControl.setErrors({unknownToken: true});

        errorMessages = service.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(1);
        expect(errorMessages[0]).toEqual("catch-all");
    });


    it("should check if error messages should be shown", () => {

        const control: FormControl = new FormControl();
        const model: DynamicFormControlModel = new DynamicInputModel({
            id: "testModel",
            errorMessages: {
                required: "Field is required"
            }
        });

        expect(service.showErrorMessages(control, model, false)).toBe(false);
        expect(service.showErrorMessages(control, model, true)).toBe(false);

        control.markAsTouched();
        control.setValidators(Validators.required);
        control.updateValueAndValidity();

        expect(service.showErrorMessages(control, model, true)).toBe(false);
        expect(service.showErrorMessages(control, model, false)).toBe(true);
    });


    it("should check form hooks", () => {

        expect(service.isFormHook(null)).toBe(false);
        expect(service.isFormHook("blur")).toBe(true);
        expect(service.isFormHook("focus")).toBe(false);
        expect(service.isFormHook("change")).toBe(true);
        expect(service.isFormHook("submit")).toBe(true);
    });

  it("can create global error messages", () => {
    inject([DynamicFormValidationService],
      (validationService: DynamicFormValidationService) => {
        const testControl: FormControl = new FormControl();
        const testModel: DynamicFormControlModel = new DynamicInputModel({
          id: "testModel",
          minLength: 5,
        });

        let errorMessages;

        errorMessages = validationService.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(0);

        testControl.setErrors({testDynamicError: true});

        errorMessages = validationService.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(1);
        expect(errorMessages[0]).toEqual("this is a test");
      });
  });

  it("error messages can be functions", () => {
    inject([DynamicFormValidationService],
      (validationService: DynamicFormValidationService) => {
        const testControl: FormControl = new FormControl();
        const testModel: DynamicFormControlModel = new DynamicInputModel({
          id: "testModel",
          minLength: 5,
        });

        let errorMessages;

        errorMessages = validationService.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(0);

        testControl.setErrors({testFunc: 'this should echo'});

        errorMessages = validationService.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(1);
        expect(errorMessages[0]).toEqual("this should echo");
      });
  });

  it("error messages can be catch-alls", () => {
    inject([DynamicFormValidationService],
      (validationService: DynamicFormValidationService) => {
        const testControl: FormControl = new FormControl();
        const testModel: DynamicFormControlModel = new DynamicInputModel({
          id: "testModel",
          minLength: 5,
        });

        let errorMessages;

        errorMessages = service.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(0);

        testControl.setErrors({unknown: 'this should not echo'});

        errorMessages = service.createErrorMessages(testControl, testModel);
        expect(errorMessages.length).toBe(1);
        expect(errorMessages[0]).toEqual("this is a catch-all");
      });
  });
});
