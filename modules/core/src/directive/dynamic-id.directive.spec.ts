import {TestBed, async, inject} from "@angular/core/testing";
import {Component} from "@angular/core";
import {By} from "@angular/platform-browser";
import {DynamicIdDirective} from "./dynamic-id.directive";

@Component({
    template: `
        <div [dynamicId]="false"></div>
        <div [dynamicId]="'testId'"></div>
    `
})
class TestComponent {
}

describe("DynamicIdDirective test suite", () => {

    let fixture,
        directives;

    beforeEach(() => {

        fixture = TestBed.configureTestingModule(
            {
                declarations: [DynamicIdDirective, TestComponent]
            }
        ).createComponent(TestComponent);

        fixture.detectChanges();

        directives = fixture.debugElement.queryAll(By.directive(DynamicIdDirective));
    });


    it("should have two directives", () => {

        expect(directives.length).toBe(2);
    });

    it("should have one set id", () => {

        expect(directives[0].attributes["id"]).toBeUndefined();
        expect(directives[1].attributes["id"]).toEqual("testId");
    });
});