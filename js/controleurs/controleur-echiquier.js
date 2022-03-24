import { Sujet } from "../patterns/sujet.js"
import { Echiquier } from "../modeles/echiquier.js";

export class ControleurEchiquier extends Sujet
{
    //Echiquier géré par le controleur
    #echiquier;

    /**
     * Constructeur
     */
    constructor()
    {
        //Appel du constructeur de la classe mère
        super();

        this.#echiquier = new Echiquier();
    }

    //Getter sur l'attribut privé echiquier
    get echiquier() { return this.#echiquier; };

    /**
     * Démarre une nouvelle partie
     */
    nouvellePartie()
    {
        this.#echiquier.nouvellePartie();

        this.notifier();
    }

    /**
     * Sélectionne une pièce de l'échiquier
     * @param {Coordonnee} coordonnee Coordonnée de la pièce
     */
    selectionnerPiece(coordonnee)
    {
        this.#echiquier.selectionnerPiece(coordonnee);
        this.notifier();
    }

    /**
     * Déplace la pièce sélectionnée vers les coordonnées données
     * @param {Coordonnee} coordonnee Coordonnées de destination de la pièce sélectionnée
     */
    deplacerVers(coordonnee)
    {
        this.#echiquier.deplacerPiece(coordonnee);
        this.notifier();
    }
}