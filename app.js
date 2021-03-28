
const express=require('express');
const morgan =require('morgan');
const { render } = require('ejs');
var firebase = require('firebase');


var firebaseConfig = {
    apiKey: "AIzaSyDJ75bHXYVKwwjyNZapyyK-gMam_3ia5KM",
    authDomain: "medloc-d3fcd.firebaseapp.com",
    projectId: "medloc-d3fcd",
    storageBucket: "medloc-d3fcd.appspot.com",
    messagingSenderId: "15189362373",
    appId: "1:15189362373:web:e16dee835f4118483a52ac",
    measurementId: "G-Z0N7WCHXH8"
  };


var  fire= firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
const auth =firebase.auth();
var auth_status=false;
let current_user;

auth.onAuthStateChanged(user =>{

    if(user){
        console.log("user loged-in")
        auth_status=true;
        current_user=user
    }
    else{
        console.log("user loged-out")
        auth_status=false;
    }
})

// express app
const app = express();

// register view engine
app.set('view engine', 'ejs');

// listening for request
app.listen(process.env.PORT || 3000);

//static files
app.use('/static',express.static('assets'));
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res) =>{
    res.render('index',{navlogut:auth_status});
});

app.get('/dash',(req,res) =>{
    res.render('dash',{navlogut:auth_status});
});

app.get('/login',(req,res) =>{
    if(auth_status)
    {
        res.redirect('/dashboard');
    }
    else{
        res.render('login',{loginError:false,navlogut:auth_status});
    }
   
});



app.post('/dashboard-update',(req,res) =>{



    console.log(req.body)
    let stock=false
    if(req.body.aval=='Available'){
        stock=true
    }
    db.collection('medicineList').doc(auth.currentUser.uid).collection('list').doc(req.body.uid).update({
        available:stock, 
    }).then(()=>{
        res.redirect('/dashboard');
    })        





    // if(auth_status)
    // {
    //     db.collection('pharmacy').doc(auth.currentUser.uid).get().then((dat)=>{
    //         console.log(dat.data())
    //         const dock=db.collection('medicineList').doc(auth.currentUser.uid)
    //         const  collections = dock.collection('list');
    //         collections.get().then((d)=>{
    //             let medlist=[]
    //             d.forEach(doc =>{
    //                 // console.log(doc.data());
    //                 // renderList(doc)
    //                 medlist.push({data:doc.data(),uid:doc.id})
    //             })
    //             console.log(medlist)
    //             res.render('dashboard',{navlogut:auth_status,list:medlist});
                
                
    //         })
            
    //         // collections.doc().forEach(collection => {
    //         // console.log('Found subcollection with id:', collection.id);
    //         // });
            
            
    //     })
       
        
    // }
    // else{
    //     res.redirect('/login');
    // }
    
});

app.get('/dashboard',(req,res) =>{
    if(auth_status)
    {
        db.collection('pharmacy').doc(auth.currentUser.uid).get().then((dat)=>{
            console.log(dat.data())
            const dock=db.collection('medicineList').doc(auth.currentUser.uid)
            const  collections = dock.collection('list');
            collections.get().then((d)=>{
                let medlist=[]
                d.forEach(doc =>{
                    // console.log(doc.data());
                    // renderList(doc)
                    medlist.push({data:doc.data(),uid:doc.id})
                })
                console.log(medlist)
                res.render('dashboard',{navlogut:auth_status,list:medlist});
                
                
            })
            
            // collections.doc().forEach(collection => {
            // console.log('Found subcollection with id:', collection.id);
            // });
            
            
        })
       
        
    }
    else{
        res.redirect('/login');
    }
    
});

app.get('/register', (req, res) => {
    res.render('register',{navlogut:auth_status});
  });
  
  app.get('/logout', (req, res) => {
    auth.signOut();
    res.redirect('/');
  });


app.post('/register-user', (req, res) => {
    console.log(req.body)
    db.collection('User-request').add({
        name:req.body.name,
        mailId:req.body.mailId,
        pharmacyName:req.body.pharmacyName,
        address:req.body.address,
        phone:req.body.phone
    }).then(()=>{
        res.render('register_success',{navlogut:auth_status});
    })
   
});

app.post('/login', (req, res) => {
    console.log(req.body)
    auth.signInWithEmailAndPassword(req.body.mailId,req.body.password).then((cred)=>{   
        console.log(cred.user.uid)
       
        
        res.redirect('/dashboard');
    },reason => {
        console.error(reason); // Error!
        res.render('login',{loginError:true,navlogut:auth_status});
      })




    // db.collection('User-request').add({
    //     name:req.body.name,
    //     mailId:req.body.mailId,
    //     pharmacyName:req.body.pharmacyName,
    //     address:req.body.address,
    //     phone:req.body.phone
    // }).then(()=>{
    //     res.render('register_success',{});
    // })
   
});

app.post('/dashboard', (req, res) => {
    console.log(req.body)
    console.log(auth.currentUser.uid)
    let stock=false
    if(req.body.avalibility=='Available'){
        stock=true
    }
    db.collection('medicineList').doc(auth.currentUser.uid).collection('list').add({
        name:req.body.medicineName,
        available:stock,
        chemicalCombination:req.body.chemicalCombination,
       
    }).then(()=>{
        res.redirect('/dashboard');
    })                       


   
});


// redirect
app.get('/about-us',(req,res) =>{
    res.redirect('/about');
});

// 404 page
// app.use((req,res)=>{
//     // res.status(404).sendFile('./views/404.html',{root: __dirname});
//     res.render('404',{ title:'404'});
// });