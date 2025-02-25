const { PrismaClient } = require('@prisma/client');

const client = new PrismaClient();

const postsToCreate = [
    {
        id: 1,
        title: 'First',
        content: 'The first'
    },
    {
        id: 2,
        title: 'Second',
        content: 'Today is Monday'
    },
    {
        id: 3, // เปลี่ยนจาก id: 1 เป็น id: 3 เพื่อไม่ให้ซ้ำ
        title: 'Third',
        content: 'Holiday is good'
    },
    {
        id: 4,
        title: 'Forth',
        content: 'Fine looks good'
    },
    {
        id: 5,
        title: 'Fifth',
        content: 'Everything OK'
    },
];

const seed = async (posts) => {
    console.log('Creating posts ...');

    for (let i = 0; i < posts.length; i++) {
        console.log('Creating Post:', posts[i]);

        await client.Post.upsert({
            where: { id: posts[i].id },
            update: posts[i],
            create: posts[i],
        });
    }
};

seed(postsToCreate)
    .then(() => {
        console.log('Created/Updated Posts Successfully.');
    })
    .catch((error) => {
        console.error('Error:', error);
    })
    .finally(() => {  // แก้ไข syntax ที่ผิด
        client.$disconnect();
        console.log('Disconnected, exiting.');
    });
