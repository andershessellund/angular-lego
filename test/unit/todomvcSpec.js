'use strict';

describe('todomvc', function(){
    beforeEach(module('todomvc'));

    describe('TodoCtrl', function() {
        var ctrl, storage, scope;

        var todoStorageStub = {
            get: function() { return storage; },
            put: function(s) { storage = s; }
        };

        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();
            storage = [{title: 'Title from storage', completed: false}];
            ctrl = $controller('TodoCtrl', {
                $scope: scope,
                todoStorage: todoStorageStub
            });
        }));

        describe('when initializing', function() {
            it('fetches todo items from storage', function() {
                expect(scope.todos.length).toBe(1);
                expect(scope.todos[0].title).toBe('Title from storage');
            });

            it('should set filter to \'all\'', function() {
               expect(scope.filter).toBe(scope.filters.all);
            });
         });
    });
});
