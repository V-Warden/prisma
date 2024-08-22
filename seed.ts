import {
  BadServers,
  Imports,
  PrismaClient,
  ServerType,
  Staff,
  Users,
  UserStatus,
  UserType,
} from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const fakeStaff = (): Staff => ({  // Simplified object creation
  id: faker.random.numeric(19),
  role: 'ADMIN',
  appeals: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
});

const createUserTypes = (serverType?: ServerType): UserType[] => {  // Function for user types
  const baseTypes = ['BOT', 'CHEATER', 'LEAKER', 'OTHER', 'OWNER'];
  if (serverType) {
    return baseTypes.filter(
      type =>
        !(type === 'CHEATER' && serverType === 'LEAKING') &&
        !(type === 'LEAKER' && serverType === 'CHEATING') &&
        type !== 'SUPPORTER'
    );
  }
  return baseTypes.filter(type => type !== 'CHEATER' && type !== 'LEAKER' && type !== 'SUPPORTER');
};

const createUser = async (server?: BadServers): Promise<void> => {
  const userTypes = createUserTypes(server?.type);  // Use function for user types
  const userType = faker.helpers.arrayElement(userTypes);
  const userStatus = faker.helpers.arrayElement([
    'APPEALED',
    'BLACKLISTED',
    'PERM_BLACKLISTED',
    'WHITELISTED',
  ]);

  const user: Users = { // Simplified object creation with conditional logic
    id: faker.random.numeric(19),
    last_username: `<span class="math-inline">\{faker\.name\.firstName\(\)\}</span>{faker.name.lastName()}#${faker.random.numeric(4)}`,
    avatar: faker.image.avatar(),
    type: userType,
    status: userStatus,
    appeals: userStatus === 'APPEALED' ? parseInt(faker.random.numeric()) : 0,
    reason: '',
  };

  const importData = {  // Combined import data with conditional logic
    id: user.id,
    serverId: server?.id, // Use optional chaining for server id
    roles: Array(parseInt(faker.random.numeric())).fill(faker.random.word()).join(','),
    type: user.type,
    appealed: userStatus === 'APPEALED',
    reason: faker.lorem.sentence(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  // Use prisma createMany for users and imports in a single transaction
  await prisma.$transaction(async tx => {
    await tx.users.create({ data: user });
    await tx.imports.create({ data: importData });
  });
};

const fakeServers = (staffMember: Staff): BadServers[] => {
  const types: ServerType[] = ['ADVERTISING', 'CHEATING', 'LEAKING', 'OTHER', 'RESELLING'];
  const servers = Array.from({ length: parseInt(faker.random.numeric(3)) }).map(() => ({
    id: faker.random.numeric(19),
    name: faker.random.words(2),
    type: faker.helpers.arrayElement(types),
    oldNames: '',
    addedBy: staffMember.id,
    reason: faker.lorem.sentence(),
    invite: faker.random.alphaNumeric(5),
    createdAt: new Date(),
    updatedAt: new Date(),
  }));
  return servers;
};

async function main() {
  console.log('Cleaning database ');
  await prisma.users.deleteMany({});
  await prisma.staff.deleteMany({});

  console.log('Creating fake staff member and servers ');
  const staffMember = fakeStaff();
  const servers = fakeServers(staffMember);
  await prisma.staff.create({ data: staffMember });
  await prisma.badServers.createMany({ data: servers });
  console.log('Creating fake users and imports ');
  const userCount = parseInt(faker.random.numeric(3));
  for (let i = 0; i < userCount; i++) {
    await createUser(servers[Math.floor(Math.random() * servers.length)]); // Use Math.
