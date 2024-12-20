import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

(async () => {
  try {
    await prisma.project.create({
      data: {
        name: "test_01",
        createAt: 1,
        updateAt: 1,
        vertices: {
          create: [{ x: 1.0, y: 2.0, z: 3.0 }],
        },
        elements: {
          create: [{ type: "tri" }],
        },
      },
    });
    console.log("Sample project added");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await prisma.$disconnect();
  }
})();
