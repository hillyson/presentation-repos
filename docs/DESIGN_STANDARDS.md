# 设计规范

`presentation-repos` 下所有站点的统一设计系统。

---

## 视觉定位

### 暗色科技主题（默认）

所有站点默认使用**暗色科技**主题，除非站点文档中明确说明使用其他风格。

```
理念：简洁、克制、高级 —— 内容优先
氛围：深空、精密工具、AI 原生
参考：Vercel、Linear、Tailwind CSS 文档
```

---

## 颜色系统

### 背景层次

| Token | 值 | 用途 |
|-------|----|----|
| `--bg-900` | `#0a0a0f` | 页面底色 |
| `--bg-800` | `#0f0f1a` | 交替区块背景 |
| `--bg-700` | `#13131f` | 抬高表面 |
| `--bg-card` | `rgba(255,255,255,0.04)` | 卡片背景 |
| `--bg-card-hover` | `rgba(255,255,255,0.07)` | 卡片悬停态 |

### 品牌色

| Token | 值 | 用途 |
|-------|----|----|
| `--primary` | `#6366f1` | 主操作、核心强调 |
| `--primary-light` | `#818cf8` | 悬停态 |
| `--secondary` | `#8b5cf6` | 次要元素 |
| `--accent` | `#22d3ee` | 高亮、图标 |
| `--accent-green` | `#34d399` | 成功、已完成状态 |
| `--accent-amber` | `#fbbf24` | 警告、进行中 |

### 文本层次

| Token | 值 | 用途 |
|-------|----|----|
| `--text-primary` | `#f1f5f9` | 主体文案 |
| `--text-secondary` | `#94a3b8` | 说明文字、元数据 |
| `--text-muted` | `#475569` | 占位符、禁用态 |

### 边框

| Token | 值 | 用途 |
|-------|----|----|
| `--border` | `rgba(99,102,241,0.12)` | 默认边框 |
| `--border-hover` | `rgba(99,102,241,0.35)` | 悬停边框 |
| `--border-accent` | `rgba(34,211,238,0.25)` | 强调边框 |

---

## 颜色使用规则

### 各强调色适用场景

| 颜色 | Token | 适用场景 |
|------|-------|---------|
| 靛紫 | `--primary` | 主操作按钮、活跃态、架构核心元素 |
| 紫罗兰 | `--secondary` | 次要功能、业务逻辑层 |
| 青色 | `--accent` | 数据流/事件流、成功高亮、交互图标 |
| 琥珀 | `--accent-amber` | 警告、进行中状态、人工干预标记 |
| 绿色 | `--accent-green` | 已完成状态、成功指示、健康指标 |
| 蓝色 | `#3b82f6` | 外部集成、API/Webhook 接入点 |

### 颜色搭配规则

- **禁止**在同一组件中让两种强调色处于同等视觉权重
- **强制**：亮色强调配低饱和背景 —— 背景用 `rgba(accent, 0.08–0.12)`，边框用 `rgba(accent, 0.15–0.25)`，文字/图标用满色
- 标签/徽章配色公式：`bg = rgba(color, 0.10)`，`border = rgba(color, 0.20)`，`color = 满色值`
- 区块标签（小号大写引导文字）始终使用 `--primary` 或 `--accent`

### 渐变使用规则

渐变仅允许出现在以下位置：
1. Hero 区主标题：`linear-gradient(135deg, var(--primary-light), var(--accent))`
2. 主按钮背景
3. 背景光晕（装饰性，透明度极低 0.08–0.12）
4. 进度条/填充指示器

**禁止**将渐变用于正文、说明文字或卡片背景。

### 背景层叠规则

页面底色为 `--bg-900`，交替区块使用 `--bg-800`。禁止使用白色或浅色背景。卡片通过 `rgba(255,255,255,0.04)` 在区块背景上浮起。

---

## 字体排版

### 字体栈

