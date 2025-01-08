import Client from "../models/client.model.js";




export const createClient =async(req,res,next)=>{

    const newClient = new Client({
        ...req.body

    })

    try {
        const savedClient = await newClient.save();
        res.status(201).json(savedClient);
    } catch (error) {
       next(error); 
    }


}
export const getClients = async(req,res,next)=>{
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection = req.query.sort === 'asc' ? 1 : -1 ;
        const clients = await Client.find({
            ...(req.query.clientId && { _id: req.query.clientId }),
        })
        .sort({updatedAt:sortDirection})
        .skip(startIndex)
        .limit(limit);
        const totalClients = await Client.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(now.getFullYear(),now.getMonth()-1,now.getDate());
        const lastMonthClients = await Client.countDocuments({createdAt:{$gte:oneMonthAgo}})
        res.status(200).json({clients,totalClients,lastMonthClients});
    } catch (error) {
      next(error);
    }
}
export const deleteClient =async(req,res,next)=>{
    try {
     await Client.findByIdAndDelete(req.params.clientId);
     res.status(200).json("Client has been deleted");
    } catch (error) {
     next(error);
    }
 }
 export const updateClient =async(req,res,next)=>{
    
    try {
        const updatedClient = await Client.findByIdAndUpdate(req.params.clientId,{
            $set:{
                name:req.body.name,
                email:req.body.email,
                address:req.body.address,
                phoneNumber:req.body.phoneNumber,
                inscriptionDate:req.body.inscriptionDate,
                category:req.body.category,

            }},{new:true})
            res.status(200).json(updatedClient);

      
    } catch (error) {
        next(error);    
    }
}
export const getClientSearch =async(req,res,next)=>{
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        //1 for asc and -1 for desc
        const sortDirection = req.query.order === 'asc' ? 1 : -1;
        const clients = await Client.find({
            //we will get posts depending on many factors like"category" "slug"if the query has the user id return the post of that user id
            ...(req.query.clientId && { _id: req.query.clientId }),
            ...(req.query.category && { category: req.query.category}),
            // if this req.query includes search term we want to search in both for example content and title
            ...(req.query.searchTerm &&{  
                //or allow us to search between title and content
                $or: [
                    { name: { $regex: req.query.searchTerm, $options: 'i' } },
                    { email: { $regex: req.query.searchTerm, $options: 'i' } },
                    { phoneNumber: { $regex: req.query.searchTerm, $options: 'i' } },
                ],

            }),
        }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit)
       
        res.status(200).json(clients);

       

    } catch (error) {
        next(error);
    }
    

}