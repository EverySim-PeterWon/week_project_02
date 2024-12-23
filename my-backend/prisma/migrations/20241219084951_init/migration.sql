-- CreateTable
CREATE TABLE "Project" (
    "id" INTEGER NOT NULL,
    "name" CHAR(1),
    "createdate" INTEGER NOT NULL,
    "updatedate" INTEGER,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Element" (
    "eid" INTEGER NOT NULL,
    "projectid" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,

    CONSTRAINT "Element_pkey" PRIMARY KEY ("projectid","eid")
);

-- CreateTable
CREATE TABLE "Vertices" (
    "pid" INTEGER NOT NULL,
    "projectid" INTEGER NOT NULL,
    "x" DOUBLE PRECISION,
    "y" DOUBLE PRECISION,
    "z" DOUBLE PRECISION,

    CONSTRAINT "Vertices_pkey" PRIMARY KEY ("projectid","pid")
);

-- CreateTable
CREATE TABLE "Tri" (
    "projectid" INTEGER NOT NULL,
    "eid" INTEGER NOT NULL,
    "v0" INTEGER NOT NULL,
    "v1" INTEGER NOT NULL,
    "v2" INTEGER NOT NULL,

    CONSTRAINT "Tri_pkey" PRIMARY KEY ("projectid","eid")
);

-- CreateTable
CREATE TABLE "Quad" (
    "projectid" INTEGER NOT NULL,
    "eid" INTEGER NOT NULL,
    "v0" INTEGER,
    "v1" INTEGER,
    "v2" INTEGER,
    "v3" INTEGER,

    CONSTRAINT "Quad_pkey" PRIMARY KEY ("projectid","eid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_id_key" ON "Project"("id");

-- AddForeignKey
ALTER TABLE "Element" ADD CONSTRAINT "Element_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vertices" ADD CONSTRAINT "Vertices_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tri" ADD CONSTRAINT "Tri_projectid_eid_fkey" FOREIGN KEY ("projectid", "eid") REFERENCES "Element"("projectid", "eid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tri" ADD CONSTRAINT "Tri_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tri" ADD CONSTRAINT "Tri_projectid_v0_fkey" FOREIGN KEY ("projectid", "v0") REFERENCES "Vertices"("projectid", "pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tri" ADD CONSTRAINT "Tri_projectid_v1_fkey" FOREIGN KEY ("projectid", "v1") REFERENCES "Vertices"("projectid", "pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tri" ADD CONSTRAINT "Tri_projectid_v2_fkey" FOREIGN KEY ("projectid", "v2") REFERENCES "Vertices"("projectid", "pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quad" ADD CONSTRAINT "Quad_projectid_eid_fkey" FOREIGN KEY ("projectid", "eid") REFERENCES "Element"("projectid", "eid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quad" ADD CONSTRAINT "Quad_projectid_fkey" FOREIGN KEY ("projectid") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quad" ADD CONSTRAINT "Quad_projectid_v0_fkey" FOREIGN KEY ("projectid", "v0") REFERENCES "Vertices"("projectid", "pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quad" ADD CONSTRAINT "Quad_projectid_v1_fkey" FOREIGN KEY ("projectid", "v1") REFERENCES "Vertices"("projectid", "pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quad" ADD CONSTRAINT "Quad_projectid_v2_fkey" FOREIGN KEY ("projectid", "v2") REFERENCES "Vertices"("projectid", "pid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quad" ADD CONSTRAINT "Quad_projectid_v3_fkey" FOREIGN KEY ("projectid", "v3") REFERENCES "Vertices"("projectid", "pid") ON DELETE RESTRICT ON UPDATE CASCADE;
