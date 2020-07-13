import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import { removeUnicodeText } from '_utils/funcUtil'
import _ from 'lodash';
import {getListWithPagination,BaseProps} from '../base';
const Schema = mongoose.Schema

const UserSchema = new mongoose.Schema(
  {
    Email: { type: String, required: true, unique: true, lowercase: true },
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    SearchName: String,
    Password: {
      type: String,
      set: val => {
        return bcrypt.hashSync(val, 10)
      }
    },
    isVerified:{type:Boolean,default:false},
    IsDisabled: { type: Boolean, default: false },
    Role: { type: Schema.ObjectId, ref: 'RoleModel', autopopulate: { maxDepth: 2 } },
    isForceLogout: { type: Boolean, default: false },

    ...BaseProps
  },
  {
    timestamps: { createdAt: 'CreatedAt', updatedAt: 'UpdatedAt' }
  }
)

// MARK  function
UserSchema.statics.authenticate = async function(email, password) {
  let user = await this.findOne({ Email: email })
  if (!user) return false

  let isAuthenticated = await bcrypt.compareSync(password, user.Password)
  if (!isAuthenticated) return false

  user.isForceLogout = false
  await user.save()
  let data = user.toJSON()

  return _.pick(data, ['_id', 'Email', 'FirstName', 'LastName', 'Role'])
}

UserSchema.static.getListWithPagination = getListWithPagination;

// MARK  Hook
UserSchema.post('find', async function(docs) {
  for (let doc of docs) {
    doc.SearchName = removeUnicodeText(doc.FirstName + ' ' + doc.LastName)
  }
})

export default mongoose.model('UserModel', UserSchema, 'User')
