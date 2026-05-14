import { useEffect } from 'react';
import { userAuth } from '../stores/authStore';

function UserDashboard() {
  const { articles, readArticles, currentUser, logout } = userAuth();

  useEffect(() => {
    readArticles(); // Fetch articles when dashboard loads
  }, [readArticles]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between mb-8">
        <h1 className="text-2xl font-bold">Hello, {currentUser?.firstName}</h1>
        <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <div key={article.id} className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
            {/* <img src={article.image} alt="blog" className="w-full h-40 object-cover rounded mb-4" /> */}
            <h3 className="font-bold text-lg">{article.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-3 mt-2">{article.content}</p>
            <button className="text-blue-500 mt-4 font-semibold">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
