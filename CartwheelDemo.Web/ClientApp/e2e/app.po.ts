import { browser, by, element, ExpectedConditions, ElementFinder } from 'protractor';

export class AppPage {
  until = ExpectedConditions;

  navigateTo() {
    return browser.get('/');
  }

  // navigateToPage(page: string) {
  //   return browser.waitForAngular().then(
  //     () => {
  //       browser.driver.get('https://localhost:44323/' + page);
  //     }
  //   );
  // }

  // navigateTo(page: string = '') {
  //   return browser.get('/' + page);
  // }
  clickByClass(classString: string = '') {
    return element(by.className(classString)).click();
  }

  enterTextIntoInputByAttribute(attributeName: string = '', attributeValue: string = '', text: string = '') {
    const ele = element(by.css(this.getTagByAttributeString('input', attributeName, attributeValue)));

    ele.clear();
    return ele.sendKeys(text);
    // return element(by.css(this.getTagByAttributeString('input',attributeName, attributeValue))).sendKeys(text);
  }

  private getTagByAttributeString(tagName: string = '', attributeName: string = '', attributeValue: string = '') {
    return `${tagName}[${attributeName}=${attributeValue}]`;
  }

  getMainHeading() {
    return element(by.css('app-root h1')).getText();
  }

  getToastText() {
    // browser.waitForAngular();
    // const ele = element(by.className('toast-msg'));
    const ele = element(by.id('toasty'));
    // const milliSecondstoWait = 2000;
    // this.waitForElementToAppear(milliSecondstoWait, ele);
    // return element(by.className('toast-msg')).getText();
    return ele.getText();
  }

  waitForElementToAppear(milliSeconds: number = 1000, ele: ElementFinder) {
    // browser.wait(this.until.visibilityOf(ele), milliSeconds, `Element is taking too long to appear in the DOM`);
    browser.sleep(milliSeconds);
  }
}
