import mongoose from 'mongoose';
const bookingSchema=new mongoose.Schema({
    bookingType:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    phone:{type:String,required:true},
    date:{type:String},
    service:{type:String,default:'SEO Strategy'},
    status:{type:String,default:'Pending'},
},
{
    timestamps:true
})

export default mongoose.model('Booking',bookingSchema);