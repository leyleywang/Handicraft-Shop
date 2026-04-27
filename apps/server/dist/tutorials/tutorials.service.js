"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TutorialsService = void 0;
const common_1 = require("@nestjs/common");
let TutorialsService = class TutorialsService {
    constructor() {
        this.tutorials = [
            {
                id: 1,
                title: '零基础串珠入门：制作简单手链',
                description: '从认识工具材料开始，学习基础串珠技巧，完成第一条属于自己的手链。',
                cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=step%20by%20step%20beading%20tutorial%20making%20simple%20bracelet%20beginner%20jewelry%20making%20on%20white%20background&image_size=square',
                type: 'video',
                difficulty: 'beginner',
                duration: '15分钟',
                views: 3256
            },
            {
                id: 2,
                title: '绕线基础：单石吊坠包裹技巧',
                description: '学习铜线绕线的基础手法，掌握如何用铜线包裹一颗宝石制作吊坠。',
                cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wire%20wrapping%20tutorial%20single%20stone%20pendant%20copper%20wire%20jewelry%20making%20technique%20on%20white%20background&image_size=square',
                type: 'video',
                difficulty: 'intermediate',
                duration: '25分钟',
                views: 1892
            },
            {
                id: 3,
                title: '蜡线编织：南美蜡线编绳基础',
                description: '图文教程详细展示各种基础结的编法，包括平结、蛇结、金刚结等。',
                cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=macrame%20knotting%20tutorial%20waxed%20cord%20jewelry%20making%20various%20knots%20illustration%20on%20white%20background&image_size=square',
                type: 'article',
                difficulty: 'beginner',
                duration: '阅读时间 10分钟',
                views: 2543
            },
            {
                id: 4,
                title: '天然石入门：认识常见宝石种类',
                description: '图文讲解常见手工饰品用天然石的种类、特点、鉴别方法和保养知识。',
                cover: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=various%20natural%20gemstones%20collection%20moonstone%20amethyst%20rose%20quartz%20citrine%20educational%20guide%20on%20white%20background&image_size=square',
                type: 'article',
                difficulty: 'beginner',
                duration: '阅读时间 8分钟',
                views: 4126
            }
        ];
    }
    findAll(filters) {
        let result = [...this.tutorials];
        if (filters.type) {
            result = result.filter(t => t.type === filters.type);
        }
        if (filters.difficulty && filters.difficulty !== 'all') {
            result = result.filter(t => t.difficulty === filters.difficulty);
        }
        return {
            total: result.length,
            items: result
        };
    }
    findOne(id) {
        return this.tutorials.find(t => t.id === id);
    }
};
exports.TutorialsService = TutorialsService;
exports.TutorialsService = TutorialsService = __decorate([
    (0, common_1.Injectable)()
], TutorialsService);
//# sourceMappingURL=tutorials.service.js.map