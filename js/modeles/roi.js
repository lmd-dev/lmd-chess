import { Piece, ROI } from "./piece.js";
import { Coordonnee } from "./coordonnee.js";

export class Roi extends Piece
{
    /**
     * Constructeur
     * @param {Echiquier} echiquier : Echiquier sur lequel est placée la pièce 
     * @param {Coordonnee} coordonnee : Coordonnee de la pièce sur l'échiquier
     * @param {string} couleur : Couleur de la pièce (BLANC ou NOIR)
     */
     constructor(echiquier, coordonnee, couleur)
    {
        super(ROI, echiquier, coordonnee, couleur);
    }

    /**
     * Retourne les déplacements possibles de la pièces en fonction de la configuration de l'échiquier
     * @returns {Coordonnee[]} : Un tableau des coordonnées que la pièce peut atteindre
     */
     getDeplacementsPossibles()
    {
        const possibilites = [];

        for (let iDirection = 0; iDirection < 8; ++iDirection)
        {
            let x = this.coordonnee.x;
            let y = this.coordonnee.y;

            if (iDirection === 0 || iDirection === 1)
                x += (iDirection === 0 ? 1 : -1);
            else if (iDirection === 2 || iDirection === 3)
                y += (iDirection === 2 ? 1 : -1);
            else
            {
                x += (iDirection === 4 || iDirection === 5 ? 1 : -1);
                y += (iDirection === 4 || iDirection === 6 ? 1 : -1);
            }

            const coordonnee = new Coordonnee({ x: x, y: y });
            const piece = this.echiquier.getPiece(coordonnee);

            if (piece)
            {
                if (this.couleur !== piece.couleur)
                    possibilites.push(coordonnee);
            } else
            {
                possibilites.push(coordonnee);
            }

        }

        return possibilites;
    }
}