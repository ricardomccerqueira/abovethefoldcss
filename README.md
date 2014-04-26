# grunt-abovethefoldcss

> Split css into above and bellow the fold content.



## Getting Started
There is no npm installer for now.

Copy grunt-abovethefoldcss to node_modules folder


## Usage Examples

checkout [testpage](https://github.com/ricardomccerqueira/abovethefoldcss/blob/testpage) repo for a simple example

### grunt file
sample options and npm task

```js
abovethefoldcss: {
  options: {
    css: 'path_to_css.css',
    aboveTheFold: 'path_to_above_the_fold_file.html',
    useEmptyStyleTag: true,
    pattern: "/*!ABOVE_THE_FOLD */"
  },
  build: {
  }
}
```
```js
grunt.loadNpmTasks('grunt-abovethefoldcss');
```

### html file
```html
<style datafor='abovethefold'></style>
```

### sass file
sample css, everything inside each /*!ABOVE_THE_FOLD*/ comment will be removed from the css file, and put on the above the fold file
```css
/*!ABOVE_THE_FOLD*/
.person
  display: block

.person__eyes
  border-radius: 10px
/*!ABOVE_THE_FOLD*/

.person__eyes--blue
  background: blue

/*!ABOVE_THE_FOLD*/
.person__body
  font-weight: bold
/*!ABOVE_THE_FOLD*/
```

#### Options
 
##### options.css
this file is the main css file after being compiled by sass

##### options.aboveTheFold
this file is the above the fold container, it can either be an html file and replace the styletag, or an empty file and use a server side include to load it to the head

##### options.useEmptyStyleTag
this defines the aboveTheFold behaviour, if default it will compile into **style datafor='abovethefold'**. 
If false it will replace the aboveTheFold file contents

##### options.pattern
This is the comment pattern inside the sass file, remember to include the **!** as this makes sure the comment gets passed to the css
