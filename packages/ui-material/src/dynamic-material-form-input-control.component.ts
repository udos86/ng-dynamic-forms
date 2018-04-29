import { MatInput } from "@angular/material";
import {
    DynamicFormControlComponent,
    DynamicFormLayoutService,
    DynamicFormValidationService,
    DynamicInputControlModel,
    DynamicInputModel
} from "@ng-dynamic-forms/core";

export abstract class DynamicMaterialFormInputControlComponent extends DynamicFormControlComponent {

    matInput: MatInput | undefined;

    constructor(protected layoutService: DynamicFormLayoutService,
                protected validationService: DynamicFormValidationService) {

        super(layoutService, validationService);
    }

    get characterCount(): number | null {
        return this.matInput ? this.matInput.value.length : null;
    }

    get characterHint(): string {
        return `${this.characterCount} / ${(this.model as DynamicInputControlModel<string>).maxLength}`;
    }

    get showCharacterHint(): boolean {
        return !!((this.model as DynamicInputModel).maxLength && this.characterCount);
    }
}