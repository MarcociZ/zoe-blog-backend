##Technologies to use in backend:

NodeJs/ES6 v21.6.0 - is used to implement node commants for web server inmplementation

Express+Validator - library is used in order to start up the web server on mycomputer and write routing . Common routes were written for get, post, patch and delete APIs, as well as use() for specifing middleware as the callback function like: corse() for setting acces from othe IP, express.json() for parsing incoming requests with JSON payloads or express.static('uploads') to serve static files such as images, CSS files, and JavaScript files from a specified directory. 

MongoDB/Mongoose - is used to store data from posts and users. Mongoose is the Mongo Db application used for convinient control of stored information.

SON Web Token - jwt for make a secure layer for sensitive information(like id, which is used for further authentication)

Multer / FS file system library 
- the library is used for downloading files and images. Most used commands (upload(); multer.discStorage(); new Multer)

Bcrypt -for password encryption
