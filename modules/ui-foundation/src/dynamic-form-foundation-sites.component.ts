import {Component, Input, Output, EventEmitter, ContentChild, TemplateRef} from "@angular/core";
import {FormGroup} from "@angular/forms";
import {DynamicFormControlComponent, DynamicFormControlModel} from "@ng2-dynamic-forms/core";

export const DYNAMIC_FORM_UI_FOUNDATION_SITES = "FOUNDATION_SITES";

@Component({

    moduleId: module.id,
    selector: "dynamic-form-foundation-sites-control",
    templateUrl: "./dynamic-form-foundation-sites.component.html"
})

export class DynamicFormFoundationSitesComponent extends DynamicFormControlComponent {

    @Input() bindId: boolean = true;
    @Input() controlGroup: FormGroup;
    @Input() model: DynamicFormControlModel;
    @Input() nestedTemplate: TemplateRef<any>;

    @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    @Output() focus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @ContentChild(TemplateRef) customTemplate;

    readonly type: string = DYNAMIC_FORM_UI_FOUNDATION_SITES;

    constructor() {
        super();
    }
}