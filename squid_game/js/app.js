////
////
//// CRÉATION DES PEROSNNAGES
////

function game() {

    const seong = {
        name: "Seong Gi-hun",
        marbles: 10,
        loss: 3,
        gain: 1
    };
    
    const saeByeok = {
        name: "Kang Sae-byeok",
        marbles: 15,
        loss: 2,
        gain: 2
    };
    
    const sangWoo =
    {
        name: "Cho Sang-woo",
        marbles: 20,
        loss: 1,
        gain: 3
    };
    
    const listHeroes = [seong, saeByeok, sangWoo];
    
    ////
    ////
    //// CRÉATION DES ENNEMIS
    ////
    
    
    let listEnemies = [
        { name: "Ennemi 1", marbles: 5 , age: 40 }
        ,{ name: "Ennemi 2", marbles: 15 , age: 50 }
        ,{ name: "Ennemi 3", marbles: 10 , age: 80 }
        ,{ name: "Ennemi 4", marbles: 8 , age: 60 }
        ,{ name: "Ennemi 5", marbles: 4 , age: 90 }
        ,{ name: "Ennemi 6", marbles: 9 , age: 55 }
        ,{ name: "Ennemi 7", marbles: 12 , age: 75 }
        ,{ name: "Ennemi 8", marbles: 15 , age: 82 }
        ,{ name: "Ennemi 9", marbles: 3 , age: 49 }
        ,{ name: "Ennemi 10", marbles: 11 , age: 50 }
        ,{ name: "Ennemi 11", marbles: 18 , age: 33 }
        ,{ name: "Ennemi 12", marbles: 20 , age: 22 }
        ,{ name: "Ennemi 13", marbles: 4 , age: 66 }
        ,{ name: "Ennemi 14", marbles: 3 , age: 88 }
        ,{ name: "Ennemi 15", marbles: 2 , age: 44 }
        ,{ name: "Ennemi 16", marbles: 1 , age: 33 }
        ,{ name: "Ennemi 17", marbles: 7 , age: 69 }
        ,{ name: "Ennemi 18", marbles: 9 , age: 70 }
    ];
    
    
    const levels = [
        { name : "facile", nbrEncounters : 4 },
        { name : "difficile", nbrEncounters : 12 },
        { name : "impossible", nbrEncounters : 18 },
    ];
    
    
    ////
    //// PRÉSENTER LES HÉROES
    ////
    let txt = ""; // globale // vide
    
    for(let i = 0; i < listHeroes.length; i++) {
        txt += listHeroes[i].name + " démarre le jeu avec " + listHeroes[i].marbles + " billes, un bonus de " + listHeroes[i].gain + " bille(s) par victoire et un malus de " + listHeroes[i].loss + " bille(s) par défaite\n \n";
    }
    
    alert(txt);
    
    
    // fonction utilisateur
    // c'est nous qui la crééons
    function checkInput(msg, min, max) {
    
        while(true) {
    
            let answer = prompt(msg);
    
            if(isNaN(answer)) {
                alert("Veuillez rentrer un chiffre entier !");
                continue;
            }
    
            if(answer >= min && answer <= max) {
                return answer;
            } else {
                alert("Veuillez rentrer une valeur comprise entre " + min + " et " + max);
            }
    
        }
        
    }
    
    ////
    //// CHOISIR UN HÉRO
    ////
    
    let heroNumber = checkInput("Choisissez votre héros > (0) Seong Gi-hun, (1) Sae-byeok, (2) Sang-woo", 0, 2);
    let hero = listHeroes[heroNumber]; // objet
    
    ////
    //// CHOISIR UN NIVEAU
    ////
    
    let levelNumber = checkInput("Choisissez votre niveau de difficulté > (0) Facile, (1) Difficile, (2) Impossible", 0, 2);
    let level = levels[levelNumber]; // objet
    
    alert("Vous avez choisi le niveau " + level.name + ", vous devrez donc affronter " + level.nbrEncounters + " ennemis");
    
    function handleEncounter(hero, enemy, choiceNumber, randomEnemyIndex) {
    
        // si le user dit pair et que le chiffre est pair => gagné
        // si le user dit impair et que le chiffre est impair => gagné
        // sinon c'est perdu
        if((choiceNumber === 0 && enemy.marbles % 2 === 0) || (choiceNumber === 1 && enemy.marbles % 2 != 0)) {
            hero.marbles += enemy.marbles + hero.gain;
            listEnemies.splice(randomEnemyIndex, 1);
            alert("Bravo, vous gagnez cette manche car votre ennemi possédait " + enemy.marbles + " billes ! Vous avez maintenant " + hero.marbles + " billes et " + level.nbrEncounters + " ennemis à affronter !");
        } else {
            hero.marbles -= (enemy.marbles + hero.loss);
            alert("Vous perdez cette rencontre car votre ennemi possédait " + enemy.marbles + ", il vous reste " + hero.marbles + " billes et " + level.nbrEncounters + " ennemis à affronter !");
        }
    
    }
    
    // tant que j'ai de la vie et qu'il me reste des rencontres à faire
    // je joue
    while(hero.marbles > 0 && level.nbrEncounters > 0) {
    
        let randomEnemyIndex = Math.floor(Math.random() * (listEnemies.length -1));
        let enemy = listEnemies[randomEnemyIndex];
    
        alert("Vous affrontez " + enemy.name + " !");
    
        level.nbrEncounters--;
    
        if(enemy.age >= 70) {
    
            let cheat = confirm("Votre ennemi a " + enemy.age + " ans, souhaitez-vous en profiter et tricher ?");
    
            if(cheat) {
    
                hero.marbles += enemy.marbles;
                listEnemies.splice(randomEnemyIndex, 1);
                alert("Belle mentalité... Vous remportez automatiquement " + enemy.marbles + " billes et votre ennemi est éliminé.");
                continue;
            } else {
                alert("Vous choisissez de rester loyal, bonne chance pour cette rencontre !");
            }
    
        }
    
        let choiceNumber = checkInput("Votre ennemi a-t-il un nombre pair ou impair de billes dans ses mains ? > (0) pair, (1) impair", 0, 1);
    
        handleEncounter(hero, enemy, choiceNumber, randomEnemyIndex);
    
    
    }
    
    if(hero.marbles > 0) {
        alert("Félicitations, vous avez remporté le jeu. Vous gagnez 46,7 milliards de won !");
    } else {
        alert("Vous êtes éliminé. Rendez-vous en enfer !");
    }

    let replay = confirm("Voulez-vous rejouer la partie ?");

    if(replay) {
        game();
    }

} 

game();