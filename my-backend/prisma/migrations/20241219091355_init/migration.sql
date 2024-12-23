/*
  Warnings:

  - The primary key for the `Element` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `updatedate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `Quad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tri` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vertices` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updateAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Quad" DROP CONSTRAINT "Quad_projectid_eid_fkey";

-- DropForeignKey
ALTER TABLE "Quad" DROP CONSTRAINT "Quad_projectid_fkey";

-- DropForeignKey
ALTER TABLE "Quad" DROP CONSTRAINT "Quad_projectid_v0_fkey";

-- DropForeignKey
ALTER TABLE "Quad" DROP CONSTRAINT "Quad_projectid_v1_fkey";

-- DropForeignKey
ALTER TABLE "Quad" DROP CONSTRAINT "Quad_projectid_v2_fkey";

-- DropForeignKey
ALTER TABLE "Quad" DROP CONSTRAINT "Quad_projectid_v3_fkey";

-- DropForeignKey
ALTER TABLE "Tri" DROP CONSTRAINT "Tri_projectid_eid_fkey";

-- DropForeignKey
ALTER TABLE "Tri" DROP CONSTRAINT "Tri_projectid_fkey";

-- DropForeignKey
ALTER TABLE "Tri" DROP CONSTRAINT "Tri_projectid_v0_fkey";

-- DropForeignKey
ALTER TABLE "Tri" DROP CONSTRAINT "Tri_projectid_v1_fkey";

-- DropForeignKey
ALTER TABLE "Tri" DROP CONSTRAINT "Tri_projectid_v2_fkey";

-- DropForeignKey
ALTER TABLE "Vertices" DROP CONSTRAINT "Vertices_projectid_fkey";

-- DropIndex
DROP INDEX "Project_id_key";

-- AlterTable
CREATE SEQUENCE element_eid_seq;
ALTER TABLE "Element" DROP CONSTRAINT "Element_pkey",
ALTER COLUMN "eid" SET DEFAULT nextval('element_eid_seq'),
ADD CONSTRAINT "Element_pkey" PRIMARY KEY ("eid");
ALTER SEQUENCE element_eid_seq OWNED BY "Element"."eid";

-- AlterTable
CREATE SEQUENCE project_id_seq;
ALTER TABLE "Project" DROP COLUMN "createdate",
DROP COLUMN "updatedate",
ADD COLUMN     "createAt" INTEGER NOT NULL,
ADD COLUMN     "updateAt" INTEGER NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('project_id_seq'),
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "name" SET DATA TYPE TEXT;
ALTER SEQUENCE project_id_seq OWNED BY "Project"."id";

-- DropTable
DROP TABLE "Quad";

-- DropTable
DROP TABLE "Tri";

-- DropTable
DROP TABLE "Vertices";

-- CreateTable
CREATE TABLE "Vertex" (
    "pid" SERIAL NOT NULL,
    "projectid" INTEGER NOT NULL,
    "x" DOUBLE PRECISION,
    "y" DOUBLE PRECISION,
    "z" DOUBLE PRECISION,

    CONSTRAINT "Vertex_pkey" PRIMARY KEY ("pid")
);

-- CreateTable
CREATE TABLE "_ElementToVertex" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ElementToVertex_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ElementToVertex_B_index" ON "_ElementToVertex"("B");

-- AddForeignKey
ALTER TABLE "Vertex" ADD CONSTRAINT "Vertex_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElementToVertex" ADD CONSTRAINT "_ElementToVertex_A_fkey" FOREIGN KEY ("A") REFERENCES "Element"("eid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ElementToVertex" ADD CONSTRAINT "_ElementToVertex_B_fkey" FOREIGN KEY ("B") REFERENCES "Vertex"("pid") ON DELETE CASCADE ON UPDATE CASCADE;
