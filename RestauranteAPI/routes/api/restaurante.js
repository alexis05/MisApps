const express = require("express");
const router = express.Router();
const RestauranteServicio = require("../../servicios/restaurante/restaurante");

const restServicio = new RestauranteServicio();

router.get("/", async function(req, res, next){
    const { tags } = req.query;
    try {
        const restaurantes = await restServicio.getRestaurantes({tags});
        res.status(200).json({
            data: restaurantes,
            mensaje: "OK"
        })
    } catch (err){
        next(err)
    }
})


module.exports = router