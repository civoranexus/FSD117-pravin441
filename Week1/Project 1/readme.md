# Personal Portfolio Website

A modern, responsive personal portfolio website built with HTML5, CSS3 (Flexbox & Grid), and vanilla JavaScript.

## Features

- ✨ Modern and clean design
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Smooth animations and transitions
- 📧 Working contact form
- 🎯 Smooth scrolling navigation
- 💼 Projects showcase section
- 🛠️ Skills section with progress bars
- 👤 About section
- 📝 Testimonials/reviews section

## Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: 
  - Flexbox for layout
  - CSS Grid for complex layouts
  - CSS Variables for theming
  - Media queries for responsiveness
- **JavaScript ES6+**:
  - DOM manipulation
  - Event handling
  - Intersection Observer API
  - Smooth scrolling

## File Structure

```
project1-portfolio/
│
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## How to Use

1. **Open the project**: Simply open `index.html` in your web browser
2. **Customize content**: 
   - Edit `index.html` to change text, images, and links
   - Modify `styles.css` to change colors, fonts, and layout
   - Update `script.js` to add/modify functionality

## Customization Guide

### Change Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #6366f1;  /* Your brand color */
    --secondary-color: #8b5cf6;
    --text-color: #1f2937;
    /* ... more variables */
}
```

### Add Your Projects
In `index.html`, find the projects section and add more project cards:
```html
<article class="project-card">
    <img src="your-image.jpg" alt="Project">
    <div class="project-info">
        <h3>Your Project Name</h3>
        <p>Description</p>
        <!-- ... -->
    </div>
</article>
```

### Update Contact Information
Replace placeholder email, phone, and social links with your actual information.

## Features Breakdown

### Navigation
- Sticky navigation bar
- Hamburger menu for mobile
- Smooth scroll to sections

### Hero Section
- Eye-catching gradient background
- Call-to-action buttons
- Responsive layout

### About Section
- Profile image
- Biography text
- Download resume button

### Skills Section
- Animated progress bars
- Skill categories
- Hover effects

### Projects Section
- Project cards with images
- Technology tags
- Live demo and GitHub links

### Contact Section
- Contact form with validation
- Contact information
- Social media links

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

You can deploy this website to:
- **GitHub Pages**: Free hosting for static sites
- **Netlify**: Drag and drop deployment
- **Vercel**: Fast deployment with CLI
- Any static hosting service

## Learning Outcomes

This project helps you learn:
- HTML5 semantic elements
- CSS Flexbox and Grid
- Responsive design principles
- JavaScript ES6+ features
- DOM manipulation
- Event handling
- CSS animations and transitions

## Future Enhancements

- [ ] Add dark mode toggle
- [ ] Include blog section
- [ ] Add more animations
- [ ] Integrate with backend for contact form
- [ ] Add multilingual support

## License

Free to use for personal and educational purposes.

---

**Built with ❤️ for learning web development**