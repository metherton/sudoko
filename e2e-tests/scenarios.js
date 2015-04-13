'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var View1Page = require('./pages/view1Page.js');

describe('my app', function() {

   var view1Page;

  browser.get('index.html');

  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  describe('view1', function() {

    beforeEach(function() {
        view1Page = new View1Page();

    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 1/);
    });

   it('should show list of employees', function() {
       expect(view1Page.employeeList.count()).toEqual(4);
       expect(view1Page.employeeList.get(2).getText()).toContain('Charlie');
   });

  });


  describe('view2', function() {

    beforeEach(function() {
      browser.get('index.html#/view2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  });
});
