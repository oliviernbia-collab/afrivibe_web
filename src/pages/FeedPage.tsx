import { useCallback, useEffect, useState } from 'react';
import { Composer } from '../components/Composer';
import { PostCard } from '../components/PostCard';
import { GiftModal } from '../components/GiftModal';
import { feedApi } from '../api/feed';
import { FeedPost } from '../types/models';

const TABS = ['Pour toi', 'Abonnements', "Fil d'actualité"] as const;

export function FeedPage() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>("Fil d'actualité");
  const [supportTarget, setSupportTarget] = useState<FeedPost | null>(null);

  const load = useCallback(() => {
    feedApi
      .list()
      .then(setPosts)
      .catch(() => setPosts([]));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="mx-auto max-w-2xl px-6 py-6">
      <div className="mb-6 flex gap-6 border-b border-border">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-sm font-bold ${
              activeTab === tab ? 'border-b-2 border-primary text-primary' : 'text-text-muted'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <Composer onPublished={load} />

      {posts.length === 0 ? (
        <p className="py-16 text-center text-sm text-text-muted">
          Aucune publication pour l'instant. Soyez le premier à créer du contenu !
        </p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} onOpenSupport={setSupportTarget} />)
      )}

      <GiftModal
        open={!!supportTarget}
        onClose={() => setSupportTarget(null)}
        context="feed"
        postId={supportTarget?.id}
      />
    </div>
  );
}
