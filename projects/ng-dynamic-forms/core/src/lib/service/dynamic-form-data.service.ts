import { Injectable, Injector } from "@angular/core";
import { AbstractControl, FormControl, FormGroup } from "@angular/forms";
import { DynamicFormControlModel } from "../model/dynamic-form-control.model";
import { debounceTime, startWith } from "rxjs/operators";
import { Subscription } from "rxjs";
import { DynamicInputModel } from '../model/input/dynamic-input.model';
import { DynamicFormService } from './dynamic-form.service';
import { DynamicOptionControlModel } from '../model/dynamic-option-control.model';
import {
  DynamicFormControlListDataProvider,
  DynamicFormControlOptionDataProvider
} from '../model/misc/dynamic-form-control-data.model';

@Injectable({
  providedIn: "root"
})
export class DynamicFormDataService {

  constructor(private injector: Injector) {
  }

  getRelatedFormControl(model: DynamicFormControlModel, group: FormGroup): AbstractControl {
    const relation = model.dataProvider.relation;
    const control = relation.rootPath ? group.root.get(relation.rootPath) : group.get(relation.id);

    if (!(control instanceof FormControl)) {
      console.warn(`No related form control with id ${relation.id} could be found`);
    }

    return control;
  }

  connectDynamicFormControls(model: DynamicFormControlModel, group: FormGroup): Subscription {
    const relatedControl = this.getRelatedFormControl(model, group);
    const valueChanges = relatedControl.valueChanges.pipe(startWith(relatedControl.value));

    return valueChanges
      .pipe(debounceTime(400))
      .subscribe((value) => {
        if (model instanceof DynamicInputModel) {
          this.populateList(value, model, this.injector);
        } else if (model instanceof DynamicOptionControlModel) {
          this.populateOptions(value, model, this.injector);
        }
      });
  }

  isListProvider(provider: DynamicFormControlListDataProvider<any>): boolean {
    return provider.fetchList !== undefined;
  }

  isOptionProvider(provider: DynamicFormControlOptionDataProvider<any>): boolean {
    return provider.fetchOptions !== undefined;
  }

  populateList(value, model, injector): void {
    const provider = injector.get(model.dataProvider.service);

    if (!this.isListProvider(provider)) {
      console.warn(`Data Service does not conform to DynamicFormControlListDataProvider interface for id ${model.id}`)
      return;
    }

    provider.fetchList(value)
      .subscribe((val) => {
        model.list = val;
        injector.get(DynamicFormService).detectChanges();
      });
  }

  populateOptions(value, model, injector): void {
    const provider = injector.get(model.dataProvider.service);

    if (!this.isOptionProvider(provider)) {
      console.warn(`Data Service does not conform to DynamicFormControlOptionDataProvider interface for id ${model.id}`)
      return;
    }

    provider.fetchOptions(value)
      .subscribe((val) => {
        model.options = val;
        injector.get(DynamicFormService).detectChanges();
      });
  }
}
