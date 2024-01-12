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
        txt += listHeroes[i].name + " démarre le jeu avec " + listHeroes[i].marbles + " billes, un bonus de " + listHeroes[i].gain + " bille(s) et un malus de " + listHeroes[i].loss + " bille(s) \n \n";
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
                alert("Veuillez entre une valeur comprise entre " + min + " et " + max);
            }
    
        }
        
    }
    
    ////
    //// CHOISIR UN HÉRO
    ////
    
    let heroNumber = checkInput("Choisissez votre héro > (0) Seong Gi-hun, (1) Sae-byeok, (2) Sang-woo", 0, 2);
    let hero = listHeroes[heroNumber]; // objet
    
    ////
    //// CHOISIR UN NIVEAU
    ////
    
    let levelNumber = checkInput("Choisissez votre niveau de difficulté > (0) Facile, (1) Difficile, (2) Impossible", 0, 2);
    let level = levels[levelNumber]; // objet
    
    alert("Vous avez choisis le niveau " + level.name + ", vous devez affronter " + level.nbrEncounters + " ennemies");
    
    function handleEncounter(hero, enemy, choiceNumber, randomEnemyIndex) {
    
        // si le user dit pair et que le chiffre est pair => gagné
        // si le user dit impair et que le chiffre est impair => gagné
        // sinon c'est perdu
        if((choiceNumber === 0 && enemy.marbles % 2 === 0) || (choiceNumber === 1 && enemy.marbles % 2 != 0)) {
            hero.marbles += enemy.marbles + hero.gain;
            listEnemies.splice(randomEnemyIndex, 1);
            alert("Bravo, vous avez vaincu cet ennemi puisqu'il avait " + enemy.marbles + " billes ! il vous reste " + hero.marbles + " billes dans vos mains et " + level.nbrEncounters + " ennemis à affronter !");
        } else {
            hero.marbles -= (enemy.marbles + hero.loss);
            alert("HAHAHAHA, vous avez perdu cette rencontre puisqu'il avait " + enemy.marbles + " il vous reste " + hero.marbles + " billes dans vos mains et " + level.nbrEncounters + " ennemis à affronter !");
        }
    
    }
    
    // tant que j'ai de la vie et qu'il me reste des rencontres à faire
    // je joue
    while(hero.marbles > 0 && level.nbrEncounters > 0) {
    
        let randomEnemyIndex = Math.floor(Math.random() * (listEnemies.length -1));
        let enemy = listEnemies[randomEnemyIndex];
    
        alert("Vous affrontez " + enemy.name + ", bon courage pour le combat !");
    
        level.nbrEncounters--;
    
        if(enemy.age >= 70) {
    
            let cheat = confirm("Votre ennemi a " + enemy.age + " ans, souhaitez profiter de lui en trichant?");
    
            if(cheat) {
    
                hero.marbles += enemy.marbles;
                listEnemies.splice(randomEnemyIndex, 1);
                alert("Inscassible petite fouine, vous remportez automatiquement " + enemy.marbles + " billes et votre ennemi est éliminé");
                continue;
            } else {
                alert("Vous avez choisi de rester loyal, bonne chance pour cette rencontre");
            }
    
        }
    
        let choiceNumber = checkInput("Votre ennemi a-t-il un nombr de billes pair ou impair? > (0) pair, (1) impair", 0, 1);
    
        handleEncounter(hero, enemy, choiceNumber, randomEnemyIndex);
    
    
    }
    
    if(hero.marbles > 0) {
        alert("Félicitations, vous avez remportez le jeu, vous gagnez 46,7 milliards de Won sud corréen !");
    } else {
        alert("See you in Hell you bastard !");
    }

    let replay = confirm("Veux-tu rejouer la partie?");

    if(replay) {
        game();
    }

} 

game();