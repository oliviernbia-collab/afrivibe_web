import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faCar,
  faChair,
  faEgg,
  faFish,
  faGift,
  faHelicopter,
  faMotorcycle,
  faPaw,
  faPen,
  faSeedling,
  faShoppingBag,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { useEffect, useState } from 'react';
import { giftsApi } from '../api/wallet';
import { GiftCatalogItem } from '../types/models';
import { extractErrorMessage } from '../api/client';

const ICON_MAP: Record<string, IconDefinition> = {
  'fa-solid fa-seedling': faSeedling,
  'fa-solid fa-egg': faEgg,
  'fa-solid fa-fish': faFish,
  'fa-solid fa-bag-shopping': faShoppingBag,
  'fa-solid fa-pen': faPen,
  'fa-solid fa-book': faBook,
  'fa-solid fa-car': faCar,
  'fa-solid fa-chair': faChair,
  'fa-solid fa-motorcycle': faMotorcycle,
  'fa-solid fa-helicopter': faHelicopter,
  'fa-solid fa-paw': faPaw,
};

interface GiftModalProps {
  open: boolean;
  onClose: () => void;
  context: 'feed' | 'vibes' | 'live';
  postId?: string;
  vibeId?: string;
}

export function GiftModal({ open, onClose, context, postId, vibeId }: GiftModalProps) {
  const [gifts, setGifts] = useState<GiftCatalogItem[]>([]);
  const [sendingCode, setSendingCode] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      giftsApi.catalog().then(setGifts).catch(() => setGifts([]));
      setFeedback(null);
    }
  }, [open]);

  if (!open) return null;

  const priceFor = (gift: GiftCatalogItem) =>
    context === 'feed' ? gift.priceFeed : context === 'vibes' ? gift.priceVibes : gift.priceLive;

  const send = async (gift: GiftCatalogItem) => {
    setSendingCode(gift.code);
    setFeedback(null);
    try {
      await giftsApi.send({ giftCode: gift.code, context, postId, vibeId });
      setFeedback(`${gift.name} envoyé avec succès !`);
    } catch (error) {
      setFeedback(extractErrorMessage(error));
    } finally {
      setSendingCode(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-background-elevated p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="flex items-center gap-2 text-lg font-extrabold">
            <FontAwesomeIcon icon={faGift} className="text-primary" /> Soutenir avec un cadeau
          </p>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {feedback && <p className="mb-3 text-sm font-semibold text-accent-green">{feedback}</p>}

        <div className="grid grid-cols-3 gap-3">
          {gifts.map((gift) => (
            <button
              key={gift.id}
              disabled={!!sendingCode}
              onClick={() => send(gift)}
              className="flex flex-col items-center gap-1 rounded-xl border border-border bg-surface p-3 hover:border-primary disabled:opacity-50"
            >
              <FontAwesomeIcon icon={ICON_MAP[gift.icon] ?? faGift} className="text-xl text-primary" />
              <span className="text-xs font-semibold">{gift.name}</span>
              <span className="text-xs font-bold text-primary">{priceFor(gift)} F</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
