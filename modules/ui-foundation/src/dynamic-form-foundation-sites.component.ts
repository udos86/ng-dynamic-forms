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
    @Input() errorMessagesMap: {[key: string]: string} = {};

    @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();
    @Output() focus: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

    @ContentChild(TemplateRef) customTemplate;

    readonly type: string = DYNAMIC_FORM_UI_FOUNDATION_SITES;

    constructor() {
        super();
    }

    public get isShowErrors(): boolean {
        return this.control.touched && this.control.invalid;
    }

    public get errorMessages(): string[] {
        let errorMessages = [];
        let errors = this.control.errors;

        for(let validatorName in errors) {
            let message: string;
            let validationObj = errors[validatorName];

            if(this.errorMessagesMap[validatorName]) {
                message = this.errorMessagesMap[validatorName].replace(/\{\{(model|validator)\.(.+?)\}\}/mg, (match, variableSource, variableName) => {
                    let replacement;

                    if(variableSource === "model" && this.model[variableName]) {
                        replacement = <string> this.model[variableName];
                    } else if(variableSource === "validator" && typeof validationObj === "object" && validationObj[variableName]) {
                        replacement = <string> validationObj[variableName];
                    }

                    return replacement;
                });
            } else {
                message = `Validation "${validatorName}" failed`;
            }

            errorMessages.push(message);
        }

        return errorMessages;
    }
}