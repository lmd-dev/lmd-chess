import { Coordonnee } from "./coordonnee.js";

export const BLANC = "blanc";
export const NOIR = "noir";

export const PION = "pion";
export const CAVALIER = "cavalier";
export const FOU = "fou";
export const TOUR = "tour";
export const REINE = "reine";
export const ROI = "roi";

export class Piece
{
    //Type de la pièce
    #type;      

    //Echiquier sur lequel est placée la pièce
    #echiquier;

    //Coordonnee de la pièce sur l'échiquier
    #coordonnee;

    //Couleur de la pièce (BLANC ou NOIR)
    #couleur;

    //Indique si la pièce a déjà été déplacée
    #aBouge;

    /**
     * Constructeur
     * @param {string} type : Type de la pièce (PION, CAVALIER, FOU, ROI, REINE, TOUR) 
     * @param {Echiquier} echiquier : Echiquier sur lequel est placée la pièce 
     * @param {Coordonnee} coordonnee : Coordonnee de la pièce sur l'échiquier
     * @param {string} couleur : Couleur de la pièce (BLANC ou NOIR)
     */constructor(type, echiquier, coordonnee, couleur)
    {
        this.#type = type;
        this.#echiquier = echiquier;
        this.#coordonnee = new Coordonnee(coordonnee);
        this.#couleur = couleur;
        this.#aBouge = false;
    }

    set coordonnee(value) { this.#coordonnee.x = value.x; this.#coordonnee.y = value.y; }
    get coordonnee() {return this.#coordonnee; }

    get type() { return this.#type; }

    get couleur() { return this.#couleur; }
    
    get echiquier() { return this.#echiquier;}
    
    set aBouge(value) { this.#aBouge = value; }
    get aBouge() { return this.#aBouge; }

    /**
     * /!\ Méthode abstraite - Doit être redéfinie /!\
     * Retourne les déplacements possibles de la pièces en fonction de la configuration de l'échiquier
     * @returns {Coordonnee[]} : Un tableau des coordonnées que la pièce peut atteindre
     */
     getDeplacementsPossibles()
    {
        throw "Cette méthode doit être redéfinie !";
    }
}