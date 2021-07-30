window.addEventListener("load",e=>{
    if (location.hash.startsWith("#grade-click")){
        let target=decodeURI(location.hash.slice(13));
        console.log("Grade click target: "+target);
        let el:HTMLElement=document.querySelector(`button[data-assignment-title="${target}"]`);
        el.click();
    }
})
