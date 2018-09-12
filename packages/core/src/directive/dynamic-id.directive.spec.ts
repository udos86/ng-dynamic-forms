import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { DynamicIdDirective } from "./dynamic-id.directive";

@Component({
    template: `
        <div [dynamicId]="testId1"></div>
        <div [dynamicId]="testId2"></div>
    `
})
class TestComponent {

    testId1: boolean = false;
    testId2: string = "testId";
}

describe("DynamicIdDirective test suite", () => {

    let fixture: ComponentFixture<TestComponent>,
        directives: DebugElement[];

    beforeEach(() => {

        fixture = TestBed.configureTestingModule({

            declarations: [DynamicIdDirective, TestComponent]

        }).createComponent(TestComponent);

        fixture.detectChanges();

        directives = fixture.debugElement.queryAll(By.directive(DynamicIdDirective));
    });


    it("should have two directives", () => {

        expect(directives.length).toBe(2);
    });

    it("should have one set id", () => {

        expect(directives[0].attributes["id"]).toBeUndefined();
        expect(directives[1].attributes["id"]).toEqual(fixture.componentInstance.testId2);
    });
});