```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

通过 Google Fonts 加载：
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 字号层级

| 层级 | 字号 | 字重 | 行高 | 适用场景 |
|------|------|------|------|---------|
| 展示级 | `clamp(3rem, 7vw, 5.5rem)` | 800 | 1.05 | 仅 Hero 主标题 |
| H1 | `clamp(2rem, 4vw, 3rem)` | 700 | 1.1 | 页面标题 |
| H2（区块） | `clamp(1.5rem, 3vw, 2rem)` | 600–700 | 1.2 | 区块标题 |
| H3（卡片） | `1.0625rem–1.25rem` | 600–700 | 1.3 | 卡片/条目标题 |
| 正文 | `0.9375rem–1rem` | 400 | 1.65–1.75 | 说明文字 |
| 辅助小字 | `0.875rem` | 400–500 | 1.6 | 元信息、脚注 |
| 标签（大写） | `0.6875rem–0.75rem` | 600–700 | — | 区块标签、层级 ID |
| 等宽 | `0.8125rem–0.875rem` | 400–500 | 1.6 | 代码、技术标签、注释 |

### 视觉层级规则

1. **区块引导模式**：小号大写标签（`0.6875rem`，字重 600，字距 `0.1em`）→ H2 标题 → 正文描述。层级之间不得跳跃。
2. **渐变文字**仅保留给页面中最重要的标题（通常只有 Hero H1）。区块 H2 使用 `--text-primary`。
3. **层级/卡片标题**字号不得低于 `1.0625rem`（17px），字重不低于 600，保证在深色背景上的可读性。
4. **正文内强调**：使用 `color: var(--text-primary)` + `font-weight: 600`，不使用粗斜体。
5. **等宽字体**用于：代码片段、技术标识（服务名、文件路径、版本号）、步骤注释。不用于区块标题。
6. **字距规则**：大写标签字距 `0.08–0.12em`；展示级和 H1 字距 `-0.02em`（紧凑）；正文字距 `0`。

---

## 间距系统

基于 8px 基础网格：

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
```

### 间距使用规则

- **区块垂直内边距**：`var(--space-24)` 到 `var(--space-32)`（96–128px）
- **区块标题底部间距**：`var(--space-12)` 到 `var(--space-16)`（48–64px），与内容网格之间
- **卡片内边距**：`var(--space-5)` 到 `var(--space-6)`（20–24px）
- **卡片网格间距**：`var(--space-4)`（16px）标准，大布局用 `var(--space-6)`
- **元素内部间距**（图标→标题→描述）：`var(--space-3)`（12px）
- **标签/徽章间距**：`var(--space-2)`（8px）
- 禁止使用任意像素值，所有间距必须映射到上述 Token

---

## 布局系统

### 容器

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1rem, 5vw, 2rem);
}
```

### 常用网格模式

```css
/* 功能卡片：桌面 3 列，平板 2 列，手机 1 列 */
grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));

/* 路线图/小卡片 */
grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));

/* 架构层级：单列纵向堆叠 */
display: flex;
flex-direction: column;
gap: var(--space-3);

/* 带注释侧边栏的双列 */
grid-template-columns: 48px 1fr;
```

### 区块节奏规则

- 相邻区块交替使用 `background: var(--bg-900)` 和 `background: var(--bg-800)` 来实现视觉分隔
- 每个区块都以**区块标题模式**开头：标签 → H2 → 描述
- 区块标签（小号大写引导文字）宽度限制 `max-width: 600px`，水平居中
- 区块内的视觉层级必须形成一个清晰的视觉焦点（通常是 H2 标题）

---

## 组件规范

### 卡片

```css
.card {
  background: var(--bg-card);               /* rgba(255,255,255,0.04) */
  border: 1px solid var(--border);          /* rgba(99,102,241,0.12) */
  border-radius: 12px;
  padding: var(--space-6);
  transition: border-color 0.2s, background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.card:hover {
  background: var(--bg-card-hover);         /* rgba(255,255,255,0.07) */
  border-color: var(--border-hover);        /* rgba(99,102,241,0.35) */
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(99, 102, 241, 0.08);
}
```

**卡片规则：**
- 使用 `border-left: 3px solid <强调色>` 传达卡片的分类/色系
- 卡片标题：`font-size: 1.0625rem`，`font-weight: 600`
- 卡片描述：`font-size: 0.9375rem`，`color: var(--text-secondary)`，`line-height: 1.65–1.75`
- 已完成状态卡片：添加 `background: rgba(52,211,153,0.04)`，`border-color: rgba(52,211,153,0.15)`
- 高亮/进行中卡片：添加对应色系的低饱和背景

### 标签（技术分类标签）

标签传达分类归属，**不是**通用文字标签 —— 每个标签的颜色必须匹配其父卡片的强调色。

```css
/* 基础 */
.tag {
  font-size: 0.75rem;
  padding: 3px 10px;
  border-radius: 4px;
  font-weight: 500;
  border: 1px solid transparent;
}

/* 示例：蓝色卡片内的标签 */
.card-blue .tag {
  background: rgba(59,130,246,0.10);
  color: #60a5fa;
  border-color: rgba(59,130,246,0.20);
}
```

**标签规则：**
- 标签字号最小 `0.75rem`（更小则不可读）
- 除非内容是代码标识（服务名、CLI 参数），否则标签文字不使用等宽字体
- 每张卡片最多 5 个标签，超出会稀释重点
- 标签是卡片内容的最后一个元素，在描述文字之后

### 状态徽章

```css
/* 基础 */
.badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 500;
}

