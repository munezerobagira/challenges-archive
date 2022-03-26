import { useEffect } from "react";
function keyUp(callback) {
useEffect(()=>{
    window.addEventListener("keyup", (e)=>{
        if(e.keyCode === key){
            callback();
        }
    })
}, [])
})