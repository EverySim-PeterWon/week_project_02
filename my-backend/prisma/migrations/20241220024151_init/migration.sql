/*
  Warnings:

  - Made the column `x` on table `Vertex` required. This step will fail if there are existing NULL values in that column.
  - Made the column `y` on table `Vertex` required. This step will fail if there are existing NULL values in that column.
  - Made the column `z` on table `Vertex` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Vertex" ALTER COLUMN "x" SET NOT NULL,
ALTER COLUMN "y" SET NOT NULL,
ALTER COLUMN "z" SET NOT NULL;
