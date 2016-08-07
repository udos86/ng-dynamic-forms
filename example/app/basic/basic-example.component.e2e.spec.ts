import "reflect-metadata";
import {BASIC_EXAMPLE_MODEL} from "./basic-example.model";
import {DynamicFormControlModel, DynamicTextAreaModel, DynamicFormService} from "@ng2-dynamic-forms/core";

describe("BasicExampleComponent", () => {

    beforeEach(() => {

        browser.get("./example-basic");
    });

    it("tests if all form controls are rendered correctly", () => {

        BASIC_EXAMPLE_MODEL.forEach(model => {

            let elm = element(by.name(model.id));

            expect(elm).toBeDefined();
            //elm.getAttribute("name").then(name => expect(name).toEqual(model.name));
            elm.getAttribute("disabled").then(attr => {

                if (model.disabled === true) {
                    expect(attr).toBeTruthy();

                } else {
                    expect(attr).toBeNull();
                }
            });
        });
    });

    it("tests if all labels are rendered correctly", () => {

        element.all(by.tagName("label")).each(label => {

            label.getAttribute("for").then(attr => {

                let model = <DynamicFormControlModel> new DynamicFormService(null).findById(attr, BASIC_EXAMPLE_MODEL);

                if (model) {
                    label.getText().then(text => expect(text).toBe(model.label));
                }
            });
        });
    });

    it("test if textarea form control is rendered correctly", () => {

        let textarea = element(by.name("basicTextArea"));
        let model = <DynamicTextAreaModel> new DynamicFormService(null).findById("basicTextArea", BASIC_EXAMPLE_MODEL);

        textarea.getAttribute("cols").then(cols => expect(parseInt(cols)).toEqual(model.cols));
        textarea.getAttribute("placeholder").then(placeholder => expect(placeholder).toEqual(model.placeholder));
        textarea.getAttribute("rows").then(rows => expect(parseInt(rows)).toEqual(model.rows));
        textarea.getAttribute("wrap").then(wrap => expect(wrap).toEqual(model.wrap));
    });

});