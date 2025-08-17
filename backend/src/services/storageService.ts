import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

// Serviço de storage - local para desenvolvimento, S3 para produção
export class StorageService {
  private uploadsDir = path.join(process.cwd(), 'uploads');

  constructor() {
    // Criar pasta uploads se não existir
    if (!fs.existsSync(this.uploadsDir)) {
      fs.mkdirSync(this.uploadsDir, { recursive: true });
    }
  }

  async uploadImage(file: Express.Multer.File): Promise<{
    imageUrl: string;
    downloadUrl: string;
    fileName: string;
  }> {
    // Gerar nome único para o arquivo
    const fileName = `${uuidv4()}_${Date.now()}.${this.getFileExtension(file.originalname)}`;
    const filePath = path.join(this.uploadsDir, fileName);

    // Salvar arquivo localmente
    fs.writeFileSync(filePath, file.buffer);

    // URLs locais (acessíveis pelo servidor Express)
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    return {
      imageUrl: `${baseUrl}/uploads/${fileName}`,
      downloadUrl: `${baseUrl}/uploads/${fileName}`,
      fileName,
    };
  }

  async deleteImage(fileName: string): Promise<void> {
    const filePath = path.join(this.uploadsDir, fileName);
    fs.unlinkSync(filePath);
  }

  private async simulateUpload(): Promise<void> {
    // Simular delay do upload (500ms - 2s)
    await new Promise((resolve) => setTimeout(resolve, Math.random() * 1500 + 500));
  }

  private getFileExtension(filename: string): string {
    return filename.split('.').pop() || 'jpg';
  }

  // Em produção, você implementaria:
  // - Upload real para S3 usando AWS SDK
  // - Compressão/otimização da imagem
  // - Geração de thumbnails
  // - Validação adicional de segurança
}
