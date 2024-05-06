// Menu Show and Hide
const navMenu = document.getElementById('nav-menu');
const toggleMenu = document.getElementById('nav-toggle');
const closeMenu = document.getElementById('nav-close');

// Show Menu
toggleMenu.addEventListener('click', () => {
   navMenu.classList.toggle('show');
});

// Hide Menu
closeMenu.addEventListener('click', () => {
   navMenu.classList.remove('show');
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
       e.preventDefault();
       document.querySelector(this.getAttribute('href')).scrollIntoView({
           behavior: 'smooth'
       });
   });
});

// Text Scramble Animation
function scrambleText(text) {
   return text.split('').sort(() => Math.random() - 0.5).join('');
}

function animateTextScramble(element, newText, duration) {
   let startTime = null;
   const updateText = (currentTime) => {
       if (!startTime) startTime = currentTime;
       const elapsedTime = currentTime - startTime;
       const progress = Math.min(elapsedTime / duration, 1);
       const scrambledText = scrambleText(newText);
       element.textContent = progress === 1 ? newText : scrambledText;
       if (progress < 1) {
           requestAnimationFrame(updateText);
       }
   };
   requestAnimationFrame(updateText);
}

function animateTextOnViewport(entries, observer) {
   entries.forEach(entry => {
       if (entry.isIntersecting) {
           const titleElement = entry.target.querySelector('h1');
           animateTextScramble(titleElement, titleElement.textContent, 1000);
           observer.unobserve(entry.target);
       }
   });
}

const observer = new IntersectionObserver(animateTextOnViewport, {
   threshold: 1.0
});

document.querySelectorAll('.title').forEach(titleElement => {
   observer.observe(titleElement);
});

// Banner Text Animation
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
const el = document.querySelector('.text');
const fx = new TextScramble(el);
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
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', e => {
   cursor.setAttribute("style", "top: " + (e.pageY - 10) + "px; left: " + (e.pageX - 10) + "px;");
});

document.addEventListener('click', e => {
   cursor.classList.add("expand");
   setTimeout(() => {
      cursor.classList.remove("expand");
   }, 500);


});