/* 颜色变体 */
.badge-green  { background: rgba(52,211,153,0.1); border: 1px solid rgba(52,211,153,0.2); color: #34d399; }
.badge-blue   { background: rgba(59,130,246,0.1); border: 1px solid rgba(59,130,246,0.2); color: #60a5fa; }
.badge-amber  { background: rgba(251,191,36,0.1); border: 1px solid rgba(251,191,36,0.2); color: #fbbf24; }
.badge-muted  { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); color: #475569; }
```

**徽章使用规则：**
- 徽章标记状态（已完成 / 开发中 / 规划中 / 待开始）；标签标记分类/功能
- 每个卡片头部最多一个徽章
- 徽章文字不超过 5 个字

### 主按钮

```css
.btn-primary {
  background: var(--primary);
  color: white;
  border-radius: 8px;
  padding: 0.625rem 1.25rem;
  font-weight: 500;
  transition: background 0.2s, transform 0.1s;
}

.btn-primary:hover {
  background: var(--primary-light);
  transform: translateY(-1px);
}
```

### 次级按钮

```css
.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.625rem 1.25rem;
  font-weight: 500;
  transition: border-color 0.2s, color 0.2s;
}

.btn-ghost:hover {
  border-color: var(--border-hover);
  color: var(--text-primary);
}
```

---

## 动效规范

### 滚动进场动画（所有内容区块必须使用）

为需要动画的元素添加 `data-animate` 属性。

```css
[data-animate] {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

[data-animate].visible {
  opacity: 1;
  transform: translateY(0);
}

/* 错落延迟：最多 5 级 */
[data-animate][data-delay="1"] { transition-delay: 0.10s; }
[data-animate][data-delay="2"] { transition-delay: 0.20s; }
[data-animate][data-delay="3"] { transition-delay: 0.30s; }
[data-animate][data-delay="4"] { transition-delay: 0.40s; }
[data-animate][data-delay="5"] { transition-delay: 0.50s; }
```

**IntersectionObserver 配置：**
```js
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }),
  { threshold: 0.08 }   // 可见 8% 时触发，早于默认 10%
);
document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));
```

### 动效具体规则

1. **进场位移**：固定为 `translateY(24px)` —— 明显但不突兀
2. **进场时长**：`0.6s ease` —— 够快显得利落，够慢显得优雅
3. **最大错落延迟**：总计不超过 `0.5s`；3 列网格循环使用延迟 1–2–3
4. **仅触发一次**：进场后必须执行 `observer.unobserve(e.target)`，禁止上下滚动重复触发
5. **触发阈值**：`0.08`（8%），在元素完全进入视口前触发，保证动画完整播放
6. **动画顺序**：区块标签和标题的 `data-delay` 值应低于其下方内容

### 悬停过渡

| 属性 | 时长 | 缓动 |
|------|------|------|
| 颜色类（背景、边框、文字色） | `0.2s` | `ease` |
| 位移（translateY、translateX） | `0.2s` | `ease` |
| 阴影 | `0.2s` | `ease` |
| 弹性抬起效果 | `0.25s` | `cubic-bezier(0.34, 1.56, 0.64, 1)` — 轻微过冲 |

**悬停规则**：卡片悬停上移 `translateY(-2px)`；架构层级行悬停右移 `translateX(4px)`。禁止对卡片使用 scale 缩放 —— 会破坏网格对齐。

### 持续动画

仅在以下场景使用，其余场景不允许：
- 弹跳箭头：`translateY(0) → translateY(4px)`，`1.5s ease-in-out infinite`
- 光晕漂移：`scale(1) → scale(1.1)`，`8s ease-in-out infinite alternate`
- 脉冲光环：`box-shadow 0 0 0 0 → 0 0 0 8px`，`2s ease-out infinite`

**禁止**动画化：文本内容、布局属性（width/height/padding）、非卡片元素的背景色。

### 背景光晕

```css
/* 装饰性模糊光晕 */
.bg-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(120px);
  pointer-events: none;
  z-index: -1;
}

