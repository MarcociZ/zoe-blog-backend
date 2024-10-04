import PostModel from '../models/Post.js'

export const getLastTags = async (req, res) => {
    try {
        const posts = await PostModel.find().limit(5).exec();

        const tags = posts
            .map((obj) => obj.tags)
            .flat()
            .slice(0, 5);

        res.json(tags);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'No any posts available'
        });

    }

};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);


    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'No any posts available'
        });

    }
};

export const getOne = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel
            .findOneAndUpdate(
                { _id: postId },
                { $inc: { viewsCount: 1 } },
                { returnOriginal: false },
            )
            .populate('user')
            .then((doc, err) => {
                if (!doc) {
                    return res.status(404).json({
                        message: 'The post wasn\'t found'
                    });
                }
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Error occured'
                    });
                }
                res.json(doc);

            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'The post wasn\'t found: ' + error
        });
    }
};

export const remove = async (req, res) => {
    try {
        const postId = req.params.id;

        PostModel
            .findOneAndDelete(
                { _id: postId },
            )
            .then((doc, err) => {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        message: 'Error with removing occured'
                    });
                }
                if (!doc) {
                    return res.status(404).json({
                        message: 'The post wasn\'t found'
                    });
                }
                res.json({
                    success: true,
                });
            });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error occured'
        });
    }
};

export const create = async (req, res) => {

    try {

        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags.split(","),
            user: req.userId,
        });

        const post = await doc.save();

        res.json(post);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error
        });

    }
};

export const update = async (req, res) => {
    try {

        const postId = req.params.id;
        await PostModel
            .updateOne(
                {
                    _id: postId
                },
                {
                    title: req.body.title,
                    text: req.body.text,
                    imageUrl: req.body.imageUrl,
                    tags: req.body.tags.split(","),
                    user: req.userId,
                });

        res.json({
            success: true,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Server error occured"
        });
    }
};