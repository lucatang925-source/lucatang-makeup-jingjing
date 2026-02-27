# H5网页小白部署上线全步骤

> 本教程面向零代码基础用户，手把手教你将H5网页部署上线，生成可访问的链接。

---

## 一、准备工作

### 1.1 你需要准备的
- 一台电脑（Windows/Mac都可以）
- 已经修改好的H5网页文件（index.html、css文件夹、js文件夹）
- 一个邮箱（用于注册账号）

### 1.2 了解什么是部署
部署就是把你的网页文件放到互联网上，让别人可以通过链接访问。
就像把文件存到网盘，然后分享链接给别人一样。

---

## 二、推荐部署方案

我们推荐**3种免费部署方案**，按推荐程度排序：

| 方案 | 优点 | 缺点 | 适合人群 |
|------|------|------|----------|
| **Vercel** | 免费、速度快、操作简单 | 国外网站，偶尔访问慢 | 所有人 |
| **GitHub Pages** | 免费、稳定 | 需要学习Git基础 | 愿意学习的用户 |
| **Gitee Pages** | 国内访问快 | 需要实名认证 | 主要面向国内用户 |

**新手推荐：Vercel**（最简单，5分钟搞定）

---

## 三、方案一：Vercel部署（推荐）

### 步骤1：注册Vercel账号

1. 打开浏览器，访问：https://vercel.com
2. 点击页面右上角的 **"Sign Up"**（注册）
3. 选择 **"Continue with GitHub"**（用GitHub账号登录）
   - 如果没有GitHub账号，先注册一个GitHub账号
   - GitHub注册地址：https://github.com/signup
4. 按提示完成注册和登录

### 步骤2：下载并安装Vercel命令行工具

**Windows用户：**
1. 按键盘上的 `Win + R`，输入 `cmd`，按回车打开命令行
2. 输入以下命令安装Vercel工具：
   ```
   npm install -g vercel
   ```
3. 等待安装完成（可能需要几分钟）

**Mac用户：**
1. 打开"终端"应用
2. 输入以下命令安装：
   ```
   npm install -g vercel
   ```

**如果提示npm不存在：**
- 先安装Node.js：https://nodejs.org
- 下载左边LTS版本，安装后重启电脑

### 步骤3：部署网页

1. 打开命令行（Windows按Win+R输入cmd，Mac打开终端）
2. 进入你的项目文件夹：
   ```
   cd 你的文件夹路径
   ```
   例如：
   ```
   cd C:\Users\用户名\Desktop\photographer-h5
   ```
3. 登录Vercel：
   ```
   vercel login
   ```
   按提示在浏览器中确认登录
4. 部署网站：
   ```
   vercel
   ```
5. 按提示操作：
   - `Set up and deploy "..."?` 输入 `y` 回车
   - `Which scope do you want to deploy to?` 直接回车
   - `Link to existing project?` 输入 `n` 回车
   - `What's your project name?` 输入项目名称（如my-photo-site）回车
   - `In which directory is your code located?` 直接回车
6. 等待部署完成，会显示成功信息和访问链接

### 步骤4：获取访问链接

部署成功后，会显示类似：
```
🔍  Inspect: https://vercel.com/用户名/项目名/xxxx
✅  Production: https://项目名-用户名.vercel.app
```

复制 `Production` 后面的链接，就是你的网站地址！

### 步骤5：后续更新

如果修改了网页内容，重新部署：
```
cd 项目文件夹
vercel --prod
```

---

## 四、方案二：GitHub Pages部署

### 步骤1：注册GitHub账号

1. 访问：https://github.com/signup
2. 按提示注册账号（需要邮箱验证）

### 步骤2：创建代码仓库

1. 登录GitHub后，点击右上角 `+` 号，选择 **"New repository"**
2. 填写仓库信息：
   - Repository name：项目名称（如 `my-photo-site`）
   - Description：可选，描述一下
   - 选择 **Public**（公开）
   - 勾选 **"Add a README file"**
3. 点击 **"Create repository"**

### 步骤3：上传网页文件

**方法一：网页上传（简单）**

1. 进入刚创建的仓库页面
2. 点击 **"Add file"** → **"Upload files"**
3. 拖拽或选择你的所有文件（index.html、css文件夹、js文件夹）
4. 点击页面底部的 **"Commit changes"**

**方法二：Git命令上传（适合以后频繁更新）**

1. 下载安装Git：https://git-scm.com/downloads
2. 在项目文件夹空白处右键，选择 **"Git Bash Here"**
3. 依次执行以下命令：
   ```bash
   git init
   git add .
   git commit -m "首次上传"
   git branch -M main
   git remote add origin https://github.com/你的用户名/项目名.git
   git push -u origin main
   ```
