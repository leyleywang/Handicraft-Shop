"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialsService = void 0;
const common_1 = require("@nestjs/common");
let MaterialsService = class MaterialsService {
    constructor() {
        this.materials = [
            {
                id: 1,
                name: '天然石碎石混装',
                description: '精选多种天然石碎石，颜色丰富，适合各类饰品制作。包含月光石、紫水晶、粉晶、虎眼石等多种材质。',
                image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mixed%20natural%20gemstone%20chips%20in%20various%20colors%20moonstone%20amethyst%20rose%20quartz%20tigers%20eye%20on%20white%20background&image_size=square',
                price: 68,
                unit: '100g',
                hasTrialPack: true,
                trialPrice: 25,
                categories: ['天然石'],
                techniques: ['串珠', '编织'],
                jewelryTypes: ['手链', '耳饰', '项链'],
                specs: '3-8mm，约100颗/100g'
            },
            {
                id: 2,
                name: '古法银配件套装',
                description: '高品质仿古银配件套装，包含隔珠、花托、延长链、龙虾扣等常用配件，质感复古，不易氧化。',
                image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20style%20silver%20jewelry%20findings%20spacer%20beads%20bead%20caps%20chain%20extensions%20lobster%20clasps%20on%20white%20background&image_size=square',
                price: 128,
                unit: '1套',
                hasTrialPack: true,
                trialPrice: 38,
                categories: ['银配件', '金属配件'],
                techniques: ['串珠', '编织'],
                jewelryTypes: ['手链', '耳饰', '项链'],
                specs: '约50件/套，含6种常用规格'
            },
            {
                id: 3,
                name: '紫水晶圆珠散珠',
                description: '天然紫水晶圆珠，颜色浓郁，晶体通透，适合制作高端手链和项链。提供多种尺寸选择。',
                image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=natural%20amethyst%20round%20beads%20purple%20crystal%20gemstone%20beads%20for%20jewelry%20making%20on%20white%20background&image_size=square',
                price: 158,
                unit: '1条(约40颗)',
                hasTrialPack: true,
                trialPrice: 45,
                categories: ['天然石', '珠子'],
                techniques: ['串珠', '编织'],
                jewelryTypes: ['手链', '项链'],
                specs: '8mm，AAA级品质'
            },
            {
                id: 4,
                name: '优质铜线套装',
                description: '绕线专用铜线，含0.4mm、0.6mm、0.8mm三种常用规格，不易氧化，硬度适中，适合各种绕线工艺。',
                image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=copper%20wire%20spools%20for%20jewelry%20wire%20wrapping%20craft%20various%20gauges%20on%20white%20background&image_size=square',
                price: 45,
                unit: '3卷套装',
                hasTrialPack: false,
                categories: ['线材', '金属配件'],
                techniques: ['绕线'],
                jewelryTypes: ['手链', '耳饰', '项链', '胸针'],
                specs: '0.4mm/0.6mm/0.8mm，每卷10米'
            },
            {
                id: 5,
                name: '捷克水晶珠套装',
                description: '进口捷克水晶珠，光泽度好，切面精致，包含多种形状和颜色，是串珠爱好者的必备材料。',
                image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=czech%20crystal%20glass%20beads%20assorted%20colors%20shapes%20faceted%20for%20jewelry%20making%20on%20white%20background&image_size=square',
                price: 88,
                unit: '1盒',
                hasTrialPack: true,
                trialPrice: 28,
                categories: ['珠子'],
                techniques: ['串珠'],
                jewelryTypes: ['手链', '耳饰', '项链', '胸针'],
                specs: '约200颗，含10种颜色5种形状'
            },
            {
                id: 6,
                name: '月光石水滴吊坠',
                description: '精选天然月光石水滴吊坠，蓝光效应明显，晶体通透，单颗包装，适合制作项链或手链。',
                image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=natural%20moonstone%20teardrop%20pendant%20with%20blue%20adularescence%20gemstone%20jewelry%20on%20white%20background&image_size=square',
                price: 228,
                unit: '1颗',
                hasTrialPack: false,
                categories: ['天然石'],
                techniques: ['串珠', '绕线'],
                jewelryTypes: ['项链'],
                specs: '约15x25mm，AAA级'
            }
        ];
        this.categories = [
            { label: '天然石', value: 'stone' },
            { label: '银配件', value: 'silver' },
            { label: '珠子', value: 'bead' },
            { label: '线材', value: 'wire' },
            { label: '金属配件', value: 'metal' }
        ];
        this.techniques = [
            { label: '串珠', value: 'beading' },
            { label: '绕线', value: 'wrapping' },
            { label: '编织', value: 'weaving' },
            { label: '焊接', value: 'soldering' }
        ];
    }
    findAll(filters) {
        let result = [...this.materials];
        if (filters.jewelryType) {
            const typeMap = {
                bracelet: '手链',
                earring: '耳饰',
                necklace: '项链',
                brooch: '胸针'
            };
            const typeLabel = typeMap[filters.jewelryType];
            if (typeLabel) {
                result = result.filter(m => m.jewelryTypes.includes(typeLabel));
            }
        }
        if (filters.category) {
            const categoryMap = {
                stone: '天然石',
                silver: '银配件',
                bead: '珠子',
                wire: '线材',
                metal: '金属配件'
            };
            const categoryLabel = categoryMap[filters.category];
            if (categoryLabel) {
                result = result.filter(m => m.categories.includes(categoryLabel));
            }
        }
        if (filters.technique) {
            const techMap = {
                beading: '串珠',
                wrapping: '绕线',
                weaving: '编织',
                soldering: '焊接'
            };
            const techLabel = techMap[filters.technique];
            if (techLabel) {
                result = result.filter(m => m.techniques.includes(techLabel));
            }
        }
        if (filters.hasTrialPack === true) {
            result = result.filter(m => m.hasTrialPack);
        }
        return {
            total: result.length,
            items: result
        };
    }
    findOne(id) {
        return this.materials.find(m => m.id === id);
    }
    getCategories() {
        return this.categories;
    }
    getTechniques() {
        return this.techniques;
    }
};
exports.MaterialsService = MaterialsService;
exports.MaterialsService = MaterialsService = __decorate([
    (0, common_1.Injectable)()
], MaterialsService);
//# sourceMappingURL=materials.service.js.map