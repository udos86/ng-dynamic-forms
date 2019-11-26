import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl + '#/bootstrap-sample-form/') as Promise<any>;
  }

  getInputText() {
    const elm =  element(by.css('#bsInput2'));

    return elm.getAttribute('value') as Promise<string>;
  }
}
