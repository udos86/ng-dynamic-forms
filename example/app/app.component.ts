import { Component } from "@angular/core";
import { Response, ResponseOptions } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import { Router, NavigationEnd } from "@angular/router";

@Component({

    moduleId: module.id,
    selector: "app",
    templateUrl: "./app.component.html"
})

export class AppComponent {

    routeData: any = {};

    constructor(private mockBackend: MockBackend, private router: Router) {

        this.mockBackend.connections.subscribe((connection: any) => {

            let response = new Response({status: 200} as ResponseOptions);

            if (connection.request.url === "saveUrl") {

                connection.mockDownload(response);

                setTimeout(() => connection.mockRespond(response), 1500);

            } else if (connection.request.url === "removeUrl") {
                connection.mockRespond(response);
            }
        });

        this.router.events.subscribe(event => {

            if (event instanceof NavigationEnd) {
                this.routeData = this.router.routerState.snapshot.root.firstChild.data;
            }
        });
    }
}