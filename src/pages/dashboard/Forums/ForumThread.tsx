import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowUp,
  MessageCircle,
  Share2,
  Flag,
  Eye,
  EyeOff,
  Send,
  Film,
  Calendar,
  Star,
} from "lucide-react";
import Button from "../../../components/ui/Button";

// Mock data
const MOCK_THREAD = {
  id: "1",
  title: "Dune: Part Two - Visual Masterpiece or Overrated?",
  movieId: 693134,
  movieTitle: "Dune: Part Two",
  moviePoster: "/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
  movieYear: "2024",
  movieRating: 8.4,
  author: "CinemaFan92",
  authorAvatar: null,
  content: `Just watched Dune: Part Two and I'm completely blown away. The cinematography is absolutely stunning - every frame could be a painting. 

Denis Villeneuve has truly outdone himself with this sequel. The way he handles the scale and scope is incredible.

**SPOILER BELOW**

||The scene where Paul rides the sandworm for the first time is probably one of the most epic moments in cinema history. The sound design alone gave me chills.||

What did everyone else think? Am I overhyping it?`,
  category: "Latest Releases",
  hasSpoilers: true,
  upvotes: 342,
  upvotedBy: [],
  views: 1247,
  createdAt: "2024-03-15T10:30:00Z",
  replies: [
    {
      id: "r1",
      author: "NolanFanatic",
      authorAvatar: null,
      content:
        "Completely agree! The visual effects team deserves all the awards. This is how you make a sci-fi epic.",
      hasSpoilers: false,
      upvotes: 89,
      upvotedBy: [],
      createdAt: "2024-03-15T11:15:00Z",
    },
    {
      id: "r2",
      author: "SkepticalViewer",
      authorAvatar: null,
      content: `I respect the craftsmanship, but I found the pacing a bit slow in the middle. 

||Also, I wish they had spent more time with Chani's character development before the ending.||`,
      hasSpoilers: true,
      upvotes: 23,
      upvotedBy: [],
      createdAt: "2024-03-15T12:00:00Z",
    },
  ],
};

