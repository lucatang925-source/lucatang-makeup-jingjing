/*
=====================================================
【脚本说明】
本文件是H5展示页的交互逻辑文件
实现图片懒加载、预览、复制、拨打电话等功能
零代码基础用户无需修改此文件
=====================================================
*/

// ==================== 全局变量 ====================
// 当前预览图片的索引
let currentImageIndex = 0;
// 预览图片数组
let portfolioImages = [];
// 当前选中的作品分类
let currentPortfolioCategory = 'wedding';
// 触摸相关变量
let touchStartX = 0;
let touchStartY = 0;
let touchStartDistance = 0;
let currentScale = 1;
let isPinching = false;

// ==================== 页面初始化 ====================
// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化页面配置
    initPageConfig();
    // 渲染页面内容
    renderPage();
    // 初始化图片懒加载
    initLazyLoad();
    // 初始化事件监听
    initEventListeners();
});

// ==================== 初始化页面配置 ====================
// 将配置应用到CSS变量
function initPageConfig() {
    const config = window.PAGE_CONFIG;
    const root = document.documentElement;
    
    // 设置页面标题
    document.title = config.pageTitle;
    
    // 设置CSS变量（主题颜色）
    root.style.setProperty('--primary-color', config.theme.primaryColor);
    root.style.setProperty('--secondary-color', config.theme.secondaryColor);
    root.style.setProperty('--bg-color', config.theme.bgColor);
    root.style.setProperty('--card-bg-color', config.theme.cardBgColor);
    root.style.setProperty('--border-color', config.theme.borderColor);
}

// ==================== 渲染页面内容 ====================
// 根据配置渲染所有模块
function renderPage() {
    const config = window.PAGE_CONFIG;
    
    // 1. 渲染个人名片
    renderProfile(config.profile);
    
    // 2. 渲染化妆师简介
    renderAbout(config.about);
    
    // 3. 渲染作品集
    renderPortfolio(config.portfolio);
    
    // 4. 渲染服务介绍
    renderServices(config.services);
    
    // 5. 渲染联系方式
    renderContact(config.contact);
    
    // 6. 渲染版权信息
    renderCopyright(config.copyright);
}

// ==================== 渲染个人名片 ====================
function renderProfile(profile) {
    // 设置头像
    const avatarImg = document.getElementById('avatarImg');
    if (avatarImg) {
        avatarImg.src = profile.avatar;
        avatarImg.alt = profile.name + '的头像';
    }
    
    // 设置姓名
    const profileName = document.getElementById('profileName');
    if (profileName) {
        profileName.textContent = profile.name;
    }
    
    // 设置职业标签
    const profileTags = document.getElementById('profileTags');
    if (profileTags && profile.tags) {
        profileTags.innerHTML = profile.tags.map(tag => 
            `<span class="profile-tag">${tag}</span>`
        ).join('');
    }
    
    // 设置城市
    const profileCity = document.getElementById('profileCity');
    if (profileCity) {
        profileCity.textContent = profile.city;
    }
    
    // 设置简介
    const profileIntro = document.getElementById('profileIntro');
    if (profileIntro) {
        profileIntro.textContent = profile.intro;
    }
}

// ==================== 渲染化妆师简介 ====================
function renderAbout(about) {
    const aboutTitle = document.getElementById('aboutTitle');
    const aboutText = document.getElementById('aboutText');
    const aboutFeatures = document.getElementById('aboutFeatures');
    
    if (aboutTitle) {
        aboutTitle.textContent = about.title;
    }
    
    if (aboutText) {
        aboutText.textContent = about.content;
    }
    
    if (aboutFeatures && about.features) {
        aboutFeatures.innerHTML = about.features.map(feature => 
            `<span class="about-feature">${feature}</span>`
        ).join('');
    }
}

// ==================== 渲染作品集 ====================
function renderPortfolio(portfolio) {
    if (!portfolio) return;
    
    // 渲染婚纱妆造
    const weddingContainer = document.getElementById('weddingContainer');
    if (weddingContainer && portfolio.wedding) {
        weddingContainer.innerHTML = portfolio.wedding.map((src, index) => `
            <div class="waterfall-item" data-category="wedding" data-index="${index}">
                <img data-src="${src}" alt="婚纱妆造${index + 1}" class="lazy-img">
            </div>
        `).join('');
    }
    
    // 渲染秀禾妆造
    const xiuhuContainer = document.getElementById('xiuhuContainer');
    if (xiuhuContainer && portfolio.xiuhu) {
        xiuhuContainer.innerHTML = portfolio.xiuhu.map((src, index) => `
            <div class="waterfall-item" data-category="xiuhu" data-index="${index}">
                <img data-src="${src}" alt="秀禾妆造${index + 1}" class="lazy-img">
            </div>
        `).join('');
    }
    
    // 设置默认预览图片数组
    portfolioImages = portfolio.wedding || [];
}

