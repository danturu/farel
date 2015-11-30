import * as Firebase from 'firebase';

describe('Todo App', () => {
  let flow = protractor.promise.controlFlow();

  function waitOne() {
    return protractor.promise.delayed(500);
  }

  function sleep() {
    flow.execute(waitOne);
  }

  var todoRef = new Firebase('https://firepipes.firebaseio.com/todo');

  beforeEach((done) => {
    browser.get('/dist/test/e2e/todo').then(done);
  });

  it('should have a title', () => {
    expect(browser.getTitle()).toEqual('Todo');
  });
});
