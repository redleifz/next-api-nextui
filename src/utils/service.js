'use client'
export const getUserInfo  = () => {
    const userInfo = localStorage.getItem('userInfo');
    // if (!userInfo) {
    //   // Handle the case when the token is not available, e.g., redirect to login
    //   // You can replace this with your specific logic
    //   window.location.href = '/'; // Redirect to the login page
    // }
    return JSON.parse(userInfo);
  };
  