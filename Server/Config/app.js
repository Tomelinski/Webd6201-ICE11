"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const mongoose_1 = __importDefault(require("mongoose"));
const indexRouter = __importStar(require("../Routes/index"));
exports.app = express_1.default();
const DBConfig = __importStar(require("./db"));
mongoose_1.default.connect(DBConfig.Path, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose_1.default.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
    console.log(`Connected to MongoDB at ${DBConfig.Path}`);
});
exports.app.set("views", path_1.default.join(__dirname, "../Views/"));
exports.app.set("view engine", "ejs");
exports.app.use(morgan_1.default("dev"));
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: false }));
exports.app.use(cookie_parser_1.default());
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "../../Client/")));
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "../../node_modules/")));
exports.app.use("/", indexRouter.router);
exports.app.use(function (req, res, next) {
    next(http_errors_1.default(404));
});
exports.app.use(function (err, req, res, next) {
    let message = err.message;
    let error = req.app.get("env") === "development" ? err : {};
    res.status(err.status || 500);
    res.render("error", {
        message: message,
        error: error,
        title: "",
        page: "",
        displayName: "",
    });
});
//# sourceMappingURL=app.js.map