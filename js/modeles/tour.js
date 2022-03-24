import { Piece, TOUR } from "./piece.js";
import { Coordonnee } from "./coordonnee.js";

export class Tour extends Piece
{
    /**
     * Constructeur
     * @param {Echiquier} echiquier : Echiquier sur lequel est placée la pièce 
     * @param {Coordonnee} coordonnee : Coordonnee de la pièce sur l'échiquier
     * @param {string} couleur : Couleur de la pièce (BLANC ou NOIR)
     */
     constructor(echiquier, coordonnee, couleur)
    {
        super(TOUR, echiquier, coordonnee, couleur);
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
                let x = this.coordonnee.x;
                let y = this.coordonnee.y;

                if(iDirection === 0 || iDirection === 1)
                    x += (iDirection === 0 ? 1 : -1) * i;
                else if(iDirection === 2 || iDirection === 3)
                    y += (iDirection === 2 ? 1 : -1) * i;   
                
                if(directionsBloquees.indexOf(iDirection) === -1)
                {                    
                    const coordonnee = new Coordonnee({x: x, y: y});
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