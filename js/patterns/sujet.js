export class Sujet
{
    #observateurs;

    constructor()
    {
        this.#observateurs = [];
    }

    ajouterObservateur(observateur)
    {
        this.#observateurs.push(observateur);
    }

    notifier()
    {
        this.#observateurs.forEach((observateur) => {
            observateur.mettreAJour();
        });
    }
}