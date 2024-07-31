import { member_Model } from "../models/member_model.js";
import { user_Model } from "../models/user_model.js";
import { memberSchema } from "../schema/member_schema.js"



export const postMember = async (req, res, next) => {
    console.log(req.body)

    try {
        const { error, value } = memberSchema.validate({
            ...req.body,
            image: req?.file?.filename
        });

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userId = req.session?.user?.id || req?.user.id;
        const user = await user_Model.findById(userId);
        console.log("user", user)
        if (!user) {
            return res.status(404).send("user not found");
        }

        const member = await member_Model.create({ ...value, user: userId });
        console.log("member", member);
        user.member = member._id

        res.status(201).json({ Members: member });


    } catch (error) {
        console.log(error)
    }


}


export const updateUserProfile = async (req, res) => {
    console.log(req.body)
    try {
        const updateFields = { ...req.body };

        if (req.file?.image) {

            updateFields.image = req.file.filename;

        } else if (req.file?.image) {

            updateFields.image = req.file.image[0].image;
        }

        const { error, value } = memberSchema.validate(updateFields);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }


        const userId = req.session?.user?.id || req?.user.id;

        const user = await user_Model.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        const member = await member_Model.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!member) {
            return res.status(404).send("Member not found");
        }

        res.status(201).json({ member })

    } catch (error) {

        console.log(error);

    }


};

export const getAllMember = async (req, res) => {
    console.log(req.body)
    try {

        const userId = req.session?.user?.id || req?.user.id;

        const member = await member_Model.findOne({ user: userId })
            .populate({
                path: 'user',
                select: '-password'

            });
            if (!member) {
                return res.status(200).json({ member });
            }
            res.status(200).json({ member });




    } catch (error) {
        return res.status(500).json({ error })

    }
};


export const deleteMember = async (req, res) => {
    try {
        
        const deleteFields = { ...req.body };
        
        if (req.file?.image){
            deleteFields.image = req.file.filename;
        }else if (req.file?.image) {
            deleteFields.image = req.file.image[0].filename;
        }

        const { error, value } = memberSchema.validate(deleteFields);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const userId = req.session?.user?.id || req?.user.id;
        const user = await user_Model.findById(userId);

        if (!user) {
            return res.status(404).send("Member not found");
        }

        const member = await member_Model.findByIdAndDelete(req.params.id, value, { new: true });
        if (!member) {
            return res.status(200).send("Member Deleted");
        }

        res.status(201).json({ member });

    } catch (error) {
        console.log(error);
        
    }


};