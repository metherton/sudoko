'use strict';

var View1Page = function() {
    browser.get('index.html#/view1');
};

View1Page.prototype = Object.create({}, {
    employeeList: {
        get: function () {
            return element.all(by.repeater('employee in employees'));
        }
    }
});

module.exports = View1Page;