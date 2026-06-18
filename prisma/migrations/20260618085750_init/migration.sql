-- CreateTable
CREATE TABLE "Artist" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "website" TEXT NOT NULL,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Character" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "illustrationId" TEXT NOT NULL,
    "x_start_px" INTEGER NOT NULL,
    "y_start_px" INTEGER NOT NULL,
    "x_end_px" INTEGER NOT NULL,
    "y_end_px" INTEGER NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Illustration" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "width_px" INTEGER NOT NULL,
    "height_px" INTEGER NOT NULL,
    "resource_url" TEXT NOT NULL,

    CONSTRAINT "Illustration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Record" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ArtistToIllustration" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ArtistToIllustration_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Record_playerId_key" ON "Record"("playerId");

-- CreateIndex
CREATE INDEX "_ArtistToIllustration_B_index" ON "_ArtistToIllustration"("B");

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_illustrationId_fkey" FOREIGN KEY ("illustrationId") REFERENCES "Illustration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToIllustration" ADD CONSTRAINT "_ArtistToIllustration_A_fkey" FOREIGN KEY ("A") REFERENCES "Artist"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArtistToIllustration" ADD CONSTRAINT "_ArtistToIllustration_B_fkey" FOREIGN KEY ("B") REFERENCES "Illustration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
