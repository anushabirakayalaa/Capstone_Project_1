import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ArticleDetails() {
  const { id } = useParams();

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || "https://capstone-project-1-1-9zol.onrender.com";
        const response = await axios.get(
          `${baseUrl}/user-api/articles/${id}`,
          { withCredentials: true }
        );

        setArticle(response.data.payload);
      } catch (error) {
        console.log(error);
      }
    };

    fetchArticle();
  }, [id]);

  if (!article) {
    return (
      <div className="text-center mt-20 text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6">
        {article.title}
      </h1>

      <p className="text-sky-600 font-semibold uppercase mb-4">
        {article.category}
      </p>

      <p className="text-gray-700 leading-8 text-lg">
        {article.content}
      </p>
    </div>
  );
}

export default ArticleDetails;
