import multer from 'multer';
import path from 'path';

// Configuração do multer para upload de imagens
const storage = multer.memoryStorage(); // Armazena em memória para enviar para S3

const fileFilter = (req: any, file: Express.Multer.File, cb: any) => {
  console.log('Arquivo recebido:', {
    originalname: file.originalname,
    mimetype: file.mimetype,
    fieldname: file.fieldname,
  });

  // Lista de MIME types aceitos
  const allowedMimeTypes = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/bmp',
    'image/tiff',
  ];

  // Verificar por MIME type ou extensão
  const isValidMimeType = allowedMimeTypes.includes(file.mimetype);
  const hasImageExtension = /\.(jpg|jpeg|png|webp|gif|bmp|tiff)$/i.test(file.originalname);

  if (isValidMimeType || hasImageExtension) {
    cb(null, true);
  } else {
    console.log('Arquivo rejeitado:', file.mimetype, file.originalname);
    cb(new Error(`Apenas arquivos de imagem são permitidos! Recebido: ${file.mimetype}`), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB máximo
  },
});

export default upload;