/* 透明度范围：0.06–0.12，不得更高，不能影响文字可读性 */
.bg-orb-1 { background: rgba(99,102,241,0.12); width: 600px; height: 600px; top: -200px; left: -200px; }
.bg-orb-2 { background: rgba(139,92,246,0.08); width: 500px; height: 500px; top: 40%; right: -150px; }
.bg-orb-3 { background: rgba(34,211,238,0.06); width: 400px; height: 400px; bottom: 10%; left: 20%; }
```

---

## 内容强调规则

### Hero / 首屏

- 一句话主标题（不超过 12 个字）。核心问题：这是什么，为什么重要？
- 副标题（1–2 句）：补充背景，不重复主标题
- 最多 2 个 CTA：一个主按钮（`btn-primary`），一个次级按钮（`btn-ghost`）
- 必须包含至少一个具体的价值主张指标或结果（如"从需求到交付全链路自动化"）

### 区块标题

区块 H2 标题应描述**结果**，而非**分类**：
- ✅ "从需求到交付的完整链路"（结果）
- ❌ "功能列表"（通用分类）

### 卡片内容优先级

每张卡片内，信息优先级为：
1. **标题** —— 最大的文字，回答"这是什么？"
2. **描述** —— 回答"为什么重要？"或"怎么运作？"控制在 2–3 句话。
3. **标签** —— 传达技术细节 / 子功能。标签必须有颜色才能快速扫读。

### 强调层级

- 最强：渐变文字（仅限 Hero）
- 强：`color: var(--text-primary)` + `font-weight: 700`
- 中：`color: var(--text-primary)` + `font-weight: 600`
- 普通正文：`color: var(--text-secondary)` + `font-weight: 400`
- 弱化：`color: var(--text-muted)` + `font-weight: 400`

---

## 区块结构规则

### 区块解剖

每个内容区块必须遵循以下结构：

```html
<section class="section [section-alt]" id="<锚点>">
  <div class="container">
    <!-- 1. 区块标题（必须） -->
    <div class="section-header">
      <div class="section-label" data-animate>小标签文字</div>
      <h2 class="section-title" data-animate data-delay="1">模块标题</h2>
      <p class="section-desc" data-animate data-delay="2">一到两句描述</p>
    </div>

    <!-- 2. 内容（网格 / 列表 / 自定义布局） -->
    ...

  </div>
</section>
```

- `.section` 上添加 `section-alt` 使用交替深色背景（`--bg-800`）
- 每个区块都有 `id` 属性用于锚点导航
- 区块标题描述始终设置 `max-width: 600px; margin: 0 auto` 并水平居中

### 区块间视觉分隔

- 通过交替背景色（900 / 800）分隔 —— 相邻两个区块不能使用相同背景
- **禁止**在区块之间添加分割线、`<hr>` 或任何横向线条
- 区块内边距已经足够提供视觉间距

### 导航锚点

导航中每个可见区块的 `href` 必须与对应 `<section>` 的 `id` 完全一致。

---

## 响应式规则

### 断点

| 名称 | 宽度 | 说明 |
|------|------|------|
| 手机 | `< 640px` | 单列，缩小字号，隐藏装饰元素 |
| 平板 | `640px–1023px` | 双列网格，简化导航 |
| 桌面 | `≥ 1024px` | 全多列布局 |

### 移动优先

先写手机基础样式，再用 `@media (min-width: ...)` 扩展至大屏。

```css
/* 手机基础 */
.grid { grid-template-columns: 1fr; }

