import { useState, useEffect, useMemo } from 'react';
import { Input } from '../components/Input';

import { initials } from '@dicebear/collection';
import { ImagePreview } from '../components/ImagePreview';
import { useLoggedUser } from '../hooks/useLoggedUser';
import ImageDescription from '../components/ImageDescription';

export const History = () => {
  const { userIsLogged, user } = useLoggedUser();
  const [imageKeyWord, setImageKeyWord] = useState('');
  const [displayedImages, setDisplayedImages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 8;
  const userId = user?.id ?? 1;

  const generateImage = (id, width = 300) => {
    const minHeight = 120;
    const maxHeight = 500;
    const seed = id * 17 + 123;
    const randomHeight =
      minHeight + (((seed * 9301 + 49297) % 233280) / 233280) * (maxHeight - minHeight);
    const height = Math.floor(randomHeight);
    return `https://picsum.photos/id/${id}/${width}/${height}`;
  };

  const allUserImageIds = useMemo(() => {
    return Array.from({ length: 5 }, (_, i) => ((userId * 73 + i) % 1000) + 1);
  }, [userId]);

  const filteredImageIds = useMemo(() => {
    if (!imageKeyWord?.trim()) return allUserImageIds;

    const kw = imageKeyWord.toLowerCase();
    if (kw.includes('par')) return allUserImageIds.filter((id) => id % 2 === 0);
    if (kw.includes('ímpar') || kw.includes('impar'))
      return allUserImageIds.filter((id) => id % 2 !== 0);
    return allUserImageIds;
  }, [allUserImageIds, imageKeyWord]);

  const loadMoreImages = () => {
    if (!hasMore) return;

    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const pageSlice = filteredImageIds.slice(startIndex, endIndex);

    if (pageSlice.length > 0) {
      setDisplayedImages((prev) => [...prev, ...pageSlice]);
      setCurrentPage((prev) => prev + 1);
      if (endIndex >= filteredImageIds.length) setHasMore(false);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    setDisplayedImages([]);
    setCurrentPage(0);
    setHasMore(true);
  }, [filteredImageIds]);

  useEffect(() => {
    if (displayedImages.length === 0 && filteredImageIds.length > 0) {
      loadMoreImages();
    }
  }, [filteredImageIds]);

  useEffect(() => {
    const handleScroll = () => {
      if (loading || !hasMore) return;
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        setLoading(true);
        setTimeout(() => {
          loadMoreImages();
          setLoading(false);
        }, 400);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, loading, hasMore, filteredImageIds]);

  const infoList = [
    {
      label: 'Prompt details',
      value:
        'Lorem  culpa voluptatibus voluptates ea delectus minima.Lorem  culpa voluptatibus voluptates ea delectus minima.Lorem  culpa voluptatibus voluptates ea delectus minima.Lorem  culpa voluptatibus voluptates ea delectus minima.Lorem  culpa voluptatibus voluptates ea delectus minima.Lorem  culpa voluptatibus voluptates ea delectus minima. ',
    },
    {
      label: 'Negative prompt',
      value: 'Null',
    },
    {
      label: 'Created on',
      value: '01/12/2023',
    },
    {
      label: 'Input resolution',
      value: '1024 x 1024 (1:1)',
    },
    {
      label: 'Seed',
      value: '98234532',
    },
  ];

  if (!userIsLogged) {
    return <div className="text-white">Faça login para ver seu histórico de imagens.</div>;
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="text-xl font-semibold">Histórico</div>

      <div className="flex flex-col gap-8">
        {displayedImages.map((imageId) => (
          <div
            key={imageId}
            className="flex flex-col md:flex-row gap-8 border-b border-gray-600 last:border-b-0 pb-6"
          >
            {/* imagem */}
            <ImagePreview generateImage={generateImage} imageId={imageId} />

            {/* informações */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 w-[640px]">
              <ImageDescription
                imageLabel={'prompt'}
                imagePrompt={
                  'adorable OWL, sticker, art deco style adorable OWL, sticker, art deco styleadorable OWL, sticker, art deco style'
                }
              />
              <ImageDescription
                imageLabel={'prompt'}
                imagePrompt={'adorable OWL, sticker, art deco style'}
              />
              <ImageDescription
                imageLabel={'prompt'}
                imagePrompt={'adorable OWL, sticker, art deco style'}
              />
              <ImageDescription
                imageLabel={'prompt'}
                imagePrompt={'adorable OWL, sticker, art deco style'}
              />
              <ImageDescription
                imageLabel={'prompt'}
                imagePrompt={'adorable OWL, sticker, art deco style'}
              />
            </div>
          </div>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center py-4">
          <div className="text-white">Carregando mais imagens...</div>
        </div>
      )}

      {!loading && displayedImages.length === 0 && (
        <div className="text-white">Você ainda não possui imagens.</div>
      )}
    </div>
  );
};

export default History;
