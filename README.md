# 🌮 VFF extension boilerplate 🌮
![MIT License](https://img.shields.io/github/license/TwiztedDesign/vff.svg)


# Usage
Create a new empty repo on GitHub 
    
    git clone https://github.com/TwiztedDesign/vff-extension-boilerplate.git [my-extension-name]
    cd [my-extension-name] 
   
Clean the README

    rm README.md && touch README.md
    
If you have LICENSE, you can clean it too.

    rm LICENSE
    touch LICENSE
    
Remove all git info from the boilerplate

    rm -rf .git
    
Initiate the new git repo

    git init
    git add -A
    git commit -m "first commit"
    git remote add origin [my-extension remote repo]
    git push -u origin master
    
Install Dependencies

    npm install

1. Change the EXTENSION_NAME variable in the index.html file
2. Add your public functions inside the extension object


## Build
    npm run build
    
This will generate the file /dist/vff-ext.js.  
Include this in your html file after you include the vff script

### usage example
    vff.my-extension-name.my-extension-function();



## Tests
Run tests:

    npm test 

Watch tests:

    npm run test-watch


## 🍻 Cheers 🍻 

