var ligne7 = document.getElementsByClassName("ligne7");
var ligne6 = document.getElementsByClassName("ligne6");
var ligne5 = document.getElementsByClassName("ligne5");
var ligne4 = document.getElementsByClassName("ligne4");
var ligne3 = document.getElementsByClassName("ligne3");
var ligne2 = document.getElementsByClassName("ligne2");
var ligne1 = document.getElementsByClassName("ligne1");
var ligne0 = document.getElementsByClassName("ligne0");
var lesCasesDansBonOrdre = [];

var echequier = [];

var actifFonctionQuellesSontLesPossibliltes = 1;

var possibilite = [];
var possibiliteTempo1 = [];
var possibiliteTempo2 = [];
var tableauSansPossibilites = [];

var auTourDesBlancs = true;

var roiBlancPetitRoqueValide = true;
var roiBlancGrandRoqueValide = true;
var roiNoirPetitRoqueValide = true;
var roiNoirGrandRoqueValide = true;

var idPromotion = document.getElementById("promotion");
var classImgPiecesPromotion = document.getElementsByClassName("imgPiecesPromotion");    

var echecSurRoiBlanc = false;
var echecSurRoiNoir = false;

var possibleMenace = [];
var possibleMenaceTempo1 = [];
var possibleMenaceTempo2 = [];
var possibleMenaceTempo3 = [];

var menacer = false;
var petitRoqueBlancMenacer = false;
var grandRoqueBlancMenacer = false;
var petitRoqueNoirMenacer = false;
var grandRoqueNoirMenacer = false;

var priseEnPassantDeNoir0 = false;
var priseEnPassantDeNoir1 = false;
var priseEnPassantDeNoir2 = false;
var priseEnPassantDeNoir3 = false;
var priseEnPassantDeNoir4 = false;
var priseEnPassantDeNoir5 = false;
var priseEnPassantDeNoir6 = false;
var priseEnPassantDeNoir7 = false;
var priseEnPassantDeBlanc0 = false;
var priseEnPassantDeBlanc1 = false;
var priseEnPassantDeBlanc2 = false;
var priseEnPassantDeBlanc3 = false;
var priseEnPassantDeBlanc4 = false;
var priseEnPassantDeBlanc5 = false;
var priseEnPassantDeBlanc6 = false;
var priseEnPassantDeBlanc7 = false;

var possibilitePriseEnPassant = "";

var verifierSiPossibiliteEstVraimentPossibleFonctionActiver = true;





/*
restant

echec et mat
pat 
regle des 50 coups sans pousser
ne pas afficher les posibilites que l'on bloque
*/



// On cree un tableau (lesCasesDansBonOrdre) de 64 elements et on y associe les cases de l'echquier creer en html en demarrant en bas a gauche
for(var s = 0; s < 64; s++){
    if(s<8){
        lesCasesDansBonOrdre.push(ligne0[s]);
    }
    else if(s>=8 && s<16){
        lesCasesDansBonOrdre.push(ligne1[s-8]);
    }
    else if(s>=16 && s<24){
        lesCasesDansBonOrdre.push(ligne2[s-16]);
    }
    else if(s>=24 && s<32){
        lesCasesDansBonOrdre.push(ligne3[s-24]);
    }
    else if(s>=32 && s<40){
        lesCasesDansBonOrdre.push(ligne4[s-32]);
    }
    else if(s>=40 && s<48){
        lesCasesDansBonOrdre.push(ligne5[s-40]);
    }
    else if(s>=48 && s<56){
        lesCasesDansBonOrdre.push(ligne6[s-48]);
    }
    else{
        lesCasesDansBonOrdre.push(ligne7[s-56]);
    }
}
// On cree un tableau (echequier) de 64 element qui vont contenir le nom et la couleur de la piece qui si trouve en debut de parti et on complete le taleau (lesCasesDansBonOrdre) avec
for(var i = 0; i < 64; i++){
    if(i==0 || i==7){
        echequier.push("tour blanc");
        lesCasesDansBonOrdre[i].src = "image/type(4).svg";
    }
    else if(i==56 || i==63){
        echequier.push("tour noir");
        lesCasesDansBonOrdre[i].src = "image/type(2).svg";
    }
    else if(i==1 || i==6){
        echequier.push("cavalier blanc");
        lesCasesDansBonOrdre[i].src = "image/activity(2).svg";
    }
    else if(i==57 || i==62){
        echequier.push("cavalier noir");
        lesCasesDansBonOrdre[i].src = "image/activity.svg";
    }
    else if(i==2 || i==5){
        echequier.push("fou blanc");
        lesCasesDansBonOrdre[i].src = "image/pen-tool(1).svg";
    }
    else if(i==58 || i==61){
        echequier.push("fou noir");
        lesCasesDansBonOrdre[i].src = "image/pen-tool.svg";
    }
    else if(i==3){
        echequier.push("dame blanc");
        lesCasesDansBonOrdre[i].src = "image/heart(2).svg";
    }
    else if(i==59){
        echequier.push("dame noir");
        lesCasesDansBonOrdre[i].src = "image/heart.svg";
    }
    else if(i==4){
        echequier.push("roi blanc");
        lesCasesDansBonOrdre[i].src = "image/meh(2).svg";
    }
    else if(i==60){
        echequier.push("roi noir");
        lesCasesDansBonOrdre[i].src = "image/meh.svg";
    }
    else if(i>=8 && i<=15){
        echequier.push("pion blanc");
        lesCasesDansBonOrdre[i].src = "image/user(2).svg";
    }
    else if(i>=48 && i<=55){
        echequier.push("pion noir");
        lesCasesDansBonOrdre[i].src = "image/user.svg";
    }
    else{
        echequier.push("vide");
    }
}






// On cree un fonction qui s'active quand on clique sur une des cases de l'echequier en html et qui nous affiche les coups possible pour la case selecionnne si il y a des possiblitees, la fonction (fonctionQuellesSontLesPossibliltes) activera une des fonctions piecesFonction qui activera la fonction (showpossibilitesFonction)
for(var j = 0; j < 64; j++){
    lesCasesDansBonOrdre[j].addEventListener("click", fonctionQuellesSontLesPossibliltes);
}
function fonctionQuellesSontLesPossibliltes(){
    // on utilise un variable (actifFonctionQuellesSontLesPossibliltes) pour choisir quand utiliser la fonciton et quand ne pas l'utiliser
    if(actifFonctionQuellesSontLesPossibliltes == 1){

        // On recupere le numero de la case qui a etait cliquer
        var id = this.id;
        var nombreDeid = "";
        for(var k = 0; k < id.length; k++){
            if(!isNaN(id[k])){
                nombreDeid += id[k];
            }
        }
        
        
        
        



        
        // Si la piece correspond au joueur qui doit jouer on continue sinon rien
        if((auTourDesBlancs == true && (echequier[nombreDeid] == "tour blanc" || echequier[nombreDeid] == "cavalier blanc" || echequier[nombreDeid] == "fou blanc" || echequier[nombreDeid] == "dame blanc" || echequier[nombreDeid] == "roi blanc" || echequier[nombreDeid] == "pion blanc"))
        || (auTourDesBlancs == false && (echequier[nombreDeid] == "tour noir" || echequier[nombreDeid] == "cavalier noir" || echequier[nombreDeid] == "fou noir" || echequier[nombreDeid] == "dame noir" || echequier[nombreDeid] == "roi noir" || echequier[nombreDeid] == "pion noir"))){
            // On declanche les possibilites en fonction du type de la pieces qui se trouve sur la case cliquee
            if(echequier[nombreDeid] == "tour blanc" || echequier[nombreDeid] == "tour noir"){
                tourFonction(nombreDeid);
            }
            else if(echequier[nombreDeid] == "cavalier blanc" || echequier[nombreDeid] == "cavalier noir"){
                cavalierFonction(nombreDeid);
            }
            else if(echequier[nombreDeid] == "fou blanc" || echequier[nombreDeid] == "fou noir"){
                fouFonction(nombreDeid);
            }
            else if(echequier[nombreDeid] == "dame blanc" || echequier[nombreDeid] == "dame noir"){
                dameFonction(nombreDeid);
            }
            else if(echequier[nombreDeid] == "roi blanc" || echequier[nombreDeid] == "roi noir"){
                roiFonction(nombreDeid);
            }
            else if(echequier[nombreDeid] == "pion blanc" || echequier[nombreDeid] == "pion noir"){
                pionFonction(nombreDeid);
            }
        }



        
    }
}






