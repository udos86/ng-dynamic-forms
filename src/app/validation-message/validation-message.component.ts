import { Component, Input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: "validation-message",
    templateUrl: "./validation-message.component.html"
})

export class ValidationMessageComponent {

    @Input() control: FormControl;
}
