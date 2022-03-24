import { BLANC, NOIR } from "./piece.js";
import { Pion } from "./pion.js";
import { Roi } from "./roi.js";
import { Reine } from "./reine.js";
import { Fou } from "./fou.js";
import { Tour } from "./tour.js";
import { Cavalier } from "./cavalier.js";
import { Coordonnee } from "./coordonnee.js";

export class Echiquier
{
    //Grille de l'échiquier
    #grille;

    //Couleur des pièces pouvant jouer
    #joueurCourant;

    //Pièce sélectionnée prête à être déplacée
    #pieceSelectionnee;

    //Déplacements possibles pour la pièce sélectionnée
    #deplacementsPossibles;

    /**
     * Cosntructeur
     */
    constructor()
    {
        this.#grille = [];
        this.#joueurCourant = BLANC;
        this.#pieceSelectionnee = null;
        this.#deplacementsPossibles = [];

        this.#initialiserGrille();
    }

    get grille() { return this.#grille; }
    get joueurCourant() { return this.#joueurCourant; }
    get deplacementsPossibles() { return this.#deplacementsPossibles; }

    /**
     * Démarre une nouvelle partie
     */
    nouvellePartie()
    {
        this.#joueurCourant = BLANC;
        this.#pieceSelectionnee = null;
        this.#deplacementsPossibles = [];

        this.#initialiserGrille();
        this.#placerPieces();
    }

    /**
     * Initialise la grille de l'échiquier (création des 64 cases)
     */
    #initialiserGrille()
    {
        this.#grille = [];

        for (let iLigne = 0; iLigne < 8; ++iLigne)
        {
            let ligne = [];

            for (let iColonne = 0; iColonne < 8; ++iColonne)
            {
                ligne.push(null);
            }

            this.#grille.push(ligne);
        }
    }

    /**
     * Place les pièces de l'échiquier dans leur configuration initiale
     */
    #placerPieces()
    {
        this.#grille[0][0] = new Tour(this, new Coordonnee({ x: 0, y: 0 }), NOIR);
        this.#grille[0][1] = new Cavalier(this, new Coordonnee({ x: 1, y: 0 }), NOIR);
        this.#grille[0][2] = new Fou(this, new Coordonnee({ x: 2, y: 0 }), NOIR);
        this.#grille[0][3] = new Reine(this, new Coordonnee({ x: 3, y: 0 }), NOIR);
        this.#grille[0][4] = new Roi(this, new Coordonnee({ x: 4, y: 0 }), NOIR);
        this.#grille[0][5] = new Fou(this, new Coordonnee({ x: 5, y: 0 }), NOIR);
        this.#grille[0][6] = new Cavalier(this, new Coordonnee({ x: 6, y: 0 }), NOIR);
        this.#grille[0][7] = new Tour(this, new Coordonnee({ x: 7, y: 0 }), NOIR);

        for (let iPion = 0; iPion < 8; ++iPion)
            this.#grille[1][iPion] = new Pion(this, new Coordonnee({ x: iPion, y: 1 }), NOIR);

        this.#grille[7][0] = new Tour(this, new Coordonnee({ x: 0, y: 7 }), BLANC);
        this.#grille[7][1] = new Cavalier(this, new Coordonnee({ x: 1, y: 7 }), BLANC);
        this.#grille[7][2] = new Fou(this, new Coordonnee({ x: 2, y: 7 }), BLANC);
        this.#grille[7][3] = new Reine(this, new Coordonnee({ x: 3, y: 7 }), BLANC);
        this.#grille[7][4] = new Roi(this, new Coordonnee({ x: 4, y: 7 }), BLANC);
        this.#grille[7][5] = new Fou(this, new Coordonnee({ x: 5, y: 7 }), BLANC);
        this.#grille[7][6] = new Cavalier(this, new Coordonnee({ x: 6, y: 7 }), BLANC);
        this.#grille[7][7] = new Tour(this, new Coordonnee({ x: 7, y: 7 }), BLANC);

        for (let iPion = 0; iPion < 8; ++iPion)
            this.#grille[6][iPion] = new Pion(this, new Coordonnee({ x: iPion, y: 6 }), BLANC);
    }

    /**
     * Sélectionne la pièce située aux coordonnées fournies
     * @param {Coordonnee} coordonnee : Coordonnee de la pièce à sélectionner 
     * @returns La pièce sélectionnée ou null si aucune pièce n'est présente aux coordonnées fournies
     */
    selectionnerPiece(coordonnee)
    {
        const piece = this.getPiece(coordonnee);

        if(piece === this.#pieceSelectionnee)
            this.#pieceSelectionnee = null;
        else if (piece && piece.couleur === this.#joueurCourant)
        {
            this.#pieceSelectionnee = piece;            
            this.#deplacementsPossibles = this.#pieceSelectionnee.getDeplacementsPossibles();
        }

        return this.#pieceSelectionnee;
    }

    /**
     * Déplace la pièce sélectionnée au coordonnées fournies
     * @param {Coordonnee} coordonnee : Coordonnée vers laquelle déplacer la pièce sélectionnée 
     */
    deplacerPiece(coordonnee)
    {
        if (this.#pieceSelectionnee)
        {
            this.#grille[this.#pieceSelectionnee.coordonnee.y][this.#pieceSelectionnee.coordonnee.x] = null;
            this.#grille[coordonnee.y][coordonnee.x] = this.#pieceSelectionnee;

            this.#pieceSelectionnee.coordonnee.x = coordonnee.x;
            this.#pieceSelectionnee.coordonnee.y = coordonnee.y;
            this.#pieceSelectionnee.aBouge = true;

            this.#deplacementsPossibles = [];

            this.#joueurSuivant();
        }
    }

    /**
     * Indique si la coordonnée fournie se trouve bien sur l'échiquier 
     * @param {*} coordonnee 
     * @returns true si la coordonnée est sur l'échiquier, false sinon
     */
    #estSurLEchiquier(coordonnee)
    {
        return coordonnee.x >= 0 && coordonnee.x < 8 && coordonnee.y >= 0 && coordonnee.y < 8;
    }

    /**
     * Retourne la pièce située aux coordonnées fournie, ou null si aucune pièce n'est présente à cet endroit 
     * @param {Coordonnee} coordonnee : Coordonnee où chercher une pièce
     * @returns la pièce située aux coordonnées fournie, ou null si aucune pièce n'est présente à cet endroit
     */
    getPiece(coordonnee)
    {
        if (this.#estSurLEchiquier(coordonnee))
            return this.#grille[coordonnee.y][coordonnee.x];

        return null;
    }

    /**
     * Passe au joueur suivant
     */
    #joueurSuivant()
    {
        this.#joueurCourant = this.#joueurCourant === NOIR ? BLANC : NOIR;
    }
}