//determine quelles sont les possiblites de deplacement d'une tour en fonciton de ou il se trouve
function tourFonction(nombreDeid, estTilDansLesPossibilites){
    i=parseInt(nombreDeid);
    estTilDansLesPossibilites = parseInt(estTilDansLesPossibilites);
    possibilite = "";


    //On declare les possiblites de deplacement pour la tour
    if(Number.isInteger((i-0)/8)){//Cas particulier pour la colonne 0 on a pas toutes les possibilites
        possibilite = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i+2, i+3, i+4, i+5, i+6, i+7];
    }
    else if(Number.isInteger((i-1)/8)){//Cas particulier pour la colonne 1 on a pas toutes les possibilites
        possibilite = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i+2, i+3, i+4, i+5, i+6, i-1];
    }
    else if(Number.isInteger((i-2)/8)){//Cas particulier pour la colonne 2 on a pas toutes les possibilites
        possibilite = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i+2, i+3, i+4, i+5, i-2, i-1];
    }
    else if(Number.isInteger((i-3)/8)){//Cas particulier pour la colonne 3 on a pas toutes les possibilites
        possibilite = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i+2, i+3, i+4, i-3, i-2, i-1];
    }
    else if(Number.isInteger((i-4)/8)){//Cas particulier pour la colonne 4 on a pas toutes les possibilites
        possibilite = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i+2, i+3, i-4, i-3, i-2, i-1];
    }
    else if(Number.isInteger((i-5)/8)){//Cas particulier pour la colonne 5 on a pas toutes les possibilites
        possibilite = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i+2, i-5, i-4, i-3, i-2, i-1];
    }
    else if(Number.isInteger((i-6)/8)){//Cas particulier pour la colonne 6 on a pas toutes les possibilites
        possibilite = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i-6, i-5, i-4, i-3, i-2, i-1];
    }
    else if(Number.isInteger((i-7)/8)){//Cas particulier pour la colonne 7 on a pas toutes les possibilites
        possibilite = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i-7, i-6, i-5, i-4, i-3, i-2, i-1];
    }



    // On supprime les possibilites qui ne rentre pas dans le tableau de 64 cases
    for(var t = 0; t < possibilite.length; t++){
        if(possibilite[t]<0 || possibilite[t]>63){
            possibilite.splice(t, 1);
            t--;
        }
    }

    // quand la ligne de possibilites rencontre une piece la ligne s'arrete
    for(var h = 8; h < 64; h+=8){
        if(echequier[i + h] != "vide"){
            possibilite = possibilite.filter(number => number <= i+h);
        }
        if(echequier[i - h] != "vide"){
            possibilite = possibilite.filter(number => number >= i-h);
        }
    }
    for(var n = 1; n < 8; n++){
        if(echequier[i + n] != "vide"){
            possibilite = possibilite.filter(number => number <= i+n || number >= i+8);
        }
        if(echequier[i - n] != "vide"){
            possibilite = possibilite.filter(number => number >= i-n || number <= i-8);
        }
    }








    // on supprime des possibilites les cases ou se trouvent nos allies avec la fonction (possibilitesMoinsAllies)
    possibilitesMoinsAllies();

    if(verifierSiPossibiliteEstVraimentPossibleFonctionActiver == true){
        verifierSiPossibiliteEstVraimentPossibleFonction(i, possibilite);
    }


    if(estTilDansLesPossibilites >= 0){
        for(var g = 0; g < possibilite.length; g++){
            if(possibilite[g] == estTilDansLesPossibilites){
                return true;
            }
        }
    }
}
//determine quelles sont les possiblites de deplacement d'un cavalier en fonciton de ou il se trouve
function cavalierFonction(nombreDeid, estTilDansLesPossibilites){
    i=parseInt(nombreDeid);
    estTilDansLesPossibilites = parseInt(estTilDansLesPossibilites);
    possibilite = "";



    //On declare les possiblites de deplacement pour le cavalier
    if(Number.isInteger((i-0)/8)){//Cas particulier pour la colonne 0 on a pas toutes les possibilites
        possibilite = [i+17, i+10, i-6, i-15];
    }
    else if(Number.isInteger((i-1)/8)){//Cas particulier pour la colonne 1 on a pas toutes les possibilites
        possibilite = [i+15, i+17, i+10, i-6, i-17, i-15];
    }
    else if(Number.isInteger((i-6)/8)){//Cas particulier pour la colonne 6 on a pas toutes les possibilites
        possibilite = [i+15, i+17, i+6, i-10, i-17, i-15];
    }
    else if(Number.isInteger((i-7)/8)){//Cas particulier pour la colonne 7 on a pas toutes les possibilites
        possibilite = [i+15, i+6, i-10, i-17];
    }
    else{
        possibilite = [i+15, i+17, i+6, i+10, i-10, i-6, i-17, i-15];//Cas pas particulier
    }


    // On supprime les possibilites qui ne rentre pas dans le tableau de 64 cases
    for(var t = 0; t < possibilite.length; t++){
        if(possibilite[t]<0 || possibilite[t]>63){
            possibilite.splice(t, 1);
            t--;
        }
    }

    // on supprime des possibilites les cases ou se trouvent nos allies avec la fonction (possibilitesMoinsAllies)
    possibilitesMoinsAllies();

    if(verifierSiPossibiliteEstVraimentPossibleFonctionActiver == true){
        verifierSiPossibiliteEstVraimentPossibleFonction(i, possibilite);
    }


    if(estTilDansLesPossibilites >= 0){
        for(var g = 0; g < possibilite.length; g++){
            if(possibilite[g] == estTilDansLesPossibilites){
                return true;
            }
        }
    }
}
//determine quelles sont les possiblites de deplacement d'un fou en fonciton de ou il se trouve
function fouFonction(nombreDeid, estTilDansLesPossibilites){
    i=parseInt(nombreDeid);
    estTilDansLesPossibilites = parseInt(estTilDansLesPossibilites);
    possibilite = "";


    //On declare les possiblites de deplacement pour le fou
    if(Number.isInteger((i-0)/8)){//Cas particulier pour la colonne 0 on a pas toutes les possibilites
        possibilite = [i+9, i+18, i+27, i+36, i+45, i+54, i+63, i-7, i-14, i-21, i-28, i-35, i-42, i-49];
    }
    else if(Number.isInteger((i-1)/8)){//Cas particulier pour la colonne 1 on a pas toutes les possibilites
        possibilite = [i+9, i+18, i+27, i+36, i+45, i+54, i-9, i-7, i-14, i-21, i-28, i-35, i-42, i+7];
    }
    else if(Number.isInteger((i-2)/8)){//Cas particulier pour la colonne 2 on a pas toutes les possibilites
        possibilite = [i+9, i+18, i+27, i+36, i+45, i-9, i-18, i-7, i-14, i-21, i-28, i-35, i+7, i+14];
    }
    else if(Number.isInteger((i-3)/8)){//Cas particulier pour la colonne 3 on a pas toutes les possibilites
        possibilite = [i+9, i+18, i+27, i+36, i-9, i-18, i-27, i-7, i-14, i-21, i-28, i+7, i+14, i+21];
    }
    else if(Number.isInteger((i-4)/8)){//Cas particulier pour la colonne 4 on a pas toutes les possibilites
        possibilite = [i+9, i+18, i+27, i-9, i-18, i-27, i-36, i-7, i-14, i-21, i+7, i+14, i+21, i+28];
    }
    else if(Number.isInteger((i-5)/8)){//Cas particulier pour la colonne 5 on a pas toutes les possibilites
        possibilite = [i+9, i+18, i-9, i-18, i-27, i-36, i-45, i-7, i-14, i+7, i+14, i+21, i+28, i+35];
    }
    else if(Number.isInteger((i-6)/8)){//Cas particulier pour la colonne 6 on a pas toutes les possibilites
        possibilite = [i+9, i-9, i-18, i-27, i-36, i-45, i-54, i-7, i+7, i+14, i+21, i+28, i+35, i+42];
    }
    else if(Number.isInteger((i-7)/8)){//Cas particulier pour la colonne 7 on a pas toutes les possibilites
        possibilite = [i-9, i-18, i-27, i-36, i-45, i-54, i-63, i+7, i+14, i+21, i+28, i+35, i+42, i+49];
    }



    // On supprime les possibilites qui ne rentre pas dans le tableau de 64 cases
    for(var t = 0; t < possibilite.length; t++){
        if(possibilite[t]<0 || possibilite[t]>63){
            possibilite.splice(t, 1);
            t--;
        }
    }


    // quand la diagonale de possibilites rencontre une piece la ligne s'arrete
    for(var h = 9; h < 64; h+=9){
        if(echequier[i + h] != "vide"){
            possibilite = possibilite.filter(number => number <= i+h || (number - i) % 7 === 0);
        }
        if(echequier[i - h] != "vide"){
            possibilite = possibilite.filter(number => number >= i-h || (i - number) % 7 === 0);
        }
    }
    for(var h = 7; h < 64; h+=7){
        if(echequier[i + h] != "vide"){
            possibilite = possibilite.filter(number => number <= i+h || (number - i) % 9 === 0);
        }
        if(echequier[i - h] != "vide"){
            possibilite = possibilite.filter(number => number >= i-h || (i - number) % 9 === 0);
        }
    }
    // cas particulier quand un fou se trouve sur la case 0 ou 63 (il faut pouvoir la supprimer aussi si il y a un obstacle sur la diagonale)
    if((i == 0 || i == 63) && (echequier[9] != "vide" || echequier[18] != "vide" || echequier[27] != "vide" || echequier[36] != "vide" || echequier[45] != "vide" || echequier[54] != "vide")){
        possibilite = possibilite.filter(number => number != 63 && number != 0);
    }
    


    // on supprime des possibilites les cases ou se trouvent nos allies avec la fonction (possibilitesMoinsAllies)
    possibilitesMoinsAllies();

    if(verifierSiPossibiliteEstVraimentPossibleFonctionActiver == true){
        verifierSiPossibiliteEstVraimentPossibleFonction(i, possibilite);
    }


    if(estTilDansLesPossibilites >= 0){
        for(var g = 0; g < possibilite.length; g++){
            if(possibilite[g] == estTilDansLesPossibilites){
                return true;
            }
        }
    }
}
//determine quelles sont les possiblites de deplacement d'une dame en fonciton de ou elle se trouve
function dameFonction(nombreDeid, estTilDansLesPossibilites){
    i=parseInt(nombreDeid);
    estTilDansLesPossibilites = parseInt(estTilDansLesPossibilites);
    possibilite = "";
    possibiliteTempo1 = "";
    possibiliteTempo2 = "";


    
    //On declare les possiblites de deplacement pour la tour
    if(Number.isInteger((i-0)/8)){//Cas particulier pour la colonne 0 on a pas toutes les possibilites
        possibiliteTempo1 = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i+2, i+3, i+4, i+5, i+6, i+7];
    }
    else if(Number.isInteger((i-1)/8)){//Cas particulier pour la colonne 1 on a pas toutes les possibilites
        possibiliteTempo1 = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i+2, i+3, i+4, i+5, i+6, i-1];
    }
    else if(Number.isInteger((i-2)/8)){//Cas particulier pour la colonne 2 on a pas toutes les possibilites
        possibiliteTempo1 = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i+2, i+3, i+4, i+5, i-2, i-1];
    }
    else if(Number.isInteger((i-3)/8)){//Cas particulier pour la colonne 3 on a pas toutes les possibilites
        possibiliteTempo1 = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i+2, i+3, i+4, i-3, i-2, i-1];
    }
    else if(Number.isInteger((i-4)/8)){//Cas particulier pour la colonne 4 on a pas toutes les possibilites
        possibiliteTempo1 = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i+2, i+3, i-4, i-3, i-2, i-1];
    }
    else if(Number.isInteger((i-5)/8)){//Cas particulier pour la colonne 5 on a pas toutes les possibilites
        possibiliteTempo1 = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i+2, i-5, i-4, i-3, i-2, i-1];
    }
    else if(Number.isInteger((i-6)/8)){//Cas particulier pour la colonne 6 on a pas toutes les possibilites
        possibiliteTempo1 = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i+1, i-6, i-5, i-4, i-3, i-2, i-1];
    }
    else if(Number.isInteger((i-7)/8)){//Cas particulier pour la colonne 7 on a pas toutes les possibilites
        possibiliteTempo1 = [i-56, i-48, i-40, i-32, i-24, i-16, i-8, i+8, i+16, i+24, i+32, i+40, i+48, i+56, i-7, i-6, i-5, i-4, i-3, i-2, i-1];
    }
    // On supprime les possibilites qui ne rentre pas dans le tableau de 64 cases
    for(var t = 0; t < possibiliteTempo1.length; t++){
        if(possibiliteTempo1[t]<0 || possibiliteTempo1[t]>63){
            possibiliteTempo1.splice(t, 1);
            t--;
        }
    }
    // quand la ligne de possibilites rencontre une piece la ligne s'arrete
    for(var h = 8; h < 64; h+=8){
        if(echequier[i + h] != "vide"){
            possibiliteTempo1 = possibiliteTempo1.filter(number => number <= i+h);
        }
        if(echequier[i - h] != "vide"){
            possibiliteTempo1 = possibiliteTempo1.filter(number => number >= i-h);
        }
    }
    for(var n = 1; n < 8; n++){
        if(echequier[i + n] != "vide"){
            possibiliteTempo1 = possibiliteTempo1.filter(number => number <= i+n || number >= i+8);
        }
        if(echequier[i - n] != "vide"){
            possibiliteTempo1 = possibiliteTempo1.filter(number => number >= i-n || number <= i-8);
        }
    }






    //On declare les possiblites de deplacement pour le fou
    if(Number.isInteger((i-0)/8)){//Cas particulier pour la colonne 0 on a pas toutes les possibilites
        possibiliteTempo2 = [i+9, i+18, i+27, i+36, i+45, i+54, i+63, i-7, i-14, i-21, i-28, i-35, i-42, i-49];
    }
    else if(Number.isInteger((i-1)/8)){//Cas particulier pour la colonne 1 on a pas toutes les possibilites
        possibiliteTempo2 = [i+9, i+18, i+27, i+36, i+45, i+54, i-9, i-7, i-14, i-21, i-28, i-35, i-42, i+7];
    }
    else if(Number.isInteger((i-2)/8)){//Cas particulier pour la colonne 2 on a pas toutes les possibilites
        possibiliteTempo2 = [i+9, i+18, i+27, i+36, i+45, i-9, i-18, i-7, i-14, i-21, i-28, i-35, i+7, i+14];
    }
    else if(Number.isInteger((i-3)/8)){//Cas particulier pour la colonne 3 on a pas toutes les possibilites
        possibiliteTempo2 = [i+9, i+18, i+27, i+36, i-9, i-18, i-27, i-7, i-14, i-21, i-28, i+7, i+14, i+21];
    }
    else if(Number.isInteger((i-4)/8)){//Cas particulier pour la colonne 4 on a pas toutes les possibilites
        possibiliteTempo2 = [i+9, i+18, i+27, i-9, i-18, i-27, i-36, i-7, i-14, i-21, i+7, i+14, i+21, i+28];
    }
    else if(Number.isInteger((i-5)/8)){//Cas particulier pour la colonne 5 on a pas toutes les possibilites
        possibiliteTempo2 = [i+9, i+18, i-9, i-18, i-27, i-36, i-45, i-7, i-14, i+7, i+14, i+21, i+28, i+35];
    }
    else if(Number.isInteger((i-6)/8)){//Cas particulier pour la colonne 6 on a pas toutes les possibilites
        possibiliteTempo2 = [i+9, i-9, i-18, i-27, i-36, i-45, i-54, i-7, i+7, i+14, i+21, i+28, i+35, i+42];
    }
    else if(Number.isInteger((i-7)/8)){//Cas particulier pour la colonne 7 on a pas toutes les possibilites
        possibiliteTempo2 = [i-9, i-18, i-27, i-36, i-45, i-54, i-63, i+7, i+14, i+21, i+28, i+35, i+42, i+49];
    }
    // On supprime les possibilites qui ne rentre pas dans le tableau de 64 cases
    for(var t = 0; t < possibiliteTempo2.length; t++){
        if(possibiliteTempo2[t]<0 || possibiliteTempo2[t]>63){
            possibiliteTempo2.splice(t, 1);
            t--;
        }
    }
    // quand la diagonale de possibilites rencontre une piece la ligne s'arrete
    for(var h = 9; h < 64; h+=9){
        if(echequier[i + h] != "vide"){
            possibiliteTempo2 = possibiliteTempo2.filter(number => number <= i+h || (number - i) % 7 === 0);
        }
        if(echequier[i - h] != "vide"){
            possibiliteTempo2 = possibiliteTempo2.filter(number => number >= i-h || (i - number) % 7 === 0);
        }
    }
    for(var h = 7; h < 64; h+=7){
        if(echequier[i + h] != "vide"){
            possibiliteTempo2 = possibiliteTempo2.filter(number => number <= i+h || (number - i) % 9 === 0);
        }
        if(echequier[i - h] != "vide"){
            possibiliteTempo2 = possibiliteTempo2.filter(number => number >= i-h || (i - number) % 9 === 0);
        }
    }
    // cas particulier quand un fou se trouve sur la case 0 ou 63 (il faut pouvoir la supprimer aussi si il y a un obstacle sur la diagonale)
    if((i == 0 || i == 63) && (echequier[9] != "vide" || echequier[18] != "vide" || echequier[27] != "vide" || echequier[36] != "vide" || echequier[45] != "vide" || echequier[54] != "vide")){
        possibiliteTempo2 = possibiliteTempo2.filter(number => number != 63 && number != 0);
    }


    // on fusionne possibiliteTempo1 et possibiliteTempo2
    possibilite = possibiliteTempo1.concat(possibiliteTempo2);




    // on supprime des possibilites les cases ou se trouvent nos allies avec la fonction (possibilitesMoinsAllies)
    possibilitesMoinsAllies();

    if(verifierSiPossibiliteEstVraimentPossibleFonctionActiver == true){
        verifierSiPossibiliteEstVraimentPossibleFonction(i, possibilite);
    }

    


    if(estTilDansLesPossibilites >= 0){
        for(var g = 0; g < possibilite.length; g++){
            if(possibilite[g] == estTilDansLesPossibilites){
                return true;
            }
        }
    }
}
//determine quelles sont les possiblites de deplacement d'un roi en fonciton de ou il se trouve
function roiFonction(nombreDeid, estTilDansLesPossibilites){
    i=parseInt(nombreDeid);
    estTilDansLesPossibilites = parseInt(estTilDansLesPossibilites);
    possibilite = "";


    //On declare les possiblites de deplacement pour le roi
    if(Number.isInteger((i-0)/8)){//Cas particulier pour la colonne 0 on a pas toutes les possibilites
        possibilite = [i+1, i+8, i+9, i-8, i-7];
    }
    else if(Number.isInteger((i-7)/8)){//Cas particulier pour la colonne 7 on a pas toutes les possibilites
        possibilite = [i-1, i+7, i+8, i-9, i-8];
    }
    else{
        possibilite = [i+1, i-1, i+7, i+8, i+9, i-9, i-8, i-7];
    }


    // On supprime les possibilites qui ne rentre pas dans le tableau de 64 cases
    for(var t = 0; t < possibilite.length; t++){
        if(possibilite[t]<0 || possibilite[t]>63){
            possibilite.splice(t, 1);
            t--;
        }
    }



    // on supprime des possibilites les cases ou se trouvent nos allies avec la fonction (possibilitesMoinsAllies)
    possibilitesMoinsAllies();

    if(verifierSiPossibiliteEstVraimentPossibleFonctionActiver == true){
        verifierSiPossibiliteEstVraimentPossibleFonction(i, possibilite);
    }


    


    if(estTilDansLesPossibilites >= 0){
        for(var g = 0; g < possibilite.length; g++){
            if(possibilite[g] == estTilDansLesPossibilites){
                return true;
            }
        }
    }
}
//determine quelles sont les possiblites de deplacement d'un pion en fonciton de ou il se trouve
function pionFonction(nombreDeid, estTilDansLesPossibilites){
    i=parseInt(nombreDeid);
    estTilDansLesPossibilites = parseInt(estTilDansLesPossibilites);
    possibilite = "";

    
    //On declare les possiblites de deplacement pour le pion
    if(Number.isInteger((i-0)/8)){//Cas particulier pour la colonne 0 on a pas toutes les possibilites
        possibilite = [i+8, i+16, i-8, i-16, i+9, i-7];
    }
    else if(Number.isInteger((i-7)/8)){//Cas particulier pour la colonne 7 on a pas toutes les possibilites
        possibilite = [i+8, i+16, i-8, i-16, i+7, i-9];
    }
    else{
        possibilite = [i+8, i+16, i-8, i-16, i+7, i+9, i-9, i-7];
    }

    // On supprime les possibilites qui ne rentre pas dans le tableau de 64 cases
    for(var t = 0; t < possibilite.length; t++){
        if(possibilite[t]<0 || possibilite[t]>63){
            possibilite.splice(t, 1);
            t--;
        }
    }

    // on supprime les coups vers le bas pour les blancs et les coups vers le haut pour les noirs
    for(var y = 0; y < possibilite.length; y++){
        if(echequier[i] == "pion blanc" && possibilite[y] < i){
            possibilite.splice(y, 1);
            y--;
        }
        else if(echequier[i] == "pion noir" && possibilite[y] > i){
            possibilite.splice(y, 1);
            y--;
        }
    }

    // on autorise le double pas que pour la position de depart
    if((echequier[i] == "pion blanc" && (i < 8 || i > 15)) || (echequier[i] == "pion noir" && (i < 48 || i > 55))){
        possibilite = possibilite.filter(number => number != i+16);
        possibilite = possibilite.filter(number => number != i-16);
    }
   
    // si une piece est devant lui d'une ou deux cases il ne peut pas aller sur cette case
    if((echequier[i] == "pion blanc" && echequier[i+8] != "vide") || (echequier[i] == "pion noir" && echequier[i-8] != "vide")){
        possibilite = possibilite.filter(number => number != i+8);
        possibilite = possibilite.filter(number => number != i-8);
        possibilite = possibilite.filter(number => number != i+16);
        possibilite = possibilite.filter(number => number != i-16);
    }
    else if((echequier[i] == "pion blanc" && echequier[i+16] != "vide") || (echequier[i] == "pion noir" && echequier[i-16] != "vide")){
        possibilite = possibilite.filter(number => number != i+16);
        possibilite = possibilite.filter(number => number != i-16);
    }




    // les coups en diagonale ne sont proposer que si un adversaire se trouve sur cette case
    if(echequier[i] == "pion blanc" && echequier[i+7] == "vide"){
        possibilite = possibilite.filter(number => number != i+7);
    }
    if(echequier[i] == "pion blanc" && echequier[i+9] == "vide"){
        possibilite = possibilite.filter(number => number != i+9);
    }
    if(echequier[i] == "pion noir" && echequier[i-7] == "vide"){
        possibilite = possibilite.filter(number => number != i-7);
    }
    if(echequier[i] == "pion noir" && echequier[i-9] == "vide"){
        possibilite = possibilite.filter(number => number != i-9);
    }




    // on gere la prise en passant
    if(priseEnPassantDeNoir0 == true && echequier[i] == "pion blanc"){
        if(i == 33){
            possibilite.push(i+7);
            possibilitePriseEnPassant = "+7";
        }
    }
    if(priseEnPassantDeNoir1 == true && echequier[i] == "pion blanc"){
        if(i == 32){
            possibilite.push(i+9);
            possibilitePriseEnPassant = "+9";
        }
        else if(i == 34){
            possibilite.push(i+7);
            possibilitePriseEnPassant = "+7";
        }
    }
    if(priseEnPassantDeNoir2 == true && echequier[i] == "pion blanc"){
        if(i == 33){
            possibilite.push(i+9);
            possibilitePriseEnPassant = "+9";
        }
        else if(i == 35){
            possibilite.push(i+7);
            possibilitePriseEnPassant = "+7";
        }
    }
    if(priseEnPassantDeNoir3 == true && echequier[i] == "pion blanc"){
        if(i == 34){
            possibilite.push(i+9);
            possibilitePriseEnPassant = "+9";
        }
        else if(i == 36){
            possibilite.push(i+7);
            possibilitePriseEnPassant = "+7";
        }
    }
    if(priseEnPassantDeNoir4 == true && echequier[i] == "pion blanc"){
        if(i == 35){
            possibilite.push(i+9);
            possibilitePriseEnPassant = "+9";
        }
        else if(i == 37){
            possibilite.push(i+7);
            possibilitePriseEnPassant = "+7";
        }
    }
    if(priseEnPassantDeNoir5 == true && echequier[i] == "pion blanc"){
        if(i == 36){
            possibilite.push(i+9);
            possibilitePriseEnPassant = "+9";
        }
        else if(i == 38){
            possibilite.push(i+7);
            possibilitePriseEnPassant = "+7";
        }
    }
    if(priseEnPassantDeNoir6 == true && echequier[i] == "pion blanc"){
        if(i == 37){
            possibilite.push(i+9);
            possibilitePriseEnPassant = "+9";
        }
        else if(i == 39){
            possibilite.push(i+7);
            possibilitePriseEnPassant = "+7";
        }
    }
    if(priseEnPassantDeNoir7 == true && echequier[i] == "pion blanc"){
        if(i == 38){
            possibilite.push(i+9);
            possibilitePriseEnPassant = "+9";
        }
    }
    if(priseEnPassantDeBlanc0 == true && echequier[i] == "pion noir"){
        if(i == 25){
            possibilite.push(i-9);
            possibilitePriseEnPassant = "-9";
        }
    }
    if(priseEnPassantDeBlanc1 == true && echequier[i] == "pion noir"){
        if(i == 24){
            possibilite.push(i-7);
            possibilitePriseEnPassant = "-7";
        }
        else if(i == 26){
            possibilite.push(i-9);
            possibilitePriseEnPassant = "-9";
        }
    }
    if(priseEnPassantDeBlanc2 == true && echequier[i] == "pion noir"){
        if(i == 25){
            possibilite.push(i-7);
            possibilitePriseEnPassant = "-7";
        }
        else if(i == 27){
            possibilite.push(i-9);
            possibilitePriseEnPassant = "-9";
        }
    }
    if(priseEnPassantDeBlanc3 == true && echequier[i] == "pion noir"){
        if(i == 26){
            possibilite.push(i-7);
            possibilitePriseEnPassant = "-7";
        }
        else if(i == 28){
            possibilite.push(i-9);
            possibilitePriseEnPassant = "-9";
        }
    }
    if(priseEnPassantDeBlanc4 == true && echequier[i] == "pion noir"){
        if(i == 27){
            possibilite.push(i-7);
            possibilitePriseEnPassant = "-7";
        }
        else if(i == 29){
            possibilite.push(i-9);
            possibilitePriseEnPassant = "-9";
        }
    }
    if(priseEnPassantDeBlanc5 == true && echequier[i] == "pion noir"){
        if(i == 28){
            possibilite.push(i-7);
            possibilitePriseEnPassant = "-7";
        }
        else if(i == 30){
            possibilite.push(i-9);
            possibilitePriseEnPassant = "-9";
        }
    }
    if(priseEnPassantDeBlanc6 == true && echequier[i] == "pion noir"){
        if(i == 29){
            possibilite.push(i-7);
            possibilitePriseEnPassant = "-7";
        }
        else if(i == 31){
            possibilite.push(i-9);
            possibilitePriseEnPassant = "-9";
        }
    }
    if(priseEnPassantDeBlanc7 == true && echequier[i] == "pion noir"){
        if(i == 30){
            possibilite.push(i-7);
            possibilitePriseEnPassant = "-7";
        }
    }

                










    



    // on supprime des possibilites les cases ou se trouvent nos allies avec la fonction (possibilitesMoinsAllies)
    possibilitesMoinsAllies();

    if(verifierSiPossibiliteEstVraimentPossibleFonctionActiver == true){
        verifierSiPossibiliteEstVraimentPossibleFonction(i, possibilite);
    }



    


    if(estTilDansLesPossibilites >= 0){
        for(var g = 0; g < possibilite.length; g++){
            if(possibilite[g] == estTilDansLesPossibilites){
                return true;
            }
        }
    }
    
}



