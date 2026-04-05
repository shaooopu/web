// 导航栏滚动效果
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// 滚动动画
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('.about-content, .work-item, .contact-content').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 作品卡片悬停效果
const workItems = document.querySelectorAll('.work-item');
workItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 表单提交效果
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 模拟表单提交
        const submitBtn = this.querySelector('.btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = '发送中...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = '发送成功!';
            submitBtn.style.backgroundColor = '#4CAF50';
            
            // 重置表单
            this.reset();
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.backgroundColor = '#e63946';
                submitBtn.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// 随机生成梵高风格的背景效果
function createVanGoghEffect() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const colors = ['#f5d0fe', '#fde68a', '#fca5a5', '#a78bfa', '#93c5fd'];
        
        // 创建随机形状
        for (let i = 0; i < 10; i++) {
            const shape = document.createElement('div');
            shape.style.position = 'absolute';
            shape.style.width = Math.random() * 200 + 50 + 'px';
            shape.style.height = Math.random() * 200 + 50 + 'px';
            shape.style.borderRadius = '50%';
            shape.style.background = colors[Math.floor(Math.random() * colors.length)];
            shape.style.opacity = Math.random() * 0.3 + 0.1;
            shape.style.top = Math.random() * 100 + '%';
            shape.style.left = Math.random() * 100 + '%';
            shape.style.animation = 'float ' + (Math.random() * 20 + 10) + 's linear infinite';
            shape.style.animationDelay = Math.random() * 5 + 's';
            hero.appendChild(shape);
        }
    }
}

// 页面加载完成后执行
window.addEventListener('load', function() {
    createVanGoghEffect();
    
    // 页面加载动画
    document.body.style.opacity = 0;
    document.body.style.transition = 'opacity 1s ease';
    
    setTimeout(() => {
        document.body.style.opacity = 1;
    }, 100);
});

// 鼠标跟随效果
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;

const cursor = document.createElement('div');
cursor.style.position = 'fixed';
cursor.style.width = '20px';
cursor.style.height = '20px';
cursor.style.borderRadius = '50%';
cursor.style.background = 'rgba(29, 53, 87, 0.6)';
cursor.style.pointerEvents = 'none';
cursor.style.zIndex = '9999';
cursor.style.transition = 'transform 0.1s ease';
document.body.appendChild(cursor);

window.addEventListener('mousemove', function(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px)`;
    requestAnimationFrame(animateCursor);
}

animateCursor();

// 导航链接高亮
window.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// 为导航链接添加active样式
const style = document.createElement('style');
style.textContent = `
    .nav-links a.active {
        color: #e63946;
    }
    
    .nav-links a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);