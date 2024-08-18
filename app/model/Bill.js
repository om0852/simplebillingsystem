import { model, models, Schema } from "mongoose"

const ModelSchema = new Schema({
no:Number,
items:Array,
total:Number
},{timestamp:true})

const Bill = models.bill || model("bill",ModelSchema)
export default Bill;