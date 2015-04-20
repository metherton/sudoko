'use strict';

var View2Page = function() {
    browser.get('index.html#/view2');
};

View2Page.prototype = Object.create({}, {
    managerList: {
        get: function () {
            console.log('+++++++++++in manger list get+++++++++++++++');
            return element.all(by.repeater('manager in managers'));
        }
    },

//    managerWithName: {
//        get: function() {
//            return this.managerList.filter(
//                function (manager) {
//                    return manager.getText().then(
//                        function (text) {
//                            return text.indexOf('Charlie') > -1;
//                        }
//                    );
//                }
//            ).first();
//        }
//    }

//    managerWithName: function() {
//        return function(name) {
//            return this.managerList.filter(function(manager) {
//                return manager.getText().then(function(text) {
//                    return text.indexOf(name) > -1;
//                });
//            }).first();
//        }
//    }

});

View2Page.prototype.managerWithName = function(name) {
                                        return this.managerList.filter(
                                            function(manager) {
                                                return manager.getText().then(
                                                    function(text) {
                                                        return text.indexOf(name) > -1;
                                                    }
                                                );
                                            }
                                        ).first();
                                        
                                    }

module.exports = View2Page;