import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "@/lib/api";
import { IApartment, IResponse, PaginationMeta } from "@/types";
import { NextRouter } from "next/router";
import { toast } from "react-toastify";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ApartmentsState {
  apartments: IApartment[];
  meta: PaginationMeta;
  loading: boolean;
  error: string | null;
}

const initialState: ApartmentsState = {
  apartments: [],
  meta: { total: 0, page: 1, limit: 10 },
  loading: false,
  error: null,
};

type ApartmentQueryParams = {
  page?: number;
  limit?: number;
  unitName?: string;
  unitNumber?: string;
  project?: string;
  minPrice?: number;
  maxPrice?: number;
};

export const fetchApartments = createAsyncThunk(
  "apartments/fetch",
  async (params: ApartmentQueryParams) => {
    const query = new URLSearchParams(
      Object.entries(params).reduce<Record<string, string>>(
        (acc, [key, value]) => {
          if (value !== undefined) acc[key] = String(value);
          return acc;
        },
        {}
      )
    ).toString();

    const { data } = await api.get<
      IResponse<{ apartments: IApartment[]; metadata: PaginationMeta }>
    >(`/apartments?${query}`);
    return data;
  }
);

export const createApartment = createAsyncThunk(
  "apartments/create",
  async ({
    apartment,
    navigate,
  }: {
    apartment: Partial<IApartment>;
    navigate: AppRouterInstance;
  }) => {
    const { data } = await api.post<IResponse<IApartment>>(
      `/apartments`,
      apartment
    );
    if (data.success) {
      toast.success("Apartment created successfully");
      navigate.push("/apartments");
    }
    if (!data.success) toast.error(data.message);
    return data;
  }
);

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchApartments.fulfilled,
        (
          state,
          action: PayloadAction<
            IResponse<{ apartments: IApartment[]; metadata: PaginationMeta }>
          >
        ) => {
          state.loading = false;
          state.apartments = action.payload.data?.apartments || [];
          state.meta = action.payload.data?.metadata || {
            total: 0,
            page: 1,
            limit: 10,
          };
        }
      )
      .addCase(fetchApartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch apartments";
      });

    builder
      .addCase(createApartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createApartment.fulfilled,
        (state, action: PayloadAction<IResponse<IApartment>>) => {
          state.loading = false;
          if (action.payload.data) {
            state.apartments = [action.payload.data, ...state.apartments];
            state.meta.total += 1;
          }
        }
      )
      .addCase(createApartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create apartment";
      });
  },
});

export default apartmentsSlice.reducer;
