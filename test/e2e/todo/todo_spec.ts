import { Farel } from '../../../farel/farel';

// https://github.com/angular/protractor/issues/2750

describe('Todo App', () => {
  let flow = protractor.promise.controlFlow();

  function waitOne() {
    return protractor.promise.delayed(500);
  }

  function sleep() {
    flow.execute(waitOne);
  }

  let todoRef = new Farel('https://farel.firebaseio.com/todo');

  beforeEach((done) => {
    browser.get('/dist/test/e2e/todo').then(done);
  });

  // it('should have a title', () => {
  //   expect(browser.getTitle()).toEqual('Todo');
  // });
});
