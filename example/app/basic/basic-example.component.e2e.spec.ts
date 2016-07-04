describe("BasicExampleComponent", () => {

    let checkbox;
    let checkboxGroup;
    let input;
    let radioGroup;
    let select;
    let textarea;

    beforeEach( () => {

        browser.get("./example-basic");

        checkbox = element(by.id("basicCheckbox"));
        checkboxGroup = element(by.id("basicCheckboxGroup"));
        input = element(by.id("basicInput"));
        radioGroup = element(by.id("basicRadioGroup"));
        select = element(by.id("basicSelect"));
        textarea = element(by.id("basicTextArea"));
    });

    it("tests if all expected form controls do exist in DOM", () => {

        expect(checkbox).toBeDefined();
        expect(checkboxGroup).toBeDefined();
        expect(input).toBeDefined();
        expect(radioGroup).toBeDefined();
        expect(select).toBeDefined();
        expect(textarea).toBeDefined();
    });
    
});