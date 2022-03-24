import { Piece, FOU } from "./piece.js";
import { Coordonnee } from "./coordonnee.js";

export class Fou extends Piece
{
    /**
     * Constructeur
     * @param {Echiquier} echiquier : Echiquier sur lequel est placée la pièce 
     * @param {Coordonnee} coordonnee : Coordonnee de la pièce sur l'échiquier
     * @param {string} couleur : Couleur de la pièce (BLANC ou NOIR)
     */
    constructor(echiquier, coordonnee, couleur)
    {
        super(FOU, echiquier, coordonnee, couleur);
    }

    /**
     * Retourne les déplacements possibles de la pièces en fonction de la configuration de l'échiquier
     * @returns {Coordonnee[]} : Un tableau des coordonnées que la pièce peut atteindre
     */
     getDeplacementsPossibles()
    {
        const possibilites = [];

        const directionsBloquees = [];

        for(let i = 1; i<= 7; ++i)
        {
            for(let iDirection = 0; iDirection < 4; ++iDirection)
            {
                const x = this.coordonnee.x + (i * (iDirection === 0 || iDirection === 1 ? 1 : -1));
                const y = this.coordonnee.y + (i * (iDirection === 0 || iDirection === 2 ? 1 : -1));

                if(directionsBloquees.indexOf(iDirection) === -1)
                {
                    const coordonnee = new Coordonnee({x:x, y: y});
                    const piece = this.echiquier.getPiece(coordonnee);

                    if(piece)
                    {
                        if(this.couleur !== piece.couleur)
                            possibilites.push(coordonnee);

                        directionsBloquees.push(iDirection);
                    }
                    else {
                        possibilites.push(coordonnee);
                    }
                }
            }
        }

        return possibilites;
    }
}