// ==================== 渲染服务介绍 ====================
function renderServices(services) {
    // 服务内容标题
    const serviceTitle = document.getElementById('serviceTitle');
    if (serviceTitle) {
        serviceTitle.textContent = services.title;
    }
    
    // 服务项目
    const serviceGrid = document.getElementById('serviceGrid');
    if (serviceGrid && services.items) {
        serviceGrid.innerHTML = services.items.map(item => `
            <div class="service-card">
                <div class="service-icon">${item.icon}</div>
                <div class="service-name">${item.name}</div>
                <div class="service-desc">${item.desc}</div>
            </div>
        `).join('');
    }
    
    // 服务时间
    const scheduleTitle = document.getElementById('scheduleTitle');
    const scheduleList = document.getElementById('scheduleList');
    const scheduleNote = document.getElementById('scheduleNote');
    
    if (scheduleTitle && services.schedule) {
        scheduleTitle.textContent = services.schedule.title;
    }
    
    if (scheduleList && services.schedule && services.schedule.items) {
        scheduleList.innerHTML = services.schedule.items.map(item => `
            <div class="schedule-item">
                <span class="schedule-name">${item.name}</span>
                <span class="schedule-time">${item.time}</span>
            </div>
        `).join('');
    }
    
    if (scheduleNote && services.schedule) {
        scheduleNote.textContent = services.schedule.note;
    }
    
    // 服务理念
    const philosophyTitle = document.getElementById('philosophyTitle');
    const philosophyText = document.getElementById('philosophyText');
    if (philosophyTitle && services.philosophy) {
        philosophyTitle.textContent = services.philosophy.title;
    }
    if (philosophyText && services.philosophy) {
        philosophyText.textContent = services.philosophy.content;
    }
    
    // 价目表
    const pricingTitle = document.getElementById('pricingTitle');
    const pricingList = document.getElementById('pricingList');
    const pricingNote = document.getElementById('pricingNote');
    
    if (pricingTitle && services.pricing) {
        pricingTitle.textContent = services.pricing.title;
    }
    
    if (pricingList && services.pricing && services.pricing.items) {
        pricingList.innerHTML = services.pricing.items.map(item => `
            <div class="pricing-item">
                <span class="pricing-name">${item.name}</span>
                <span class="pricing-price">${item.price}</span>
            </div>
        `).join('');
    }
    
    // 其他费用
    const extraTitle = document.getElementById('extraTitle');
    const extraList = document.getElementById('extraList');
    const extraNote = document.getElementById('extraNote');
    
    if (extraTitle && services.pricing && services.pricing.extra) {
        extraTitle.textContent = services.pricing.extra.title;
    }
    
    if (extraList && services.pricing && services.pricing.extra && services.pricing.extra.items) {
        extraList.innerHTML = services.pricing.extra.items.map(item => `
            <div class="extra-item">
                <span class="extra-name">${item.name}</span>
                <span class="extra-price">${item.price}</span>
            </div>
        `).join('');
    }
    
    if (extraNote && services.pricing && services.pricing.extra) {
        extraNote.textContent = services.pricing.extra.note;
    }
    
    if (pricingNote && services.pricing) {
        pricingNote.textContent = services.pricing.note;
    }
}

// ==================== 渲染联系方式 ====================
function renderContact(contact) {
    // 复制微信按钮文字
    const wechatBtnText = document.getElementById('wechatBtnText');
    if (wechatBtnText) {
        wechatBtnText.textContent = contact.wechatBtnText;
    }
    
    // 拨打电话按钮文字
    const phoneBtnText = document.getElementById('phoneBtnText');
    if (phoneBtnText) {
        phoneBtnText.textContent = contact.phoneBtnText;
    }
    
    // 设置拨打电话链接
    const phoneBtn = document.getElementById('phoneBtn');
    if (phoneBtn) {
        // 提取纯数字手机号
        const purePhone = contact.phone.replace(/[^\d]/g, '');
        phoneBtn.href = 'tel:' + purePhone;
    }
}

// ==================== 渲染版权信息 ====================
function renderCopyright(copyright) {
    const copyrightText = document.getElementById('copyrightText');
    const icpText = document.getElementById('icpText');
    
    if (copyrightText) {
        copyrightText.textContent = copyright.text;
    }
    
    if (icpText) {
        if (copyright.icp) {
            icpText.textContent = copyright.icp;
            icpText.style.display = 'block';
        } else {
            icpText.style.display = 'none';
        }
    }
}

// ==================== 图片懒加载 ====================
function initLazyLoad() {
    // 检查浏览器是否支持IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            // 提前100px开始加载
            rootMargin: '100px 0px',
            threshold: 0.01
        });
        
        // 观察所有懒加载图片
        document.querySelectorAll('.lazy-img').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // 不支持IntersectionObserver的降级方案
        loadAllImages();
    }
}

