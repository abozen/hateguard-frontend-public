import React, { useState } from 'react';
import { Search, MessageCircle, Repeat2, Heart, BarChart2, AlertTriangle } from 'lucide-react';
import config from './config';

const App = () => {
  const [username, setUsername] = useState('');
  const [tweets, setTweets] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!username.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setTweets([]);
    setIsScanning(false);
    setIsFirstTime(false);
    setMessage('');

    try {
      const response = await fetch(`${config.API_BASE_URL}/tweets/${username}`);
      if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTweets(data.tweets || []);
      setIsScanning(data.isScanning);
      setIsFirstTime(data.isFirstTime);
      setMessage(data.message);
    } catch (error) {
      setError("Tweet'ler yüklenirken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-sm fixed w-full z-10 top-0">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-500">HateGuard</h1>
            <p className="text-sm text-gray-500">Twitter Nefret Söylemi Analizi</p>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto pt-16 p-4">
        {/* Search Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Twitter kullanıcı adını girin..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="absolute right-2 top-1 px-4 py-1.5 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:bg-blue-300 text-sm font-medium transition-colors"
            >
              Ara
            </button>
          </div>
        </div>

        {/* Status Message */}
        {message && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-100 text-blue-700 rounded-xl">
            {message}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Tweets */}
        <div className="space-y-0.5">
          {tweets.map((tweet) => (
            <div 
              key={tweet.tweetId} 
              className="bg-white p-4 hover:bg-gray-50 transition-colors cursor-pointer border-b"
              onClick={() => window.open(`https://x.com/${tweet.userName}/status/${tweet.tweetId}`, '_blank')}
            >
              <div className="flex space-x-3">
                <a
                  href={`https://x.com/${tweet.userName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex-shrink-0"
                >
                  <img
                    src={tweet.profileImageUrl}
                    alt={tweet.userName}
                    className="w-12 h-12 rounded-full object-cover hover:opacity-90 transition-opacity"
                  />
                </a>
                <div className="flex-1 min-w-0">
                  {/* Tweet Header */}
                  <div className="flex items-center space-x-1">
                    <a
                      href={`https://x.com/${tweet.userName}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="hover:underline"
                    >
                      <span className="font-bold text-gray-900 truncate">
                        {tweet.name}
                      </span>
                    </a>
                    <span className="text-gray-500 ml-1">@{tweet.userName}</span>
                    <span className="text-gray-500">·</span>
                    <span className="text-gray-500 text-sm">
                      {new Date(tweet.createdAt).toLocaleDateString('tr-TR')}
                    </span>
                  </div>

                  {/* Tweet Content */}
                  <p className="mt-1 text-gray-800 whitespace-pre-wrap">{tweet.content}</p>

                  {/* Tweet Stats */}
                  <div className="mt-3 flex items-center justify-between text-gray-500 max-w-md">
                    <div className="flex items-center space-x-1 group hover:text-blue-500">
                      <div className="p-2 rounded-full group-hover:bg-blue-50">
                        <MessageCircle size={18} className="group-hover:text-blue-500" />
                      </div>
                      <span>{formatNumber(tweet.replyCount)}</span>
                    </div>
                    <div className="flex items-center space-x-1 group hover:text-green-500">
                      <div className="p-2 rounded-full group-hover:bg-green-50">
                        <Repeat2 size={18} className="group-hover:text-green-500" />
                      </div>
                      <span>{formatNumber(tweet.retweetCount)}</span>
                    </div>
                    <div className="flex items-center space-x-1 group hover:text-pink-500">
                      <div className="p-2 rounded-full group-hover:bg-pink-50">
                        <Heart size={18} className="group-hover:text-pink-500" />
                      </div>
                      <span>{formatNumber(tweet.favCount)}</span>
                    </div>
                    <div className="flex items-center space-x-1 group hover:text-blue-500">
                      <div className="p-2 rounded-full group-hover:bg-blue-50">
                        <BarChart2 size={18} className="group-hover:text-blue-500" />
                      </div>
                      <span>{formatNumber(tweet.viewCount)}</span>
                    </div>
                    {tweet.hateScore > 0 && (
                      <div className="flex items-center space-x-1 text-red-500">
                        <div className="p-2 rounded-full hover:bg-red-50">
                          <AlertTriangle size={18} />
                        </div>
                        <span>{tweet.hateScore}</span>
                      </div>
                    )}
                  </div>

                  {/* Hate Speech Warning */}
                  {tweet.isOffensive && (
                    <div className="mt-3 p-3 bg-red-50 rounded-xl border border-red-100">
                      <p className="text-red-700 text-sm font-medium flex items-center">
                        <AlertTriangle size={16} className="mr-2" />
                        Bu tweet nefret söylemi içeriyor olabilir
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {tweets.length === 0 && !isLoading && !error && !isScanning && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
              <div className="text-gray-500">
                Henüz tweet görüntülenmedi. Bir kullanıcı adı girin ve aramaya başlayın.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;