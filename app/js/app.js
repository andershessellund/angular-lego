'use strict';

function TodoCtrl($scope, filterFilter) {
    $scope.todos = [
        { completed: true, title: 'Vis liste af eksisterende TODOs (en mock-liste til at starte med).' },
        { completed: true, title: 'Markér TODO som færdig ved at klikke på flueben.' },
        { completed: true, title: '"All"/"Active"/"Completed" skal vise relevante TODOs.' },
        { completed: true, title: 'Den aktuelle side ("All"/"Active"/"Completed") skal fremhæves.' },
        { completed: true, title: 'Skriv ny TODO ved at angive tekst og trykke enter.' },
        { completed: true, title: 'Redigér eksisterende TODO ved at dobbeltklikke på teksten og redigere.' },
        { completed: true, title: 'Fjern eksisterende TODO ved at trykke på krydset.' },
        { completed: true, title: '"XXX items left" skal vise korrekt antal.' },
        { completed: true, title: '"Clear completed (XXX)" skal rydde færdige TODOs og vise korrekt antal.' },
        { completed: true, title: 'Mulighed for at markere/fravælge alle.' },
        { completed: false, title: 'Vis kun "main"-sektion hvis der overhovedet er nogen TODOs.' },
        { completed: false, title: 'Vis kun "footer"-sektion hvis der overhovedet er nogen TODOs.' },
        { completed: false, title: 'Gem listen af TODOs i localStorage.' }
    ];

    $scope.$watch('todos', function() {
        $scope.remainingCount = filterFilter($scope.todos, $scope.filters.active).length;
        $scope.completedCount = filterFilter($scope.todos, $scope.filters.completed).length;
    }, true);

    $scope.filters = {
        all: null,
        active: {completed: false},
        completed: {completed: true}
    };

    $scope.filter = filters.all

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
}

