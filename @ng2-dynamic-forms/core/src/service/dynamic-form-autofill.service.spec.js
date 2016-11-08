"use strict";
var testing_1 = require("@angular/core/testing");
var dynamic_form_autofill_service_1 = require("./dynamic-form-autofill.service");
describe("DynamicFillAutoFillService test suite", function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [dynamic_form_autofill_service_1.DynamicFormAutoFillService]
        });
    });
    it("tests if autofill validation is working correctly", testing_1.inject([dynamic_form_autofill_service_1.DynamicFormAutoFillService], function (service) {
        var value1 = "section-test shipping mobile tel";
        var value2 = "billing section-test mobile tel";
        var value3 = "section-test shipping tel";
        var value4 = "section-test work given-name";
        var value5 = "billing cc-name";
        var value6 = "home email";
        var value7 = "section-test shipping work";
        var value8 = "section-test work shipping tel";
        var value9 = "billing country";
        var value10 = "billing country name";
        var value11 = "billing shipping name";
        var value12 = "section-test1 section-test2 shipping name";
        var value13 = "section-test1 blabla name";
        var value14 = "section-test1 blabla mobile tel";
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

//# sourceMappingURL=dynamic-form-autofill.service.spec.js.map
