document.addEventListener('DOMContentLoaded', function() {
    // 获取当前页面路径
    const currentPath = window.location.pathname;
    
    // 如果是主页或index.html，加载index01.html的内容
    if (currentPath === '/' || currentPath === '/index.html') {
        loadContent('/index01.html');
    } else {
        // 否则加载对应页面的内容
        loadContent(currentPath);
    }

    // 添加导航栏滚动隐藏效果
    let lastScrollTop = 0;
    const nav = document.querySelector('.main-nav');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // 向下滚动时隐藏导航栏
        if (currentScroll > lastScrollTop && currentScroll > 100) {
            nav.style.transform = 'translateY(-100%)';
            nav.style.opacity = '0';
        } 
        // 向上滚动时显示导航栏
        else {
            nav.style.transform = 'translateY(0)';
            nav.style.opacity = '1';
        }
        
        lastScrollTop = currentScroll;
    });
});

function loadContent(path) {
    fetch(path)
        .then(response => response.text())
        .then(html => {
            // 将内容插入到主框架的内容区域
            document.querySelector('main').innerHTML = html;
            
            // 更新导航栏激活状态
            updateNavigation(path);
        });
}

function updateNavigation(path) {
    // 移除所有导航项的激活状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // 为当前页面的导航项添加激活状态
    const currentNav = document.querySelector(`.nav-link[href="${path}"]`);
    if (currentNav) {
        currentNav.classList.add('active');
    } else if (path === '/index01.html' && (window.location.pathname === '/' || window.location.pathname === '/index.html')) {
        // 如果是主页加载index01的内容，激活"笔记"导航项
        document.querySelector('.nav-link[href="index01.html"]').classList.add('active');
    }
}