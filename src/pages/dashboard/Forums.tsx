import { MessageSquare, Search } from "lucide-react";
import Input from "../../components/ui/Input";
import { useState } from "react";

const Forums = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      {/* Header */}
      <div className="flex items-center gap-4 mb-8 animate-fade-in-up">
        <div className="p-3 rounded-xl bg-primary/10 text-primary shadow-glow">
          <MessageSquare className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white">Community Forums</h1>
          <p className="text-gray-400 mt-1">
            Connect with fellow movie enthusiasts
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-8">
        <Input
          type="search"
          placeholder="Search the community..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="h-4 w-4" />}
          className="max-w-2xl mx-auto"
        />
      </div>

      {/* Forum Categories */}
      <div className="grid gap-6 max-w-4xl mx-auto">
        <div className="glass p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all cursor-pointer group">
          <h2 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
            General Discussion
          </h2>
          <p className="text-gray-400">
            Talk about anything and everything in this board.
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span>1,234 topics</span>
            <span>•</span>
            <span>5,678 posts</span>
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all cursor-pointer group">
          <h2 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
            Movie Discussions
          </h2>
          <p className="text-gray-400">
            Talk about movies in this board. Share your thoughts on the latest
            movies.
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span>3,456 topics</span>
            <span>•</span>
            <span>12,345 posts</span>
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10 hover:border-primary/50 transition-all cursor-pointer group">
          <h2 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">
            TV Show Discussions
          </h2>
          <p className="text-gray-400">
            Talk about TV Shows in this board. Share your thoughts on the latest
            TV Shows.
          </p>
          <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
            <span>2,345 topics</span>
            <span>•</span>
            <span>8,901 posts</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forums;
