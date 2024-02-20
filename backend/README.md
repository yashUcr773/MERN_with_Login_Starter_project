# MERN_with_Login_Starter_project

# Functionalities
- Login
- Logout
- Auth using JWT with access token and refresh token
- Data stored in inmemory files at the moment (Shift to Mongo or postgres)

# TechStack
- Nodejs
- Express

# Todos
- Add logger and global error catcher
- Add user functionalities
    - update user
    - add role / remove role
    - send data based on role on get user [admin sees all, editor sees roles, user sees name and id.]
    - Update to make only 1 db call to create user and set refresh token

# Env Vars
- ACCESS_TOKEN_SECRET
- REFRESH_TOKEN_SECRET
- ACCESS_TOKEN_EXPIRY
- REFRESH_TOKEN_EXPIRY

# Referred from 
- Youtube - https://www.youtube.com/watch?v=f2EqECiTBL8&t=18860s
- Github - https://github.com/gitdagray/node_js_resources