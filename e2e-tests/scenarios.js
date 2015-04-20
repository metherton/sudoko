'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

var View1Page = require('./pages/view1Page.js');
var View2Page = require('./pages/view2Page.js');

describe('my app', function() {

   var view1Page;
   var view2Page;

  browser.get('index.html');

  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/view1");
  });


  xdescribe('view1', function() {

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
        view2Page = new View2Page();
    });

    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('[ng-view] p')).first().getText()).
        toMatch(/partial for view 2/);
    });

  it('should show list of managers', function() {
      expect(view2Page.managerList.count()).toEqual(4);
      expect(view2Page.managerList.get(2).getText()).toContain('Charlie');
      expect(view2Page.managerWithName('Charlie').getText()).toContain('Janitor');
//      expect(view2Page.managerWithName.getText()).toContain('Janitor');
  });

  });
});
