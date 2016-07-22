import {describe, expect, inject, it, beforeEach, addProviders} from "@angular/core/testing";
import {DynamicFormAutoFillService} from "./dynamic-form-autofill.service";

describe("DynamicFillAutoFillService test suite", () => {

    beforeEach(() => {
        addProviders([DynamicFormAutoFillService]);
    });

    it("tests if autofill validation is working correctly", inject([DynamicFormAutoFillService],
        (service) => {

            let value1 = "section-test shipping mobile tel";
            let value2 = "billing section-test mobile tel";
            let value3 = "section-test shipping tel";
            let value4 = "section-test work given-name";
            let value5 = "billing cc-name";
            let value6 = "home email";
            let value7 = "section-test shipping work";
            let value8 = "section-test work shipping tel";
            let value9 = "billing country";
            let value10 = "billing country name";
            let value11 = "billing shipping name";
            let value12 = "section-test1 section-test2 shipping name";
            let value13 = "section-test1 blabla name";
            let value14 = "section-test1 blabla mobile tel";

            expect(service.validate(value1)).toBe(true);
            expect(service.validate(value2)).toBe(false);
            expect(service.validate(value3)).toBe(false);
            expect(service.validate(value4)).toBe(false);
            expect(service.validate(value5)).toBe(true);
            expect(service.validate(value6)).toBe(true);
            expect(service.validate(value7)).toBe(false);
            expect(service.validate(value8)).toBe(false);
            expect(service.validate(value9)).toBe(true);
            expect(service.validate(value10)).toBe(false);
            expect(service.validate(value11)).toBe(false);
            expect(service.validate(value12)).toBe(false);
            expect(service.validate(value13)).toBe(false);
            expect(service.validate(value14)).toBe(false);
        }));
});