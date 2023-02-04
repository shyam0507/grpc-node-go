const grpc = require("@grpc/grpc-js");
var protoLoader = require("@grpc/proto-loader");
const PROTO_PATH = "./proto/review.proto";

const options = {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
};

var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);

const ReviewService =
  grpc.loadPackageDefinition(packageDefinition).review.ReviewService;

const client = new ReviewService(
  "0.0.0.0:50051",
  grpc.credentials.createInsecure()
);

const getReviews = async (movieId) => {
  return new Promise((resolve, reject) => {
    ratings = [];
    const stream = client.GetReviews({ id: movieId });

    stream.on("data", function (data) {
      console.log(data);
      ratings.push(data);
    });

    stream.on("end", function () {
      resolve(ratings);
    });

    stream.on("error", () => {
      reject("");
    });
  });
};

module.exports = getReviews;
