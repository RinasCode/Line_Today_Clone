import { useNavigate } from "react-router-dom";

export default function Card({ article }) {
  console.log('Article:', JSON.stringify(article, null, 2)); // Menambahkan log untuk memeriksa objek article
  return (
    <>
      <div className="card bg-grey-100 w-full shadow-xl hover:scale-110">
        <div className="w-full h-48 overflow-hidden">
          <img 
          src={article.imgUrl} 
          alt="articleArticle image"
          className="w-full h-full object-cover" />
        </div>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{article.title}</h2>
          <p>{article.category}</p>
        </div>
      </div>
    </>
  );
}
