var User = require('../../../data.json');
var axios = require('axios');

const saltRounds = 10;
let options = {
    priority: 'high',
    timeToLive: 60 * 60 * 24
  };
module.exports = {
    adminDashboard: async function (req, res) {
      if (req.session && req.session.user && req.session.user.u_name) {
            res.render('admin/index',{
               user: {
                u_name: req.session.user.u_name
              }
            })
          }else{
            res.redirect('/zama-shop/login');
          }
    },
    LoginPage: async function (req, res) {
        res.render('admin/login',{errors:''});
    },
    PostLogin: async function (req, res) {
       let errors = [];
        let email;
        const user = await User.adminuser.filter(x => x.email === req.body.email)

        if (user.length === 0) {
          errors.push({ message: 'Not a registered Email' });
          res.render('admin/login', {
            errors:"Not a registered Email"
          })
        }
        else {

          email = User.adminuser.filter(x => x.email === req.body.email)
          if (email[0].password === req.body.password) {
             if (req.session) {
                req.session.user = {
                  u_name: User.adminuser.find(x => x.email == req.body.email)
                }

                }
              req.session.save();
            res.redirect('/zama-shop/admin/dashboard');
          } else {
            errors.push({ message: 'Not a valid password' });
            if (errors.length > 0) {
              res.render('admin/login', {
                errors: "Not a valid password"
              })
            }
          }
        }     
    },

    logoutUser: async function (req, res) {
        res.render('admin/index');
    },


    ViewAllCities:async function (req, res) {
      if (req.session && req.session.user && req.session.user.u_name) {
       const newCity = await axios.get("http://localhost:3003/city");
       console.log(newCity.data)
            res.render('admin/all-citys',{
              newCity:newCity.data,
              user: {
                u_name: req.session.user.u_name
              }
            });
        }else{
            res.redirect('/zama-shop/login');
          }
    },
    CreateCity:async function (req, res) {
      let idGen = await Math.floor(11000 + Math.random() * 19000);
         var id = idGen;
         var city = req.body.city;
        const newCity = await axios.post("http://localhost:3003/city",{
          id:id,
          cityname:city
        });
        res.redirect('/zama-shop/admin/city');
    },
    deleteCity:async function (req, res) {
       var id = req.params.id;
        const newCity = await axios.delete("http://localhost:3003/city/"+id);
            res.redirect('/zama-shop/admin/city');
    },

    ViewAllCategories:async function (req, res) {
      if (req.session && req.session.user && req.session.user.u_name) {
      const newCategory = await axios.get("http://localhost:3003/categories");
       console.log(newCategory.data)
            res.render('admin/main-categories',{
              newCategory:newCategory.data,
              user: {
                u_name: req.session.user.u_name
              }
            });
        }else{
            res.redirect('/zama-shop/login');
          }
    },

    CreateCategory:async function (req, res) {
       let idGen = await Math.floor(11000 + Math.random() * 19000);
         var id = idGen;
         var categoryy = req.body.category;
        const newCategory = await axios.post("http://localhost:3003/categories",{
          id:id,
          category:categoryy
        });
        res.redirect('/zama-shop/admin/category');
    },

    deleteCategories:async function (req, res) {
      var id = req.params.id;
        const newCategory = await axios.delete("http://localhost:3003/categories/"+id);
           res.redirect('/zama-shop/admin/category');
    },



    ViewAllSubCategories:async function (req, res) {
      if (req.session && req.session.user && req.session.user.u_name) {
       const newCategory = await axios.get("http://localhost:3003/categories");
       const newSubCategory = await axios.get("http://localhost:3003/subCategories")
            res.render('admin/sub-categories',{
              newSubCategory:newSubCategory.data,
              newCategory:newCategory.data,
               user: {
                u_name: req.session.user.u_name
              }
            });
        }else{
            res.redirect('/zama-shop/login');
          }
    },
    CreateSubCategory:async function (req, res) {
       let idGen = await Math.floor(11000 + Math.random() * 19000);
         var id = idGen;
         var categoryy = req.body.category;
         var subCategoryy = req.body.subCategory;
        const newSubCategory = await axios.post("http://localhost:3003/subCategories",{
          id:id,
          category:categoryy,
          subCategory:subCategoryy
        });
        res.redirect('/zama-shop/admin/sub-category');
    },
    deleteSubCategory:async function (req, res) {
      var id = req.params.id;
        const newCategory = await axios.delete("http://localhost:3003/subCategories/"+id);
            res.redirect('/zama-shop/admin/sub-category');
    },


    ViewAllUsers:async function (req, res) {
      if (req.session && req.session.user && req.session.user.u_name) {
       const viewActiveUsers = await axios.get("http://localhost:3003/users");
            res.render('admin/all-users',{
              activeUser:viewActiveUsers.data,
                user: {
                u_name: req.session.user.u_name
              }
            });
        }else{
            res.redirect('/zama-shop/login');
          }
            
    },
    ActiveUsers:async function (req, res) {
      const id = req.params.id;
      var activeUsers = await axios.get("http://localhost:3003/users/"+id)
      if(activeUsers){
        const newCategory = await axios.delete("http://localhost:3003/users/"+id);
       const activeUserss = await axios.post("http://localhost:3003/users",{
        id:id,
        name:activeUsers.data.name,
        email:activeUsers.data.email,
        password:activeUsers.data.password,
        location:activeUsers.data.location,
        following:activeUsers.data.following,
        followers:activeUsers.data.followers,
        active:"InActive",
        block:activeUsers.data.block
       });
            res.redirect('/zama-shop/admin/all-user'); 
          }else{
            res.redirect('/zama-shop/admin/all-user'); 
          }
            
    },
     InActiveUsers:async function (req, res) {
      const id = req.params.id;
      var activeUsers = await axios.get("http://localhost:3003/users/"+id)
      if(activeUsers){
        const newCategory = await axios.delete("http://localhost:3003/users/"+id);
       const activeUserss = await axios.post("http://localhost:3003/users",{
        id:id,
        name:activeUsers.data.name,
        email:activeUsers.data.email,
        password:activeUsers.data.password,
        location:activeUsers.data.location,
        following:activeUsers.data.following,
        followers:activeUsers.data.followers,
        active:"Active",
        block:activeUsers.data.block
       });
            res.redirect('/zama-shop/admin/all-block-user'); 
          }else{
            res.redirect('/zama-shop/admin/all-block-user'); 
          }
            
    },

    ViewAllBlockUsers:async function (req, res) {
      if (req.session && req.session.user && req.session.user.u_name) {
      var blockUsers = await axios.get("http://localhost:3003/users/");
        res.render('admin/block-users',{
          blockUsers:blockUsers.data,
        user: {
                u_name: req.session.user.u_name
              }
            });
        }else{
            res.redirect('/zama-shop/login');
          }
    },
    BlockUsers:async function (req, res) {
        const id = req.params.id;
      var activeUsers = await axios.get("http://localhost:3003/users/"+id)
      if(activeUsers){
        const newCategory = await axios.delete("http://localhost:3003/users/"+id);
       const activeUserss = await axios.post("http://localhost:3003/users",{
        id:id,
        name:activeUsers.data.name,
        email:activeUsers.data.email,
        password:activeUsers.data.password,
        location:activeUsers.data.location,
        following:activeUsers.data.following,
        followers:activeUsers.data.followers,
        active:activeUsers.data.active,
        block:"Block"
       });
            res.redirect('/zama-shop/admin/all-user'); 
          }else{
            res.redirect('/zama-shop/admin/all-user'); 
          }
    },
    deleteUsers:async function (req, res) {
       var id = req.params.id;
        const deleteUser = await axios.delete("http://localhost:3003/users/"+id);
            res.redirect('/zama-shop/admin/all-user');
    },



    ViewAllEmails:async function (req, res) {
            res.render('admin/all-emails');
    },
    CreateEmails:async function (req, res) {
            res.render('admin/all-emails');
    },
    deleteEmails:async function (req, res) {
            res.render('admin/all-emails');
    },


    ViewAllAppBanner:async function (req, res) {
            res.render('admin/all-app-banners');
    },
    CreateAppBanner:async function (req, res) {
            res.render('admin/all-app-banners');
    },
    deleteAppBanner:async function (req, res) {
            res.render('admin/all-app-banners');
    },


    ViewNormalPosts:async function (req, res) {
      if (req.session && req.session.user && req.session.user.u_name) {
      var allPosts = await axios.get("http://localhost:3003/posts");
      console.log(allPosts)
        res.render('admin/normal-post',{
          allPosts:allPosts.data,
        user: {
                u_name: req.session.user.u_name
              }
            });
        }else{
            res.redirect('/zama-shop/login');
          }
       
    },

      ActivePost:async function (req, res) {
      const id = req.params.id;
      var activeUsers = await axios.get("http://localhost:3003/posts/"+id)
      if(activeUsers){
        const newCategory = await axios.delete("http://localhost:3003/posts/"+id);
       const activeUserss = await axios.post("http://localhost:3003/posts",{
        id:id,
        title:activeUsers.data.title,
        price:activeUsers.data.price,
        category:activeUsers.data.category,
        subCategory:activeUsers.data.subCategory,
        location:activeUsers.data.location,
        description:activeUsers.data.description,
        uploadDate:activeUsers.data.uploadDate,
        expiryDate:activeUsers.data.expiryDate,
        active:"InActive",
        sponsored:activeUsers.data.sponsored
       });

            res.redirect('/zama-shop/admin/normal-post'); 
          }else{
            res.redirect('/zama-shop/admin/normal-post'); 
          }
            
    },

    deletePost:async function (req, res) {
       var id = req.params.id;
        const deletePost = await axios.delete("http://localhost:3003/posts/"+id);
            res.redirect('/zama-shop/admin/normal-post');
    },
     ApprovePost:async function (req, res) {
      const id = req.params.id;
      var activeUsers = await axios.get("http://localhost:3003/posts/"+id)
      if(activeUsers){
        const newCategory = await axios.delete("http://localhost:3003/posts/"+id);
       const activeUserss = await axios.post("http://localhost:3003/posts",{
        id:id,
        title:activeUsers.data.title,
        price:activeUsers.data.price,
        category:activeUsers.data.category,
        subCategory:activeUsers.data.subCategory,
        location:activeUsers.data.location,
        description:activeUsers.data.description,
        uploadDate:activeUsers.data.uploadDate,
        expiryDate:activeUsers.data.expiryDate,
        active:activeUsers.data.active,
        status:"Approved",
        sponsored:activeUsers.data.sponsored
       });

            res.redirect('/zama-shop/admin/normal-post'); 
          }else{
            res.redirect('/zama-shop/admin/normal-post'); 
          }
            
    },
     SponsorPost:async function (req, res) {
      const id = req.params.id;
      var activeUsers = await axios.get("http://localhost:3003/posts/"+id)
      if(activeUsers){
        const newCategory = await axios.delete("http://localhost:3003/posts/"+id);
       const activeUserss = await axios.post("http://localhost:3003/posts",{
        id:id,
        title:activeUsers.data.title,
        price:activeUsers.data.price,
        category:activeUsers.data.category,
        subCategory:activeUsers.data.subCategory,
        location:activeUsers.data.location,
        description:activeUsers.data.description,
        uploadDate:activeUsers.data.uploadDate,
        expiryDate:activeUsers.data.expiryDate,
        active:activeUsers.data.active,
        status:activeUsers.data.status,
        sponsored:"Go Normal"
       });

            res.redirect('/zama-shop/admin/normal-post'); 
          }else{
            res.redirect('/zama-shop/admin/normal-post'); 
          }
            
    },




    ViewAllSponsoredPosts:async function (req, res) {
      if (req.session && req.session.user && req.session.user.u_name) {
      var sponsorPost = await axios.get("http://localhost:3003/posts/");
        res.render('admin/sponsored-post',{
          sponsorPost:sponsorPost.data,
        user: {
                u_name: req.session.user.u_name
              }
            });
        }else{
            res.redirect('/zama-shop/login');
          }
    },

       deleteSponsoredPost:async function (req, res) {
       var id = req.params.id;
        const deletePost = await axios.delete("http://localhost:3003/posts/"+id);
            res.redirect('/zama-shop/admin/all/sponsored/post');
    },
     ApproveSponsoredPost:async function (req, res) {
      const id = req.params.id;
      var activeUsers = await axios.get("http://localhost:3003/posts/"+id)
      if(activeUsers){
        const newCategory = await axios.delete("http://localhost:3003/posts/"+id);
       const activeUserss = await axios.post("http://localhost:3003/posts",{
        id:id,
        title:activeUsers.data.title,
        price:activeUsers.data.price,
        category:activeUsers.data.category,
        subCategory:activeUsers.data.subCategory,
        location:activeUsers.data.location,
        description:activeUsers.data.description,
        uploadDate:activeUsers.data.uploadDate,
        expiryDate:activeUsers.data.expiryDate,
        active:activeUsers.data.active,
        status:"Approved",
        sponsored:activeUsers.data.sponsored
       });

            res.redirect('/zama-shop/admin/all/sponsored/post'); 
          }else{
            res.redirect('/zama-shop/admin/all/sponsored/post'); 
          }
            
    },
     SponsorSponsoredPost:async function (req, res) {
      const id = req.params.id;
      var activeUsers = await axios.get("http://localhost:3003/posts/"+id)
      if(activeUsers){
        const newCategory = await axios.delete("http://localhost:3003/posts/"+id);
       const activeUserss = await axios.post("http://localhost:3003/posts",{
        id:id,
        title:activeUsers.data.title,
        price:activeUsers.data.price,
        category:activeUsers.data.category,
        subCategory:activeUsers.data.subCategory,
        location:activeUsers.data.location,
        description:activeUsers.data.description,
        uploadDate:activeUsers.data.uploadDate,
        expiryDate:activeUsers.data.expiryDate,
        active:activeUsers.data.active,
        status:activeUsers.data.status,
        sponsored:"Go to Sponsored"
       });

            res.redirect('/zama-shop/admin/all/sponsored/post'); 
          }else{
            res.redirect('/zama-shop/admin/all/sponsored/post'); 
          }
            
    },





    








}