const ForumThread = () => {
  // const { id } = useParams(); // Will be used when connecting to real API
  const navigate = useNavigate();
  const [thread] = useState(MOCK_THREAD);
  const [replyContent, setReplyContent] = useState("");
  const [hasSpoilers, setHasSpoilers] = useState(false);
  const [revealedSpoilers, setRevealedSpoilers] = useState<Set<string>>(
    new Set()
  );

  const toggleSpoiler = (id: string) => {
    setRevealedSpoilers((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const renderContent = (content: string, postId: string) => {
    // Parse spoiler syntax ||text||
    const parts = content.split(/(\|\|.*?\|\|)/g);

    return parts.map((part, index) => {
      if (part.startsWith("||") && part.endsWith("||")) {
        const spoilerText = part.slice(2, -2);
        const isRevealed = revealedSpoilers.has(`${postId}-${index}`);

        return (
          <button
            key={index}
            onClick={() => toggleSpoiler(`${postId}-${index}`)}
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-md transition-all ${
              isRevealed
                ? "bg-red-500/20 text-white"
                : "bg-gray-800 text-transparent hover:text-gray-500 cursor-pointer"
            }`}
          >
            {!isRevealed && <EyeOff className="h-3 w-3 text-red-400" />}
            <span className={!isRevealed ? "select-none" : ""}>
              {spoilerText}
            </span>
            {!isRevealed && (
              <span className="text-red-400 text-xs">Click to reveal</span>
            )}
          </button>
        );
      }

      // Handle markdown-style bold
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      return boldParts.map((boldPart, boldIndex) => {
        if (boldPart.startsWith("**") && boldPart.endsWith("**")) {
          return (
            <strong key={`${index}-${boldIndex}`}>
              {boldPart.slice(2, -2)}
            </strong>
          );
        }
        return <span key={`${index}-${boldIndex}`}>{boldPart}</span>;
      });
    });
  };

  const handleSubmitReply = () => {
    if (!replyContent.trim()) return;

    // Here you would submit to your backend
    console.log("Submitting reply:", { content: replyContent, hasSpoilers });
    setReplyContent("");
    setHasSpoilers(false);
  };

  return (
    <div className="min-h-screen bg-background text-white pb-20">
      {/* Back Button */}
      <div className="mb-6 animate-fade-in-up">
        <Button
          variant="ghost"
          onClick={() => navigate("/dashboard/forums")}
          icon={<ArrowLeft className="h-4 w-4" />}
          className="text-gray-400 hover:text-white"
        >
          Back to Forums
        </Button>
      </div>

      {/* Movie Context Card */}
      <div
        className="mb-8 p-6 rounded-xl bg-gradient-to-r from-primary/10 to-cyan-700/10 border border-primary/20 animate-fade-in-up"
        style={{ animationDelay: "100ms" }}
      >
        <div className="flex gap-6">
          <div className="flex-shrink-0 hidden sm:block">
            <div className="w-32 h-48 rounded-lg overflow-hidden shadow-glow">
              <img
                src={`https://image.tmdb.org/t/p/w300${thread.moviePoster}`}
                alt={thread.movieTitle}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {thread.movieTitle}
                </h2>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {thread.movieYear}
                  </span>
                  <span className="flex items-center gap-1 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    {thread.movieRating}/10
                  </span>
                </div>
              </div>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate(`/movies/${thread.movieId}`)}
                icon={<Film className="h-4 w-4" />}
              >
                View Movie
              </Button>
            </div>
            <p className="text-gray-400 text-sm">
              Discussing:{" "}
              <span className="text-white font-semibold">{thread.title}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Original Post */}
      <div
        className="mb-8 animate-fade-in-up"
        style={{ animationDelay: "200ms" }}
      >
        <div className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-cyan-700 flex items-center justify-center text-white font-bold text-lg">
                {thread.author[0]}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-bold text-white">{thread.author}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(thread.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
                {thread.hasSpoilers && (
                  <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center gap-1">
                    <EyeOff className="h-3 w-3" />
                    Contains Spoilers
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-bold text-white mb-4">
                {thread.title}
              </h1>
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {renderContent(thread.content, "main")}
              </div>
            </div>
          </div>

          {/* Post Actions */}
          <div className="flex items-center gap-6 pt-4 border-t border-white/10">
            <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
              <ArrowUp className="h-5 w-5" />
              <span className="font-medium">{thread.upvotes}</span>
            </button>
            <span className="flex items-center gap-2 text-gray-400">
              <MessageCircle className="h-5 w-5" />
              <span>{thread.replies.length} replies</span>
            </span>
            <span className="flex items-center gap-2 text-gray-400">
              <Eye className="h-5 w-5" />
              <span>{thread.views} views</span>
            </span>
            <button className="ml-auto flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
            <button className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors">
              <Flag className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Replies */}
      <div className="space-y-4 mb-8">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          {thread.replies.length} Replies
        </h3>

        {thread.replies.map((reply, index) => (
          <div
            key={reply.id}
            className="p-6 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in-up ml-8"
            style={{ animationDelay: `${(index + 3) * 50}ms` }}
          >
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold">
                  {reply.author[0]}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-white">{reply.author}</span>
                  <span className="text-gray-500 text-sm">
                    {new Date(reply.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {reply.hasSpoilers && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-xs flex items-center gap-1">
                      <EyeOff className="h-3 w-3" />
                      Spoilers
                    </span>
                  )}
                </div>
                <div className="text-gray-300 leading-relaxed whitespace-pre-wrap mb-3">
                  {renderContent(reply.content, reply.id)}
                </div>
                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors text-sm">
                    <ArrowUp className="h-4 w-4" />
                    <span className="font-medium">{reply.upvotes}</span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reply Input */}
      <div className="sticky bottom-0 bg-background/95 backdrop-blur-md border-t border-white/10 p-6 -mx-6 animate-fade-in-up">
        <div className="max-w-4xl mx-auto">
          <h4 className="text-lg font-bold text-white mb-4">Add Your Reply</h4>
          <div className="space-y-4">
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Share your thoughts... Use ||text|| to hide spoilers"
              className="w-full min-h-[120px] px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasSpoilers}
                  onChange={(e) => setHasSpoilers(e.target.checked)}
                  className="w-4 h-4 rounded border-white/20 bg-white/5 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-400 flex items-center gap-1">
                  <EyeOff className="h-4 w-4" />
                  This reply contains spoilers
                </span>
              </label>
              <Button
                variant="primary"
                onClick={handleSubmitReply}
                disabled={!replyContent.trim()}
                icon={<Send className="h-4 w-4" />}
              >
                Post Reply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumThread;
