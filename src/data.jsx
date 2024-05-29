export const api_key="AIzaSyALF4NH4iUVynFf_m1OZxW_0tDPUXt7Yf8";
export const value_convertor=(value)=>{
    if(value>=1000000){
        return Math.floor(value/1000000)+"M"
    }
    else if(value>=1000){
        return Math.floor(value/1000)+"K"
    }
    else{
        return value
    }
}