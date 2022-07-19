"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const user_routes_1 = require("./routes/user.routes");
const task_routes_1 = require("./routes/task.routes");
const auth_routes_1 = require("./routes/auth.routes");
const config_1 = __importDefault(require("config"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const deserializeUser_1 = __importDefault(require("./middleware/deserializeUser"));
const app = (0, express_1.default)();
app.use((0, body_parser_1.json)());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
app.use(deserializeUser_1.default);
mongoose_1.default.connect(`mongodb+srv://${config_1.default.get("dbUsername")}:${config_1.default.get("dbPassword")}@diploma-thesis.funhwek.mongodb.net/${config_1.default.get("dbName")}?tls=true`, () => {
    console.log("connected to db");
});
app.use([auth_routes_1.authRouter, user_routes_1.userRouter, task_routes_1.taskRouter]);
const port = config_1.default.get("port") || 3000;
app.listen(port, () => {
    console.log("server is running");
});
