import prisma from '../../database/client';

export default async () => {
  try {
    await prisma.$transaction([
      prisma.artwork.deleteMany({}),
      prisma.origins_artwork.deleteMany({}),
      prisma.movement.deleteMany({}),
      prisma.artist.deleteMany({}),
      prisma.origin_movement.deleteMany({}),
      prisma.fav.deleteMany({}),
      prisma.user.deleteMany({}),
    ]);
  } catch (error) {
    return error;
  }
};
