import "reflect-metadata";
import {BASIC_EXAMPLE_MODEL} from "./basic-example.model";

describe("BasicExampleComponent", () => {

    beforeEach(() => {

        browser.get("./example-basic");
    });

    it("tests if all form controls are rendered correctly", () => {

        BASIC_EXAMPLE_MODEL.items.forEach(model => {

            let elm = element(by.id(model.id));

            expect(elm).toBeDefined();
            
            elm.getAttribute("id").then(attr => expect(attr).toEqual(model.id));
            elm.getAttribute("name").then(attr => expect(attr).toEqual(model.name));
            elm.getAttribute("disabled").then(attr => {

                if (model.disabled === true) {
                    expect(attr).toBeTruthy();

                } else {
                    expect(attr).toBeNull();
                }
            });
        });
    });
});