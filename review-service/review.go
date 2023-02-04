package main

import (
	"encoding/json"
	"io/ioutil"
	"log"

	pb "github.com/shyam0507/grpc-node-go/proto"
)

type Review struct {
	Id      int32   `json:"id"`
	MovieId int32   `json:"movie_id"`
	Review  string  `json:"review"`
	Rating  float32 `json:"rating"`
}

func (s *Server) GetReviews(req *pb.ReviewRequest, stream pb.ReviewService_GetReviewsServer) error {
	ratings := readData(req.Id)
	for i := 0; i < len(ratings); i++ {
		stream.Send(&pb.ReviewResponse{Id: ratings[i].Id, Review: ratings[i].Review, Rating: ratings[i].Rating})
	}
	return nil
}

func readData(id int32) []Review {
	content, err := ioutil.ReadFile("./data/ratings.json")

	if err != nil {
		log.Fatalf("Error while reading the file!")
	}

	var allReviews []Review
	err = json.Unmarshal(content, &allReviews)
	if err != nil {
		log.Fatal("Error while parsing the file!", err)
	}
	var reviews []Review
	for _, v := range allReviews {
		if v.MovieId == id {
			reviews = append(reviews, v)
		}
	}

	return reviews
}
