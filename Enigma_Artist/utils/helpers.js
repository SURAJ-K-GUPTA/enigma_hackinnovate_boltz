//truncate
const truncateArt = art =>{
    if(art.length>100){
        return art.substring(0,100) + "..."
    }
    return art;
}

module.exports = {
    truncateArt,
}