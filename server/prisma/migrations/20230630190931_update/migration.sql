/*
  Warnings:

  - You are about to drop the column `image` on the `Streamer` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Streamer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "upvotes" INTEGER NOT NULL,
    "downvotes" INTEGER NOT NULL
);
INSERT INTO "new_Streamer" ("description", "downvotes", "id", "name", "platform", "upvotes") SELECT "description", "downvotes", "id", "name", "platform", "upvotes" FROM "Streamer";
DROP TABLE "Streamer";
ALTER TABLE "new_Streamer" RENAME TO "Streamer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
