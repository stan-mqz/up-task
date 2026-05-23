import { Request, Response, NextFunction } from "express"
import { validationResult } from "express-validator" 

export const handleInputErrors = (req : Request, res: Response, next: NextFunction) => {

    //Si encuentra errores en el request se almacenan en la variable
    let errors = validationResult(req)


    //Si existen errores se mandan como array en la response
    if (!errors.isEmpty) {
        return res.status(400).json({errors: errors.array()})
    }


    next()
}