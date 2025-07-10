export function isAdmin(req,res,next){
    if (!req.user){
        return res.status(401).json({message:'Unathorized: No user info ' })
    }
    if (req.user?.role !== 'admin'){
        return res.status(403).json({
            message: 'Forbidden: Admins Only is granted access rights here '
        })
    }
    next();
}