`Frontend`

- create vite+react
- tailwindcss and daisyui
- setup of Navbar
- Installation of react-router-dom

`Payment integration`

- created payment page, routers
- Creating API for the backend createOrder
- handlePlan apis by passing the membership type like silver and gold
- with handlePlan make an api call to create order request

# open pop up

- we have to include the script tag in index.html

` chat with socket.io`

- create Chat page on /chat/:targetUserId (receiver)
- Backend setup for socket.io

- npm i socket.io-client
- configure socket.io-client as socketClient.js file

- use it in chat component as useEffect method where we need to emit the events
  ex - socket.emit("joinChat", { loggedInUser, targetUserId });
