var board
let score=0;
var rows=4
var coloumn=4
let t=0
let k=0

window.onload= function (){
    setgame()
    document.getElementById("highscore").innerText=localStorage.getItem('highscore')
}
function reset(){
    board=[[0,0,0,0],
           [0,0,0,0],
           [0,0,0,0],
           [0,0,0,0]]
           for(let r=0;r<rows;r++){
            for(let c=0;c<coloumn;c++){
                let tile =document.getElementById(r.toString()+'-'+c.toString())
                let num =board[r][c]
                updatetile(tile,num)
                
                
            }
        }
        document.getElementById("highscore").innerText=score  
        score=0;
        document.getElementById("score").innerText=score  
        
        settwo()
        settwo()       
}
function setgame(){
    board=[[0,0,0,0],
           [0,0,0,0],
           [0,0,0,0],
           [0,0,0,0]]
    for(let r=0;r<rows;r++){
        for(let c=0;c<coloumn;c++){
            let tile =document.createElement("div")
            tile.id= r.toString()+'-'+c.toString()
            let num =board[r][c]
            updatetile(tile,num)
            document.getElementById("board").append(tile)
        }
    }
    settwo()
    settwo()

}
function updatetile(tile,num){
    tile.innerText=""
    tile.classList.value=""
    tile.classList.add("tile")
    if(num>0){
        tile.innerText=num
        if(num<=4096){
            tile.classList.add("x"+num.toString())
        }
        else{
            tile.classList.add("x8192")
        } 
    }
}
document.addEventListener("keyup",(e) => {
    if(e.code == "ArrowLeft"){
      slideleft()
    let h=Math.random()  
      if (h >= 0 && h < 0.9) {
       settwo()
    } 
    else if (h >= 0.9 && h < 1){
        setfour()
    }
    
      
      invalidchecker()  
    }
    
    else if(e.code == "ArrowRight"){
        slideright()
        let h=Math.random()  
        if (h >= 0 && h < 0.9) {
             settwo()
    } 
        else if (h >= 0.9 && h < 1){
             setfour()
    }
        invalidchecker()  
      }

    else if(e.code == "ArrowUp"){
        slideup()
        let h=Math.random()  
        if (h >= 0 && h < 0.9) {
            settwo()
    } 
        else if (h >= 0.9 && h < 1){
            setfour()
    }
        invalidchecker()  
      } 

    else if(e.code == "ArrowDown"){
        slidedown()
        let h=Math.random()  
        if (h >= 0 && h < 0.9) {
           settwo()
    } 
        else if (h >= 0.9 && h < 1){
           setfour()
    }
        invalidchecker()  
        
      } 
    document.getElementById("score").innerText=score  
    localStorage.setItem('highscore',score)
    
    }   
)
function invalidchecker(){
     t=0
     k=0
    
    for(let r=0;r<rows;r++){
         let rowchecker =board[r]
         for(let i=0; i < (rowchecker.length-1); i++){
            if(rowchecker[i] != rowchecker[i+1] && rowchecker[i]!=0 && rowchecker[i+1]!=0){
                t=t+1
            }
         }
    }
    for(let r=0;r<rows;r++){
        let coloumnchecker=[board[0][r],board[1][r],board[2][r],board[3][r]]
        for(let j=0; j < (coloumnchecker.length-1); j++){
            if(coloumnchecker[j] != coloumnchecker[j+1] && coloumnchecker[j]!=0 && coloumnchecker[j+1]!=0){
               k=k+1
            }
    }}
    if(t==12 && k==12){
        return reset()
    }
}       


function filterzero(row){
    return row.filter(num => num!=0)
   
    }

function slide(row,){
    row=filterzero(row)
    for(let i=0; i < (row.length-1); i++){
        if(row[i] == row[i+1]){
            row[i]*=2
            row[i+1]=0
            score += row[i];
            }
        }
       
    
    
        
    row=filterzero(row) 
    while(row.length<coloumn){
        row.push(0)
        
    }
    return row
}

  
 
function slideleft(){
    
    for(let r=0; r<rows;r++){
        let row =board[r]
        row=slide(row)
        board[r]=row
        for(let c=0; c<coloumn; c++){
            let tile=document.getElementById(r.toString()+'-'+c.toString())
            let num=board[r][c]
            updatetile(tile,num)

        }
    }
}
function slideright(){
    
    for(let r=0; r<rows;r++){
        let row =board[r]
        row.reverse()
        row=slide(row)
        row.reverse()
        board[r]=row
        for(let c=0; c<coloumn; c++){
            let tile=document.getElementById(r.toString()+'-'+c.toString())
            let num=board[r][c]
            updatetile(tile,num)

        }
    }
}
function slideup(){
    
    for(let c=0; c<coloumn;c++){
        let row =[board[0][c],board[1][c],board[2][c],board[3][c]]
        row=slide(row)
       
        for(let r=0; r<rows; r++){
            board[r][c]=row[r]
            let tile=document.getElementById(r.toString()+'-'+c.toString())
            let num=board[r][c]
            updatetile(tile,num)

        }
    }
}
function slidedown(){
    
    for(let c=0; c<coloumn;c++){
        let row =[board[0][c],board[1][c],board[2][c],board[3][c]]
        row.reverse()
        row=slide(row)
        row.reverse()
       
        for(let r=0; r<rows; r++){
            board[r][c]=row[r]
            let tile=document.getElementById(r.toString()+'-'+c.toString())
            let num=board[r][c]
            updatetile(tile,num)

        }
    }
}
function isfull(){
    for(let i=0;i<rows;i++){
        for(let j=0;j<coloumn;j++){
            if(board[i][j] == 0){
                return true
            }

        }
    }
    return false
}
function settwo(){
    if(!isfull()){
        return
    }
    let found=true
    
    while(found){
        let h= Math.random()
        let v=Math.floor(Math.random()*rows)
        let x=Math.floor(Math.random()*coloumn)
        if(board[v][x]==0){
           
                board[v][x]=2
                let newtile=document.getElementById(v.toString()+'-'+x.toString())
                newtile.classList.add('x2')
                newtile.innerText='2'
                console.log('2')
                found=false
            
         
        }

    }
}
function setfour(){
    if(!isfull()){
        return
    }
    let found=true
    
    while(found){
        let h= Math.random()
        let v=Math.floor(Math.random()*rows)
        let x=Math.floor(Math.random()*coloumn)
        if(board[v][x]==0){
           
            
                board[v][x]=4
                let newtile=document.getElementById(v.toString()+'-'+x.toString())
                newtile.classList.add('x4')
                newtile.innerText='4'
                console.log('4')
                found=false
            }    
        }

    }




