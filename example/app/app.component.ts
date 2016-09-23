import {Component} from "@angular/core";
import {Router, NavigationEnd} from "@angular/router";

@Component({

    moduleId: module.id,
    selector: "app",
    templateUrl: "./app.component.html"
})

export class AppComponent {

    routeData: any = {};

    constructor (private router:Router) {

        this.router.events.subscribe(event => {
           if (event instanceof NavigationEnd) {
               this.routeData = this.router.routerState.snapshot.root.firstChild.data;
               console.log(this.router.routerState);
           }
        });
    }
}