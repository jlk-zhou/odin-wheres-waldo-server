/*
  Warnings:

  - You are about to drop the column `image_url` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `x_end_px` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `x_start_px` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `y_end_px` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `y_start_px` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `height_px` on the `Illustration` table. All the data in the column will be lost.
  - You are about to drop the column `resource_url` on the `Illustration` table. All the data in the column will be lost.
  - You are about to drop the column `width_px` on the `Illustration` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Artist` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageUrl` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xEndPx` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `xStartPx` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yEndPx` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yStartPx` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `heightPx` to the `Illustration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resourceUrl` to the `Illustration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail` to the `Illustration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `widthPx` to the `Illustration` table without a default value. This is not possible if the table is not empty.
  - Added the required column `durationMs` to the `Record` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Record" DROP CONSTRAINT "Record_playerId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "image_url",
DROP COLUMN "x_end_px",
DROP COLUMN "x_start_px",
DROP COLUMN "y_end_px",
DROP COLUMN "y_start_px",
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "xEndPx" INTEGER NOT NULL,
ADD COLUMN     "xStartPx" INTEGER NOT NULL,
ADD COLUMN     "yEndPx" INTEGER NOT NULL,
ADD COLUMN     "yStartPx" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Illustration" DROP COLUMN "height_px",
DROP COLUMN "resource_url",
DROP COLUMN "width_px",
ADD COLUMN     "heightPx" INTEGER NOT NULL,
ADD COLUMN     "resourceUrl" TEXT NOT NULL,
ADD COLUMN     "thumbnail" TEXT NOT NULL,
ADD COLUMN     "widthPx" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Record" ADD COLUMN     "durationMs" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Artist_name_key" ON "Artist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Player_name_key" ON "Player"("name");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
