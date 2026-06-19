/*
  Warnings:

  - You are about to drop the `_ArtistToIllustration` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `artistId` to the `Illustration` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_illustrationId_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToIllustration" DROP CONSTRAINT "_ArtistToIllustration_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArtistToIllustration" DROP CONSTRAINT "_ArtistToIllustration_B_fkey";

-- AlterTable
ALTER TABLE "Illustration" ADD COLUMN     "artistId" TEXT NOT NULL;

-- DropTable
DROP TABLE "_ArtistToIllustration";

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_illustrationId_fkey" FOREIGN KEY ("illustrationId") REFERENCES "Illustration"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Illustration" ADD CONSTRAINT "Illustration_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;
