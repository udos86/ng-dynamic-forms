import {TestBed, inject} from "@angular/core/testing";
import {DynamicFormAutoFillService} from "./dynamic-form-autofill.service";

describe("DynamicFormAutoFillService test suite", () => {

    let service;

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [DynamicFormAutoFillService]
        });
    });

    beforeEach(inject([DynamicFormAutoFillService], autoFillService => service = autoFillService));

    it("should validate autofill expressions correctly", () => {

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
    });

    it("should validate address tokens correctly", () => {

        expect(service.isAddressToken("shipping")).toBe(true);
        expect(service.isAddressToken("billing")).toBe(true);
        expect(service.isAddressToken("home")).toBe(false);
    });

    it("should validate contact tokens correctly", () => {

        expect(service.isContactToken("home")).toBe(true);
        expect(service.isContactToken("work")).toBe(true);
        expect(service.isContactToken("mobile")).toBe(true);
        expect(service.isContactToken("fax")).toBe(true);
        expect(service.isContactToken("pager")).toBe(true);
        expect(service.isContactToken("billing")).toBe(false);
    });

    it("should validate section tokens correctly", () => {

        expect(service.isSectionToken("section-test")).toBe(true);
        expect(service.isSectionToken("section")).toBe(false);
    });

    it("should validate contact fields correctly", () => {

        expect(service.isContactField("tel")).toBe(true);
        expect(service.isContactField("email")).toBe(true);
        expect(service.isContactField("impp")).toBe(true);
        expect(service.isContactField("name")).toBe(false);
        expect(service.isContactField("country")).toBe(false);
    });

    it("should validate fields correctly", () => {

        expect(service.isField("street-address")).toBe(true);
        expect(service.isField("nickname")).toBe(true);
        expect(service.isField("organization")).toBe(true);
        expect(service.isField("postal-code")).toBe(true);
        expect(service.isField("country")).toBe(true);
        expect(service.isField("tel")).toBe(false);
        expect(service.isField("email")).toBe(false);
    });
});