// on supprime des possibilites les cases ou se trouvent nos allies
function possibilitesMoinsAllies(){
    possibilite = possibilite;
    for(var v = 0; v < possibilite.length; v++){
        if((auTourDesBlancs == true && (echequier[possibilite[v]] == "tour blanc" || echequier[possibilite[v]] == "cavalier blanc" || echequier[possibilite[v]] == "fou blanc" || echequier[possibilite[v]] == "dame blanc" || echequier[possibilite[v]] == "roi blanc" || echequier[possibilite[v]] == "pion blanc"))
        || (auTourDesBlancs == false && (echequier[possibilite[v]] == "tour noir" || echequier[possibilite[v]] == "cavalier noir" || echequier[possibilite[v]] == "fou noir" || echequier[possibilite[v]] == "dame noir" || echequier[possibilite[v]] == "roi noir" || echequier[possibilite[v]] == "pion noir"))){
            
            possibilite.splice(v, 1);
            v--;
        }  
    }

    // le cas particulier du roque, on l'ajoute si il est encore valide et que l'on a selectionner un roi
    if(echequier[i] == "roi blanc" && roiBlancPetitRoqueValide == true && echequier[5] == "vide" && echequier[6] == "vide"){
        possibilite.push(6);
    }
    if(echequier[i] == "roi blanc" && roiBlancGrandRoqueValide == true && echequier[1] == "vide" && echequier[2] == "vide" && echequier[3] == "vide"){
        possibilite.push(2);
    }
    if(echequier[i] == "roi noir" && roiNoirPetitRoqueValide == true && echequier[61] == "vide" && echequier[62] == "vide"){
        possibilite.push(62);
    }
    if(echequier[i] == "roi noir" && roiNoirGrandRoqueValide == true && echequier[57] == "vide" && echequier[58] == "vide" && echequier[59] == "vide"){
        possibilite.push(58);
    }
}
function verifierSiPossibiliteEstVraimentPossibleFonction(nombreDeid, possibilite){
    nombreDeid = parseInt(nombreDeid);
    possibilite = possibilite;
    var tempo = "";

    
    verifierSiPossibiliteEstVraimentPossibleFonctionActiver = false;
    for(h = 0; h <= possibilite.length - 1; h++){
        // on valide temporairement la possibilite
        var tempoEchequierNombreDeidDeLaOuOnVeutJouer = echequier[possibilite[h]];
        echequier[possibilite[h]] = echequier[nombreDeid];
        echequier[nombreDeid] = "vide";

        var tempo = "";
        for(x = 0; x < possibilite.length; x++){
            tempo += possibilite[x] + "/";
        }

        

        // on verifie si le roi est menace
        menacer = false;
        if(auTourDesBlancs == true){
            for(var k = 0; k < echequier.length; k++){
                if(echequier[k] == "roi blanc"){
                    menacer = laCaseEstElleMenacerFonction(k, "noir");
                }
            }
        }
        else if(auTourDesBlancs == false){
            for(var k = 0; k < echequier.length; k++){
                if(echequier[k] == "roi noir"){
                    menacer = laCaseEstElleMenacerFonction(k, "blanc");
                }
            }
        }

        var tempo = "";
        for(x = 0; x < possibilite.length; x++){
            tempo += possibilite[x] + "/";
        }

            
        




        // on remet comme c'etait
        echequier[nombreDeid] = echequier[possibilite[h]];
        echequier[possibilite[h]] = tempoEchequierNombreDeidDeLaOuOnVeutJouer;

    
        // si apres le coup il y a echec on supprime le coup des possibilites
        if(menacer == true){
            possibilite.splice(h, 1);
        }
    }
    showpossibilitesFonction(nombreDeid, possibilite);
}







