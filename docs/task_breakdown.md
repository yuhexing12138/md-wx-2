# md-wx 项目任务拆分

本文档基于需求分析 (`requirements_analysis.md`)、技术架构 (`technical_architecture.md`) 和设计指南 (`desgin_guide.md`)，将 md-wx 项目按照优先级和模块化方式进行精细化任务拆分。本拆分方案特别关注 **Tailwind CSS 集成**、**微信公众号样式兼容（CSS 变量处理）** 以及 **NPM 包封装** 等关键技术点。

## 拆分原则

1.  **渐进式开发**：从基础架构到核心功能，再到高级特性，每步可验证。
2.  **样式优先**：鉴于微信排版的特殊性，样式系统的构建（Tailwind + CSS 变量）贯穿始终。
3.  **兼容性导向**：开发初期即考虑微信编辑器的内联样式限制。
4.  **组件化**：确保核心渲染器与 UI 控制层解耦，便于导出。

---

## 阶段一：项目初始化与基础架构 (Infrastructure)

**目标**：搭建基于 Vite + React 的开发环境，集成 Tailwind CSS，并建立 CSS 变量主题系统。

### 任务 1.1：项目脚手架与配置
**优先级**：🔴 最高
- [ ] **初始化项目**：使用 Vite 创建 React 项目 (`npm create vite@latest md-wx -- --template react`).
- [ ] **配置 Tailwind CSS**：安装并配置 Tailwind CSS (`npm install -D tailwindcss postcss autoprefixer`)，初始化 `tailwind.config.js`，配置 content 路径。
- [ ] **代码规范配置**：配置 ESLint + Prettier，确保团队代码风格统一。
- [ ] **路径别名**：在 `vite.config.js` 中配置 `@` 指向 `src` 目录。
- [ ] **依赖安装**：安装核心依赖 `react-markdown`, `remark-gfm`, `highlight.js`, `classnames`, `prop-types`。

### 任务 1.2：全局样式与主题变量系统
**优先级**：🔴 最高
- [ ] **全局样式重置**：创建 `src/styles/index.css`，引入 Tailwind 指令 (`@tailwind base; ...`)。
- [ ] **定义 CSS 变量**：在 `src/styles/themes.css` 中定义 `:root` 及各主题类（`.theme-minimalist`, `.theme-tech` 等）下的 CSS 变量。
    - *参考 `desgin_guide.md` 第 4 章节，定义 `--bg-color`, `--text-color`, `--accent-color` 等。*
- [ ] **字体系统配置**：在 `tailwind.config.js` 中扩展 `fontFamily`，添加 `Inter`, `Fira Code`, `Songti SC` 等字体定义。
- [ ] **玻璃拟态工具类**：封装 `.glass-toolbar` 等复用类到 CSS 组件层。

---

## 阶段二：核心预览器开发 (Core Previewer)

**目标**：实现 Markdown 到 HTML 的渲染，并包裹在符合设计规范的容器中。

### 任务 2.1：Markdown 渲染组件
**优先级**：🔴 最高
- [ ] **基础渲染**：创建 `components/Renderer/MarkdownRenderer.jsx`，使用 `react-markdown` 渲染基础文本。
- [ ] **GFM 支持**：集成 `remark-gfm` 插件，支持表格、任务列表、删除线等语法。
- [ ] **样式绑定**：编写 `src/styles/markdown.css`，利用 Tailwind 的 `@apply` 或直接编写 CSS，将 Markdown 元素（h1, p, list）与 CSS 变量绑定。
    - *重点：H1 底部边框，H2 左侧竖线装饰（引用 `var(--accent-color)`）。*

### 任务 2.2：预览容器 (Preview Container)
**优先级**：🔴 最高
- [ ] **容器组件**：创建 `components/Preview/PreviewContainer.jsx`。
- [ ] **设备模拟外壳**：
    - **手机视图**：实现 iPhone 样式外壳（宽 375px，圆角 40px，顶部刘海）。
    - **桌面视图**：实现宽屏卡片样式（宽 100%，圆角 8px）。
- [ ] **背景与阴影**：应用设计指南中的动态光感背景和容器阴影。

---

## 阶段三：主题系统实现 (Theming)

**目标**：实现 5 款预设主题的切换逻辑，并确保视觉还原。

### 任务 3.1：主题状态管理
**优先级**：🟡 高
- [ ] **Context 创建**：创建 `ThemeContext`，管理 `currentTheme` 状态。
- [ ] **Hook 封装**：实现 `useTheme` Hook，提供 `setTheme` 方法。
- [ ] **主题配置常量**：在 `src/constants/themes.js` 中定义主题列表数据（ID, 名称, 预览色值）。
    - *列表：极致简约、科技蓝调、优雅宋风、森系墨绿、活力热红。*

