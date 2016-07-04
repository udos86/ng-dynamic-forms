describe("AppComponent", () => {

    beforeEach( () => {
        browser.get("/");
    });

    it("should have a title", () => {
        expect(browser.getTitle()).toEqual("ng2-dynamics-form samples");
    });
    
});