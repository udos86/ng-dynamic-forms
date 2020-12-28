import {Observable} from 'rxjs';
import {DynamicFormOptionConfig} from '../dynamic-option-control.model';

export interface DynamicFormControlDataRelation {
  rootPath?: string;
  id?: string;
}

export interface DynamicFormControlDataConfig {
  relation: DynamicFormControlDataRelation;
  service: any;
}

export interface DynamicFormControlListDataProvider<T> {
  fetchList(value: string): Observable<T[]>;
}

export interface DynamicFormControlOptionDataProvider<T> {
  fetchOptions(value: string): Observable<DynamicFormOptionConfig<T>[]>;
}
