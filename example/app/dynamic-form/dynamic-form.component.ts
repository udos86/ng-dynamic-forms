import {Component} from "@angular/core";
import {BootstrapExampleComponent} from "./bootstrap/bootstrap-example.component";
import {MaterialExampleComponent} from "./material/material-example.component";
import {BasicExampleComponent} from "./basic/basic-example.component";
import {FoundationExampleComponent} from "./foundation/foundation-example.component";

@Component({

    directives: [BasicExampleComponent, BootstrapExampleComponent, FoundationExampleComponent, 
        MaterialExampleComponent],
    moduleId: module.id,
    selector: "dynamic-form",
    templateUrl: "./dynamic-form.component.html",
})

export class DynamicFormComponent {}