(function() {
    'use strict';

    var todomvc = angular.module('todomvc', []);

    todomvc.controller('TodoCtrl', function TodoCtrl($scope, todoStorage) {
        $scope.todos = todoStorage.get();

        $scope.$watch('todos', function(todos) {
            todoStorage.put(todos);
        }, true);

    });

    todomvc.controller('TodoListCtrl', function TodoCtrl($scope, filterFilter) {
        if(!$scope.todos) {
            $scope.todos = [];
        }
        $scope.$watch('todos', function(todos) {
            $scope.remainingCount = filterFilter($scope.todos, $scope.filters.active).length;
            $scope.completedCount = filterFilter($scope.todos, $scope.filters.completed).length;
        }, true);

        $scope.filters = {
            all: null,
            active: {completed: false},
            completed: {completed: true}
        };

        $scope.filter = $scope.filters.all

        $scope.setFilter = function(filter) {
            $scope.filter = filter;
        };

        $scope.addTodo = function() {
            if ($scope.newTodo === '') {
                return;
            }

            $scope.todos.push({
                title: $scope.newTodo,
                completed: false
            });

            $scope.newTodo = '';
        };

        $scope.editTodo = function(todo) {
            $scope.editedTodo = todo;
        };

        $scope.doneEditing = function(todo) {
            $scope.editedTodo = null;
        };

        $scope.removeTodo = function(todo) {
            $scope.todos.splice($scope.todos.indexOf(todo), 1);
        };

        $scope.removeCompletedTodos = function() {
            $scope.todos = filterFilter($scope.todos, $scope.filters.active);
        }

        $scope.markAll = function(completed) {
            $scope.todos.forEach(function(todo) {
                todo.completed = completed;
            });
        }
    });

    todomvc.directive('todoList', function() {
       return {
           controller: 'TodoListCtrl',
           restrict: 'E',
           templateUrl: '/app/partials/todoList.html',
           scope: {
               todos: '='
           }
       }
    });

    todomvc.factory('todoStorage', function() {
        var STORAGE_ID = 'todos-angularjs';

        return {
            get: function() {
                return JSON.parse(localStorage.getItem(STORAGE_ID) || '[]');
            },

            put: function( todos ) {
                localStorage.setItem(STORAGE_ID, JSON.stringify(todos));
            }
        };
    });

    todomvc.directive('todoBlur', function() {
        return function( scope, elm, attrs ) {
            elm.bind('blur', function() {
                scope.$apply(attrs.todoBlur);
            });
        };
    });

    todomvc.directive('todoFocus', function() {
       return function(scope, elm, attrs) {
           scope.$watch(attrs.todoFocus, function(value) {
              if(value) {
                  scope.$evalAsync(function() {
                      elm[0].focus();
                  });
              }
           });
       };
    });

    todomvc.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/page1', {templateUrl: 'partials/page1.html', controller: 'TodoCtrl'});
        $routeProvider.when('/page2', {templateUrl: 'partials/page2.html'});
        $routeProvider.otherwise({redirectTo: '/page1'});
    }]);
})();