// 加载单张图片
function loadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;
    
    // 创建新图片对象预加载
    const tempImg = new Image();
    tempImg.onload = function() {
        img.src = src;
        img.classList.add('loaded');
        img.removeAttribute('data-src');
    };
    tempImg.onerror = function() {
        // 加载失败显示占位图
        img.alt = '图片加载失败';
    };
    tempImg.src = src;
}

// 降级方案：加载所有图片
function loadAllImages() {
    document.querySelectorAll('.lazy-img').forEach(img => {
        loadImage(img);
    });
}

// ==================== 初始化事件监听 ====================
function initEventListeners() {
    // 1. 作品集分类切换
    const portfolioTabs = document.getElementById('portfolioTabs');
    if (portfolioTabs) {
        portfolioTabs.addEventListener('click', function(e) {
            const tab = e.target.closest('.portfolio-tab');
            if (tab) {
                const category = tab.getAttribute('data-category');
                switchPortfolioCategory(category);
            }
        });
    }
    
    // 2. 作品集点击事件（事件委托）
    const weddingContainer = document.getElementById('weddingContainer');
    const xiuhuContainer = document.getElementById('xiuhuContainer');
    
    if (weddingContainer) {
        weddingContainer.addEventListener('click', function(e) {
            const item = e.target.closest('.waterfall-item');
            if (item) {
                const index = parseInt(item.getAttribute('data-index'));
                currentPortfolioCategory = 'wedding';
                portfolioImages = window.PAGE_CONFIG.portfolio.wedding;
                openLightbox(index);
            }
        });
    }
    
    if (xiuhuContainer) {
        xiuhuContainer.addEventListener('click', function(e) {
            const item = e.target.closest('.waterfall-item');
            if (item) {
                const index = parseInt(item.getAttribute('data-index'));
                currentPortfolioCategory = 'xiuhu';
                portfolioImages = window.PAGE_CONFIG.portfolio.xiuhu;
                openLightbox(index);
            }
        });
    }
    
    // 2. 预览弹窗关闭按钮
    const lightboxClose = document.getElementById('lightboxClose');
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    // 3. 点击预览背景关闭
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox || e.target.id === 'lightboxContainer') {
                closeLightbox();
            }
        });
    }
    
    // 4. 复制微信号按钮
    const wechatBtn = document.getElementById('wechatBtn');
    if (wechatBtn) {
        wechatBtn.addEventListener('click', copyWechat);
    }
    
    // 5. 预览弹窗触摸事件（滑动切换、双指缩放）
    initLightboxGestures();
    
    // 6. 键盘事件（ESC关闭预览）
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

// ==================== 切换作品集分类 ====================
function switchPortfolioCategory(category) {
    // 更新标签状态
    const tabs = document.querySelectorAll('.portfolio-tab');
    tabs.forEach(tab => {
        if (tab.getAttribute('data-category') === category) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
    
    // 更新容器显示
    const weddingContainer = document.getElementById('weddingContainer');
    const xiuhuContainer = document.getElementById('xiuhuContainer');
    
    if (category === 'wedding') {
        weddingContainer.classList.add('active');
        xiuhuContainer.classList.remove('active');
        portfolioImages = window.PAGE_CONFIG.portfolio.wedding;
    } else {
        weddingContainer.classList.remove('active');
        xiuhuContainer.classList.add('active');
        portfolioImages = window.PAGE_CONFIG.portfolio.xiuhu;
    }
    
    currentPortfolioCategory = category;
    
    // 重新初始化懒加载
    initLazyLoad();
}

// ==================== 打开图片预览 ====================
function openLightbox(index) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    if (!lightbox || !lightboxImg) return;
    
    currentImageIndex = index;
    
    // 显示图片
    lightboxImg.src = portfolioImages[index];
    lightboxImg.style.transform = 'scale(1)';
    currentScale = 1;
    
    // 更新计数器
    if (lightboxCounter) {
        lightboxCounter.textContent = `${index + 1} / ${portfolioImages.length}`;
    }
    
    // 显示弹窗
    lightbox.classList.add('active');
    
    // 禁止页面滚动
    document.body.style.overflow = 'hidden';
}

// ==================== 关闭图片预览 ====================
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    
    if (lightbox) {
        lightbox.classList.remove('active');
    }
    
    if (lightboxImg) {
        lightboxImg.style.transform = 'scale(1)';
    }
    
    currentScale = 1;
    
    // 恢复页面滚动
    document.body.style.overflow = '';
}

// ==================== 切换图片 ====================
function switchImage(direction) {
    // direction: 1为下一张，-1为上一张
    const newIndex = currentImageIndex + direction;
    
    // 边界检查
    if (newIndex < 0 || newIndex >= portfolioImages.length) {
        return;
    }
    
    openLightbox(newIndex);
}

