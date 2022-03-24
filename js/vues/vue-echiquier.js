import { Coordonnee } from "../modeles/coordonnee.js";
import { Observateur } from "../patterns/observateur.js";

export class VueEchiquier extends Observateur
{
    //Controleur en charge de l'échiquier
    #controleurEchiquier;

    /**
     * Constructeur
     * @param {ControleurEchiquier} controleurEchiquier Controleur en charge de l'échiquier
     */
    constructor(controleurEchiquier)
    {
        super();

        this.#controleurEchiquier = controleurEchiquier;
        this.#controleurEchiquier.ajouterObservateur(this);

        this.mettreAJour();

        //Affecte un gestionnaire dévénement click sur le bouton "nouvelle partie"
        document.querySelector("button").addEventListener("click", () =>
        {
            this.#controleurEchiquier.nouvellePartie();
        });
    }

    /**
     * Actualise la vue
     */
    mettreAJour()
    {
        this.afficherEchiquier();
        this.afficherJoueur();
    }

    /**
     * Affiche l'échiquier dans son état actuel
     */
    afficherEchiquier()
    {
        //Récupère la balise où représenter l'échiquier et vide son contenu
        const echiquierHTML = document.querySelector("echiquier");
        echiquierHTML.innerHTML = "";

        //Récupère l'échiquier gérer par le controleur
        const echiquier = this.#controleurEchiquier.echiquier;

        //Pour chaque ligne de l'échiquier...
        echiquier.grille.forEach((ligne, iLigne) =>
        {
            //Création d'une div qui contiendra les cellules de la ligne
            const ligneHTML = document.createElement("div");

            //Pour chaque cellule de la ligne
            ligne.forEach((piece, iColonne) =>
            {
                //Création d'un div représentant la case de l'échiquier
                const position = document.createElement("div");

                //Si une pièce est présente sur la case (!= null)
                if (piece)
                {
                    //Ajout des class CSS correspondant au type et à la couleur de la pièce
                    position.classList.add(piece.type);
                    position.classList.add(piece.couleur);

                    //Si la couleur de la pièce est la même que celle du joueur en cours...
                    if (piece.couleur === echiquier.joueurCourant)
                    {
                        //Ajout d'un gestionnaire d'événement click permettant de sélectionner la pièce à jouer
                        position.addEventListener("click", () =>
                        {
                            this.#controleurEchiquier.selectionnerPiece(piece.coordonnee);
                        })
                    }
                }

                //Si les coordonnées de la case font parties des déplacements possibles de la pièce sélectionnée...
                if (this.#controleurEchiquier.echiquier.deplacementsPossibles.find((coordonnee) =>
                {
                    return coordonnee.x === iColonne && coordonnee.y === iLigne;
                }))
                {
                    //Ajout de la classe CSS "possible" qui permettra de visualiser les destinations possibles pour la pièce sélectionnée
                    position.classList.add("possible");

                    //Ajout d'un gestionnaire d'événement click permettant de déplacer la pièce sélectionnée sur la case courante
                    position.addEventListener("click", () => { 
                        this.#controleurEchiquier.deplacerVers(new Coordonnee({ x: iColonne, y: iLigne })) 
                    });
                }

                //Ajout de la case HTML à la ligne HTML
                ligneHTML.appendChild(position);
            });

            //Ajout de la ligne HTML à l'échiquier HTML
            echiquierHTML.appendChild(ligneHTML);
        });
    }

    /**
     * Affiche les informations du joueur en cours
     */
    afficherJoueur()
    {
        document.querySelector("#joueur").innerText = this.#controleurEchiquier.echiquier.joueurCourant + "s";
    }
}