### 任务 3.2：主题切换交互
**优先级**：🟡 高
- [ ] **动态类名切换**：在 `PreviewContainer` 最外层根据 `currentTheme` 动态添加对应的类名（如 `theme-tech`）。
- [ ] **验证样式**：逐一验证 5 款主题在 H1, H2, 引用块, 链接等元素上的表现是否符合设计指南。

---

## 阶段四：代码块与高亮 (Code Blocks)

**目标**：实现 macOS 风格代码块，并强制使用深色模式以适应微信环境。

### 任务 4.1：自定义代码块组件
**优先级**：🟡 高
- [ ] **组件结构**：创建 `components/CodeBlock/CodeBlock.jsx`。
- [ ] **macOS 头部**：实现红黄绿三个装饰圆点的头部栏。
- [ ] **强制深色背景**：设置容器背景为 `#1e1e1e`，文字颜色为 `#c9d1d9`（硬编码，不随主题变浅色）。
- [ ] **集成 Highlight.js**：在组件内部调用 `highlight.js` 对代码进行高亮处理，使用 `github-dark` 样式。

### 任务 4.2：集成到渲染器
**优先级**：🟡 高
- [ ] **替换默认渲染**：在 `MarkdownRenderer` 中通过 `components` 属性替换 `code` 标签的渲染逻辑。
- [ ] **内联代码处理**：区分“代码块”和“行内代码”(`inline code`)，分别应用样式。

---

## 阶段五：UI 交互与设置面板 (UI & Interaction)

**目标**：实现顶部的悬浮工具栏，控制视图和主题。

### 任务 5.1：悬浮工具栏 (Toolbar)
**优先级**：🟠 中
- [ ] **组件开发**：创建 `components/Toolbar/Toolbar.jsx`。
- [ ] **样式实现**：应用 `fixed top-6`, `z-[100]`, `backdrop-blur` 等样式实现玻璃拟态悬浮效果。
- [ ] **主题选择器**：实现下拉菜单风格的主题选择器，带选中状态指示。
- [ ] **视图切换按钮**：实现手机/桌面图标切换逻辑，联动 `PreviewContainer` 的视图状态。

### 任务 5.2：响应式适配
**优先级**：🟠 中
- [ ] **移动端适配**：确保工具栏在小屏幕下自适应（如自动折叠或缩小间距）。
- [ ] **滚动交互**：测试页面滚动时工具栏的固定效果和遮挡情况。

---

## 阶段六：微信兼容复制功能 (Copy & Compatibility)

**目标**：实现“所见即所得”的复制功能，这是本项目的核心难点。

### 任务 6.1：样式内联处理 (The "Juice" Part)
**优先级**：🔴 最高
- [ ] **CSS 变量解析策略**：由于微信不支持 CSS 变量，需实现一套机制：
    - *方案*：在复制前，获取当前主题对应的**计算后 CSS 属性值**，或者维护一份“静态 CSS 映射表”。
    - *动作*：编写 `utils/style-processor.js`，负责将 CSS 变量替换为具体 Hex 色值。
- [ ] **Juice 集成**：使用 `juice` 库，将处理后的 CSS 样式强制内联到 HTML 标签的 `style` 属性中。
    - *重点*：确保 `border-left`, `background-color`, `font-family` 等关键样式被正确内联。

### 任务 6.2：剪贴板操作
**优先级**：🟡 高
- [ ] **复制逻辑**：实现 `handleCopy` 函数，获取渲染节点的 `innerHTML`，经过 `juice` 处理后，写入剪贴板 (`navigator.clipboard.writeText`)。
- [ ] **Toast 反馈**：实现复制成功/失败的 Toast 提示组件。

---

## 阶段七：组件封装与发布 (Packaging)

**目标**：将项目打包为 NPM 库，供外部使用。

### 任务 7.1：API 设计与导出
**优先级**：🟡 高
- [ ] **入口文件**：配置 `src/index.js`，导出 `MdWxRenderer` 主组件及 `useMdWx` 等 Hooks。
- [ ] **Props 定义**：规范组件 Props (`content`, `theme`, `enableToolbar`, `onCopy` 等)。

### 任务 7.2：Vite 库模式构建
**优先级**：🟡 高
- [ ] **打包配置**：修改 `vite.config.js` 为库模式 (`build.lib`)，配置 `rollupOptions` 排除 React 等外部依赖。
- [ ] **类型定义**：生成 `.d.ts` 文件（可选，若使用 TypeScript 或通过 JSDoc）。
- [ ] **发布准备**：配置 `package.json` 的 `main`, `module`, `exports` 字段，准备发布到 NPM。

---

## 阶段八：文档与示例
**优先级**：� 低
- [ ] **README 编写**：编写详细的使用文档、API 说明和示例代码。
- [ ] **在线 Demo**：(可选) 部署一个在线演示页面。
