
require('dotenv').config();
const http = require('http');
const app = require('./index');
const cors = require("cors");
const { Server } = require("socket.io");
const ChatType = require('./model/chatType');
const RefferalChatType = require('./model/refferalChatType');
const chatMessage = require('./model/chatMessageSchema');
const User = require('./model/userSchema');
const Admin = require('./model/adminSchema');
const Member = require('./model/memberSchema');
const RefferalChatMessage = require('./model/refferalChatMessageSchema');
const StateChatType = require('./model/StateChatTypeSchema');
const StateHandler = require('./model/stateHandlerSchema');
const StateChatMessage = require('./model/StateChatMessageSchema');
const FrenchChatType = require('./model/FrenchChatTypeSchema');
const Frenchisee = require('./model/frenchiseSchema');
const FrenchChatMessage = require('./model/FrenchChatMessageSchema');
const BusinessDeveloperChatMessage = require('./model/BusinessDeveloperChatMessageSchema');
const BusinessDeveloperChatType = require('./model/BusinessDeveloperChatTypeSchema');
const BusinessDeveloper = require('./model/businessDeveloperSchema');



// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3001","http://localhost:3002"],
        methods: ["GET", "POST"]
    }
})



io.on("connection", (socket) => {
    console.log(`User Connnected : ${socket.id}`);

    socket.on("join_room", (data, type) => {
        socket.join(data);
        const data1 = data;
        console.log(`User with Id: ${socket.id} joined room : ${data}`)
        console.log(typeof (data), type, '38');
        if (type === 'USER') {

            ChatType.find({ userid: data1 }, (err, result) => {
                if (err) {
                    console.error(err);
                    // Handle the error response here
                } else {
                    if (result) {
                        const resultLength = Object.keys(result).length;
                        console.log('Result length:', resultLength);
                        if (resultLength === 0) {
                            const user = ChatType({ userid: data1 })
                            user.save();

                        }
                    }
                    User.updateOne(
                        { userid: data1 },
                        { $set: { isOnline: true } },
                        (err, result) => {
                          if (err) {
                            console.error('Failed to update document:', err);
                            return;
                          }
                          //userOnline
                          socket.to(data).emit("userOnline", data1);
                        //   console.log('Document updated successfully');
                        //   console.log('Modified document count:', result.modifiedCount);
                        }
                      );

                    // Handle the result/response here
                }
            });


        }

        if (type === 'REFFERAL') {

            RefferalChatType.find({ memberid: data1 }, (err, result) => {
                if (err) {
                    console.error(err);
                    // Handle the error response here
                } else {
                    if (result) {
                        const resultLength = Object.keys(result).length;
                        console.log('Result length:', resultLength);
                        if (resultLength === 0) {
                            const member = RefferalChatType({ memberid: data1 })
                            member.save();

                        }
                    }
                    Member.updateOne(
                        { memberid: data1 },
                        { $set: { isOnline: true } },
                        (err, result) => {
                          if (err) {
                            console.error('Failed to update document:', err);
                            return;
                          }
                          //userOnline
                          socket.to(data).emit("memberOnline", data1);
                        //   console.log('Document updated successfully');
                        //   console.log('Modified document count:', result.modifiedCount);
                        }
                      );

                    // Handle the result/response here
                }
            });


        }

        if (type === "ADMIN") {
            Admin.updateOne(
            { admin_id: "admin" },
            { $set: { isOnline: true } },
            (err, result) => {
              if (err) {
                console.error('Failed to update document:', err);
                return;
              }
              //userOnline
              socket.to(data).emit("adminOnline", data1);
           
            }
          );
        }
        
        // state Type
        if (type === 'STATE') {
            console.log(data1,"137")
            StateChatType.find({ stateHandlerId: data1 }, (err, result) => {
                if (err) {
                    console.error(err);
                    // Handle the error response here
                } else {
                    if (result) {
                        const resultLength = Object.keys(result).length;
                        console.log('Result length:', resultLength);
                        if (resultLength === 0) {
                            const stateHandler = StateChatType({ stateHandlerId: data1 })
                            stateHandler.save();
                        }
                    }
                    StateHandler.updateOne(
                        {stateHandlerId: data1 },
                        { $set: { isOnline: true } },
                        (err, result) => {
                          if (err) {
                            console.error('Failed to update document:', err);
                            return;
                          }
                          //userOnline
                          socket.to(data).emit("userOnline", data1);
                        }
                      );
                }
            });
        }

        if (type === 'FRENCH') {

            FrenchChatType.find({ frenchiseId: data1 }, (err, result) => {
                if (err) {
                    console.error(err);
                    // Handle the error response here
                } else {
                    if (result) {
                        const resultLength = Object.keys(result).length;
                        console.log('Result length:', resultLength);
                        if (resultLength === 0) {
                            const frenchise = FrenchChatType({frenchiseId: data1 })
                            frenchise.save();

                        }
                    }
                    Frenchisee.updateOne(
                        { frenchiseId: data1 },
                        { $set: { isOnline: true } },
                        (err, result) => {
                          if (err) {
                            console.error('Failed to update document:', err);
                            return;
                          }
                          //userOnline
                          socket.to(data).emit("frenchiseOnline", data1);
                        //   console.log('Document updated successfully');
                        //   console.log('Modified document count:', result.modifiedCount);
                        }
                      );

                    // Handle the result/response here
                }
            });
        }

        if (type === 'BUSINESS') {

            BusinessDeveloperChatType.find({ businessDeveloperId: data1 }, (err, result) => {
                if (err) {
                    console.error(err);
                    // Handle the error response here
                } else {
                    if (result) {
                        const resultLength = Object.keys(result).length;
                        console.log('Result length:', resultLength);
                        if (resultLength === 0) {
                            const businessD = BusinessDeveloperChatType({businessDeveloperId: data1 })
                            businessD.save();

                        }
                    }
                    BusinessDeveloper.updateOne(
                        { businessDeveloperId: data1 },
                        { $set: { isOnline: true } },
                        (err, result) => {
                          if (err) {
                            console.error('Failed to update document:', err);
                            return;
                          }
                          console.log('updated to true',result)
                          //userOnline
                          socket.to(data).emit("businessOnline", data1);
                        }
                      );

                    // Handle the result/response here
                }
            });


        }

    })

    // chatting system
    socket.on("userMessage", (data) => {
        console.log(data);
        const { room, author, message, time } = data;
        const newChat = new chatMessage({ room, author, message, time });
        newChat.save()
            .then((savedChat) => {

                console.log('User message saved:', savedChat);
              
            })
            .catch((error) => {
                console.error('Error saving user message:', error);

            });
        socket.to(data.room).emit("admin_receive_message", data);
         // Emit a notification event to the admin
        
        
        
    })

    // refferal chatting

    socket.on("refferalMessage", (data) => {
        console.log(data);
        const { room, author, message, time } = data;
        const newChat = new RefferalChatMessage({ room, author, message, time });
        newChat.save()
            .then((savedChat) => {
                console.log('Refferal message saved:', savedChat);
            })
            .catch((error) => {
                console.error('Error saving refferal message:', error);

            });
        socket.to(data.room).emit("admin_receive_message", data);
    })
    // --------------

    socket.on("adminMessgae", (data) => {
        const { room, author, message, time } = data;
        const newChat = new chatMessage({ room, author, message, time });
        newChat.save()
            .then((savedChat) => {
                console.log('User message saved:', savedChat);
            })
            .catch((error) => {
                console.error('Error saving user message:', error);

            });
        socket.to(data.room).emit("user_receive_message", data);
    })

    // admin-refferal message
    socket.on("adminMessgaeRefferal", (data) => {
        const { room, author, message, time } = data;
        const newChat = new RefferalChatMessage({ room, author, message, time });
        newChat.save()
            .then((savedChat) => {
                console.log('Refferal message saved:', savedChat);
            })
            .catch((error) => {
                console.error('Error saving refferal message:', error);

            });
        socket.to(data.room).emit("refferal_receive_message", data);
    })
    // ------------

    // state message

    socket.on("stateMessage", (data) => {
        console.log(data);
        const { room, author, message, time } = data;
        const newChat = new StateChatMessage({ room, author, message, time });
        newChat.save()
            .then((savedChat) => {

                console.log('State message saved:', savedChat);
              
            })
            .catch((error) => {
                console.error('Error saving user message:', error);

            });
        socket.to(data.room).emit("admin_receive_message", data);
         // Emit a notification event to the admin  
    })

    // state-admin message

    socket.on("adminMessgaeState", (data) => {
        const { room, author, message, time } = data;
        const newChat = new StateChatMessage({ room, author, message, time });
        newChat.save()
            .then((savedChat) => {
                console.log('State message saved:', savedChat);
            })
            .catch((error) => {
                console.error('Error saving refferal message:', error);

            });
        socket.to(data.room).emit("state_receive_message", data);
    })

    // frenchise chatting
    socket.on("frenchMessage", (data) => {
        console.log(data);
        const { room, author, message, time } = data;
        const newChat = new FrenchChatMessage({ room, author, message, time });
        newChat.save()
            .then((savedChat) => {

                console.log('Frenchise message saved:', savedChat);
              
            })
            .catch((error) => {
                console.error('Error saving user message:', error);

            });
        socket.to(data.room).emit("admin_receive_message", data);
         // Emit a notification event to the admin  
    })

    // frenchise-admin message

    socket.on("adminMessgaeFrench", (data) => {
        const { room, author, message, time } = data;
        const newChat = new FrenchChatMessage({ room, author, message, time });
        newChat.save()
            .then((savedChat) => {
                console.log('French message saved:', savedChat);
            })
            .catch((error) => {
                console.error('Error saving refferal message:', error);

            });
        socket.to(data.room).emit("french_receive_message", data);
    })

    // Business developer chatting
    socket.on("businessMessage", (data) => {
        console.log(data);
        const { room, author, message, time } = data;
        const newChat = new BusinessDeveloperChatMessage({ room, author, message, time });
        newChat.save()
            .then((savedChat) => {

                console.log('BusinessD message saved:', savedChat);
              
            })
            .catch((error) => {
                console.error('Error saving user message:', error);

            });
        socket.to(data.room).emit("admin_receive_message", data);
         // Emit a notification event to the admin  
    })

    // BusinessD-admin message

    socket.on("adminMessgaeBusiness", (data) => {
        const { room, author, message, time } = data;
        const newChat = new BusinessDeveloperChatMessage({ room, author, message, time });
        newChat.save()
            .then((savedChat) => {
                console.log('BusinessD message saved:', savedChat);
            })
            .catch((error) => {
                console.error('Error saving refferal message:', error);

            });
        socket.to(data.room).emit("business_receive_message", data);
    })

    //User logout event
    socket.on('userLogout', (userId)=>{ 
        console.log('126');
        User.updateOne(
            { userid: userId },
            { $set: { isOnline: false } },
            (err, result) => {
              if (err) {
                console.error('Failed to update document:', err);
                return;
              }
            socket.to(userId).emit("userOffline", userId);
            }
          );  
    })


     //Refferal logout event
     socket.on('refferalLogout', (memberId)=>{ 
        console.log('126');
        Member.updateOne(
            { memberid: memberId },
            { $set: { isOnline: false } },
            (err, result) => {
              if (err) {
                console.error('Failed to update document:', err);
                return;
              }
            socket.to(memberId).emit("refferalOffline", memberId);
            }
          );  
    })

    //admin logout event
    socket.on('adminLogout',(adminId) => {
        console.log(adminId,'155');
        Admin.updateOne(
            {admin_id:adminId},
            {$set:{isOnline:false}},
            (err,result) => {
                if(err){
                    console.error('failed to update document:',err);
                    return;
                }
                socket.to(adminId).emit("falnaOffline",adminId);
            }
        );
    })

    // stateHandler logout

    socket.on('stateLogout', (userId)=>{ 
        console.log('126');
        StateHandler.updateOne(
            { stateHandlerId: userId },
            { $set: { isOnline: false } },
            (err, result) => {
              if (err) {
                console.error('Failed to update document:', err);
                return;
              }
            socket.to(userId).emit("stateOffline", userId);
            }
          );  
    })

     // Franchisee logout

     socket.on('frenchLogout', (userId)=>{ 
        console.log('126');
        Frenchisee.updateOne(
            { frenchiseId: userId },
            { $set: { isOnline: false } },
            (err, result) => {
              if (err) {
                console.error('Failed to update document:', err);
                return;
              }
            socket.to(userId).emit("frenchOffline", userId);
            }
          );  
    })

    // BusinessD logout

    socket.on('businessLogout', (userId)=>{ 
        console.log('126');
        BusinessDeveloper.updateOne(
            { businessDeveloperId: userId },
            { $set: { isOnline: false } },
            (err, result) => {
              if (err) {
                console.error('Failed to update document:', err);
                return;
              }
            socket.to(userId).emit("businessOffline", userId);
            }
          );  
    })

    socket.on("disconnect", () => {
        console.log(`user ${socket.id} disconnected`);
        // const userId = Object.keys(users).find((key)=>users[key] === socket.id);
        // if(userId){
        //     delete users[userId];
        //     io.emit('userOffline', userId);
        // }
    })
})





server.listen(process.env.PORT);

console.log('hiii from server');