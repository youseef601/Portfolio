let isAr = false;

// ===== TYPING ANIMATION =====
const typingWords = {
  en: ['Full Stack Developer'],
  ar: ['مطور فول ستاك']
};

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimeout;

function typeEffect() {
  const lang = isAr ? 'ar' : 'en';
  const words = typingWords[lang];
  const word = words[typingIndex % words.length];
  const el = document.getElementById('typed-text');
  if (!el) return;

  if (!isDeleting) {
    el.textContent = word.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === word.length) {
      isDeleting = true;
      typingTimeout = setTimeout(typeEffect, 1800);
      return;
    }
  } else {
    el.textContent = word.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      typingIndex++;
      typingTimeout = setTimeout(typeEffect, 300);
      return;
    }
  }
  typingTimeout = setTimeout(typeEffect, isDeleting ? 60 : 90);
}

clearTimeout(typingTimeout);
typeEffect();

const skills = [
  {name:'React JS', nameAr:'React JS', icon:'ti-brand-react', cat:'frontend', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg'},
  {name:'JavaScript', nameAr:'JavaScript', icon:'ti-brand-javascript', cat:'frontend', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg'},
  {name:'HTML5', nameAr:'HTML5', icon:'ti-brand-html5', cat:'frontend', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg'},
  {name:'CSS3', nameAr:'CSS3', icon:'ti-brand-css3', cat:'frontend', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg'},
  {name:'Tailwind CSS', nameAr:'Tailwind CSS', icon:'ti-brand-tailwind', cat:'frontend', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg'},
  {name:'Bootstrap', nameAr:'Bootstrap', icon:'ti-layout-grid', cat:'frontend', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg'},
  {name:'PHP', nameAr:'PHP', icon:'ti-code', cat:'backend', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg'},
  {name:'Laravel', nameAr:'Laravel', icon:'ti-wind', cat:'backend', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg'},
  {name:'MySQL', nameAr:'MySQL', icon:'ti-database', cat:'backend', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg'},
  {name:'RESTful APIs', nameAr:'RESTful APIs', icon:'ti-api', cat:'backend', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg'},
  {name:'C++', nameAr:'C++', icon:'ti-cpu', cat:'cs', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg'},
  {name:'OOP', nameAr:'البرمجة كائنية التوجه', icon:'ti-puzzle', cat:'cs', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg'},
  {name:'Data Structures', nameAr:'هياكل البيانات', icon:'ti-binary-tree', cat:'cs', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg'},
  {name:'Problem Solving', nameAr:'حل المشكلات', icon:'ti-brain', cat:'cs', logo:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg'},
];
const grid = document.getElementById('skills-grid');
skills.forEach(s=>{
  const div = document.createElement('div');
  div.className = 'skill-badge';
  div.dataset.cat = s.cat;
  div.dataset.en = s.name;
  div.dataset.ar = s.nameAr;
  div.innerHTML = `<img src="${s.logo}" alt="${s.name}" style="width:18px;height:18px;object-fit:contain;"/><span>${s.name}</span>`;
  grid.appendChild(div);
});

function filterSkills(cat, btn){
  document.querySelectorAll('.filter-tab').forEach(t=>t.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.skill-badge').forEach(b=>{
    b.classList.toggle('hidden', cat !== 'all' && b.dataset.cat !== cat);
  });
}

// ترجمات الـ nav يدوياً
const navTranslations = {
  'nav-about':    {en:'About',      ar:'عني'},
  'nav-skills':   {en:'Skills',     ar:'مهارات'},
  'nav-projects': {en:'Projects',   ar:'مشاريع'},
  'nav-exp':      {en:'Experience', ar:'خبرة'},
  'nav-contact':  {en:'Contact',    ar:'تواصل'},
};

// ترجمات الـ H1 يدوياً
const h1Translations = {
  en: 'Youssef Essam',
  ar: 'يوسف عصام'
};

function toggleLang() {
  isAr = !isAr;
  const lang = isAr ? 'ar' : 'en';
  const track = document.getElementById('track');
  const thumb = document.getElementById('thumb');

  // dir على الصفحة ماعدا الـ nav
  document.querySelectorAll('.hero, section, .skills-bg, .reviews-bg, .contact-bg, footer')
    .forEach(el => el.setAttribute('dir', isAr ? 'rtl' : 'ltr'));

  // ترجمة كل العناصر بـ textContent بدون لمس الـ nav أو الـ H1
  document.querySelectorAll('[data-en]').forEach(el => {
    if (el.closest('nav')) return;
    if (el.id === 'hero-h1') return;
    const val = el.dataset[lang];
    if (!val) return;
    el.textContent = val;
  });

  // H1 يدوياً بـ innerHTML
  document.getElementById('hero-h1').innerHTML = h1Translations[lang];

  // nav يدوياً
  Object.entries(navTranslations).forEach(([id, t]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t[lang];
  });

  // placeholders
  document.querySelectorAll('[data-en-placeholder]').forEach(el => {
    el.placeholder = isAr ? el.dataset.arPlaceholder : el.dataset.enPlaceholder;
  });

  // skill badges
  document.querySelectorAll('.skill-badge').forEach(b => {
    const span = b.querySelector('span');
    if (span) span.textContent = isAr ? b.dataset.ar : b.dataset.en;
  });

  // زرار اللغة
  buildProjects();
  track.classList.toggle('ar', isAr);
  // restart typing in new lang
  clearTimeout(typingTimeout);
  typingIndex = 0; charIndex = 0; isDeleting = false;
  typeEffect();
  thumb.textContent = isAr ? 'AR' : 'EN';

  // ripple
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.cssText = 'width:100px;height:100px;left:-5px;top:-32px';
  track.appendChild(ripple);
  ripple.style.animation = 'ripple-anim 0.5s ease-out forwards';
  setTimeout(() => ripple.remove(), 500);
}

const projectsData = [
  {
    img: 'imgs/nepri.jpeg',
    tagEn: 'Website', tagAr: 'موقع إلكتروني',
    titleEn: 'Nepri for IQF Fruits & Vegetables', titleAr: 'نيبري للفواكه والخضروات المجمدة',
    descEn: 'Professional product showcase website for Nepri frozen foods. Fully responsive with smooth navigation.',
    descAr: 'موقع احترافي لعرض منتجات نيبري للأغذية المجمدة. متجاوب بالكامل مع تنقل سلس.',
    techs: ['HTML', 'CSS', 'JavaScript', 'PHP'],
    link: '#'
  },
  {
    img: 'imgs/media.jpeg',
    tagEn: 'Website', tagAr: 'موقع إلكتروني',
    titleEn: 'Media Magic', titleAr: 'ميديا ماجيك',
    descEn: 'Professional services website featuring clean design, responsive layout, and optimized user experience.',
    descAr: 'موقع خدمات احترافي بتصميم نظيف وتخطيط متجاوب وتجربة مستخدم محسّنة.',
    techs: ['HTML', 'CSS', 'JavaScript','React JS','Tailwind'],
    link: '#'
  },
  {
    img: 'imgs/football-tatics.jpeg',
    tagEn: 'E-commerce', tagAr: 'تجارة إلكترونية',
    titleEn: 'Football Tactics', titleAr: 'فوتبول تاكتيكس',
    descEn: 'Full e-commerce platform for selling sports products online with secure payment gateways.',
    descAr: 'منصة تجارة إلكترونية متكاملة لبيع المنتجات الرياضية مع بوابات دفع آمنة.',
    techs: ['Laravel', 'PHP', 'JavaScript','React JS','Tailwind'],
    link: '#'
  },
  {
    img: 'imgs/repline.jpeg',
    tagEn: 'Application', tagAr: 'تطبيق',
    titleEn: 'Repline', titleAr: 'ريبلاين',
    descEn: 'Mobile application with modern UI for managing daily tasks and workflow efficiently.',
    descAr: 'تطبيق موبايل بواجهة حديثة لإدارة المهام اليومية وسير العمل بكفاءة.',
    techs: ['Laravel', 'PHP', 'JavaScript','React Native'],
    link: '#'
  },
  {
    img: 'imgs/travel.jpeg',
    tagEn: 'Website', tagAr: 'موقع إلكتروني',
    titleEn: 'Travel.com', titleAr: 'تريفل كوم',
    descEn: 'Flight and travel booking platform with real-time search, hotel listings, and vacation packages.',
    descAr: 'منصة حجز رحلات وسفر مع بحث فوري وقوائم فنادق وباقات سياحية.',
    techs: ['HTML', 'CSS', 'JavaScript','React'],
    link: '#'
  },
  {
    img: 'imgs/auto_Aid.jpeg',
    tagEn: 'Application', tagAr: 'تطبيق',
    titleEn: 'Auto Aid', titleAr: 'أوتو إيد',
    descEn: '"Auto Aid" is a mobile application primarily designed to help car owners manage and schedule car maintenance activities.',
    descAr: '"Auto Aid" هو تطبيق جوال مصمم في الأساس لمساعدة مالكي السيارات على إدارة وجدولة أنشطة صيانة السيارات.',
    techs: ['Laravel', 'PHP', 'JavaScript', 'React Native'],
    link: '#'
  }
];

const isArLang = () => isAr;

function buildProjects() {
  const grid = document.getElementById('projects-grid');
  grid.innerHTML = '';
  const lang = isArLang() ? 'ar' : 'en';
  projectsData.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.style.transitionDelay = (i * 0.08) + 's';
    card.innerHTML = `
      <div class="project-img-wrap">
        <img class="project-img" src="${p.img}" alt="${p['title' + (lang === 'ar' ? 'Ar' : 'En')]}" loading="lazy"/>
        <div class="project-overlay">
          <a href="${p.link}" class="overlay-btn">
            <i class="ti ti-eye" aria-hidden="true"></i> ${lang === 'ar' ? 'عرض' : 'Preview'}
          </a>
        </div>
      </div>
      <div class="project-body">
        <span class="project-tag">${p['tag' + (lang === 'ar' ? 'Ar' : 'En')]}</span>
        <h3>${p['title' + (lang === 'ar' ? 'Ar' : 'En')]}</h3>
        <p>${p['desc' + (lang === 'ar' ? 'Ar' : 'En')]}</p>
        <div class="project-techs">${p.techs.map(t => `<span class="tech-badge">${t}</span>`).join('')}</div>
      </div>
    `;
    grid.appendChild(card);
  });
  observeProjects();
}

function observeProjects() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, {threshold: 0.1});
  document.querySelectorAll('.project-card').forEach(c => observer.observe(c));
}

buildProjects();

function observeAboutCards() {
  const cards = document.querySelectorAll('.about-card');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, {threshold: 0.15});
  cards.forEach((c, i) => {
    c.style.transitionDelay = (i * 0.12) + 's';
    observer.observe(c);
  });
}
observeAboutCards();