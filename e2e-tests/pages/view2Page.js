'use strict';

var View2Page = function() {
    browser.get('index.html#/view2');
};

View2Page.prototype = Object.create({}, {
    managerList: { get: function () { return element.all(by.repeater('manager in managers')); }}
});

module.exports = View2Page;