import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Jwt  from "jsonwebtoken";


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    
       
    tokens: [{
      token: { type: String,
        required: true,}
    }],
    
  },
  {
    timestamps: true,
  },
 
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateToken = async function() 
{

  try {
    let token = Jwt.sign({_id:this._id}, process.env.JWT_SECRET);

    this.tokens = this.tokens.concat({token:token});

   await this.save();

   return token;

  }
   catch (error) 
  {
    console.log(error);  
  }
}

  // try {
  //   return Jwt.sign({
  //     userId:this._id.toString(),
  //     email:this.email,
  //     isAdmin:this.isAdmin,
  //   },
  //   process.env.JWT_SECRET 
  //   ) 
  // }
  // catch (error) 
  // {
  //   console.log(error);  
  // }
//}

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);

export default User;