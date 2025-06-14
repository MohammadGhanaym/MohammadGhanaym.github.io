# Data Analyst Portfolio

This is a clean, professional portfolio website template designed specifically for data analysts. It's built with HTML, CSS, and JavaScript and is ready to be deployed on GitHub Pages.

## Features

- Responsive design that works on all devices
- Clean, modern UI with smooth animations
- Project showcase section with filtering capability
- Client feedback/testimonials section
- Skills visualization
- Contact form (requires integration with a form service for functionality)
- Easy to customize and extend

## Project Structure

```
portfolio/
│
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── scripts.js
│   └── images/
│
├── feedback/
│   └── index.html
│
├── projects/
│   ├── index.html
│   └── project1.html
│
└── index.html
```

## How to Customize

1. **Personal Information**:
   - Update your name, title, and about information in `index.html`
   - Add your contact information and social media links
   - Update your skills and their proficiency levels

2. **Projects**:
   - Modify the projects in `projects/index.html` to showcase your own work
   - Create individual project pages using `project1.html` as a template
   - Update project categories for filtering (data-analysis, visualization, ml)

3. **Client Feedback**:
   - Update the testimonials in `feedback/index.html` with real feedback from your clients
   - Add or remove testimonials as needed

4. **Images**:
   - Replace placeholder images with your own photos and project screenshots
   - Place all images in the `assets/images/` directory

5. **Styling**:
   - Customize colors by modifying the CSS variables in `assets/css/styles.css`:
     ```css
     :root {
         --primary-color: #2a5298;
         --secondary-color: #58b792;
         /* other variables */
     }
     ```

## How to Deploy on GitHub Pages

1. **Create a GitHub Repository**:
   - Create a new repository named `username.github.io` (replace `username` with your GitHub username)

2. **Push Your Code**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/username/username.github.io.git
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to Settings > Pages
   - Under "Source", select "main" branch
   - Click "Save"
   - Your site will be published at `https://username.github.io`

## Making Your Contact Form Work

The contact form in this template is set up for visual demonstration but doesn't actually send emails. To make it functional, you have two options:

1. **Formspree** (Free for basic use):
   - Go to [Formspree](https://formspree.io/)
   - Sign up and create a new form
   - Replace the form action in `index.html` with your Formspree endpoint:
     ```html
     <form action="https://formspree.io/f/your-form-id" method="POST">
     ```

2. **Netlify Forms** (If you deploy on Netlify instead of GitHub Pages):
   - Add `netlify` attribute to your form:
     ```html
     <form id="contactForm" netlify>
     ```

## Resources

- **Free Data Sources for Projects**:
  - [Kaggle](https://www.kaggle.com/)
  - [Data.gov](https://www.data.gov/)
  - [Google Dataset Search](https://datasetsearch.research.google.com/)
  - [UCI Machine Learning Repository](https://archive.ics.uci.edu/ml/index.php)

- **Free Tools for Data Projects**:
  - [Google Colab](https://colab.research.google.com/) - Free Jupyter notebooks
  - [GitHub](https://github.com/) - Code hosting and version control
  - [Tableau Public](https://public.tableau.com/) - Free version of Tableau for public visualizations
  - [Power BI Desktop](https://powerbi.microsoft.com/desktop/) - Free for personal use

## Customization Tips

- **Colors**: Choose colors that represent your personal brand. The default blue/green scheme can be easily changed in the CSS.
- **Projects**: Focus on quality over quantity. 3-5 well-documented projects are better than many shallow examples.
- **Case Studies**: For each project, tell a story: problem, approach, solution, and results.
- **Skills**: Be honest about your skill levels. It's better to show proficiency in fewer skills than to claim expertise in many.

---

Good luck with your data analyst portfolio! If you have any questions, please feel free to reach out.
