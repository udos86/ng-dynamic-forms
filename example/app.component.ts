import {Component} from "@angular/core";
import {RouteConfig} from "@angular/router-deprecated";
import {ROUTER_DIRECTIVES} from "@angular/router-deprecated";

@Component({

    directives: [ROUTER_DIRECTIVES],
    moduleId: module.id,
    selector: "app",
    templateUrl: "./app.component.html"
})

export class AppComponent {}
