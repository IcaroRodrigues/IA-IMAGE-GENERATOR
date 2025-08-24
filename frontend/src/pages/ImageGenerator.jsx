import { useState } from 'react';
import { Modal } from '../components/Modal';
import { Input } from '../components/Input';
import Button from '../components/Button';
import { COLORS, RESOLUTION_OPTIONS } from '../constants/generateImageOptions';
import { useGenerateImage } from '../hooks/useGenerateImage';
import { GenerateIconSVG } from '../assets/imagegeneratoricon';

export const ImageGenerator = () => {
  const {
    handleSubmitImagePromp,
    openLogginModal,
    setOpenLogginModal,
    selectedResolution,
    setSelectionResolution,
    guidance,
    setGuidance,
    selectedColors,
    toggleColor,
  } = useGenerateImage();

  const [colorsList, setColorsList] = useState(COLORS);
  const [newColor, setNewColor] = useState('#000000'); // cor inicial do picker
  const [openColorPicker, setOpenColorPicker] = useState(false);

  return (
    <div className="grid grid-cols-2 gap-8 mt-5">
      <div className="flex flex-col gap-8">
        <Input label="Prompt" variant="secondary" />
        <Input label="Negative Prompt (Optional)" variant="secondary" />

        <div className="flex flex-col gap-3">
          <h4 className="text-sm text-gray-300 font-semibold">Cores</h4>
          <div className="grid grid-cols-12 gap-3">
            {colorsList.map((color) => {
              const isSelected = selectedColors.includes(color.value);
              return (
                <button
                  key={color.value}
                  style={{ backgroundColor: color.color }}
                  className={`w-8 h-8 rounded-full ${isSelected ? 'opacity-100' : 'opacity-15'}`}
                  onClick={() => toggleColor(color.value)}
                />
              );
            })}

            <div className="relative">
              <button
                className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center text-white"
                onClick={() => setOpenColorPicker(!openColorPicker)}
              >
                <i className="las la-plus"></i>
              </button>

              {openColorPicker && (
                <div className="absolute top-full right-0 mt-2 bg-gray-800 p-4 rounded shadow-lg flex flex-col gap-2 z-50">
                  <input
                    type="color"
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="w-16 h-16 cursor-pointer"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      className="px-3 py-1 bg-green-500 text-white rounded"
                      onClick={() => {
                        const colorObj = { color: newColor, value: colorsList.length + 1 };
                        setColorsList([...colorsList, colorObj]);
                        toggleColor(colorObj.value); // seleciona a cor
                        setOpenColorPicker(false);
                      }}
                    >
                      Confirmar
                    </button>
                    <button
                      className="px-3 py-1 bg-red-500 text-white rounded"
                      onClick={() => setOpenColorPicker(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h4 className="text-sm text-gray-300 font-semibold">Resolução</h4>
          <div className="grid grid-cols-4 gap-3">
            {RESOLUTION_OPTIONS.map((resolution) => (
              <Button
                key={resolution.value}
                active={selectedResolution === resolution.value}
                onClick={() => setSelectionResolution(resolution.value)}
              >
                <h5 className="text-[12px] text-nowrap">{resolution.label}</h5>
              </Button>
            ))}
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
            <h5>Gerar imagem</h5>
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
