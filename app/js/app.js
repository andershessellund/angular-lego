'use strict';

function TodoCtrl($scope) {
    $scope.todos = [
        { completed: true, title: 'Vis liste af eksisterende TODOs (en mock-liste til at starte med).' },
        { completed: true, title: 'Markér TODO som færdig ved at klikke på flueben.' },
        { completed: true, title: '"All"/"Active"/"Completed" skal vise relevante TODOs.' },
        { completed: true, title: 'Den aktuelle side ("All"/"Active"/"Completed") skal fremhæves.' },
        { completed: false, title: 'Skriv ny TODO ved at angive tekst og trykke enter.' },
        { completed: false, title: 'Redigér eksisterende TODO ved at dobbeltklikke på teksten og redigere.' },
        { completed: false, title: 'Fjern eksisterende TODO ved at trykke på krydset.' },
        { completed: false, title: '"XXX items left" skal vise korrekt antal.' },
        { completed: false, title: '"Clear completed (XXX)" skal rydde færdige TODOs og vise korrekt antal.' },
        { completed: false, title: 'Mulighed for at markere/fravælge alle.' },
        { completed: false, title: 'Vis kun "main"-sektion hvis der overhovedet er nogen TODOs.' },
        { completed: false, title: 'Vis kun "footer"-sektion hvis der overhovedet er nogen TODOs.' },
        { completed: false, title: 'Gem listen af TODOs i localStorage.' }
    ];

    $scope.filters = {
        all: null,
        active: {completed: false},
        completed: {completed: true}
    };

    $scope.filter = filters.all

    $scope.setFilter = function(filter) {
        $scope.filter = filter;
    };
}

