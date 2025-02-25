import { Elysia, t } from 'elysia';
import { createPost, deletePost, getPost, getPosts, updatePost } from './handlers';

const postsRoutes = new Elysia({
    prefix: '/posts',
})
    .get('/', () => getPosts())

    .get('/:id', ({ params: { id } }) => getPost(id), {
        params: t.Object({
            id: t.Number(),
        }),
    })

    .post('/', async ({ body }) => {
        console.log("Received body:", body); // debug body
        const post = await createPost(body);  // ตรวจสอบว่า createPost ถูกเรียกใช้งาน
        return post;
    }, {
        body: t.Object({
            title: t.String({
                minLength: 3,
                maxLength: 50,
            }),
            content: t.String({
                minLength: 3,
                maxLength: 500,
            }),
        }),
    })
    
    
    

    .patch('/:id', ({ params: { id }, body }) => updatePost(id, body), {
        params: t.Object({
            id: t.Numeric(),
        }),
        body: t.Object({
            title: t.Optional(t.String({
                minLength: 3,
                maxLength: 50,
            })),
            content: t.Optional(t.String({
                minLength: 3,
                maxLength: 500,
            })),
        }, { minProperties: 1 }),
    })

    .delete('/:id', ({ params: { id } }) => deletePost(id), {
        params: t.Object({
            id: t.Numeric(),
        }),
    });

export default postsRoutes;
