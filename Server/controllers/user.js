const User = require('../model/User')


exports.list = async (req, res) => {
    try {
        //code
        const user = await User.find({})
            .select('-password')
            .exec()
        res.send(user)
    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }
};
exports.changeRole = async (req, res) => {
    try {
        const { id, role } = req.body.data;
        const user = await User.findOneAndUpdate({ _id: id }, { role: role }, { new: true })
            .select('-password')
            .exec();
        res.send(user);

    } catch (err) {
        console.log(err);
        res.status(500).send("Server Error");
    }

};

exports.removeUser = async (req, res) => {
    try {
        const { id } = req.params; // Access the user ID from req.params
        const deletedUser = await User.findOneAndRemove({ _id: id }).exec();
        res.send(deletedUser);
    } catch (error) {
        console.log(error);
        res.status(500).send('Server Error Remove User!!!');
    }
};
exports.userCart = async (req, res) => {
    try {
        res.send('userCart ok')
    } catch (error) {
        console.log(err)
        res.send(500).send('userCart Server Error')
    }
}
