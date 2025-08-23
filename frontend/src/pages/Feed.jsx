import { useState, useEffect } from 'react';
import { Input } from '../components/Input';
import { createAvatar } from '@dicebear/core';
import { initials } from '@dicebear/collection';
import { ImagePreview } from '../components/ImagePreview';
import { mockUsers } from '../data/mockUsers';

export const Feed = () => {
  const [imageKeyWord, setImageKeyWord] = useState('');
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 8;

  const generateAvatar = (name) => {
    const avatar = createAvatar(initials, {
      seed: name,
      size: 24,
      backgroundColor: ['7C71FF', '28A745', 'FFC107', 'EA5455'],
    });
    return avatar.toDataUri();
  };

  const generateImage = (id, width = 300) => {
    const minHeight = 120;
    const maxHeight = 500;
    const seed = id * 17 + 123;
    const randomHeight = minHeight + ((seed * 9301 + 49297) % 233280) / 233280 * (maxHeight - minHeight);
    const height = Math.floor(randomHeight);
    return `https://picsum.photos/id/${id}/${width}/${height}`;
  };

  const loadMoreUsers = () => {
    if (!hasMore) return;
    
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newUsers = mockUsers.slice(startIndex, endIndex);
    
    if (newUsers.length > 0) {
      setDisplayedUsers(prev => [...prev, ...newUsers]);
      setCurrentPage(prev => prev + 1);
      
      if (endIndex >= mockUsers.length) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    loadMoreUsers();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;
      
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setLoading(true);
        setTimeout(() => {
          loadMoreUsers();
          setLoading(false);
        }, 500);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, loading, hasMore]);

  return (
    <div className="flex flex-col gap-10">
      <div className="w-col-6">
        <Input
          value={imageKeyWord}
          placeholder="Procure imagens por palavras-chave"
          iconsearch
          setValue={setImageKeyWord}
          onSearch={setImageKeyWord}
          variant="primary"
        />
      </div>

      <div className="columns-1 sm:columns-2 md:columns-3 xl:columns-4 gap-6 space-y-6">
        {displayedUsers.map((user) => (
          <ImagePreview
            key={user.id}
            generateAvatar={generateAvatar}
            username={user.name}
            generateImage={generateImage}
            imageId={user.imageId}
          />
        ))}
      </div>
      
      {loading && (
        <div className="flex justify-center py-4">
          <div className="text-white">Carregando mais imagens...</div>
        </div>
      )}
    </div>
  );
};