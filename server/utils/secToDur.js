export function convertSecToDuration(timeSecond){
    const  hh = Math.floor(timeSecond/3600)
    const mm = Math.floor((timeSecond%3600)/60);
    const ss = Math.floor((timeSecond%3600)%60)
    if(hh>0){
        return `${hh}h ${mm}m`;
    }else if(mm>0){
        return `${mm}m ${ss}s`;
    }else return   `${ss}s`;

}
// export default {convertSecToDuration}
