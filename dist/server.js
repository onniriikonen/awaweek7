"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const user_1 = __importDefault(require("./src/routes/user"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT) || 8001;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use("/api/user", user_1.default);
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});
