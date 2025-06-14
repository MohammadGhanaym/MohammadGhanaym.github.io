# Portfolio Customization Guide

This guide will help you easily customize your portfolio website. Follow these instructions to personalize your site and make it uniquely yours.

## Basic Information

### Updating Your Personal Details

1. Open `index.html` and update the following:

   - Your name (replace "Your Name" in the navigation and throughout the site)
   - Professional title (replace "Junior Data Analyst")
   - About me section content
   - Education and experience details
   - Location information
   - Contact information (email, LinkedIn, GitHub, etc.)

### Changing Profile Photo

1. Add your photo to `assets/images/` directory
2. Open `index.html` and replace the image placeholder with your actual image:

```html
<!-- Replace this: -->
<div class="about-image">
    <div class="image-placeholder">
        <i class="fas fa-user"></i>
        <p>Your Photo</p>
    </div>
</div>

<!-- With this: -->
<div class="about-image">
    <img src="assets/images/your-photo.jpg" alt="Your Name">
</div>
```

## Projects Section

### Adding a New Project

1. Copy an existing project card in `index.html` and in `projects/index.html`
2. Update the following:

   - Project category badge text and data-category attribute
   - Project image icon or add your project screenshot
   - Project title
   - Project description
   - Skills used (using the new tagged system)
   - Links to project details page and GitHub repository

### Project Skills Tags

Use the predefined skill tags with appropriate icons:

```html
<!-- Python related -->
<span class="tag-python"><i class="fab fa-python"></i>Python</span>
<span class="tag-pandas"><i class="fas fa-table"></i>Pandas</span>
<span class="tag-numpy"><i class="fas fa-calculator"></i>NumPy</span>
<span class="tag-matplotlib"><i class="fas fa-chart-line"></i>Matplotlib</span>
<span class="tag-scikit"><i class="fas fa-robot"></i>SciKit-Learn</span>

<!-- Database related -->
<span class="tag-sql"><i class="fas fa-database"></i>SQL</span>

<!-- BI Tools -->
<span class="tag-tableau"><i class="fas fa-chart-pie"></i>Tableau</span>
<span class="tag-powerbi"><i class="fas fa-chart-bar"></i>Power BI</span>
<span class="tag-excel"><i class="fas fa-file-excel"></i>Excel</span>
```

To add a new skill tag type, add a new CSS class in the `styles.css` file:

```css
.project-tags .tag-newskill {
    background-color: rgba(R, G, B, 0.1);
    color: #HEXCOLOR;
    border: 1px solid rgba(R, G, B, 0.3);
}
```

### Creating a New Project Details Page

1. Copy `projects/project1.html` to create a new project page (e.g., `projects/project4.html`)
2. Update all project information:

   - Title, completion date, duration
   - Project overview, business problem
   - Technical approach, methodology
   - Data cleaning and preparation code
   - Analysis code and visualizations
   - Key findings and recommendations
   - Business impact
   - Technical skills demonstrated

## Client Feedback Section

### Adding Client Feedback with Tape-Like Design

1. Go to `feedback/index.html`
2. Copy an existing testimonial and update:

```html
<div class="testimonial">
    <div class="testimonial-header">
        <h4>Platform Name</h4>
        <span>Client: ClientName</span>
    </div>
    <div class="testimonial-screenshot">
        <!-- Add the actual screenshot of feedback -->
        <img src="../path/to/feedback-screenshot.png" alt="Client Feedback" style="width:100%; height:100%; object-fit:contain;">
    </div>
    <div class="testimonial-content">
        <div class="rating">
            <!-- Star ratings -->
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
        </div>
        <div class="client-quote">
            <p>"Client feedback text here..."</p>
        </div>
        <div class="project-info">
            <h4>Project: Project Name</h4>
            <p>Platform: Freelancer.com</p>
        </div>
        <div class="testimonial-author">
            <div class="author-avatar">
                <i class="fas fa-user"></i>
            </div>
            <div class="author-info">
                <h4>Client Name</h4>
                <p>Client, Platform</p>
            </div>
        </div>
    </div>
</div>
```

### Adding Feedback Screenshots

1. Take screenshots of your client feedback (from LinkedIn, Upwork, Freelancer, etc.)
2. Save them in a folder (for example, `mydata/Clients Feedback/`)
3. Update the testimonial to use the actual screenshot:

```html
<div class="testimonial-screenshot">
    <img src="../path/to/feedback-screenshot.png" alt="Client Feedback" style="width:100%; height:100%; object-fit:contain;">
</div>
```

### Creating Platform-Specific Testimonials

For testimonials without an actual screenshot, you can create a branded placeholder:

```html
<!-- Example for GitHub -->
<div class="testimonial-screenshot" style="background-color: #0d1117; display: flex; justify-content: center; align-items: center;">
    <div style="text-align: center; padding: 20px;">
        <i class="fab fa-github" style="font-size: 80px; color: #fff;"></i>
        <p style="color: #fff; margin-top: 15px; font-size: 18px;">GitHub Projects</p>
    </div>
</div>

<!-- Example for LinkedIn -->
<div class="testimonial-screenshot" style="background-color: #0077b5; display: flex; justify-content: center; align-items: center;">
    <div style="text-align: center; padding: 20px;">
        <i class="fab fa-linkedin" style="font-size: 80px; color: #fff;"></i>
        <p style="color: #fff; margin-top: 15px; font-size: 18px;">LinkedIn Recommendation</p>
    </div>
</div>
```

## Styling Customization

### Changing Colors

1. Open `assets/css/styles.css`
2. Find the `:root` section at the top of the file
3. Modify the color variables to match your preferred color scheme:

```css
:root {
    --primary-color: #2a5298;    /* Main accent color */
    --secondary-color: #58b792;  /* Secondary accent color */
    --dark-color: #333;          /* Dark text color */
    --light-color: #f4f4f4;      /* Light background color */
    /* Other variables */
}
```

### Changing Fonts

1. Choose fonts from Google Fonts (https://fonts.google.com/)
2. Update the font import in the `<head>` section of your HTML files
3. Update the font-family references in `styles.css`:

```css
body {
    font-family: 'Your-Body-Font', sans-serif;
    /* other styles */
}

h1, h2, h3, h4, h5, h6 {
    font-family: 'Your-Heading-Font', serif;
    /* other styles */
}
```

## Making Your Contact Form Work

To make your contact form functional, you need to connect it to a form processing service. Here are two popular options:

### Option 1: Formspree (Free tier available)

1. Go to [Formspree](https://formspree.io/) and sign up for a free account
2. Create a new form
3. Update your contact form in `index.html`:

```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <!-- Your form fields -->
</form>
```

### Option 2: Netlify Forms (If you deploy on Netlify)

1. Add the `netlify` attribute to your form:

```html
<form id="contactForm" netlify name="contact">
    <!-- Your form fields -->
</form>
```

## Deployment to GitHub Pages

1. Create a repository named `yourusername.github.io`
2. Push your portfolio code to this repository
3. Go to Settings > Pages and ensure your site is deployed from the main branch
4. Your site will be available at `https://yourusername.github.io`

---

By following this guide, you should be able to easily customize all aspects of your portfolio site to showcase your data analysis skills professionally. If you have any questions, refer to the README.md file or feel free to reach out!
