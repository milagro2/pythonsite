# Project 1 - Github / First open source contribution

For the first project, I learned a bit more about Github and how to use it. 
I also made my first contribution. I did that using this [tutorial](https://github.com/firstcontributions/first-contributions).

---
The first thing I did was to **fork that repository** by clicking the `fork` button. By doing this it created a copy of the repo into my account. I than went to my account, opened the forked repo and clicked on a `code` where I clicked on the 'copy to clipboard' icon. I opened a terminal in Visual Studios Code and put in this code:
```python
git clone "https://github.com/milagro2/first-contributions.git"
```
With that I copied the contents of that repo to my pc (to VS-Code). <br>
Then I this to get to the right directory:
```cmd
cd first-contributions
```
Than to create a new branch I used this:
```python
git switch -c ContBranch
```
I then opened the Contributors.md in VS-code, put my name somewhere in the middle and used `git status` to see the changes I made.
<br> To add those changes to the branch and commit and push I used these commands:
```python
git add Contributors.md

git commit -m "Add Moreno  to Contributors list"

git push -u origin ContBranch
```
After that I went to the repo, clicked on the `Pull request`, then on the `Compare and pull request` button and finaly on the `Create pull request` to submit it all. <br>
Now the changes should get merged into the main branch.
