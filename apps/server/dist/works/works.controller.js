"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorksController = void 0;
const common_1 = require("@nestjs/common");
const works_service_1 = require("./works.service");
let WorksController = class WorksController {
    constructor(worksService) {
        this.worksService = worksService;
    }
    findAll(difficulty, preferenceMatch) {
        return this.worksService.findAll({ difficulty, preferenceMatch });
    }
    findOne(id) {
        return this.worksService.findOne(+id);
    }
    create(createWorkDto) {
        return this.worksService.create(createWorkDto);
    }
    contactAuthor(id, contactDto) {
        return this.worksService.contactAuthor(+id, contactDto);
    }
};
exports.WorksController = WorksController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('difficulty')),
    __param(1, (0, common_1.Query)('preferenceMatch')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Boolean]),
    __metadata("design:returntype", void 0)
], WorksController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WorksController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], WorksController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':id/contact'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], WorksController.prototype, "contactAuthor", null);
exports.WorksController = WorksController = __decorate([
    (0, common_1.Controller)('works'),
    __metadata("design:paramtypes", [works_service_1.WorksService])
], WorksController);
//# sourceMappingURL=works.controller.js.map