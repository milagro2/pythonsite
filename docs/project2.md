# Project 2 - Python site with MkDocs


For project 2 I learned how to make this website using MkDocs. I used this [tutorial](https://www.mkdocs.org/getting-started/).

---
The first thing I did was open Python and run this command in the terminal:
```yml
pip install mkdocs
```
Next I ran this command to create a new project:
```cmd
mkdocs new my-poject
cd my-project
```
Then I used `mkdocs serve` to get the server running and when I went to `http://127.0.0.1:8000/` in my browser where it displayed the MkDocs website.
By going into the mkdocs.yml file I could change the `site_name` which was immediately visible in the browser. This is what the mkdocs.yml looks like:
```yml
site_name: Python Projects
site_url: https://pythonprojects.com/
nav:
  - Home: index.md
  - Agile: https://milagro2.github.io./Agile.html
  - Projects:
      - Project 1 - Github / First Open Source Contribution: project1.md
      - Project 2 - Python site with MkDocs: project2.md
      - Project 3 - File name convention checker: project3.md
      - Project 4 - Variable name convention checker: project4.md

theme: material
```
Its easy to add pages and sub-pages in the nav. <br>
For the theme I first put this command in the terminal:
```yml
pip install mkdocs-material
```
And wrote `material` behind theme in mkdocs.yml. MkDocs comes with two built in themes: `mkdocs` and `readthedocs` but I found more themes made by other people [here](https://github.com/mkdocs/mkdocs/wiki/MkDocs-Themes). <br>
I then used this to build a documentation:
```yml
mkdocs build
```
To look inside the directory I used:
```yml
$ ls site
```
And thats how i made this website using Python and MkDocs.
