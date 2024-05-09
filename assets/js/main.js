document.addEventListener('DOMContentLoaded', function() {
   const navMenu = document.getElementById('nav-menu');
   const toggleMenu = document.getElementById('nav-toggle');
   const closeMenu = document.getElementById('nav-close');
   const cursor = document.querySelector('.cursor');
   const textAnimationElement = document.querySelector('.text');
   const titleElements = document.querySelectorAll('.title');
   const animatedHeadingElements = document.querySelectorAll('.animated-heading');

   // Show Menu
   toggleMenu.addEventListener('click', () => {
       navMenu.classList.toggle('show');
   });

   // Hide Menu
   closeMenu.addEventListener('click', () => {
       navMenu.classList.remove('show');
   });

   // Smooth Scrolling
   document.body.addEventListener('click', function(e) {
       if (e.target.matches('a[href^="#"]')) {
           e.preventDefault();
           const targetId = e.target.getAttribute('href').substring(1);
           const targetElement = document.getElementById(targetId);
           if (targetElement) {
               targetElement.scrollIntoView({
                   behavior: 'smooth'
               });
           }
       }
   });

   // Text Scramble Animation
   class TextScramble {
       constructor(el) {
           this.el = el;
           this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
           this.update = this.update.bind(this);
       }
       setText(newText) {
           const oldText = this.el.innerText;
           const length = Math.max(oldText.length, newText.length);
           const promise = new Promise((resolve) => this.resolve = resolve);
           this.queue = [];
           for (let i = 0; i < length; i++) {
               const from = oldText[i] || '';
               const to = newText[i] || '';
               const start = Math.floor(Math.random() * 40);
               const end = start + Math.floor(Math.random() * 40);
               this.queue.push({ from, to, start, end });
           }
           cancelAnimationFrame(this.frameRequest);
           this.frame = 0;
           this.update();
           return promise;
       }
       update() {
           let output = '';
           let complete = 0;
           for (let i = 0, n = this.queue.length; i < n; i++) {
               let { from, to, start, end, char } = this.queue[i];
               if (this.frame >= end) {
                   complete++;
                   output += to;
               } else if (this.frame >= start) {
                   if (!char || Math.random() < 0.28) {
                       char = this.randomChar();
                       this.queue[i].char = char;
                   }
                   output += `<span class="dud">${char}</span>`;
               } else {
                   output += from;
               }
           }
           this.el.innerHTML = output;
           if (complete === this.queue.length) {
               this.resolve();
           } else {
               this.frameRequest = requestAnimationFrame(this.update);
               this.frame++;
           }
       }
       randomChar() {
           return this.chars[Math.floor(Math.random() * this.chars.length)];
       }
   }

   const phrases = ['Design', 'Development', 'Digital-Marketing'];
   const fx = new TextScramble(textAnimationElement);
   let counter = 0;

   const next = () => {
       fx.setText(phrases[counter]).then(() => {
           setTimeout(next, 800);
       });
       counter = (counter + 1) % phrases.length;
   };
   next();

   // Scramble Animation
   class ScrambleAnimation {
       constructor(el) {
           this.el = el;
           this.chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
           this.update = this.update.bind(this);
       }
       setText(newText) {
           const oldText = this.el.innerText;
           const length = Math.max(oldText.length, newText.length);
           const promise = new Promise((resolve) => this.resolve = resolve);
           this.queue = [];
           for (let i = 0; i < length; i++) {
               const from = oldText[i] || '';
               const to = newText[i] || '';
               const start = Math.floor(Math.random() * 40);
               const end = start + Math.floor(Math.random() * 40);
               this.queue.push({ from, to, start, end });
           }
           cancelAnimationFrame(this.frameRequest);
           this.frame = 0;
           this.update();
           return promise;
       }
       update() {
           let output = '';
           let complete = 0;
           for (let i = 0, n = this.queue.length; i < n; i++) {
               let { from, to, start, end, char } = this.queue[i];
               if (this.frame >= end) {
                   complete++;
                   output += to;
               } else if (this.frame >= start) {
                   if (!char || Math.random() < 0.28) {
                       char = this.randomChar();
                       this.queue[i].char = char;
                   }
                   output += `<span class="scramble-char">${char}</span>`;
               } else {
                   output += from;
               }
           }
           this.el.innerHTML = output;
           if (complete === this.queue.length) {
               this.resolve();
           } else {
               this.frameRequest = requestAnimationFrame(this.update);
               this.frame++;
           }
       }
       randomChar() {
           return this.chars[Math.floor(Math.random() * this.chars.length)];
       }
   }

   function applyScrambleAnimation(className) {
       const elements = document.querySelectorAll('.' + className);
       elements.forEach(el => {
           const animation = new ScrambleAnimation(el);
           const animateWithDelay = () => {
               animation.setText(el.innerText).then(() => {
                   setTimeout(animateWithDelay, 1500);
               });
           };
           animateWithDelay();
       });
   }
   applyScrambleAnimation('animated-heading');

   // Cursor Animation
   document.addEventListener('mousemove', e => {
       cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;");
   });

   document.addEventListener('click', e => {
       cursor.classList.add("expand");
       setTimeout(() => {
           cursor.classList.remove("expand");
       }, 500);
   });
});
