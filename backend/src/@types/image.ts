import { User } from '../entities/User';

export interface Image {
  imageUrl: string;
  downloadUrl?: string;
  promptDetails: string;
  negativePrompt?: string;
  inputResolution: string;
  seed: string;
  createdAt?: Date;
  creator: User;
}
