import * as autofill from "./dynamic-form-autofill";

describe("Autofill test suite", () => {

    it("tests if autofill validation is working correctly", () => {

        let testAutofill1 = "section-test shipping mobile tel";
        let testAutofill2 = "billing section-test mobile tel";
        let testAutofill3 = "section-test shipping tel";
        let testAutofill4 = "section-test work given-name";
        let testAutofill5 = "billing cc-name";
        let testAutofill6 = "home email";
        let testAutofill7 = "section-test shipping work";
        let testAutofill8 = "section-test work shipping tel";
        let testAutofill9 = "billing country";
        let testAutofill10 = "billing country name";
        let testAutofill11 = "billing shipping name";
        let testAutofill12 = "section-test1 section-test2 shipping name";
        let testAutofill13 = "section-test1 blabla name";
        let testAutofill14 = "section-test1 blabla mobile tel";

        expect(autofill.validateAutofill(testAutofill1)).toBe(true);
        expect(autofill.validateAutofill(testAutofill2)).toBe(false);
        expect(autofill.validateAutofill(testAutofill3)).toBe(false);
        expect(autofill.validateAutofill(testAutofill4)).toBe(false);
        expect(autofill.validateAutofill(testAutofill5)).toBe(true);
        expect(autofill.validateAutofill(testAutofill6)).toBe(true);
        expect(autofill.validateAutofill(testAutofill7)).toBe(false);
        expect(autofill.validateAutofill(testAutofill8)).toBe(false);
        expect(autofill.validateAutofill(testAutofill9)).toBe(true);
        expect(autofill.validateAutofill(testAutofill10)).toBe(false);
        expect(autofill.validateAutofill(testAutofill11)).toBe(false);
        expect(autofill.validateAutofill(testAutofill12)).toBe(false);
        expect(autofill.validateAutofill(testAutofill13)).toBe(false);
        expect(autofill.validateAutofill(testAutofill14)).toBe(false);
    });

});