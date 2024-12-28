Here's a polished version of the README that adds a more welcoming tone and clear sections to guide new developers through the setup process:

```markdown
# Welcome to LNC Community

© LNC 2024 - All Rights Reserved  
*This website is proprietary and is not to be redistributed or reused by any organization or individual.*

---

## About
The **LNC Community** project is designed for contributors and developers looking to get involved in building a vibrant digital community.
This guide will help you set up the project locally and start contributing.

---

## Prerequisites
To get started, ensure you have **Node.js version 22.11.0** installed. Currently, this setup is compatible only with Windows.

### Installation on Windows
1. Install [Chocolatey](https://chocolatey.org/install) if you don’t already have it.
2. Use Chocolatey to install Node.js:
   ```bash
   choco install nodejs --version="22.11.0"
   ```

---

## Project Setup

Once Node.js is installed, follow these steps:

1. **Clone the Repository**  
   Open a terminal in your preferred directory and run:
   ```bash
   git clone https://github.com/LNC-Network/lnc.git
   ```
2. **Navigate to the Project Folder**  
   ```bash
   cd .\lnc\
   ```
3. **Switch to the Development Branch**  
   ```bash
   git switch dev
   ```
4. **Install Dependencies and Start the Development Server**  
   ```bash
   npm install
   npm run dev
   ```

> **Note for Linux Users:** While this guide is Windows-focused, you can still contribute on Linux by adjusting file paths as appropriate.

---

Happy coding! 🎉 If you encounter any issues, please reach out to the LNC Community team.
```

This version offers a friendly introduction, step-by-step guidance, and a touch of polish to make it more engaging for developers.
