import { createContext, useState, useContext, ReactNode, useCallback } from "react";
import { Article } from "@/types/types";
import axios from "axios";
import { ArticleContextType } from "@/types/types";

const ArticleContext = createContext<ArticleContextType | undefined>(undefined)

export const ArticleProvider: React.FC<{children: ReactNode}> = ({
    children
}) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)


    const fetchArticles = useCallback(async () => {
        if(loading || (articles.length > 0)) {
            return
        }

        setLoading(true);

        try {
            const response = await axios.get('/api/articles/fetchArticle');
            setArticles(response.data.articles);
            setError(null)
        } catch (error) {
            setError('Failed to fetch articles.')
        } finally {
            setLoading(false)
        }
    }, [loading, articles.length])

    return (
        <ArticleContext.Provider value={{articles, loading, error, fetchArticles, selectedArticle, setSelectedArticle}}>
            {children}
        </ArticleContext.Provider>
    )
}

export const useArticles = () => {
    const context = useContext(ArticleContext);
    if(!context) {
        throw new Error('UseArticles must be used within an articleProvider')
    }
    return context;
}