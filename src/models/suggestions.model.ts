import { Request } from "express";
import { PipelineStage } from "mongoose";
import { Suggestions } from "../schemas";

class SuggestionsModel {
  async getSuggestions(req: Request) {
    const pipelineArray: PipelineStage[] = [];

    const { q, radius = parseFloat(process.env.DEFAULT_SEARCH_RADIUS), sort: sortBy = "name" } = req.query;

    const latitude = req.query.latitude ? parseFloat(req.query.latitude as string) : null;
    const longitude = req.query.longitude ? parseFloat(req.query.longitude as string) : null;

    if (
      latitude &&
      longitude &&
      typeof latitude === "number" &&
      typeof longitude === "number" &&
      latitude >= -90 &&
      latitude <= 90 &&
      longitude >= -180 &&
      longitude <= 180
    ) {
      const latLongMatchPipeline: PipelineStage = {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          maxDistance: 1000 * (radius as number),
          spherical: true,
          distanceField: "distance",
          distanceMultiplier: 0.001,
        },
      };

      pipelineArray.push(latLongMatchPipeline);
    }

    if (q && typeof q === "string") {
      const textMatchPipeline: PipelineStage = {
        $match: {
          name: {
            $regex: q,
            $options: "i",
          },
        },
      };

      pipelineArray.push(textMatchPipeline);
    }

    const sortPipeline: PipelineStage = {
      $sort: { [sortBy as string]: 1 },
    };

    const projectPipeline = {
      $project: {
        name: 1,
        longitude: { $arrayElemAt: ["$location.coordinates", 0] },
        latitude: { $arrayElemAt: ["$location.coordinates", 1] },
        distance: 1,
        _id: 0,
      },
    };

    pipelineArray.push(sortPipeline);
    pipelineArray.push(projectPipeline);

    const suggestions = await Suggestions.aggregate(pipelineArray);

    /*
     * when lat, long are not passed in query params and only name is passed
     * distance is N/A
     */

    suggestions.map((s) => {
      if (!s.distance && s.distance !== 0) {
        s.distance = "N/A";
      }
    });
    return suggestions;
  }
}

export default new SuggestionsModel();
