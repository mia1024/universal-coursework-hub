# Universal Coursework Hub

<div style="margin:auto;text-align: center">
    <img src="icon256.png" alt="icon"/>
</div>

A lightweight, easily extensible browser extension that provides many missing
features of commonly used assignment websites.

## Status of this project

Currently, only Gradescope is supported as a backend for this extension because
this is what I have access to. If you would like to provide support for a different
backend (e.g. Google Classroom, Canvas, etc.) please [contact me](https://miaceleste.net/contact).
It should be fairly straightforward to develop and hook into the existing framework, as
all you need to do is to implement the `Backend` interface (mostly `getCourses()`
and `getAssignments()`) and UCH will handle everything else. 
