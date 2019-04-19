import { isAddressToken, isContactToken, isContactField, isField, isSectionToken, validate } from "./autofill.utils";

describe("Autofill utils test suite", () => {

    it("should validate autofill expressions correctly", () => {

        let value1 = "section-test shipping mobile tel",
            value2 = "billing section-test mobile tel",
            value3 = "section-test shipping tel",
            value4 = "section-test work given-name",
            value5 = "billing cc-name",
            value6 = "home email",
            value7 = "section-test shipping work",
            value8 = "section-test work shipping tel",
            value9 = "billing country",
            value10 = "billing country name",
            value11 = "billing shipping name",
            value12 = "section-test1 section-test2 shipping name",
            value13 = "section-test1 blabla name",
            value14 = "section-test1 blabla mobile tel";

        expect(validate(value1)).toBe(true);
        expect(validate(value2)).toBe(false);
        expect(validate(value3)).toBe(false);
        expect(validate(value4)).toBe(false);
        expect(validate(value5)).toBe(true);
        expect(validate(value6)).toBe(true);
        expect(validate(value7)).toBe(false);
        expect(validate(value8)).toBe(false);
        expect(validate(value9)).toBe(true);
        expect(validate(value10)).toBe(false);
        expect(validate(value11)).toBe(false);
        expect(validate(value12)).toBe(false);
        expect(validate(value13)).toBe(false);
        expect(validate(value14)).toBe(false);
    });

    it("should validate address tokens correctly", () => {

        expect(isAddressToken("shipping")).toBe(true);
        expect(isAddressToken("billing")).toBe(true);
        expect(isAddressToken("home")).toBe(false);
    });

    it("should validate contact tokens correctly", () => {

        expect(isContactToken("home")).toBe(true);
        expect(isContactToken("work")).toBe(true);
        expect(isContactToken("mobile")).toBe(true);
        expect(isContactToken("fax")).toBe(true);
        expect(isContactToken("pager")).toBe(true);
        expect(isContactToken("billing")).toBe(false);
    });

    it("should validate section tokens correctly", () => {

        expect(isSectionToken("section-test")).toBe(true);
        expect(isSectionToken("section")).toBe(false);
    });

    it("should validate contact fields correctly", () => {

        expect(isContactField("tel")).toBe(true);
        expect(isContactField("email")).toBe(true);
        expect(isContactField("impp")).toBe(true);
        expect(isContactField("name")).toBe(false);
        expect(isContactField("country")).toBe(false);
    });

    it("should validate fields correctly", () => {

        expect(isField("street-address")).toBe(true);
        expect(isField("nickname")).toBe(true);
        expect(isField("organization")).toBe(true);
        expect(isField("postal-code")).toBe(true);
        expect(isField("country")).toBe(true);
        expect(isField("tel")).toBe(false);
        expect(isField("email")).toBe(false);
    });
});
