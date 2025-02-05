export const isAdminUser = (req,res,next) => {
    if(req.userInfo.role !== 'admin') {
        return res.json({
            success : false,
            message : `Access denied! Admin rights required`
        })
    }
    next();
}