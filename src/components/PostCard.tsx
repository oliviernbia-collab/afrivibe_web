import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faComment, faGift, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';
import { feedApi } from '../api/feed';
import { FeedPost } from '../types/models';

interface PostCardProps {
  post: FeedPost;
  onOpenSupport: (post: FeedPost) => void;
}

export function PostCard({ post, onOpenSupport }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likesCount);

  const toggleLike = async () => {
    try {
      if (liked) {
        setLiked(false);
        setLikesCount((c) => c - 1);
        await feedApi.unlike(post.id);
      } else {
        setLiked(true);
        setLikesCount((c) => c + 1);
        await feedApi.like(post.id);
      }
    } catch {
      setLiked((v) => !v);
    }
  };

  const media = post.media?.[0];

  return (
    <article className="mb-5 rounded-2xl border border-border bg-surface p-5">
      {post.isBoosted && (
        <span className="mb-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[10px] font-extrabold text-black">
          <FontAwesomeIcon icon={faBolt} /> SPONSORISÉ
        </span>
      )}

      {post.text && <p className="mb-3 whitespace-pre-wrap text-sm leading-relaxed text-text-primary">{post.text}</p>}

      {media && (
        <div className="mb-4 overflow-hidden rounded-xl">
          <img src={media.thumbnailUrl ?? media.url} alt="" className="max-h-96 w-full object-cover" />
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border pt-3 text-sm">
        <button onClick={toggleLike} className={`flex items-center gap-2 font-semibold ${liked ? 'text-accent-pink' : 'text-text-secondary'}`}>
          <FontAwesomeIcon icon={liked ? faHeart : faHeartRegular} /> {likesCount}
        </button>
        <button className="flex items-center gap-2 font-semibold text-text-secondary">
          <FontAwesomeIcon icon={faComment} /> {post.commentsCount}
        </button>
        <button onClick={() => feedApi.share(post.id, 'afrivibe')} className="flex items-center gap-2 font-semibold text-text-secondary">
          <FontAwesomeIcon icon={faShare} /> {post.sharesCount}
        </button>
        <button onClick={() => onOpenSupport(post)} className="flex items-center gap-2 rounded-full bg-primary/20 px-4 py-1.5 font-bold text-primary">
          <FontAwesomeIcon icon={faGift} /> Soutenir
        </button>
      </div>
    </article>
  );
}
