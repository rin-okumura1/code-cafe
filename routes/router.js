import { Router } from "express";

export default class BaseRouter {
    constructor() {
        this.router = Router();
    }

    getRouter() {
        return this.router;
    }
}
