// Modèle d'un article
export interface Article {
    _id?: string;
    title: string;
    image: string;
    content: string;
    creationDate?: string;
    author?: string;
    usersLiked: string[];
}