import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';

const prisma = new PrismaClient();

// Array of timestamp ranges
const timestampRanges = [
  ...Array(10).fill(dayjs().subtract(2, 'day')),
  ...Array(15).fill(dayjs().subtract(1, 'day')),
  ...Array(12).fill(dayjs()),
];

const activities = timestampRanges.map((timestamp) => ({
  userId: faker.database.mongodbObjectId(),
  event: faker.helpers.arrayElement(['SIGNUP', 'SIGNIN', 'PURCHASE']),
  metadata: {
    email: faker.internet.email(),
    username: faker.person.fullName(),
    signupSource: faker.helpers.arrayElement(['web', 'mobile', 'referral']),
  },
  timestamp: timestamp.toISOString(),
}));

const seed = async () => {
  const t0 = performance.now();
  console.log(`DB Seed: started ...`);

  await prisma.userActivity.deleteMany();

  await prisma.userActivity.createMany({
    data: activities,
  });

  const t1 = performance.now();
  console.log(`DB Seed: Finished ${t1 - t0}ms`);
};

seed();
