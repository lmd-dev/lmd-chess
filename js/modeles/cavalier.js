import { Coordonnee } from "./coordonnee.js";
import { Piece, CAVALIER } from "./piece.js";

export class Cavalier extends Piece
{
    /**
     * Constructeur
     * @param {Echiquier} echiquier : Echiquier sur lequel est placée la pièce 
     * @param {Coordonnee} coordonnee : Coordonnee de la pièce sur l'échiquier
     * @param {string} couleur : Couleur de la pièce (BLANC ou NOIR)
     */
    constructor(echiquier, coordonnee, couleur)
    {
        super(CAVALIER, echiquier, coordonnee, couleur);
    }

    /**
     * Retourne les déplacements possibles de la pièces en fonction de la configuration de l'échiquier
     * @returns {Coordonnee[]} : Un tableau des coordonnées que la pièce peut atteindre
     */
    getDeplacementsPossibles()
    {
        const possibilites = [];

        for (let iDirection1 = 0; iDirection1 < 4; ++iDirection1) 
        {
            for (let iDirection2 = 0; iDirection2 < 2; ++iDirection2) 
            {
                const x = this.coordonnee.x + ((iDirection2 + 1) * (iDirection1 === 0 || iDirection1 === 1 ? 1 : -1));
                const y = this.coordonnee.y + ((2 - iDirection2) * (iDirection1 === 0 || iDirection1 === 2 ? 1 : -1));

                const coordonnee = new Coordonnee({ x: x, y: y });
                const piece = this.echiquier.getPiece(coordonnee);

                if (!piece || piece.couleur !== this.couleur)
                    possibilites.push(coordonnee);

            }
        }

        return possibilites;
    }
}