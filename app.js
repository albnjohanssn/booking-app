const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const addData = async () => {
  const data = await prisma.resource.create({
    data: {
      id: '2',
      name: 'meeting 2',
    },
  });
};

addData();
