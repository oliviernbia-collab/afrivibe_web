import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faImage, faLocationDot, faVideo } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { feedApi } from '../api/feed';
import { useAuthStore } from '../store/auth.store';

export function Composer({ onPublished }: { onPublished: () => void }) {
  const { user } = useAuthStore();
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const publish = async () => {
    if (!text.trim()) return;
    setSubmitting(true);
    try {
      await feedApi.create({ text: text.trim() });
      setText('');
      onPublished();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mb-5 rounded-2xl border border-border bg-surface p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-alt text-sm font-bold text-text-secondary">
          {user?.pseudo?.slice(0, 2).toUpperCase()}
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Quoi de neuf ?"
          rows={2}
          className="w-full resize-none bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        />
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-4 text-text-secondary">
          <FontAwesomeIcon icon={faImage} className="cursor-pointer hover:text-primary" />
          <FontAwesomeIcon icon={faVideo} className="cursor-pointer hover:text-primary" />
          <FontAwesomeIcon icon={faHashtag} className="cursor-pointer hover:text-primary" />
          <FontAwesomeIcon icon={faLocationDot} className="cursor-pointer hover:text-primary" />
        </div>
        <button
          onClick={publish}
          disabled={submitting || !text.trim()}
          className="rounded-xl bg-primary px-5 py-2 text-sm font-bold text-black disabled:opacity-50"
        >
          Publier
        </button>
      </div>
    </div>
  );
}
