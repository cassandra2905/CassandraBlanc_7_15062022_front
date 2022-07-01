// Modèle d'un article
export interface Article {
    id?: string;
    title: string;
    content: string;
    creationDate?: string;
    author?: string;
}