/* 平板 */
@media (min-width: 640px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}

/* 桌面 */
@media (min-width: 1024px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

### 字号响应

| 元素 | 手机 | 桌面 |
|------|------|------|
| Hero 主标题 | `2.5rem` | `clamp(3rem, 7vw, 5.5rem)` |
| 区块 H2 | `1.5rem` | `clamp(1.75rem, 3vw, 2.25rem)` |
| 卡片 H3 | `1rem` | `1.0625rem–1.125rem` |
| 正文 | `0.9375rem` | `0.9375rem–1rem` |

### 手机端隐藏内容

- 装饰性侧边注释（竖排文字、数据流箭头）
- 背景网格纹理
- 多列导航链接（替换为汉堡菜单）

---

## 导航规范

- 固定顶部，`z-index: 100`
- 高度：`60px`
- 默认背景：`rgba(10, 10, 15, 0.6)` + `backdrop-filter: blur(16px)`（透明状态）
- 滚动超过 60px 后：`background: rgba(10, 10, 15, 0.95)`，`border-bottom: rgba(99,102,241,0.15)`，通过 `transition: 0.3s` 平滑切换
- 布局：Logo 左，导航链接居中，可选 CTA 最右
- 导航和页脚中禁止出现个人主页链接

---

## 图标使用规则

- **使用 SVG 图标**替代 Emoji 作为界面元素（按钮、导航、功能图标）
- **禁止在结构化 UI 中使用 Emoji**：标题、标签、导航、步骤流程均不允许 —— Emoji 在不同系统/浏览器下渲染差异较大
- Emoji 仅允许作为开发阶段临时占位，上线前必须替换
- 图标尺寸：导航/按钮 `16–20px`，功能卡片 `20–24px`，链接指示 `12px`
- 装饰性图标加 `aria-hidden="true"`；功能性图标加描述性 `aria-label`

---

## 站点规范

`sites/<name>/` 下的每个站点必须：

1. 有独立的 `astro.config.mjs`，配置 `base: '/presentation-repos/<name>'`
2. 按照本文档定义设计 Token（或从 `packages/design-tokens` 导入）
3. 有 `README.md` 说明站点内容和更新方式
4. 遵循本文档定义的滚动动画模式
5. 支持响应式 —— 在 `375px`、`768px`、`1280px` 下测试
6. 所有文字通过 WCAG AA 对比度要求（正文最低 4.5:1，大字体最低 3:1）
7. 使用语义化 HTML 地标（`<header>`、`<nav>`、`<main>`、`<section>`、`<footer>`）
8. 不包含个人主页链接（GitHub、社交媒体等）—— 站点定位为产品介绍页

---

## 反模式（禁止项）

- ❌ 内联样式写颜色 —— 必须使用 CSS 自定义属性
- ❌ 用 position absolute 做布局 —— 使用 flexbox / grid
- ❌ 对 `display: none` 做过渡动画 —— 使用 opacity + visibility
- ❌ 使用规范字重范围之外的字重（仅允许 300/400/500/600/700/800）
- ❌ 图片缺少 `width` / `height` 属性 —— 会导致布局抖动
- ❌ 非语义化 HTML（div 堆叠、缺少地标元素）
- ❌ 在导航、标题、步骤标签等结构化 UI 中使用 Emoji
- ❌ 使用通用灰色的标签/徽章 —— 标签颜色必须匹配上下文
- ❌ 每张卡片超过 5 个标签 —— 会稀释视觉重点
- ❌ 相邻两个区块使用相同背景色
- ❌ 文字背后使用渐变背景 —— 渐变只用于文字本身或装饰元素
- ❌ 悬停态改变布局属性（宽高、内边距）—— 仅允许 transform 和颜色变化
- ❌ 在展示型站点中出现个人主页链接（GitHub 账号、LinkedIn 等）
- ❌ 间距使用硬编码像素值 —— 必须映射到 `--space-*` Token
- ❌ 非技术文字使用等宽字体（如功能标题、区块标签）
- ❌ Hero 区超过 2 个 CTA 按钮
- ❌ 背景光晕透明度超过 0.15 —— 模糊光晕必须是纯装饰，不能抢夺注意力
