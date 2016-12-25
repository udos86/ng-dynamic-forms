import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, Type, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { DynamicTemplateDirective } from "./dynamic-template.directive";

@Component({
    template: `
        <template modelId="test1"></template>
        <template modelId="test2"></template>
    `
})
class TestComponent {
}

describe("DynamicTemplateDirective test suite", () => {

    let fixture: ComponentFixture<TestComponent>,
        directives: Array<DebugElement>;

    beforeEach(() => {

        fixture = TestBed.configureTestingModule({

            declarations: [DynamicTemplateDirective, TestComponent]

        }).createComponent(TestComponent as Type<TestComponent>);

        fixture.detectChanges();

        directives = fixture.debugElement.queryAll(By.directive(DynamicTemplateDirective));
    });
});