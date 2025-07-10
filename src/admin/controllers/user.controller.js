const userService= require('../services/services/user.service');

async function getAllUsers(req,res){
    try{
        const users= await userService.getAllUsers();
        res.status(200).json({users});
    }catch(err){
        console.error('Error fetching users:',err);
        res.status(500).json({
            message: 'Failed to fetch users',error:err.message
        })
    }
}


module.exports={
    getAllUsers,
}