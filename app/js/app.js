(function() {
    'use strict';

    var todomvc = angular.module('todomvc', []);

    todomvc.controller('TodoCtrl', function TodoCtrl($scope, filterFilter, todoStorage) {
        $scope.todos = todoStorage.get();

        $scope.$watch('todos', function(todos) {
            $scope.remainingCount = filterFilter($scope.todos, $scope.filters.active).length;
            $scope.completedCount = filterFilter($scope.todos, $scope.filters.completed).length;
            todoStorage.put(todos);
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

})();