4. 按提示输入GitHub用户名和密码

### 步骤4：开启GitHub Pages

1. 在仓库页面，点击顶部的 **"Settings"**（设置）
2. 左侧菜单点击 **"Pages"**
3. 在 **"Source"** 部分：
   - Branch：选择 `main`
   - 文件夹：选择 `/(root)`
   - 点击 **"Save"**
4. 等待1-2分钟，页面会显示访问链接：
   ```
   Your site is published at https://你的用户名.github.io/项目名/
   ```

---

## 五、方案三：Gitee Pages部署（国内访问快）

### 步骤1：注册Gitee账号

1. 访问：https://gitee.com/signup
2. 按提示注册（需要手机号验证）
3. 完成实名认证（国内网站要求）

### 步骤2：创建仓库

1. 登录后点击右上角 `+` 号，选择 **"新建仓库"**
2. 填写信息：
   - 仓库名称：项目名称
   - 路径：自动填充
   - 开源：选择 **"公开"**
3. 点击 **"创建"**

### 步骤3：上传文件

1. 进入仓库，点击 **"上传文件"**
2. 上传所有网页文件
3. 点击 **"提交"**

### 步骤4：开启Pages服务

1. 点击 **"服务"** → **"Gitee Pages"**
2. 部署分支：选择 `master`
3. 部署目录：选择 `/`
4. 勾选 **"强制使用HTTPS"**
5. 点击 **"启动"**
6. 等待部署完成，会显示访问链接

---

## 六、绑定自己的域名（可选）

如果你想用自己的域名访问（如 www.yourname.com）：

### 6.1 购买域名

推荐平台：
- 阿里云：https://wanwang.aliyun.com
- 腾讯云：https://dnspod.cloud.tencent.com
- 华为云：https://www.huaweicloud.com/product/domain.html

价格：.com域名约60-70元/年，.cn域名约30元/年

### 6.2 域名解析

以阿里云为例：

1. 购买域名后，进入域名控制台
2. 找到你的域名，点击 **"解析"**
3. 添加解析记录：
   - 记录类型：CNAME
   - 主机记录：www（或@表示主域名）
   - 记录值：你的Vercel/GitHub/Gitee地址
   - TTL：默认10分钟
4. 保存

### 6.3 在部署平台绑定域名

**Vercel绑定域名：**
1. 进入Vercel项目页面
2. 点击 **"Settings"** → **"Domains"**
3. 输入你的域名，点击 **"Add"**
4. 按提示验证域名所有权

**GitHub Pages绑定域名：**
1. 在项目根目录创建文件 `CNAME`（无后缀）
2. 文件内容写你的域名，如 `www.yourname.com`
3. 提交到仓库
4. 在仓库Settings → Pages中设置Custom domain

---

## 七、常见问题

### Q1：部署后页面显示空白？

**可能原因：**
- 文件路径错误
- 文件名大小写不匹配

**解决方法：**
- 检查index.html是否在根目录
- 检查css、js文件夹名称是否小写
- 检查文件是否全部上传

### Q2：图片显示不出来？

**可能原因：**
- 图片外链失效
- 跨域问题

**解决方法：**
- 检查图片链接是否能在浏览器直接打开
- 使用稳定的图床（推荐：SM.MS、路过图床）

### Q3：手机访问排版错乱？

**可能原因：**
- 缓存问题
- 浏览器兼容问题

**解决方法：**
- 清除浏览器缓存
- 在微信中访问时，点击右上角刷新
- 检查是否使用了支持的浏览器

### Q4：Vercel访问慢？

**解决方法：**
- 使用国内CDN加速
- 或改用Gitee Pages部署

### Q5：如何更新已部署的网站？

**Vercel：**
```
cd 项目文件夹
vercel --prod
```

**GitHub Pages：**
- 重新上传修改后的文件
- 或执行 `git add . && git commit -m "更新" && git push`

**Gitee Pages：**
- 重新上传文件后，在Pages页面点击 **"更新"**

---

## 八、总结

| 步骤 | 操作 |
|------|------|
| 1 | 选择部署平台（推荐Vercel） |
| 2 | 注册账号 |
| 3 | 上传网页文件 |
| 4 | 获取访问链接 |
| 5 | 分享给朋友 |

**恭喜你！你的网站已经上线！**

---

## 九、联系方式

如果在部署过程中遇到问题：
1. 查看对应平台的官方文档
2. 搜索错误信息
3. 请懂技术的朋友帮忙

**记住：** 第一次部署可能会遇到各种问题，这是正常的。按照教程一步步来，多试几次就能成功！
