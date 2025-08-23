export const ImagePreview = ({ generateImage, generateAvatar, username, imageId }) => {
  return (
    <div className="break-inside-avoid mb-6 rounded-lg overflow-hidden">
      <div className="border-4 border-gray-600 rounded-lg">
        <img src={generateImage(imageId)} alt="Generated Image" className="w-full object-cover" />
      </div>

      <div className="flex align-center justify-between py-3">
        <div className="flex items-center gap-2">
          <img src={generateAvatar(username)} alt="User Avatar" className="w-6 h-6 rounded-full" />
          <h6 className="text-sm text-white">{username}</h6>
        </div>

        {/* <div className="bg-gray-600 px-1.5 py-0.5 rounded">
          <i class="las la-thumbs-up text-lg"></i>
        </div> */}

        <div className="bg-purple-300 px-1.5 py-0 rounded">
          <i class="las la-thumbs-up text-lg"></i>
        </div>
      </div>
    </div>
  );
};
