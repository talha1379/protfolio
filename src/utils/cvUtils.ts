import { CustomCVData } from '../types';

export const handleCVDownload = (customCV: CustomCVData | null, email: string = 'talhaahmad1379@gmail.com') => {
  if (customCV && customCV.dataUrl) {
    const link = document.createElement('a');
    link.href = customCV.dataUrl;
    link.download = customCV.fileName || 'Talha_Ahmad_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    const cvText = `===================================================================
                       TALHA AHMAD
                 Full-Stack Web Developer
===================================================================
Email: ${email}
Location: Khyber Pakhtunkhwa, Pakistan

-------------------------------------------------------------------
PROFESSIONAL SUMMARY
-------------------------------------------------------------------
Full-Stack Web Developer focused on building modern, responsive, 
scalable, and user-friendly web applications and software systems. 
Experienced in React, Node.js, Express, Python, Tailwind CSS, REST APIs, 
Supabase, and relational/NoSQL databases.

-------------------------------------------------------------------
TECHNICAL SKILLS
-------------------------------------------------------------------
Frontend:  HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS
Backend:   Node.js, Express.js, Python, RESTful API Design
Databases: MongoDB, Supabase, SQLite, PostgreSQL
Tools:     Git, GitHub, Vite, VS Code, Vercel, Postman

-------------------------------------------------------------------
FEATURED PROJECTS
-------------------------------------------------------------------
1. Road & Safety Management System (React.js, Tailwind CSS, Supabase)
2. Railway Management System (React.js, JavaScript, Tailwind CSS)
3. Hostel Management System (React.js, SQLite, JavaScript)

© 2026 Talha Ahmad. All rights reserved.
`.trim();

    const blob = new Blob([cvText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Talha_Ahmad_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};
