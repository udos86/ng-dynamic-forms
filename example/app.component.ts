import {Component} from "@angular/core";
import {RouteConfig} from "@angular/router-deprecated";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {DynamicFormUIBasicComponent} from "./dynamic-form-ui-basic/dynamic-form-ui-basic.component";

@Component({

    directives: [ROUTER_DIRECTIVES, DynamicFormUIBasicComponent],
    moduleId: module.id,
    selector: "app",
    templateUrl: "./app.component.html"
})

export class AppComponent {}
