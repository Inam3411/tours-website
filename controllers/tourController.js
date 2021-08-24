const Tour = require('./../models/toursModel');
const APIFeatures = require('./../utils/APIFeatures');

exports.alliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
    next();
}


exports.showTours = async (req, res) => {
    try {

        const features = new APIFeatures(Tour.find(), req.query).filter().sort().limit().pagination();

        // Exicuting query
        const tours = await features.query;

        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours
            }

        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        })
    }

}

exports.createTour = async (req, res) => {
    try {
        newTour = await Tour.create(req.body)

        res.status(201).json({
            status: "success",
            data: {
                newTour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: err
        })
    }
}

exports.showTour = async (req, res) => {

    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }

        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        })
    }
}

exports.updateTour = async (req, res) => {

    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({
            status: 'success',
            data: {
                tour
            }

        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        })
    }
}

exports.deleteTour = async (req, res) => {

    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: 'success',
        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        })
    }
}

exports.getToursStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: { ratingsAverage: { $gte: 4.5 } }
            },
            {
                $group: {
                    _id: '$difficulty',
                    numTours: { $sum: 1 },
                    totalRatings: { $sum: '$ratingsQuantity' },
                    averageRatings: { $avg: '$ratingsAverage' },
                    averagePrice: { $avg: '$price' },
                    maxPrice: { $max: '$price' },
                    minPrice: { $min: '$price' },

                }
            },
            {
                $sort: { maxPrice: 1, averagePrice: 1 }
            },
        ])
        res.status(200).json({
            status: 'success',
            data: {
                stats
            }

        });
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err
        })
    }
}