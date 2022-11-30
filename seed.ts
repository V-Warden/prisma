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

const fakeStaff = (): Staff => {
    return {
        id: faker.random.numeric(19),
        role: 'ADMIN',
        appeals: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
    };
};

const createUser = async (server: BadServers): Promise<void> => {
    let userTypes: UserType[] = ['BOT', 'CHEATER', 'LEAKER', 'OTHER', 'OWNER', 'SUPPORTER'];

    if (server?.type === 'CHEATING') userTypes = userTypes.filter(x => x !== 'LEAKER' && x !== 'OTHER');
    else if (server?.type === 'LEAKING') userTypes = userTypes.filter(x => x !== 'CHEATER' && x !== 'OTHER');
    else userTypes = userTypes.filter(x => x !== 'CHEATER' && x !== 'LEAKER' && x !== 'SUPPORTER');

    const id = faker.random.numeric(19);
    const userType = faker.helpers.arrayElement(userTypes);
    const userStatus = faker.helpers.arrayElement<UserStatus>([
        'APPEALED',
        'BLACKLISTED',
        'PERM_BLACKLISTED',
        'WHITELISTED',
    ]);
    const appeals = parseInt(faker.random.numeric());

    const User: Users = {
        id: id,
        last_username: `${faker.name.firstName()}${faker.name.lastName()}#${faker.random.numeric(4)}`,
        avatar: faker.image.avatar(),
        type: userType,
        status: userStatus,
        appeals: userStatus === 'APPEALED' ? appeals : 0,
        reason: '',
    };

    const roles: string[] = [];

    for (let index = 0; index < parseInt(faker.random.numeric()); index++) {
        roles.push(faker.random.word());
    }

    const Import: Imports = {
        id: User.id,
        server: server.id,
        roles: roles.join(','),
        type: User.type,
        appealed: User.status === 'APPEALED' ? true : false,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    await prisma.users.create({
        data: User,
    });

    await prisma.imports.create({ data: Import });
};

const fakeServers = (staffMember: Staff): BadServers[] => {
    const badServers: BadServers[] = [];
    const types: ServerType[] = ['ADVERTISING', 'CHEATING', 'LEAKING', 'OTHER', 'RESELLING'];
    for (let index = 0; index < parseInt(faker.random.numeric(3)); index++) {
        badServers.push({
            id: faker.random.numeric(19),
            name: faker.random.words(2),
            type: faker.helpers.arrayElement(types),
            oldNames: '',
            addedBy: staffMember.id,
            reason: faker.lorem.sentence(),
            invite: faker.random.alphaNumeric(5),
            createdAt: new Date(),
            updatedAt: new Date(),
        });
    }

    return badServers;
};

async function main() {
    console.log('Cleaning database 🧹');
    await prisma.users.deleteMany({});
    await prisma.staff.deleteMany({});

    console.log('Creating fake staff member and servers 🚀');
    const staffMember = fakeStaff();
    const servers = fakeServers(staffMember);
    await prisma.staff.create({ data: staffMember });
    await prisma.badServers.createMany({ data: servers });
    console.log('Creating fake users and imports 🚀');
    for (let index = 0; index < parseInt(faker.random.numeric(3)); index++) {
        await createUser(servers[faker.datatype.number({ min: 0, max: servers.length - 1 })]);
    }
    console.log('Successfully completed seeding ✅');
}

main()
    .catch(async e => {
        console.log(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
