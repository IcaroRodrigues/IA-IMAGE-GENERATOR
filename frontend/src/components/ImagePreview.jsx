import Bookmark from '../assets/bookmark';

export const ImagePreview = ({ generateImage, generateAvatar, username, imageId }) => {
  return (
    <div className="break-inside-avoid mb-6 rounded-lg overflow-hidden">
      <div className="border-4 border-gray-600 rounded-lg">
        <img src={generateImage(imageId)} alt="Generated Image" className="w-full object-cover" />
      </div>

      {generateAvatar && username && (
        <div className="flex align-center justify-between py-3">
          <div className="flex items-center gap-2">
            <img
              src={generateAvatar(username)}
              alt="User Avatar"
              className="w-6 h-6 rounded-full"
            />
            <h6 className="text-sm text-white">{username}</h6>
          </div>

          <div className="bg-purple-300 h-7 w-7 flex items-center justify-center rounded">
            {<Bookmark />}
          </div>
        </div>
      )}
    </div>
  );
};
