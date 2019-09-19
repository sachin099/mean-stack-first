var runGeoQuery = function (req, res) {

    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };

    var geoOptions = {
        spherical: true,
        maxDistance: 2000,
        num: 5
    };
    Hotel
        .$geoNear(point, geoOptions, function (err, results, stats) {
            console.log('Geo results', results);
            console.log('Geo stats', stats);
            res
                .status(200)
                .json(results);

        });
    Hotel.aggregate([
        {
            $geoNear: {
                near: {
                    type: "Point",
                    coordinates: [lng, lat]
                },
                maxDistance: 2,
                spherical: true,
                num: 5
            }
        }
    ]).then(function (err, results, stats) {

        console.log('Geo results', results);
        console.log('Geo stats', stats);
        res
            .status(200)
            .json(results);
    });
};