import apartmentModel from "../models/apartment.model";
import { CreateApartmentInput } from "../dtos/apartment.dto";

interface ApartmentQuery {
  unitName?: string;
  unitNumber?: string;
  project?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
}

class ApartmentService {
  async createApartment(data: CreateApartmentInput) {
    const apartment = await apartmentModel.create(data);
    return apartment;
  }

  async getApartmentById(id: string) {
    const apartment = await apartmentModel.findById(id).select("-__v");
    return apartment;
  }

  async getApartments(query: ApartmentQuery) {
    const {
      unitName,
      unitNumber,
      project,
      minPrice,
      maxPrice,
      page = 1,
      limit = 10,
    } = query;

    const filter: any = {};
    console.log("minPrice", minPrice);
    if (unitName) filter.unitName = { $regex: unitName, $options: "i" };
    if (unitNumber) filter.unitNumber = { $regex: unitNumber, $options: "i" };
    if (project) filter.project = { $regex: project, $options: "i" };
    if (minPrice) filter.price = { $gte: minPrice };
    if (maxPrice) filter.price = { ...filter.price, $lte: maxPrice };

    console.log(filter);
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      apartmentModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .select(["-__v", "-updatedAt", "-description"])
        .sort({ createdAt: -1 }),
      apartmentModel.countDocuments(filter),
    ]);

    return {
      apartments: data,
      metadata: {
        total,
        page,
        limit,
      },
    };
  }

  async updateApartment(id: string, data: CreateApartmentInput) {
    const apartment = await apartmentModel.findByIdAndUpdate(id, data, {
      new: true,
    });
    return apartment;
  }

  async deleteApartment(id: string) {
    const apartment = await apartmentModel.findByIdAndDelete(id);
    return apartment;
  }
}

export default new ApartmentService();
