import { useState, useEffect } from "react";

interface Review {
  id: string;
  movieId: number;
  rating: number;
  text: string;
  date: string;
  userName: string;
}

const RatingsReviews = ({
  movieId,
  movieTitle,
}: {
  movieId: number;
  movieTitle: string;
}) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    const savedReviews = localStorage.getItem(`reviews-${movieId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, [movieId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    const newReview: Review = {
      id: Date.now().toString(),
      movieId,
      rating,
      text: reviewText,
      date: new Date().toLocaleDateString(),
      userName: "User", // Placeholder for authenticated user
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews-${movieId}`, JSON.stringify(updatedReviews));
    setReviewText("");
    setRating(0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Reviews for {movieTitle}
      </h2>

      {/* Rating Input */}
      <form
        onSubmit={handleSubmit}
        className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            Rate this movie:
          </span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-3xl focus:outline-none transition-transform hover:scale-110"
              >
                <span
                  className={
                    star <= (hoverRating || rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                >
                  ★
                </span>
              </button>
            ))}
          </div>
        </div>

        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Write your thoughts..."
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none h-32 mb-4"
        />

        <button
          type="submit"
          disabled={rating === 0}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Post Review
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            No reviews yet. Be the first to share your thoughts!
          </p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-primary flex items-center justify-center text-white font-bold">
                {review.userName[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {review.userName}
                  </h4>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <div className="flex text-yellow-400 text-sm mb-2">
                  {"★".repeat(review.rating)}
                  <span className="text-gray-300">
                    {"★".repeat(5 - review.rating)}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {review.text}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RatingsReviews;
