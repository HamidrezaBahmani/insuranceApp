var acc=document.getElementsByClassName("accordion");
var icon=document.getElementsByClassName("icon");
var i;
var len=acc.length;
for(i=0 ;i<len;i++){
    acc[i].addEventListener('click',function(){
        this.classList.toggle('active');
        if(this.classList.contains("active")){
            this.children[0].children[0].classList.remove("fa-plus");
            this.children[0].children[0].classList.add("fa-minus")
           
        }else{
            this.children[0].children[0].classList.remove("fa-minus");
            this.children[0].children[0].classList.add("fa-plus")
        }
        var panel=this.nextElementSibling;
      
        if(panel.style.maxHeight){
            panel.style.maxHeight=null;
        }else{
            panel.style.maxHeight=panel.scrollHeight+"px"
        }
        
    
    })
}


// for(i=0 ;i<len;i++){
//    icon[i].addEventListener('click',function(){
//        if (this.parentNode.classList.contains('active')){
//             this.children[0].classList.remove("fa-minus")
//             this.children[0].classList.add("fa-plus")
//        }
//        else{ this.children[0].classList.remove("fa-plus");
//        this.children[0].classList.add("fa-minus")

//        }
    
        
    
//     })
// }


