import "reflect-metadata";
import {BASIC_EXAMPLE_MODEL} from "./basic-example.model";

describe("BasicExampleComponent", () => {

    let elements = {

        checkbox: null,
        checkboxGroup: null,
        input: null,
        radioGroup: null,
        select: null,
        textarea: null
    };
    
    let models = {

        checkbox: BASIC_EXAMPLE_MODEL.items[5],
        checkboxGroup: BASIC_EXAMPLE_MODEL.items[2],
        input: BASIC_EXAMPLE_MODEL.items[1],
        radioGroup: BASIC_EXAMPLE_MODEL.items[3],
        select: BASIC_EXAMPLE_MODEL.items[0],
        textarea: BASIC_EXAMPLE_MODEL.items[4]
    };
    
    beforeEach( () => {

        browser.get("./example-basic");

        elements.checkbox = element(by.id("basicCheckbox"));
        elements.checkboxGroup = element(by.id("basicCheckboxGroup"));
        elements.input = element(by.id("basicInput"));
        elements.radioGroup = element(by.id("basicRadioGroup"));
        elements.select = element(by.id("basicSelect"));
        elements.textarea = element(by.id("basicTextArea"));
    });

    it("tests if all form controls do exist in DOM", () => {

        expect(elements.checkbox).toBeDefined();
        expect(elements.checkboxGroup).toBeDefined();
        expect(elements.input).toBeDefined();
        expect(elements.radioGroup).toBeDefined();
        expect(elements.select).toBeDefined();
        expect(elements.textarea).toBeDefined();
    });

    it("tests if all form controls have correct name attribute", () => {
        
        elements.checkbox.getAttribute("name").then(name => expect(name).toEqual(models.checkbox.name));
        //elements.checkboxGroup.getAttribute("name").then(name => expect(name).toEqual(models.checkboxGroup.name));
        elements.input.getAttribute("name").then(name => expect(name).toEqual(models.input.name));
        //elements.radioGroup.getAttribute("name").then(name => expect(name).toEqual(models.radioGroup.name));
        elements.select.getAttribute("name").then(name => expect(name).toEqual(models.select.name));
        elements.textarea.getAttribute("name").then(name => expect(name).toEqual(models.textarea.name));
    });
    
});