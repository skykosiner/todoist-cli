"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todoist = void 0;
var Todoist = /** @class */ (function () {
    function Todoist(config) {
        this.config = config;
        this.apiUrl = "https://api.todoist.com/rest/v2";
        if (!config) {
            throw new Error("No config provided");
        }
    }
    Todoist.prototype.getActiveTodos = function () {
        return __awaiter(this, void 0, void 0, function () {
            var resp, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, fetch("".concat(this.apiUrl, "/tasks"), {
                                headers: {
                                    Authorization: "Bearer ".concat(this.config.token),
                                }
                            })];
                    case 1:
                        resp = _a.sent();
                        return [2 /*return*/, resp.json()];
                    case 2:
                        e_1 = _a.sent();
                        //@ts-ignore
                        throw new Error("Error fetching tasks: ".concat(e_1.message));
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Todoist.prototype.getToday = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var tasks, today, formatedTasks, _i, tasks_1, task, _a, formatedTasks_1, task, _b, options_1, option;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getActiveTodos()];
                    case 1:
                        tasks = _c.sent();
                        today = new Date().toISOString().split("T")[0];
                        formatedTasks = [];
                        for (_i = 0, tasks_1 = tasks; _i < tasks_1.length; _i++) {
                            task = tasks_1[_i];
                            if (task.due && task.due.date < today && !task.is_completed) {
                                formatedTasks.push("Overdue: ".concat(task.content, " | ").concat(task.id));
                            }
                            if (task.due && task.due.date === today && !task.is_completed) {
                                formatedTasks.push("".concat(task.content, " | ").concat(task.id));
                            }
                        }
                        for (_a = 0, formatedTasks_1 = formatedTasks; _a < formatedTasks_1.length; _a++) {
                            task = formatedTasks_1[_a];
                            if (task.startsWith("Overdue")) {
                                for (_b = 0, options_1 = options; _b < options_1.length; _b++) {
                                    option = options_1[_b];
                                    if (option === "--color") {
                                        console.log("\u001B[31m".concat(task, "\u001B[0m"));
                                    }
                                }
                            }
                            else {
                                console.log(task);
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Todoist.prototype.closeTask = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var resp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("".concat(this.apiUrl, "/tasks/").concat(id, "/close"), {
                            method: "POST",
                            headers: {
                                Authorization: "Bearer ".concat(this.config.token),
                            }
                        })];
                    case 1:
                        resp = _a.sent();
                        if (resp.status === 204) {
                            console.log("Task closed successfully");
                        }
                        else {
                            console.error("Error closing task");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return Todoist;
}());
exports.Todoist = Todoist;
