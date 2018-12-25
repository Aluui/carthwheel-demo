import { AppPage } from './app.po';

describe('App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display register page', () => {
    page.navigateTo();
    expect(page.getMainHeading()).toEqual('Sign up');
  });

  it('should not allow an invalid login', () => {
    page.navigateTo(); // default page

    // click on the login button
    page.clickByClass('btn-link');

    // We should now be on the login page
    expect(page.getMainHeading()).toEqual('Log in');

    // enter in an invalid username and password
    page.enterTextIntoInputByAttribute('formcontrolname', 'email', 'fake@faker.com');

    page.enterTextIntoInputByAttribute('formcontrolname', 'password', 'fakepassword');

    // click on the login button
    page.clickByClass('btn-primary');

    // // expect that the error toast window shows up
    // expect(page.getToastText()).toEqual('Log in failed. Invalid username and password');

    // We should still be on the login page due to the error
    expect(page.getMainHeading()).toEqual('Log in');
  });
});
