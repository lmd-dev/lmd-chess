import { Coordonnee } from "./coordonnee.js";
import { Piece, PION, BLANC } from "./piece.js";

export class Pion extends Piece
{
    /**
     * Constructeur
     * @param {Echiquier} echiquier : Echiquier sur lequel est placée la pièce 
     * @param {Coordonnee} coordonnee : Coordonnee de la pièce sur l'échiquier
     * @param {string} couleur : Couleur de la pièce (BLANC ou NOIR)
     */
     constructor(echiquier, coordonnee, couleur)
    {
        super(PION, echiquier, coordonnee, couleur);
    }

    /**
     * Retourne les déplacements possibles de la pièces en fonction de la configuration de l'échiquier
     * @returns {Coordonnee[]} : Un tableau des coordonnées que la pièce peut atteindre
     */
     getDeplacementsPossibles()
    {
        const possibilites = [];

        const moveMax = this.aBouge ? 1 : 2;
        let bloque = false;

        const x = this.coordonnee.x;
        const y = this.coordonnee.y;

        for(let i = 1; i <= moveMax; ++i)
        {
            const yTemp = y + (i * (this.couleur === BLANC ? -1 : 1));

            if(i === 1)
            {
                for(let iColonne = -1; iColonne <= 1 ; ++iColonne)
                {
                    const xTemp = x + iColonne;
                    const coordonnee = new Coordonnee({x: xTemp, y: yTemp});
                    
                    const piece = this.echiquier.getPiece(coordonnee);
                    
                    if(iColonne === 0 && piece)
                    {    
                        bloque = true;
                    }
                    else if(iColonne === 0 && !piece || piece && piece.couleur !== this.couleur)
                        possibilites.push(coordonnee);
                }
            }
            else if(!bloque)
            {
                const coordonnee = new Coordonnee({x: x, y: yTemp});
                
                const piece = this.echiquier.getPiece(coordonnee);
                if(!piece)
                    possibilites.push(coordonnee);
            }
        }

        return possibilites;
    }
}