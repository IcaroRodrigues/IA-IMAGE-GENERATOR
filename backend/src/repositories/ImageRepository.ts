import { AppDataSource } from '../data-source';
import { Image } from '../entities/Image';

export class ImageRepository {
  private repository = AppDataSource.getRepository(Image);

  async create(data: Partial<Image>): Promise<Image> {
    const image = this.repository.create(data);
    return await this.repository.save(image);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    images: Image[];
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }> {
    const [images, total] = await this.repository.findAndCount({
      relations: ['creator', 'likedBy'],
      select: {
        creator: { id: true, username: true },
        likedBy: { id: true, username: true },
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      images,
      total,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  async findByUserId(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    images: Image[];
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }> {
    const [images, total] = await this.repository.findAndCount({
      where: { creator: { id: userId } },
      relations: ['creator', 'likedBy'],
      select: {
        creator: { id: true, username: true },
        likedBy: { id: true, username: true },
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      images,
      total,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  async findLikedByUserId(
    userId: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    images: Image[];
    total: number;
    page: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  }> {
    const [images, total] = await this.repository.findAndCount({
      where: { likedBy: { id: userId } },
      relations: ['creator', 'likedBy'],
      select: {
        creator: { id: true, username: true },
        likedBy: { id: true, username: true },
      },
      order: {
        createdAt: 'DESC',
      },
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      images,
      total,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    };
  }

  async findById(id: string): Promise<Image | null> {
    return await this.repository.findOne({ where: { id } });
  }

  async deleteById(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }
}
