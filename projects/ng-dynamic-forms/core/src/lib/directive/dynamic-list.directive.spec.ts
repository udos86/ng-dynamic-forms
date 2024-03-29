import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { DynamicListDirective } from "./dynamic-list.directive";

@Component({
    template: `
        <div [dynamicList]="testList1"></div>
        <div [dynamicList]="testList2"></div>
    `,
    standalone: true,
    imports: [DynamicListDirective]
})
class TestComponent {
    testList1 = null;
    testList2 = "list";
}

describe("DynamicListDirective test suite", () => {
    let fixture: ComponentFixture<TestComponent>;
    let directives: DebugElement[];

    beforeEach(() => {
        fixture = TestBed.configureTestingModule({
            imports: [TestComponent]
        }).createComponent(TestComponent);

        fixture.detectChanges();

        directives = fixture.debugElement.queryAll(By.directive(DynamicListDirective));
    });


    it("should have two directives", () => {
        expect(directives.length).toBe(2);
    });

    it("should have one set list", () => {
        expect(directives[0].attributes["list"]).toBeUndefined();
        expect(directives[1].attributes["list"]).toEqual(fixture.componentInstance.testList2);
    });
});
