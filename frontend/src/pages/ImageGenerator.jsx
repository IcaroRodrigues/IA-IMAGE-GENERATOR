import { useState, useEffect, use } from 'react';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import Button from '../components/Button';
import { useGenerateImage } from '../hooks/useGenerateImage';

import { COLORS, RESOLUTION_OPTIONS } from '../constants/generateImageOptions';
import { GenerateIconSVG } from '../assets/imagegeneratoricon';

export const ImageGenerator = () => {
  const [selectedResolution, setSelectionResolution] = useState(null);
  const [guidance, setGuidance] = useState(5); // valor inicial (5.0)
  const { handleSubmitImagePromp, openLogginModal, setOpenLogginModal } = useGenerateImage();

  return (
    <div className="grid grid-cols-2 gap-8 mt-5">
      <div className="flex flex-col gap-8">
        <Input label="Prompt" variant="secondary" />

        <Input label="Negative Prompt (Optional)" variant="secondary" />

        <div className="flex flex-col gap-3">
          <h4 className="text-sm">Colors</h4>

          <div className="grid grid-cols-12 gap-3">
            {COLORS.map((color) => {
              return (
                <button
                  key={color.value}
                  style={{ backgroundColor: color.color }}
                  className={`w-8 h-8 rounded-full`}
                />
              );
            })}

            <button className="flex items-center justify-center w-8 h-8 bg-blue-300 border-2 border-gray-300 rounded-full">
              <i class="las la-times text-sm text-gray-300 font-semibold"></i>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-sm">Resolution</h4>

          <div className="grid grid-cols-4 gap-3">
            {RESOLUTION_OPTIONS.map((resolution) => {
              return (
                <Button
                  key={resolution.value}
                  active={selectedResolution === resolution.value}
                  onClick={() => setSelectionResolution(resolution.value)}
                >
                  <h5 className="text-[12px] text-nowrap">{resolution.label}</h5>
                </Button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col gap-3 w-full">
          <label className="text-sm font-semibold text-gray-300">
            Guidance <span className="font-semibold">({guidance.toFixed(1)})</span>
          </label>

          <input
            type="range"
            min="1"
            max="20"
            step="0.5"
            value={guidance}
            onChange={(e) => setGuidance(Number(e.target.value))}
            className="range-slider w-full"
          />
        </div>

        <Button active className="py-3 rounded-xl" onClick={() => handleSubmitImagePromp(null)}>
          <div className="flex flex-row items-center gap-2">
            <GenerateIconSVG />
            <h5>Generate Image</h5>
          </div>
        </Button>
      </div>

      <div className="h-[511px] border-4 border-gray-600 rounded-lg">
        <h1 className="text-3xl text-white">ImageGenerator</h1>
      </div>

      <Modal isOpen={openLogginModal} onClose={() => setOpenLogginModal(false)}>
        <h2>precisa logar doidao</h2>
      </Modal>
    </div>
  );
};
