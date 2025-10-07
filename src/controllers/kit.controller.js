import { connectToDB } from "@/lib/db"
import Kit from "@/models/kit.model";
import Product from "@/models/product.model";


export const getAllKits=async()=>{
      await connectToDB();
      const kits = await Kit.find({}).populate('includes');
      return kits;
}

export const createKit=async(data)=>{
      await connectToDB();
      const newKit = new Kit(data)
      return await newKit.save();
}