// affiche les coups possibles en fonction de la case cliquer et de la pieces, cette fonction est appeller par une des fonctionsPieces et appelle la fonction (validerCoupFonction)
function showpossibilitesFonction(nombreDeid, possibilite){
    nombreDeid = nombreDeid;
    possibilite = possibilite;


    
   
    // on affiche les coups possibles
    for(var l = 0; l < possibilite.length; l++){
        lesCasesDansBonOrdre[possibilite[l]].style.background = "green";
    }
    // on affiche la case selectionner
    lesCasesDansBonOrdre[nombreDeid].style.background = "red";

    // on cree le tableau qui contient tout les coups non possible
    for(var w = 0; w < 64; w++){
        if(!possibilite.includes(w))
        tableauSansPossibilites[w] = w;
    }
    for(var o = 0; o < possibilite.length; o++){
        lesCasesDansBonOrdre[possibilite[o]].onclick = function(){
            var idDeLaOuOnVeutJouer = this.id;
            validerCoupFonction(nombreDeid, idDeLaOuOnVeutJouer, possibilite);
        };
    }

    // on laisse la possiblite au joueur de cliquer sur une des possibilites de coup afficher pour jouer le coup ou une autre case pour changer de piece
    for(var x = 0; x < tableauSansPossibilites.length; x++){
        if(tableauSansPossibilites[x] || tableauSansPossibilites[x] == 0){
            lesCasesDansBonOrdre[tableauSansPossibilites[x]].onclick = function(){
                pasValiderFonction(nombreDeid, possibilite);
                verifierSiPossibiliteEstVraimentPossibleFonctionActiver = true;
            }
        }
    }

    // on cree le tableau qui contient tout les coups non possible
    for(var w = 0; w < 64; w++){
        if(!possibilite.includes(w))
        tableauSansPossibilites[w] = w;
    }
    for(var o = 0; o < possibilite.length; o++){
        lesCasesDansBonOrdre[possibilite[o]].onclick = function(){
            var idDeLaOuOnVeutJouer = this.id;
            validerCoupFonction(nombreDeid, idDeLaOuOnVeutJouer, possibilite);
            verifierSiPossibiliteEstVraimentPossibleFonctionActiver = true;
        };
    }
    
    
    // on desactive la fonction (fonctionQuellesSontLesPossibliltes) a l'aide de la variable (actifFonctionQuellesSontLesPossibliltes)
    actifFonctionQuellesSontLesPossibliltes = 0;
}
function validerCoupFonction(nombreDeid, idDeLaOuOnVeutJouer, possibilite){
    nombreDeid =  nombreDeid;
    idDeLaOuOnVeutJouer = idDeLaOuOnVeutJouer;
    possibilite = possibilite;

    
    // On recupere le numero de la case qui a etait cliquer
    var nombreDeidDeLaOuOnVeutJouer = "";
    for(var k = 0; k < idDeLaOuOnVeutJouer.length; k++){
        if(!isNaN(idDeLaOuOnVeutJouer[k])){
            nombreDeidDeLaOuOnVeutJouer += idDeLaOuOnVeutJouer[k];
        }
    }
    

    // On vide la case ou se trouver la piece et on rempli la nouvelle
    var tempoEchequierNombreDeidDeLaOuOnVeutJouer = echequier[nombreDeidDeLaOuOnVeutJouer];
    echequier[nombreDeidDeLaOuOnVeutJouer] = echequier[nombreDeid];
    echequier[nombreDeid] = "vide";
    var tempoLesCasesDansBonOrdreNombreDeidDeLaOuOnVeutJouer = lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src;
    lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = lesCasesDansBonOrdre[nombreDeid].src;
    lesCasesDansBonOrdre[nombreDeid].src = "";

    // le cas particulier du roque
    if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi blanc" && roiBlancPetitRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 6){
        var tempoRoqueEchequier = echequier[5];
        echequier[5] = echequier[7];
        echequier[7] = "vide";
        var tempoRoqueLesCasesDansBonOrdre = lesCasesDansBonOrdre[5].src;
        lesCasesDansBonOrdre[5].src = lesCasesDansBonOrdre[7].src;
        lesCasesDansBonOrdre[7].src = "";
    }
    else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi blanc" && roiBlancGrandRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 2){
        var tempoRoqueEchequier = echequier[3];
        echequier[3] = echequier[0];
        echequier[0] = "vide";
        var tempoRoqueLesCasesDansBonOrdre = lesCasesDansBonOrdre[3].src;
        lesCasesDansBonOrdre[3].src = lesCasesDansBonOrdre[0].src;
        lesCasesDansBonOrdre[0].src = "";
    }
    else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi noir" && roiNoirPetitRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 62){
        var tempoRoqueEchequier = echequier[61];
        echequier[61] = echequier[63];
        echequier[63] = "vide";
        var tempoRoqueLesCasesDansBonOrdre = lesCasesDansBonOrdre[61].src;
        lesCasesDansBonOrdre[61].src = lesCasesDansBonOrdre[63].src;
        lesCasesDansBonOrdre[63].src = "";
    }
    else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi noir" && roiNoirGrandRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 58){
        var tempoRoqueEchequier = echequier[59];
        echequier[59] = echequier[56];
        echequier[56] = "vide";
        var tempoRoqueLesCasesDansBonOrdre = lesCasesDansBonOrdre[59].src;
        lesCasesDansBonOrdre[59].src = lesCasesDansBonOrdre[56].src;
        lesCasesDansBonOrdre[56].src = "";
    }



    // On cesse d'afficher les possibilites de coup
    for(var a = 0; a < possibilite.length; a++){
        lesCasesDansBonOrdre[possibilite[a]].style.background = "";
    }
    // on cesse d'afficher la case selectionner
    lesCasesDansBonOrdre[nombreDeid].style.background = "";

    
    // on reactive la fonction (fonctionQuellesSontLesPossibliltes) a l'aide de la variable (actifFonctionQuellesSontLesPossibliltes)
    actifFonctionQuellesSontLesPossibliltes = 1;

    // on desactive la fonciton (validerCoupFonction)
    for(var o = 0; o < possibilite.length; o++){
        lesCasesDansBonOrdre[possibilite[o]].onclick = null;
    };

    // on desative la fonction (pasValiderFonction)
    for(var x = 0; x < tableauSansPossibilites.length; x++){
        if(tableauSansPossibilites[x] || tableauSansPossibilites[x] == 0){
            lesCasesDansBonOrdre[tableauSansPossibilites[x]].onclick = null;
        }
    }

    // on passe au joueur suivant
    if(auTourDesBlancs == true){
        auTourDesBlancs = false;
    }
    else if(auTourDesBlancs == false){
        auTourDesBlancs = true;
    }


    


    // apres avoir jouer on verifi si il y a echec au roi si oui on remet comme c'etait
    // on verifie si le roi est menace
    menacer = false;
    if(auTourDesBlancs == false){
        for(var k = 0; k < echequier.length; k++){
            if(echequier[k] == "roi blanc"){
                menacer = laCaseEstElleMenacerFonction(k, "noir");
            }
        }
    }
    else if(auTourDesBlancs == true){
        for(var k = 0; k < echequier.length; k++){
            if(echequier[k] == "roi noir"){
                menacer = laCaseEstElleMenacerFonction(k, "blanc");
            }
        }
    }
    // on verifie egalement si les cases de roque sont menacer
    petitRoqueBlancMenacer = false;
    grandRoqueBlancMenacer = false;
    petitRoqueNoirMenacer = false;
    grandRoqueNoirMenacer = false;
    if(auTourDesBlancs == false){
        if(laCaseEstElleMenacerFonction(5, "noir") == true || laCaseEstElleMenacerFonction(6, "noir") == true){
            petitRoqueBlancMenacer = true;
        }
        if(laCaseEstElleMenacerFonction(2, "noir") == true || laCaseEstElleMenacerFonction(3, "noir") == true){
            grandRoqueBlancMenacer = true;
        }
    }
    if(auTourDesBlancs == true){
        if(laCaseEstElleMenacerFonction(61, "blanc") == true || laCaseEstElleMenacerFonction(62, "blanc") == true){
            petitRoqueNoirMenacer = true;
        }
        if(laCaseEstElleMenacerFonction(59, "blanc") == true || laCaseEstElleMenacerFonction(58, "blanc") == true){
            grandRoqueNoirMenacer = true;
        }
    }












    

    // si il est menacer on remet tout comme avant
    // le cas particulier du roque on lespetitRoqueNoirMenacer == true remet aussi a leur place
    if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi blanc" && roiBlancPetitRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 6 && petitRoqueBlancMenacer == true){
        echequier[7] = echequier[5];
        echequier[5] = tempoRoqueEchequier;
        lesCasesDansBonOrdre[7].src = lesCasesDansBonOrdre[5].src;
        lesCasesDansBonOrdre[5].src = tempoRoqueLesCasesDansBonOrdre;
        // On remet les pieces ou elles se trouvaient
        echequier[nombreDeid] = echequier[nombreDeidDeLaOuOnVeutJouer];
        echequier[nombreDeidDeLaOuOnVeutJouer] = tempoEchequierNombreDeidDeLaOuOnVeutJouer;
        lesCasesDansBonOrdre[nombreDeid].src = lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src;
        lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = tempoLesCasesDansBonOrdreNombreDeidDeLaOuOnVeutJouer;
        alert("Coup impossible : Vous ne pouvez pas roquer maintenant");
        // on revient au joueur d'avant
        if(auTourDesBlancs == true){
            auTourDesBlancs = false;
        }
        else if(auTourDesBlancs == false){
            auTourDesBlancs = true;
        }
    }
    else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi blanc" && roiBlancGrandRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 2 && grandRoqueBlancMenacer == true){
        echequier[0] = echequier[3];
        echequier[3] = tempoRoqueEchequier;
        lesCasesDansBonOrdre[0].src = lesCasesDansBonOrdre[3].src;
        lesCasesDansBonOrdre[3].src = tempoRoqueLesCasesDansBonOrdre;
        // On remet les pieces ou elles se trouvaient
        echequier[nombreDeid] = echequier[nombreDeidDeLaOuOnVeutJouer];
        echequier[nombreDeidDeLaOuOnVeutJouer] = tempoEchequierNombreDeidDeLaOuOnVeutJouer;
        lesCasesDansBonOrdre[nombreDeid].src = lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src;
        lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = tempoLesCasesDansBonOrdreNombreDeidDeLaOuOnVeutJouer;
        alert("Coup impossible : Vous ne pouvez pas roquer maintenant");
        // on revient au joueur d'avant
        if(auTourDesBlancs == true){
            auTourDesBlancs = false;
        }
        else if(auTourDesBlancs == false){
            auTourDesBlancs = true;
        }
    }
    else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi noir" && roiNoirPetitRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 62 && petitRoqueNoirMenacer == true){
        echequier[63] = echequier[61];
        echequier[61] = tempoRoqueEchequier;
        lesCasesDansBonOrdre[63].src = lesCasesDansBonOrdre[61].src;
        lesCasesDansBonOrdre[61].src = tempoRoqueLesCasesDansBonOrdre;
        // On remet les pieces ou elles se trouvaient
        echequier[nombreDeid] = echequier[nombreDeidDeLaOuOnVeutJouer];
        echequier[nombreDeidDeLaOuOnVeutJouer] = tempoEchequierNombreDeidDeLaOuOnVeutJouer;
        lesCasesDansBonOrdre[nombreDeid].src = lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src;
        lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = tempoLesCasesDansBonOrdreNombreDeidDeLaOuOnVeutJouer;
        alert("Coup impossible : Vous ne pouvez pas roquer maintenant");
        // on revient au joueur d'avant
        if(auTourDesBlancs == true){
            auTourDesBlancs = false;
        }
        else if(auTourDesBlancs == false){
            auTourDesBlancs = true;
        }
    }
    else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi noir" && roiNoirGrandRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 58 && grandRoqueNoirMenacer == true){
        echequier[56] = echequier[59];
        echequier[59] = tempoRoqueEchequier;
        lesCasesDansBonOrdre[56].src = lesCasesDansBonOrdre[59].src;
        lesCasesDansBonOrdre[59].src = tempoRoqueLesCasesDansBonOrdre;
        // On remet les pieces ou elles se trouvaient
        echequier[nombreDeid] = echequier[nombreDeidDeLaOuOnVeutJouer];
        echequier[nombreDeidDeLaOuOnVeutJouer] = tempoEchequierNombreDeidDeLaOuOnVeutJouer;
        lesCasesDansBonOrdre[nombreDeid].src = lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src;
        lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = tempoLesCasesDansBonOrdreNombreDeidDeLaOuOnVeutJouer;
        alert("Coup impossible : Vous ne pouvez pas roquer maintenant");
        // on revient au joueur d'avant
        if(auTourDesBlancs == true){
            auTourDesBlancs = false;
        }
        else if(auTourDesBlancs == false){
            auTourDesBlancs = true;
        }
    }
    else if(menacer == true){


        // on revient au joueur d'avant
        if(auTourDesBlancs == true){
            auTourDesBlancs = false;
        }
        else if(auTourDesBlancs == false){
            auTourDesBlancs = true;
        }

        // On remet les pieces ou elles se trouvaient
        echequier[nombreDeid] = echequier[nombreDeidDeLaOuOnVeutJouer];
        echequier[nombreDeidDeLaOuOnVeutJouer] = tempoEchequierNombreDeidDeLaOuOnVeutJouer;
        lesCasesDansBonOrdre[nombreDeid].src = lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src;
        lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = tempoLesCasesDansBonOrdreNombreDeidDeLaOuOnVeutJouer;


        // le cas particulier du roque on les remet aussi a leur place
        if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi blanc" && roiBlancPetitRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 6){
            echequier[7] = echequier[5];
            echequier[5] = tempoRoqueEchequier;
            lesCasesDansBonOrdre[7].src = lesCasesDansBonOrdre[5].src;
            lesCasesDansBonOrdre[5].src = tempoRoqueLesCasesDansBonOrdre;
        }
        else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi blanc" && roiBlancGrandRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 2){
            echequier[0] = echequier[3];
            echequier[3] = tempoRoqueEchequier;
            lesCasesDansBonOrdre[0].src = lesCasesDansBonOrdre[3].src;
            lesCasesDansBonOrdre[3].src = tempoRoqueLesCasesDansBonOrdre;
        }
        else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi noir" && roiNoirPetitRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 62){
            echequier[63] = echequier[61];
            echequier[61] = tempoRoqueEchequier;
            lesCasesDansBonOrdre[63].src = lesCasesDansBonOrdre[61].src;
            lesCasesDansBonOrdre[61].src = tempoRoqueLesCasesDansBonOrdre;
        }
        else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi noir" && roiNoirGrandRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 58){
            echequier[56] = echequier[59];
            echequier[59] = tempoRoqueEchequier;
            lesCasesDansBonOrdre[56].src = lesCasesDansBonOrdre[59].src;
            lesCasesDansBonOrdre[59].src = tempoRoqueLesCasesDansBonOrdre;
        }


        alert("Coup impossible : Vous ne pouvez pas abondonner votre roi");
    }
    else{

        

        // le cas particulier du roque
        if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi blanc" && roiBlancPetitRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 6){
            roiBlancPetitRoqueValide = false;
            roiBlancGrandRoqueValide = false;
        }
        else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi blanc" && roiBlancGrandRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 2){
            roiBlancPetitRoqueValide = false;
            roiBlancGrandRoqueValide = false;
        }
        else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi noir" && roiNoirPetitRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 62){
            roiNoirPetitRoqueValide = false;
            roiNoirGrandRoqueValide = false;
        }
        else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi noir" && roiNoirGrandRoqueValide == true && nombreDeidDeLaOuOnVeutJouer == 58){
            roiNoirPetitRoqueValide = false;
            roiNoirGrandRoqueValide = false;
        }



        // on desactive le roque si il n'est plus possible
        if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi blanc"){
            roiBlancPetitRoqueValide = false;
            roiBlancGrandRoqueValide = false;
        }
        else if(echequier[7] == "vide"){
            roiBlancPetitRoqueValide = false;
        }
        else if(echequier[0] == "vide"){
            roiBlancGrandRoqueValide = false;
        }
        else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "roi noir"){
            roiNoirPetitRoqueValide = false;
            roiNoirGrandRoqueValide = false;
        }
        else if(echequier[63] == "vide"){
            roiNoirPetitRoqueValide = false;
        }
        else if(echequier[56] == "vide"){
            roiNoirGrandRoqueValide = false;
        }


        // le cas de la promotion
        if(echequier[nombreDeidDeLaOuOnVeutJouer] == "pion blanc" && nombreDeidDeLaOuOnVeutJouer >= 56 && nombreDeidDeLaOuOnVeutJouer <= 63){
            promotionFonction(nombreDeidDeLaOuOnVeutJouer);
        }
        else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "pion noir" && nombreDeidDeLaOuOnVeutJouer >= 0 && nombreDeidDeLaOuOnVeutJouer <= 7){
            promotionFonction(nombreDeidDeLaOuOnVeutJouer);
        }


        // on gere la prise en passant
        nombreDeid = parseInt(nombreDeid);
        nombreDeidDeLaOuOnVeutJouer = parseInt(nombreDeidDeLaOuOnVeutJouer);
        if(priseEnPassantDeNoir0 == true){
            if(possibilitePriseEnPassant == "+7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 7){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
        }
        else if(priseEnPassantDeNoir1 == true){
            if(possibilitePriseEnPassant == "+7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 7){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
            else if(possibilitePriseEnPassant == "+9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 9){
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }
        else if(priseEnPassantDeNoir2 == true){
            if(possibilitePriseEnPassant == "+7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 7){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
            else if(possibilitePriseEnPassant == "+9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 9){
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }
        else if(priseEnPassantDeNoir3 == true){
            if(possibilitePriseEnPassant == "+7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 7){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
            else if(possibilitePriseEnPassant == "+9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 9){
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }
        else if(priseEnPassantDeNoir4 == true){
            if(possibilitePriseEnPassant == "+7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 7){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
            else if(possibilitePriseEnPassant == "+9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 9){
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }
        else if(priseEnPassantDeNoir5 == true){
            if(possibilitePriseEnPassant == "+7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 7){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
            else if(possibilitePriseEnPassant == "+9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 9){
                var truc = nombreDeid + 1;
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }
        else if(priseEnPassantDeNoir6 == true){
            if(possibilitePriseEnPassant == "+7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 7){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
            else if(possibilitePriseEnPassant == "+9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 9){
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }
        else if(priseEnPassantDeNoir7 == true){
            if(possibilitePriseEnPassant == "+7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 7){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
            else if(possibilitePriseEnPassant == "+9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer - 9){
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }
        else if(priseEnPassantDeBlanc0 == true){
            if(possibilitePriseEnPassant == "-9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 9){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
        }
        else if(priseEnPassantDeBlanc1 == true){
            if(possibilitePriseEnPassant == "-9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 9){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
            else if(possibilitePriseEnPassant == "-7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 7){
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }
        else if(priseEnPassantDeBlanc2 == true){
            if(possibilitePriseEnPassant == "-9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 9){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
            else if(possibilitePriseEnPassant == "-7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 7){
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }
        else if(priseEnPassantDeBlanc3 == true){
            if(possibilitePriseEnPassant == "-9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 9){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
            else if(possibilitePriseEnPassant == "-7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 7){
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }
        else if(priseEnPassantDeBlanc4 == true){
            if(possibilitePriseEnPassant == "-9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 9){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
            else if(possibilitePriseEnPassant == "-7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 7){
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }
        else if(priseEnPassantDeBlanc5 == true){
            if(possibilitePriseEnPassant == "-9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 9){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
            else if(possibilitePriseEnPassant == "-7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 7){
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }
        else if(priseEnPassantDeBlanc6 == true){
            if(possibilitePriseEnPassant == "-9" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 9){
                echequier[nombreDeid - 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid - 1].src = "";
            }
            else if(possibilitePriseEnPassant == "-7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 7){
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }
        else if(priseEnPassantDeBlanc7 == true){
            if(possibilitePriseEnPassant == "-7" && nombreDeid == nombreDeidDeLaOuOnVeutJouer + 7){
                echequier[nombreDeid + 1] = "vide";
                lesCasesDansBonOrdre[nombreDeid + 1].src = "";
            }
        }













        if(echequier[nombreDeidDeLaOuOnVeutJouer] == "pion noir"){
            if(nombreDeidDeLaOuOnVeutJouer == 32 && nombreDeid == 48){
                priseEnPassantDeNoir0 = true;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 33 && nombreDeid == 49){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = true;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 34 && nombreDeid == 50){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = true;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 35 && nombreDeid == 51){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = true;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 36 && nombreDeid == 52){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = true;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 37 && nombreDeid == 53){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = true;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 38 && nombreDeid == 54){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = true;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 39 && nombreDeid == 55){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = true;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else{
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
        }
        else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "pion blanc"){
            if(nombreDeidDeLaOuOnVeutJouer == 24 && nombreDeid == 8){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = true;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 25 && nombreDeid == 9){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = true;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 26 && nombreDeid == 10){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = true;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 27 && nombreDeid == 11){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = true;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 28 && nombreDeid == 12){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = true;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 29 && nombreDeid == 13){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = true;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 30 && nombreDeid == 14){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = true;
                priseEnPassantDeBlanc7 = false;
            }
            else if(nombreDeidDeLaOuOnVeutJouer == 31 && nombreDeid == 15){
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = true;
            }
            else{
                priseEnPassantDeNoir0 = false;
                priseEnPassantDeNoir1 = false;
                priseEnPassantDeNoir2 = false;
                priseEnPassantDeNoir3 = false;
                priseEnPassantDeNoir4 = false;
                priseEnPassantDeNoir5 = false;
                priseEnPassantDeNoir6 = false;
                priseEnPassantDeNoir7 = false;
                priseEnPassantDeBlanc0 = false;
                priseEnPassantDeBlanc1 = false;
                priseEnPassantDeBlanc2 = false;
                priseEnPassantDeBlanc3 = false;
                priseEnPassantDeBlanc4 = false;
                priseEnPassantDeBlanc5 = false;
                priseEnPassantDeBlanc6 = false;
                priseEnPassantDeBlanc7 = false;
            }
        }
        else{
            priseEnPassantDeNoir0 = false;
            priseEnPassantDeNoir1 = false;
            priseEnPassantDeNoir2 = false;
            priseEnPassantDeNoir3 = false;
            priseEnPassantDeNoir4 = false;
            priseEnPassantDeNoir5 = false;
            priseEnPassantDeNoir6 = false;
            priseEnPassantDeNoir7 = false;
            priseEnPassantDeBlanc0 = false;
            priseEnPassantDeBlanc1 = false;
            priseEnPassantDeBlanc2 = false;
            priseEnPassantDeBlanc3 = false;
            priseEnPassantDeBlanc4 = false;
            priseEnPassantDeBlanc5 = false;
            priseEnPassantDeBlanc6 = false;
            priseEnPassantDeBlanc7 = false;
        }
    }

    
}
function pasValiderFonction(nombreDeid, possibilite){
    nombreDeid = nombreDeid;
    possibilite = possibilite;

    
    
    // On cesse d'afficher les possibilites de coup
    for(var l = 0; l < possibilite.length; l++){
        lesCasesDansBonOrdre[possibilite[l]].style.background = "";
    }
    // on cesse d'afficher la case selectionner
    lesCasesDansBonOrdre[nombreDeid].style.background = "";

    // on reactive la fonction (fonctionQuellesSontLesPossibliltes) a l'aide de la variable (actifFonctionQuellesSontLesPossibliltes)
    actifFonctionQuellesSontLesPossibliltes = 1;

    // on desactive la fonciton (validerCoupFonction)
    for(var o = 0; o < possibilite.length; o++){
        lesCasesDansBonOrdre[possibilite[o]].onclick = null;
    };


    // on desative la fonction (pasValiderFonction)
    for(var x = 0; x < tableauSansPossibilites.length; x++){
        if(tableauSansPossibilites[x] || tableauSansPossibilites[x] == 0){
            lesCasesDansBonOrdre[tableauSansPossibilites[x]].onclick = null;
        }
    }



    
}




// on affiche une fenetre avec les 4 possibilites de promotion et on fait choisir le joueur
function promotionFonction(nombreDeidDeLaOuOnVeutJouer){
    nombreDeidDeLaOuOnVeutJouer = nombreDeidDeLaOuOnVeutJouer;
    
    
    // on affiche l'ecran avec les 4 possibilites
    idPromotion.style.display = "flex";
    if(echequier[nombreDeidDeLaOuOnVeutJouer] == "pion blanc"){
        classImgPiecesPromotion[0].src = "image/activity(2).svg";
        classImgPiecesPromotion[1].src = "image/pen-tool(1).svg";
        classImgPiecesPromotion[2].src = "image/type(4).svg";
        classImgPiecesPromotion[3].src = "image/heart(2).svg";
    }
    else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "pion noir"){
        classImgPiecesPromotion[0].src = "image/activity.svg";
        classImgPiecesPromotion[1].src = "image/pen-tool.svg";
        classImgPiecesPromotion[2].src = "image/type(2).svg";
        classImgPiecesPromotion[3].src = "image/heart.svg";
    }


    // on fait choisisr le joueur
    if(echequier[nombreDeidDeLaOuOnVeutJouer] == "pion blanc"){
        classImgPiecesPromotion[0].onclick = function(){
            echequier[nombreDeidDeLaOuOnVeutJouer] = "cavalier blanc";
            lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = classImgPiecesPromotion[0].src;
            apresPromotionFonction();
        };
        classImgPiecesPromotion[1].onclick = function(){
            echequier[nombreDeidDeLaOuOnVeutJouer] = "fou blanc";
            lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = classImgPiecesPromotion[1].src;
            apresPromotionFonction();
        };
        classImgPiecesPromotion[2].onclick = function(){
            echequier[nombreDeidDeLaOuOnVeutJouer] = "tour blanc";
            lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = classImgPiecesPromotion[2].src;
            
            apresPromotionFonction();
        };
        classImgPiecesPromotion[3].onclick = function(){
            echequier[nombreDeidDeLaOuOnVeutJouer] = "dame blanc";
            lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = classImgPiecesPromotion[3].src;
            apresPromotionFonction();
        };
    }
    else if(echequier[nombreDeidDeLaOuOnVeutJouer] == "pion noir"){
        classImgPiecesPromotion[0].onclick = function(){
            echequier[nombreDeidDeLaOuOnVeutJouer] = "cavalier noir";
            lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = classImgPiecesPromotion[0].src;
            apresPromotionFonction();
        };
        classImgPiecesPromotion[1].onclick = function(){
            echequier[nombreDeidDeLaOuOnVeutJouer] = "fou noir";
            lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = classImgPiecesPromotion[1].src;
            apresPromotionFonction();
        };
        classImgPiecesPromotion[2].onclick = function(){
            echequier[nombreDeidDeLaOuOnVeutJouer] = "tour noir";
            lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = classImgPiecesPromotion[2].src;
            apresPromotionFonction();
        };
        classImgPiecesPromotion[3].onclick = function(){
            echequier[nombreDeidDeLaOuOnVeutJouer] = "dame noir";
            lesCasesDansBonOrdre[nombreDeidDeLaOuOnVeutJouer].src = classImgPiecesPromotion[3].src;
            apresPromotionFonction();
        };
    }
    
}
// on remet tout comme c'etait apres avoir fait la promotion
function apresPromotionFonction(){
    idPromotion.style.display = "none";
    classImgPiecesPromotion[0].onclick = null;
    classImgPiecesPromotion[1].onclick = null;
    classImgPiecesPromotion[2].onclick = null;
    classImgPiecesPromotion[3].onclick = null;

}




// on verife si apres qu'un joueur est joue l'une de ces pieces est menacer
function laCaseEstElleMenacerFonction(laCase, couleurQuiNousMenace){
    couleurQuiNousMenace = couleurQuiNousMenace;
    laCase = parseInt(laCase);


    



    // On regarde si i fait parti des possibilites des pieces adverse
    if(couleurQuiNousMenace == "noir"){
        for(var k = 0; k < echequier.length; k++){
            if(echequier[k] == "tour noir"){
                if(tourFonction(k, laCase) == true){
                    return true;
                }
            }
            else if(echequier[k] == "cavalier noir"){
                if(cavalierFonction(k, laCase) == true){
                    return true;
                }
            }
            else if(echequier[k] == "fou noir"){
                if(fouFonction(k, laCase) == true){
                    return true;
                }
            }
            else if(echequier[k] == "dame noir"){
                if(dameFonction(k, laCase) == true){
                    return true;
                }
            }
            else if(echequier[k] == "roi noir"){
                if(roiFonction(k, laCase) == true){
                    return true;
                }
            }
            else if(echequier[k] == "pion noir"){
                if(pionFonction(k, laCase) == true){
                    return true;
                }
            }
        }
    }
    if(couleurQuiNousMenace == "blanc"){
        for(var k = 0; k < echequier.length; k++){
            if(echequier[k] == "tour blanc"){
                if(tourFonction(k, laCase) == true){
                    return true;
                }
            }
            else if(echequier[k] == "cavalier blanc"){
                if(cavalierFonction(k, laCase) == true){
                    return true;
                }
            }
            else if(echequier[k] == "fou blanc"){
                if(fouFonction(k, laCase) == true){
                    return true;
                }
            }
            else if(echequier[k] == "dame blanc"){
                if(dameFonction(k, laCase) == true){
                    return true;
                }
            }
            else if(echequier[k] == "roi blanc"){
                if(roiFonction(k, laCase) == true){
                    return true;
                }
            }
            else if(echequier[k] == "pion blanc"){
                if(pionFonction(k, laCase) == true){
                    return true;
                }
            }
        }
    }



    

    return false;
}





































    


















/*


































































if(echequier[nombreDeid] == "tour blanc" || echequier[nombreDeid] == "cavalier blanc" || echequier[nombreDeid] == "fou blanc" || echequier[nombreDeid] == "dame blanc" || echequier[nombreDeid] == "roi blanc" || echequier[nombreDeid] == "pion blanc"){
        menacer = laCaseEstElleMenacerFonction(nombreDeid, "noir");
    }
    else if(echequier[nombreDeid] == "tour noir" || echequier[nombreDeid] == "cavalier noir" || echequier[nombreDeid] == "fou noir" || echequier[nombreDeid] == "dame noir" || echequier[nombreDeid] == "roi noir" || echequier[nombreDeid] == "pion noir"){
        menacer = laCaseEstElleMenacerFonction(nombreDeid, "blanc");
    }



*/