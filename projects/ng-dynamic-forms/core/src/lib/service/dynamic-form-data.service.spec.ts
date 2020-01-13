import {TestBed, inject, tick, fakeAsync} from "@angular/core/testing";
import {FormGroup, ReactiveFormsModule} from "@angular/forms";
import { DynamicFormService } from "./dynamic-form.service";
import { DynamicSelectModel } from "../model/select/dynamic-select.model";
import { DynamicRadioGroupModel } from "../model/radio/dynamic-radio-group.model";
import {DynamicFormDataService} from './dynamic-form-data.service';
import {
  DynamicFormControlListDataProvider,
  DynamicFormControlOptionDataProvider
} from '../model/misc/dynamic-form-control-data.model';
import {Observable, of} from 'rxjs';
import {Injectable} from '@angular/core';
import {DynamicInputModel} from '../model/input/dynamic-input.model';
import {DynamicFormGroupModel} from '../model/form-group/dynamic-form-group.model';
import {DynamicFormOptionConfig} from '../model/dynamic-option-control.model';

@Injectable()
class TestProvider implements DynamicFormControlListDataProvider<string>, DynamicFormControlOptionDataProvider<string> {
  fetchList(value: string): Observable<string[]> {
    return of(['test']);
  }

  fetchOptions(value: string): Observable<DynamicFormOptionConfig<string>[]> {
    return of([{
      label: 'Test',
      value: 'test'
    }]);
  }
}

@Injectable()
class InvalidTestProvider {

}

describe("DynamicFormDataService test suite", () => {

  let service: DynamicFormDataService,
    group: FormGroup,
    model: DynamicInputModel = new DynamicInputModel({
      id: "testInput2",
      list: ['item-1', 'item-2', 'item-3'],
      value: "item-1",
      dataProvider: {
        relation: {
          id: 'testInput'
        },
        service: TestProvider,
      }
    }),
    select: DynamicSelectModel<any> = new DynamicSelectModel({
      id: "testSelect",
      options: [{value: "option-1"}, {value: "option-2"}, {value: "option-3"}],
      value: "option-1",
      dataProvider: {
        relation: {
          id: 'testInput'
        },
        service: TestProvider,
      }
    }),
    radio: DynamicRadioGroupModel<any> = new DynamicRadioGroupModel({
      id: "testRadioGroup",
      options: [{value: "option-1"}, {value: "option-2"}, {value: "option-3"}],
      value: "option-1",
      dataProvider: {
        relation: {
          id: 'testInput'
        },
        service: TestProvider
      }
    }),
    invalidListProvider: DynamicInputModel = new DynamicInputModel({
      id: "invalidListProvider",
      list: ['item-1', 'item-2', 'item-3'],
      value: "item-1",
      dataProvider: {
        relation: {
          id: 'testInput'
        },
        service: InvalidTestProvider,
      }
    }),
    invalidOptionProvider: DynamicSelectModel<any> = new DynamicSelectModel({
      id: "invalidOptionProvider",
      options: [{value: "option-1"}, {value: "option-2"}, {value: "option-3"}],
      value: "option-1",
      dataProvider: {
        relation: {
          id: 'testInput'
        },
        service: InvalidTestProvider,
      }
    }),
    referenceInvalidControl: DynamicInputModel = new DynamicInputModel({
      id: "referenceInvalidControl",
      list: ['item-1', 'item-2', 'item-3'],
      value: "item-1",
      dataProvider: {
        relation: {
          id: 'not-an-id'
        },
        service: TestProvider,
      }
    }),
    groupModel = new DynamicFormGroupModel({
      id: 'test',
      group: [
        new DynamicRadioGroupModel({
          id: "testRootRadioGroup",
          options: [{value: "option-1"}, {value: "option-2"}, {value: "option-3"}],
          value: "option-1",
          dataProvider: {
            relation: {
              id: 'testInput'
            },
            service: TestProvider
          }
        }),
      ]
    }),
    groupInputTest = new DynamicInputModel({
    id: "testInput",
    dataProvider: {
      relation: {
        rootPath: 'test.testRootRadioGroup'
      },
      service: TestProvider,
    }
  })
  ;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [DynamicFormDataService, TestProvider, InvalidTestProvider]
    });
  });

  beforeEach(inject([DynamicFormDataService, DynamicFormService],
    (dataService: DynamicFormDataService, formService: DynamicFormService) => {

      service = dataService;

      group = formService.createFormGroup([
        new DynamicInputModel({id: "testInput"}),
        model,
        select,
        radio,
        invalidListProvider,
        invalidOptionProvider,
        groupModel
      ]);
    }));

  it("should get related form control correctly", () => {
    const compareControl = group.get('testInput');
    const relatedFormControl = service.getRelatedFormControl(model, group);

    expect(relatedFormControl).toBe(compareControl);
  });

  it("should get data from provider on related input value change", fakeAsync(() => {
    const triggerControl = group.get('testInput');

    service.connectDynamicFormControls(model, group);
    triggerControl.setValue('newVal');
    tick(401);
    model.list$.subscribe((list) =>  expect(list[0]).toBe('test'));
  }));

  it("should get data from provider on related select option value change", fakeAsync(() => {
    const triggerControl = group.get('testInput');

    service.connectDynamicFormControls(select, group);
    triggerControl.setValue('newVal');
    tick(401);
    select.options$.subscribe((options) =>  expect(options[0].value).toBe('test'));
  }));

  it("should get data from provider on related radio option value change", fakeAsync(() => {
    const triggerControl = group.get('testInput');

    service.connectDynamicFormControls(radio, group);
    triggerControl.setValue('newVal');
    tick(401);
    radio.options$.subscribe((options) =>  expect(options[0].value).toBe('test'));
  }));

  it("should not fail with invalid provider but receive warning with missing list data provider.", fakeAsync(() => {
    const triggerControl = group.get('testInput');

    service.connectDynamicFormControls(invalidListProvider, group);
    triggerControl.setValue('newVal');
    tick(401);
    invalidListProvider.list$.subscribe((list) =>  expect(list[0]).toBe('item-1'));
  }));

  it("should not fail with invalid provider but receive warning with missing options data provider.", fakeAsync(() => {
    const triggerControl = group.get('testInput');

    service.connectDynamicFormControls(invalidOptionProvider, group);
    triggerControl.setValue('newVal');
    tick(401);
    invalidOptionProvider.options$.subscribe((options) =>  expect(options[0].value).toBe('option-1'));
  }));

  it('should show warning with invalid relatedform control', () => {
    const relatedFormControl = service.getRelatedFormControl(referenceInvalidControl, group);
    expect(relatedFormControl).toBe(null);
  });

  it('should get related form control from rootPath', () => {
    const compareControl = group.root.get('test.testRootRadioGroup');
    const relatedFormControl = service.getRelatedFormControl(groupInputTest, group);

    expect(relatedFormControl).toBe(compareControl);
  });
});
