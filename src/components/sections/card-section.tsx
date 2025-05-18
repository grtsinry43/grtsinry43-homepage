import React from 'react';
import {motion} from "framer-motion";
import {InfiniteMovingCards} from "@/components/ui/infinite-moving-cards";

interface CardItem {
    quote: string;
    name: string;
    title: string;
}

const cardItems:CardItem[] = [
    {
        quote: "湖南长沙，中南学子，逐梦全栈的 Archlinux 爱好者。",
        name: "grtsinry43",
        title: "坐标与身份：湖南长沙 | 中南大学 | 大二学生"
    },
    {
        quote: "主攻前端 (Vue/React)，心系 Kotlin/TypeScript 的未来。",
        name: "技术栈 (当前)：JavaScript, Vue.js, React.js",
        title: "技术栈 (未来)：Kotlin, TypeScript"
    },
    {
        quote: "JetBrains 全家桶用户，曾是 Vim 的忠实粉丝。",
        name: "开发工具：JetBrains IDE",
        title: "曾用工具：Vim"
    },
    {
        quote: "对 ML 怀揣兴趣，也曾涉猎 AE/C4D 视频渲染。",
        name: "兴趣领域：机器学习",
        title: "略懂技能：视频渲染 (AE, C4D)"
    },
    {
        quote: "讨厌 NV 驱动的 Kernel Panic！Arch 用户的小执念。",
        name: "系统偏好：Arch Linux",
        title: "痛点：NVIDIA 驱动问题"
    },
    {
        quote: "音游达人，活跃于 Arcaea, Phigros 等多个平台。",
        name: "兴趣爱好：音游",
        title: "涉猎音游：Arcaea, Phigros, Muse Dash, osu!, Malody, pjsk, Rizline"
    },
    {
        quote: "INFJ-T 型格，在内耗与渴望中寻找平衡。",
        name: "性格特点：INFJ-T",
        title: "内心状态：内省，共情，社恐与社交渴望并存"
    },
    {
        quote: "自诩“屎山”制造者，却怀揣用代码改变世界的梦想。",
        name: "开发理念：实用至上",
        title: "开发目标：用技术创造价值"
    },
    {
        quote: "重写博客与团委网站，在开源社区留下足迹。",
        name: "开源项目：Grtblog, 中南大学团委网站",
        title: "开源态度：积极参与，乐于分享"
    },
    {
        quote: "年度关键词：迷茫求索，热爱坚守，于血泪中成长。",
        name: "2024 年度总结",
        title: "感悟：在迷茫中成长，因热爱而坚持"
    },
    {
        quote: "新年 Flag：减肥至 60kg 以下，深耕前端框架。",
        name: "2025 年度目标 (部分)",
        title: "个人与技术双重提升"
    },
    {
        quote: "渴望成为有影响力的开源作者，在技术道路上不断探索。",
        name: "未来愿景",
        title: "成为独当一面的前端工程师与开源贡献者"
    },
];

const CardSection = () => {
    return (
        <div className="w-full pb-6 bg-slate-950">
            <motion.div
                initial={{opacity: 0, y: 40}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.8}}
                viewport={{once: true, amount: 0.3}}
                className="flex items-center justify-center space-x-2 mb-12"
            >
                <div className="h-px w-12 bg-primary/60"/>
                <h2 className="text-lg font-medium text-primary">我的关键词</h2>
                <div className="h-px w-12 bg-primary/60"/>
            </motion.div>

            <motion.h3
                className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-16 text-white"
                initial={{opacity: 0}}
                whileInView={{opacity: 1}}
                transition={{duration: 0.8, delay: 0.2}}
                viewport={{once: true, amount: 0.3}}
            >
                我是一个<span className="text-primary">"成分复杂"</span>的人
            </motion.h3>
            <div className="flex antialiased items-center justify-center relative">
                <InfiniteMovingCards
                    items={cardItems}
                    direction="right"
                    speed="slow"
                    pauseOnHover={true}
                />
            </div>
            <div className="flex antialiased items-center justify-center relative">
                <InfiniteMovingCards
                    items={cardItems}
                    direction="left"
                    speed="slow"
                    pauseOnHover={true}
                />
            </div>
        </div>
    );
};

export default CardSection;