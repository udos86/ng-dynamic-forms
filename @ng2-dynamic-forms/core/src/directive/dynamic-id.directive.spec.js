"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var testing_1 = require("@angular/core/testing");
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var dynamic_id_directive_1 = require("./dynamic-id.directive");
var TestComponent = (function () {
    function TestComponent() {
    }
    TestComponent = __decorate([
        core_1.Component({
            template: "\n        <div [dynamicId]=\"false\"></div>\n        <div [dynamicId]=\"'testId'\"></div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], TestComponent);
    return TestComponent;
}());
describe("DynamicIdDirective test suite", function () {
    var fixture, directives;
    beforeEach(function () {
        fixture = testing_1.TestBed.configureTestingModule({
            declarations: [dynamic_id_directive_1.DynamicIdDirective, TestComponent]
        }).createComponent(TestComponent);
        fixture.detectChanges();
        directives = fixture.debugElement.queryAll(platform_browser_1.By.directive(dynamic_id_directive_1.DynamicIdDirective));
    });
    it("should have two directives", function () {
        expect(directives.length).toBe(2);
    });
    it("should have one set id", function () {
        expect(directives[0].attributes["id"]).toBeUndefined();
        expect(directives[1].attributes["id"]).toEqual("testId");
    });
});

//# sourceMappingURL=dynamic-id.directive.spec.js.map
