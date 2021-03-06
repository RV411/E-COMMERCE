const express=require('express');
const {Product}=require('../models/product');
const {Category} = require('../models/category');
const router=express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const FILE_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpeg',
    'image/jpg':'jpg',
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid=FILE_TYPE_MAP[file.mimetype];
        let uploadError=new Error('Tipo de archivo no valido');
        if(isValid){uploadError=null}
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {
      const fileName=file.originalname.split(' ').join('-');
      const extension=FILE_TYPE_MAP[file.mimetype];
      cb(null,`${fileName}-${Date.now()}.${extension}`)
    }
})

const uploadOptions=multer({storage:storage});

// app.get('/',(req,res)=>{
// app.get(api+'/product',(req,res)=>{
router.get(`/`,async(req,res)=>{
    // localhost:3000/api/v1/products?categories=2342342,234234
    let filter = {};
    if(req.query.categories){
         filter = {category: req.query.categories.split(',')}
    }

    const productList = await Product.find(filter).populate('category');

    if(!productList){
        res.status(550).json({success:false})
    }
    
    res.send(productList);
})
    
router.get(`/:id`,async(req,res)=>{
    const product=await Product.findById(req.params.id).populate('category');

    
    if(!product){
        res.status(550).json({success:false})
    }
    
    res.send(product);
})
    
router.post(`/`,uploadOptions.single('image'),async(req,res)=>{
        const category= await Category.findById(req.body.category);
        if(!category)return res.status(400).send('Categoria invalida')

        const file=req.file;
        if(!file)return res.status(400).send('No hay imagenes');

        const fileName=file.filename;
        const basePath=`${req.protocol}://${req.get('host')}/public/uploads/`;
        let product=new Product({
            name:req.body.name,
            description:req.body.description,
            richDescription:req.body.richDescription,
            image:`${basePath}${fileName}`,//"http://localhost:3000/public/uploads/image.jpg"
            brand:req.body.brand,
            price:req.body.price,
            category:req.body.category,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            numReviews:req.body.numReviews,
            isFeatured:req.body.isFeatured
        })

        product=await product.save();

        if(!product)
        return res.status(500).send('El producto no puede ser creado');

        res.send(product);
    })

router.put('/:id',uploadOptions.single('image'),async(req,res)=>{
    if(!mongoose.isValidObjectId(req.params.id)){
        return res.status(400).send('ID invalido')
    }
    const category= await Category.findById(req.body.category);
    if(!category)return res.status(400).send('Categoria invalida')

    const product=await Product.findById(req.params.id);
    if(!product)return res.status(400).send('Producto invalida');

    const file=req.file;
    let imagepath;

    if(file){
        const fileName=file.filename;
        const basePath=`${req.protocol}://${req.get('host')}/public/uploads/`;
        imagepath=`${basePath}${fileName}`
    }else{
        imagepath=product.image;
    }
    
    const uploadproduct=await Product.findByIdAndUpdate(
        req.params.id,
        {
            name:req.body.name,
            description:req.body.description,
            richDescription:req.body.richDescription,
            image:imagepath,
            brand:req.body.brand,
            price:req.body.price,
            category:req.body.category,
            countInStock:req.body.countInStock,
            rating:req.body.rating,
            numReviews:req.body.numReviews,
            isFeatured:req.body.isFeatured
        },
        {new:true})

    if(!uploadproduct)
    return res.status(500).send('No se puede actualizar el producto');

    res.send(uploadproduct);
})

router.delete('/:id', (req,res)=>{
    Product.findByIdAndRemove(req.params.id).then(product=>{
        if(product){
            return res.status(200).json({success:true,message:'El producto fue eliminada'});
        }else{
            return res.status(404).json({success:false,message:'El producto no fue encontrada'});
        }
    }).catch(err=>{
        return res.status(400).json({success:false,error:err})
    })
})

router.get(`/get/count`, async (req, res) =>{
    const productCount = await Product.countDocuments()
    // Este no se ocupa porque ya se esta usando mongoose
    // const productCount = await Product.countDocuments((count) => count)
    if(!productCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        productCount: productCount
    });
})

router.get(`/get/featured/:count`, async (req, res) =>{
    const count=req.params.count ? req.params.count:0
    const products = await Product.find({isFeatured:true}).limit(+count);
    if(!products) {
        res.status(500).json({success: false})
    } 
    res.send(products);
})

router.put('/gallery-images/:id',
    uploadOptions.array('images',10),async(req,res)=>{
        if(!mongoose.isValidObjectId(req.params.id)){
            return res.status(400).send('ID invalido')
        }
        const files=req.files;
        const basePath=`${req.protocol}://${req.get('host')}/public/uploads/`;
        let imagesPaths=[];
        
        if(files){
            files.map((file)=>{
                imagesPaths.push(`${basePath}${file.fileName}`);
            })
        }

        const product=await Product.findByIdAndUpdate(
            req.params.id,
            {
                images:imagesPaths
            },
            {new:true}
        )
        if(!product)return res.status(500).send('No se puede actualizar el producto');

        res.send(product);
})

module.exports=router;
    