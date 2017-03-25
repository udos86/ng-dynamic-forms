import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Component, Type, DebugElement } from "@angular/core";
import { By } from "@angular/platform-browser";
import { DynamicTemplateDirective, DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END } from "./dynamic-template.directive";

@Component({
    template: `
        <ng-template modelId="test1"></ng-template>
        <ng-template modelId="test2"></ng-template>
    `
})
class TestComponent {
}

describe("DynamicTemplateDirective test suite", () => {

    let directive: DynamicTemplateDirective,
        fixture: ComponentFixture<TestComponent>,
        directives: DebugElement[];

    beforeEach(() => {

        directive = new DynamicTemplateDirective(null);

        fixture = TestBed.configureTestingModule({

            declarations: [DynamicTemplateDirective, TestComponent]

        }).createComponent(TestComponent as Type<TestComponent>);

        fixture.detectChanges();

        directives = fixture.debugElement.queryAll(By.directive(DynamicTemplateDirective));
    });

    it("should be initialized correctly", () => {

        expect(directive.align).toEqual(DYNAMIC_TEMPLATE_DIRECTIVE_ALIGN_END);
        expect(directive.modelId).toBeUndefined();
        expect(directive.modelType).toBeUndefined();
        expect(directive.type).toBeNull();
    });
});