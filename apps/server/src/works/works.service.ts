import { Injectable } from '@nestjs/common';

export interface WorkStep {
  description: string;
}

export interface Work {
  id: number;
  title: string;
  description: string;
  coverImage: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  author: string;
  authorId: number;
  price?: number;
  views: number;
  likes: number;
  tags: string[];
  steps: WorkStep[];
  enableMatching: boolean;
  createdAt: string;
}

@Injectable()
export class WorksService {
  private works: Work[] = [
    {
      id: 1,
      title: '月光石缠绕手链',
      description: '采用绕线工艺，每颗月光石都经过精心挑选，蓝光效果明显。适合喜欢小众风格的爱好者。',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20moonstone%20wire%20wrapped%20bracelet%20handmade%20jewelry%20shimmering%20blue%20light%20on%20white%20background&image_size=square',
      difficulty: 'advanced',
      author: '手作达人小芳',
      authorId: 1,
      price: 399,
      views: 1256,
      likes: 89,
      tags: ['手链', '绕线', '月光石', '小众风格'],
      steps: [
        { description: '挑选合适的月光石，确保每颗都有蓝光效应' },
        { description: '用0.8mm铜线进行基础框架缠绕' },
        { description: '逐颗固定月光石，注意排列的对称性' },
        { description: '完成收尾工作，打磨铜线末端' },
        { description: '添加延长链和龙虾扣' }
      ],
      enableMatching: true,
      createdAt: '2026-04-20'
    },
    {
      id: 2,
      title: '天然石串珠耳环',
      description: '新手友好的串珠作品，使用紫水晶和粉晶搭配，颜色柔和，适合日常佩戴。',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handmade%20natural%20stone%20beaded%20earrings%20amethyst%20rose%20quartz%20delicate%20jewelry%20on%20white%20background&image_size=square',
      difficulty: 'beginner',
      author: '晶石匠人',
      authorId: 2,
      price: 168,
      views: 892,
      likes: 56,
      tags: ['耳饰', '串珠', '天然石', '新手友好'],
      steps: [
        { description: '准备好所需珠子和耳钩配件' },
        { description: '根据设计排列珠子顺序' },
        { description: '用弹力线穿起所有珠子' },
        { description: '固定耳钩，检查牢固性' }
      ],
      enableMatching: true,
      createdAt: '2026-04-18'
    },
    {
      id: 3,
      title: '古法银编织项链',
      description: '复杂的编织工艺，结合古法银配件和天然石，呈现复古风格，适合定制高级饰品。',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=vintage%20style%20handwoven%20necklace%20with%20antique%20silver%20components%20and%20gemstones%20bohemian%20jewelry%20on%20white%20background&image_size=square',
      difficulty: 'expert',
      author: '编织艺术家',
      authorId: 3,
      price: 688,
      views: 2341,
      likes: 178,
      tags: ['项链', '编织', '古法银', '高级定制'],
      steps: [
        { description: '设计整体图案和编织结构' },
        { description: '准备蜡线和所有配件' },
        { description: '开始基础编织，注意张力一致' },
        { description: '在指定位置嵌入银配件和宝石' },
        { description: '完成编织，烧粘收尾' },
        { description: '添加调节扣和装饰配件' }
      ],
      enableMatching: true,
      createdAt: '2026-04-15'
    },
    {
      id: 4,
      title: '铜丝绕线水晶吊坠',
      description: '经典的绕线作品，展示铜线与水晶的完美结合，适合学习绕线基础技巧。',
      coverImage: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=copper%20wire%20wrapped%20crystal%20quartz%20pendant%20handmade%20jewelry%20artistic%20design%20on%20white%20background&image_size=square',
      difficulty: 'intermediate',
      author: '绕线爱好者',
      authorId: 4,
      price: 258,
      views: 1567,
      likes: 98,
      tags: ['吊坠', '绕线', '水晶', '可定制'],
      steps: [
        { description: '选择主石，测量尺寸' },
        { description: '用粗线制作框架' },
        { description: '用细线进行装饰性缠绕' },
        { description: '制作吊坠扣头' },
        { description: '打磨所有尖锐边缘' }
      ],
      enableMatching: false,
      createdAt: '2026-04-12'
    }
  ];

  findAll(filters: {
    difficulty?: string;
    preferenceMatch?: boolean;
  }) {
    let result = [...this.works];

    if (filters.difficulty && filters.difficulty !== 'all') {
      result = result.filter(w => w.difficulty === filters.difficulty);
    }

    if (filters.preferenceMatch) {
      result = result.filter(w => w.enableMatching);
    }

    return {
      total: result.length,
      items: result
    };
  }

  findOne(id: number) {
    return this.works.find(w => w.id === id);
  }

  create(createWorkDto: any) {
    const newWork: Work = {
      id: this.works.length + 1,
      title: createWorkDto.title,
      description: createWorkDto.description,
      coverImage: createWorkDto.coverImage || 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=handmade%20jewelry%20craft%20artwork%20elegant%20design&image_size=square',
      difficulty: createWorkDto.difficulty || 'beginner',
      author: '我',
      authorId: 1,
      price: createWorkDto.price,
      views: 0,
      likes: 0,
      tags: createWorkDto.tags || [],
      steps: createWorkDto.steps || [],
      enableMatching: createWorkDto.enableMatching ?? true,
      createdAt: new Date().toISOString().split('T')[0]
    };
    this.works.unshift(newWork);
    return newWork;
  }

  contactAuthor(id: number, contactDto: any) {
    const work = this.works.find(w => w.id === id);
    if (!work) {
      return { success: false, message: '作品不存在' };
    }
    return {
      success: true,
      message: `已发送消息给「${work.author}」`,
      authorId: work.authorId,
      authorName: work.author
    };
  }
}
