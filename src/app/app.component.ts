import { Component } from "@angular/core";
// import { Response, ResponseOptions } from "@angular/http";
// import { MockBackend } from "@angular/http/testing";
import { Router, NavigationEnd, RouterOutlet, RouterLink } from "@angular/router";
import { NgStyle } from "@angular/common";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    standalone: true,
    imports: [RouterOutlet, RouterLink, NgStyle]
})
export class AppComponent {
    routeData: any = {};
    url: string;

    constructor(/*private mockBackend: MockBackend,*/ private router: Router) {
        /*
        this.mockBackend.connections.subscribe((connection: any) => {

            let response = new Response({status: 200} as ResponseOptions);

            if (connection.request.url === "saveUrl") {

                connection.mockDownload(response);

                setTimeout(() => connection.mockRespond(response), 1500);

            } else if (connection.request.url === "removeUrl") {
                connection.mockRespond(response);
            }
        });
        */

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (this.url !== "/" && this.url !== event.url) {
                    location.reload(); // reload to avoid CSS side effects // DON'T DO this in production !!!

                } else {
                    this.routeData = this.router.routerState.snapshot.root.firstChild?.data;
                    this.url = event.urlAfterRedirects;
                }
            }
        });

        this.url = this.router.url;
    }
}
