/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    // localStorage.ts
    setLocalStorage(key: string, value: string): Chainable<void>;
    getLocalStorage(key: string): Chainable<string>;

    // customAssertions.ts
    hasAttr(attr: string, value: string): Chainable<void>;
    hasNotes(fixtureName: string): Chainable<void>;

    // uiBypass.ts
    register(): Chainable<void>;
    login(): Chainable<void>;
    getUserData(): Chainable<
      Cypress.Response<{ accessToken: string; name: string }>
    >;
    createApplication(index: number): Chainable<Cypress.Response<any>>;
    createApplicationFile(
      fileName: string,
      applicationId: number
    ): Chainable<Cypress.Response<any>>;
    createInterview(
      index: number,
      applicationId: number
    ): Chainable<Cypress.Response<any>>;
    createInterviewFile(
      fileName: string,
      interviewId: number
    ): Chainable<Cypress.Response<any>>;

    // commands.ts
    uploadFile(fileName: string | string[]): Chainable<void>;
    writeNotes(fixtureName: string): Chainable<void>;
  }
}
