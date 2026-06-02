
// Cursor
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
});
function animRing(){
  rx+=(mx-rx)*0.12; ry+=(my-ry)*0.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animRing);
}
animRing();

// Scroll progress
const prog = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const p = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  prog.style.width = (p*100)+'%';
});

// Navbar scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navAs = document.querySelectorAll('.nav-links a');
const observer2 = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      navAs.forEach(a => a.classList.remove('active'));
      const match = document.querySelector('.nav-links a[href="#'+e.target.id+'"]');
      if(match) match.classList.add('active');
    }
  });
}, {threshold:0.4});
sections.forEach(s => observer2.observe(s));

// Hamburger
document.getElementById('hamburger').onclick = () => {
  document.getElementById('mobileMenu').classList.add('open');
};
document.getElementById('closeMenu').onclick = closeMobileMenu;
function closeMobileMenu(){
  document.getElementById('mobileMenu').classList.remove('open');
}

// Scroll reveal
const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) e.target.classList.add('visible');
  });
}, {threshold:0.1, rootMargin:'0px 0px -60px 0px'});
reveals.forEach(r => revObs.observe(r));

// Typing effect
const roles = ['Full Stack Apps','MERN Solutions','Spring Boot APIs','Flutter Apps','ML Models'];
let ri=0, ci=0, del=false;
const typed = document.getElementById('typed');
function typeIt(){
  const word = roles[ri];
  if(!del){
    typed.textContent = word.slice(0,++ci);
    if(ci===word.length){ del=true; setTimeout(typeIt,1600); return; }
  } else {
    typed.textContent = word.slice(0,--ci);
    if(ci===0){ del=false; ri=(ri+1)%roles.length; }
  }
  setTimeout(typeIt, del?60:90);
}
typeIt();

// Project tabs
function switchTab(tab, btn){
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.querySelectorAll('.project-group').forEach(g=>g.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-'+tab).classList.add('active');
  // re-trigger stagger on active tab
  document.querySelectorAll('#tab-'+tab+' .stagger').forEach(el => {
    el.classList.remove('visible');
    setTimeout(()=>el.classList.add('visible'),50);
  });
}

// Counter animation
function animateCount(el, target, suffix=''){
  let start=0;
  const dur=1500;
  const step=16;
  const inc = target/(dur/step);
  const t = setInterval(()=>{
    start+=inc;
    if(start>=target){ el.textContent=target+suffix; clearInterval(t); return; }
    el.textContent = Math.floor(start)+suffix;
  },step);
}
const statObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      document.querySelectorAll('.stat-num').forEach(el=>{
        const raw=el.textContent.replace('+','');
        if(!isNaN(raw)&&raw!=='2026') animateCount(el,parseInt(raw),el.textContent.includes('+')?'+':'');
      });
      statObs.disconnect();
    }
  });
},{threshold:0.3});
const statsBar = document.querySelector('.stats-bar');
if(statsBar) statObs.observe(statsBar);
