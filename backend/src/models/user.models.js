import mongoose, {Schema} from "mongoose";

const userSchema = new Schema(
    {
        name:{
            type:String,
            required:true,

        },
        email:{
            type:String,
            unique:true,
        },
        password:{
            type:String,
        },
        cart:{
            type:Object,
        },
        date:{
            type:Date,
            default:Date.now(),
        }
    },
    {
        timestamps: true
    }
)

export const User = mongoose.model("User", userSchema)