// ==================== 初始化预览手势 ====================
function initLightboxGestures() {
    const lightboxContainer = document.getElementById('lightboxContainer');
    const lightboxImg = document.getElementById('lightboxImg');
    
    if (!lightboxContainer || !lightboxImg) return;
    
    // 触摸开始
    lightboxContainer.addEventListener('touchstart', function(e) {
        if (e.touches.length === 1) {
            // 单指触摸 - 准备滑动
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        } else if (e.touches.length === 2) {
            // 双指触摸 - 准备缩放
            isPinching = true;
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            touchStartDistance = Math.sqrt(dx * dx + dy * dy);
        }
    }, { passive: true });
    
    // 触摸移动
    lightboxContainer.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2 && isPinching) {
            // 双指缩放
            e.preventDefault();
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            // 计算缩放比例
            const scale = (distance / touchStartDistance) * currentScale;
            const clampedScale = Math.min(Math.max(scale, 0.5), 3);
            
            lightboxImg.style.transform = `scale(${clampedScale})`;
        }
    }, { passive: false });
    
    // 触摸结束
    lightboxContainer.addEventListener('touchend', function(e) {
        if (isPinching && e.touches.length < 2) {
            // 缩放结束，保存当前缩放值
            const transform = lightboxImg.style.transform;
            const match = transform.match(/scale\(([^)]+)\)/);
            if (match) {
                currentScale = parseFloat(match[1]);
            }
            isPinching = false;
        } else if (e.changedTouches.length === 1 && !isPinching) {
            // 单指滑动结束，处理切换
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            
            // 水平滑动距离大于50px且水平滑动大于垂直滑动时切换
            if (Math.abs(diffX) > 50 && Math.abs(diffX) > Math.abs(diffY)) {
                if (diffX > 0) {
                    // 向右滑 - 上一张
                    switchImage(-1);
                } else {
                    // 向左滑 - 下一张
                    switchImage(1);
                }
            }
        }
    }, { passive: true });
    
    // 双击缩放
    let lastTapTime = 0;
    lightboxContainer.addEventListener('touchend', function(e) {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTapTime;
        
        if (tapLength < 300 && tapLength > 0) {
            // 双击
            e.preventDefault();
            if (currentScale > 1) {
                // 恢复原始大小
                lightboxImg.style.transform = 'scale(1)';
                currentScale = 1;
            } else {
                // 放大到2倍
                lightboxImg.style.transform = 'scale(2)';
                currentScale = 2;
            }
        }
        
        lastTapTime = currentTime;
    });
}

// ==================== 复制微信号 ====================
function copyWechat() {
    const wechat = window.PAGE_CONFIG.contact.wechat;
    
    // 方法1：使用Clipboard API（现代浏览器）
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(wechat).then(function() {
            showToast('微信号已复制', '✓');
        }).catch(function() {
            // 降级方案
            copyFallback(wechat);
        });
    } else {
        // 降级方案
        copyFallback(wechat);
    }
}

// 复制降级方案
function copyFallback(text) {
    // 创建临时输入框
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.cssText = 'position:fixed;left:-9999px;opacity:0;';
    document.body.appendChild(textarea);
    
    // 选择并复制
    textarea.select();
    textarea.setSelectionRange(0, 99999); // 兼容iOS
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showToast('微信号已复制', '✓');
        } else {
            showToast('复制失败，请手动复制', '✗');
        }
    } catch (err) {
        showToast('复制失败，请手动复制', '✗');
    }
    
    // 移除临时元素
    document.body.removeChild(textarea);
}

// ==================== Toast提示 ====================
function showToast(message, icon) {
    const toast = document.getElementById('toast');
    const toastIcon = document.getElementById('toastIcon');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) return;
    
    // 设置内容
    if (toastIcon) {
        toastIcon.textContent = icon || '';
    }
    toastMessage.textContent = message;
    
    // 显示
    toast.classList.add('active');
    
    // 2秒后自动隐藏
    setTimeout(function() {
        toast.classList.remove('active');
    }, 2000);
}

// ==================== 防止微信内置浏览器问题 ====================
// 禁止页面被拖动（微信下拉露出网址问题）
document.body.addEventListener('touchmove', function(e) {
    if (document.getElementById('lightbox').classList.contains('active')) {
        // 预览模式下允许触摸操作
        return;
    }
}, { passive: true });

// 处理iOS底部安全区域
function adjustForSafeArea() {
    const contactBar = document.getElementById('contactBar');
    if (contactBar) {
        // 检测是否为iOS设备
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
            contactBar.style.paddingBottom = 'calc(16px + env(safe-area-inset-bottom))';
        }
    }
}

// 页面加载完成后调整安全区域
window.addEventListener('load', adjustForSafeArea);
