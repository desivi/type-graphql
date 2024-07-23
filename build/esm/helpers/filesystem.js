"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fsWriteFile = exports.fsMkdir = void 0;
exports.parsePath = parsePath;
exports.mkdirRecursive = mkdirRecursive;
exports.mkdirRecursiveSync = mkdirRecursiveSync;
exports.outputFile = outputFile;
exports.outputFileSync = outputFileSync;
const tslib_1 = require("tslib");
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const node_util_1 = require("node:util");
exports.fsMkdir = (0, node_util_1.promisify)(node_fs_1.default.mkdir);
exports.fsWriteFile = (0, node_util_1.promisify)(node_fs_1.default.writeFile);
function parsePath(targetPath) {
    const directories = [];
    const parsedPath = node_path_1.default.parse(node_path_1.default.resolve(targetPath));
    const splitPath = parsedPath.dir.split(node_path_1.default.sep);
    if (parsedPath.root === "/") {
        splitPath[0] = `/${splitPath[0]}`;
    }
    splitPath.reduce((previous, next) => {
        const directory = node_path_1.default.join(previous, next);
        directories.push(directory);
        return node_path_1.default.join(directory);
    });
    return directories;
}
async function mkdirRecursive(filePath) {
    const directories = parsePath(filePath);
    for (const directory of directories) {
        try {
            await (0, exports.fsMkdir)(directory);
        }
        catch (err) {
            if (err.code !== "EEXIST") {
                throw err;
            }
        }
    }
}
function mkdirRecursiveSync(filePath) {
    const directories = parsePath(filePath);
    for (const directory of directories) {
        if (!node_fs_1.default.existsSync(directory)) {
            node_fs_1.default.mkdirSync(directory);
        }
    }
}
async function outputFile(filePath, fileContent) {
    try {
        await (0, exports.fsWriteFile)(filePath, fileContent);
    }
    catch (err) {
        if (err.code !== "ENOENT") {
            throw err;
        }
        await mkdirRecursive(filePath);
        await (0, exports.fsWriteFile)(filePath, fileContent);
    }
}
function outputFileSync(filePath, fileContent) {
    try {
        node_fs_1.default.writeFileSync(filePath, fileContent);
    }
    catch (err) {
        if (err.code !== "ENOENT") {
            throw err;
        }
        mkdirRecursiveSync(filePath);
        node_fs_1.default.writeFileSync(filePath, fileContent);
    }
}
