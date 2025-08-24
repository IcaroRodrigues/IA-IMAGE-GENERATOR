function ImageDescription({ imageLabel, imagePrompt }) {
  return (
    <div className="flex flex-col gap-2 ">
      <h1 className="font-semibold text-xs text-gray-300">{imageLabel}</h1>
      <p className="text-gray-50">{imagePrompt}</p>
    </div>
  );
}

export default ImageDescription;
