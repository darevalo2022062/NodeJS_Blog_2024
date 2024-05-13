'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { conectarDB } from './mongo.js';
import apiLimiter from '../src/middlewares/validar-cant-peticiones.js'
import authRoutes from '../src/auth/auth.routes.js';
import postRoutes from '../src/post/post.routes.js';
import commentRoutes from '../src/comments/comment.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.authPath = '/blogCool/v1/auth';
        this.postPath = '/blogCool/v1/post';
        this.commentPath = '/blogCool/v1/comment';

        this.middlewares();
        this.conectarDB();
        this.routes();
    }

    async conectarDB() {
        await conectarDB();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(apiLimiter);
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.authPath, authRoutes);
        this.app.use(this.postPath, postRoutes);
        this.app.use(this.commentPath, commentRoutes);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port', this.port);
        });
    }
}

export default Server;