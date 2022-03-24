import { ControleurEchiquier } from "../controleurs/controleur-echiquier.js";
import { VueEchiquier } from "../vues/vue-echiquier.js";

class Application
{
    //Controleur en charge de l'échiquier
    #controleurEchiquier;

    //Vue en charge de l'échiquier
    #vueEchiquier;

    /**
     * Constructeur
     */
    constructor()
    {
        this.#controleurEchiquier = new ControleurEchiquier();

        this.#vueEchiquier = new VueEchiquier(this.#controleurEchiquier);
    }
}

//Point d'entrée de l'application : démarrage une fois tous les éléments chargés
window.addEventListener("load", () => {
    const app = new Application();
})