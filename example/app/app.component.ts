import {Component} from "@angular/core";
import {RouteConfig} from "@angular/router-deprecated";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";
import {DynamicFormComponent} from "./dynamic-form/dynamic-form.component";

@Component({

    directives: [ROUTER_DIRECTIVES, DynamicFormComponent],
    moduleId: module.id,
    selector: "app",
    templateUrl: "./app.component.html"
})

export class AppComponent {}
