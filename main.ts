import fastify from "fastify";
import fastifyStatic from 'fastify-static';
import fastifyBasicAuth from 'fastify-basic-auth';
import * as path from "path";

const port = Number(process.env.PORT) || 5003;
const server = fastify();

server.register(fastifyStatic, {
    root: path.join(__dirname, 'admin', 'public'),
    prefix: '/admin/public/',
});
server.register(fastifyBasicAuth, {
    validate: (username, password, req, reply, done) => {
        if (username === 'fastifydemo' && password === 'fastifydemo') {
            done()
        } else {
            done(new Error('No access'))
        }
    },
    authenticate: true
});
server.addHook('onRequest', server.basicAuth);

server.listen(port, '0.0.0.0', (err, address) => {
    if (err) {
        console.error(err);
    }
    console.log(`Server listening at ${address}`)
})