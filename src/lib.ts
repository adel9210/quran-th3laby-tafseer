export const isMobile = ()=>{
    const mobileBreakpoint = 960; // Adjust this value based on your design

    return window.innerWidth < mobileBreakpoint;
}